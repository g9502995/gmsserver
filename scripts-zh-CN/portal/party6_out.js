function enter(pi) {
    var eim = pi.getEventInstance();

    if (eim.isEventCleared()) {
		
		if(pi.isEventLeader()){
			pi.playPortalSound();
            eim.warpEventTeam(930000800);
            return true;
		}else{
			pi.playerMessage(5, "请等待队长先通过传送门");
			return false;
		}
		
    } else {
        pi.playerMessage(5, "请先消灭石头人");
        return false;
    }
}



