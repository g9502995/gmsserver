function passedGrindMode(map, eim) {
    if (eim.getIntProperty("grindMode") == 0) {
        return true;
    }
    return eim.activatedAllReactorsOnMap(map, 2511000, 2517999);
}

function enter(pi) {
	var eim = pi.getEventInstance();
    if (pi.getMap().getMonsters().size() == 0 && passedGrindMode(pi.getMap(), eim)) {
        pi.playPortalSound();
		if(pi.isEventLeader()){
			eim.warpEventTeam(925100300);
		}else{
			pi.warp(925100300, 0); //next
		}
        return true;
    } else {
        pi.playerMessage(5, "传送门尚未开启。");
        return false;
    }
}