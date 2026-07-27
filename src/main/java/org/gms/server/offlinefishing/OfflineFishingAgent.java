package org.gms.server.offlinefishing;

import org.gms.client.Character;
import org.gms.client.Client;
import org.gms.constants.id.MapId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Re-registers a resident, clientless character as a "fisher" with its World every tick, so the
 * world's own periodic fishing roll (World#runCheckFishingSchedule, every 10s - see FishingTask)
 * keeps picking it up. All the actual fishing logic (success chance, rewards, effects) is the
 * same, already-working code real players use (see Fishing#doFishing) - this class only supplies
 * the "someone is still fishing here" heartbeat that a live client would normally provide by
 * repeatedly dropping bait.
 */
public class OfflineFishingAgent {
    private static final Logger log = LoggerFactory.getLogger(OfflineFishingAgent.class);

    private final Character character;
    private final OfflineFishingProfile profile;
    private final OfflineFishingManager manager;

    private final AtomicBoolean ticking = new AtomicBoolean(false);

    OfflineFishingAgent(Character character, OfflineFishingProfile profile, OfflineFishingManager manager) {
        this.character = character;
        this.profile = profile;
        this.manager = manager;
    }

    public Character getCharacter() {
        return character;
    }

    public OfflineFishingProfile getProfile() {
        return profile;
    }

    void tick() {
        if (!ticking.compareAndSet(false, true)) {
            return;
        }
        try {
            runTick();
        } catch (Exception e) {
            log.error("离线钓鱼 tick 异常，角色 {}({})，停止该 agent", character.getName(), character.getId(), e);
            manager.stop(profile.getCharacterId(), OfflineFishingStopReason.INVALID_STATE);
        } finally {
            ticking.set(false);
        }
    }

    private void runTick() {
        Client client = character.getClient();
        if (client == null || client.getPlayer() != character || !character.isLoggedIn()) {
            manager.stop(profile.getCharacterId(), OfflineFishingStopReason.INVALID_STATE);
            return;
        }
        if (!character.isAlive()) {
            manager.stop(profile.getCharacterId(), OfflineFishingStopReason.PLAYER_DEATH);
            return;
        }
        if (character.getMapId() != profile.getMapId() || !MapId.isFishingArea(character.getMapId())) {
            manager.stop(profile.getCharacterId(), OfflineFishingStopReason.MAP_CHANGE);
            return;
        }
        if (character.getItemQuantity(profile.getItemId(), true) <= 0) {
            manager.stop(profile.getCharacterId(), OfflineFishingStopReason.INVALID_STATE);
            return;
        }

        character.getWorldServer().registerFisherPlayer(character, profile.getBaitLevel());
        profile.setLastAttemptAt(System.currentTimeMillis());
        profile.incrementAttempts();
    }
}
