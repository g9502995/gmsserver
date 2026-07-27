package org.gms.server.offlinefishing;

import java.util.concurrent.atomic.AtomicInteger;

/** Per-character configuration + runtime bookkeeping for offline fishing. */
public class OfflineFishingProfile {

    private final int characterId;
    private final int itemId;
    private final int baitLevel;
    private final int mapId;

    private final long createdAt = System.currentTimeMillis();
    private volatile long lastAttemptAt;
    private final AtomicInteger attempts = new AtomicInteger();

    public OfflineFishingProfile(int characterId, int itemId, int baitLevel, int mapId) {
        this.characterId = characterId;
        this.itemId = itemId;
        this.baitLevel = baitLevel;
        this.mapId = mapId;
    }

    public int getCharacterId() {
        return characterId;
    }

    public int getItemId() {
        return itemId;
    }

    public int getBaitLevel() {
        return baitLevel;
    }

    public int getMapId() {
        return mapId;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public long getLastAttemptAt() {
        return lastAttemptAt;
    }

    public void setLastAttemptAt(long lastAttemptAt) {
        this.lastAttemptAt = lastAttemptAt;
    }

    public AtomicInteger getAttempts() {
        return attempts;
    }

    public int incrementAttempts() {
        return attempts.incrementAndGet();
    }
}
