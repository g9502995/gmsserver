package org.gms.server.offlinefishing;

import org.gms.client.Character;
import org.gms.client.Client;
import org.gms.config.GameConfig;
import org.gms.constants.id.MapId;
import org.gms.server.TimerManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Central registry + shared scheduler for offline fishing.
 *
 * Unlike offline combat, there's no explicit "arm" step: if a character is holding the
 * server-configured fishing item in a fishing-area map when it disconnects, it's automatically
 * handed off here instead of logging out normally (see Client#disconnectInternal). Logging back
 * into the same character calls {@link #reclaimForLogin} first, same as offline combat.
 */
public final class OfflineFishingManager {
    private static final Logger log = LoggerFactory.getLogger(OfflineFishingManager.class);
    private static final OfflineFishingManager instance = new OfflineFishingManager();

    private final Map<Integer, OfflineFishingAgent> activeAgents = new ConcurrentHashMap<>();
    private final Map<Integer, AtomicInteger> perChannelCount = new ConcurrentHashMap<>();

    private OfflineFishingManager() {
        int tickMs = GameConfig.getServerInt("offline_fishing_tick_ms");
        if (tickMs <= 0) {
            tickMs = 8000; // comfortably under FishingTask's 10s world-level roll interval
        }
        TimerManager.getInstance().register(this::tickAll, tickMs);
    }

    public static OfflineFishingManager getInstance() {
        return instance;
    }

    private static int channelKey(int world, int channel) {
        return world * 1000 + channel;
    }

    public boolean isActive(int characterId) {
        return activeAgents.containsKey(characterId);
    }

    public OfflineFishingAgent getAgent(int characterId) {
        return activeAgents.get(characterId);
    }

    /**
     * Attempts to hand the given (already-disconnecting) character off to offline fishing.
     * Returns true if eligible and handed off - the caller must then skip its normal teardown and
     * keep the character resident. Returns false otherwise (caller proceeds with a normal
     * disconnect, or tries another offline mode).
     */
    public boolean tryStart(Client client, Character player) {
        if (!GameConfig.getServerBoolean("offline_fishing_enabled")) {
            return false;
        }

        int itemId = GameConfig.getServerInt("offline_fishing_item_id");
        if (itemId <= 0) {
            return false;
        }
        if (!player.isAlive() || !MapId.isFishingArea(player.getMapId())) {
            return false;
        }
        if (player.getItemQuantity(itemId, true) <= 0) {
            return false;
        }
        if (isActive(player.getId())) {
            return false;
        }

        int key = channelKey(player.getWorld(), client.getChannel());
        int maxPerChannel = GameConfig.getServerInt("offline_fishing_max_per_channel");
        if (maxPerChannel <= 0) {
            maxPerChannel = 20;
        }
        AtomicInteger counter = perChannelCount.computeIfAbsent(key, k -> new AtomicInteger());
        if (counter.incrementAndGet() > maxPerChannel) {
            counter.decrementAndGet();
            log.info("角色 {} 离线钓鱼申请被拒绝：频道已达上限", player.getName());
            return false;
        }

        int baitLevel = GameConfig.getServerInt("offline_fishing_bait_level");
        if (baitLevel <= 0) {
            baitLevel = 1;
        }

        OfflineFishingProfile profile = new OfflineFishingProfile(player.getId(), itemId, baitLevel, player.getMapId());
        OfflineFishingAgent agent = new OfflineFishingAgent(player, profile, this);
        activeAgents.put(player.getId(), agent);

        log.info("角色 {}({}) 进入离线钓鱼，地图 {}，频道 {}", player.getName(), player.getId(), profile.getMapId(), client.getChannel());
        return true;
    }

    public void stop(int characterId, OfflineFishingStopReason reason) {
        OfflineFishingAgent agent = activeAgents.remove(characterId);
        if (agent == null) {
            return;
        }

        Character character = agent.getCharacter();
        int key = channelKey(character.getWorld(), character.getClient() != null ? character.getClient().getChannel() : 0);
        AtomicInteger counter = perChannelCount.get(key);
        if (counter != null) {
            counter.decrementAndGet();
        }

        character.getWorldServer().unregisterFisherPlayer(character);

        log.info("角色 {}({}) 离线钓鱼结束，原因 {}，尝试次数 {}", character.getName(), characterId, reason,
                agent.getProfile().getAttempts().get());

        if (reason != OfflineFishingStopReason.PLAYER_LOGIN) {
            Client client = character.getClient();
            if (client != null) {
                client.finalizeOfflineSession(reason == OfflineFishingStopReason.SERVER_SHUTDOWN);
            }
        }
    }

    public void reclaimForLogin(int characterId) {
        if (activeAgents.containsKey(characterId)) {
            stop(characterId, OfflineFishingStopReason.PLAYER_LOGIN);
        }
    }

    public void shutdown() {
        for (Integer characterId : new ArrayList<>(activeAgents.keySet())) {
            stop(characterId, OfflineFishingStopReason.SERVER_SHUTDOWN);
        }
    }

    public List<OfflineFishingAgent> getActiveAgents() {
        return new ArrayList<>(activeAgents.values());
    }

    private void tickAll() {
        for (OfflineFishingAgent agent : activeAgents.values()) {
            agent.tick();
        }
    }
}
