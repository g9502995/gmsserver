function enter(pi) {
    if (pi.getPlayer().getParty() != null && pi.isEventLeader() && pi.haveItem(4001055, 1)) {
        pi.playPortalSound();
        pi.getEventInstance().warpEventTeamToMapSpawnPoint(920010100,3);
        return true;
    } else {
        pi.playerMessage(5, "请让队长进入此传送门，并确保持有生命草。");
        return false;
    }
}