package org.gms.server.offlinefishing;

/** Reasons an {@link OfflineFishingAgent} can stop for a character. */
public enum OfflineFishingStopReason {
    PLAYER_LOGIN,
    PLAYER_DEATH,
    MAP_CHANGE,
    MANUAL_STOP,
    SERVER_SHUTDOWN,
    INVALID_STATE
}
