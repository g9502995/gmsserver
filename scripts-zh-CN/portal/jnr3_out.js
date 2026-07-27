function enter(pi) {
    if (pi.getMap().getReactorByName("jnr3_out3").getState() == 1) {
    	if(pi.isLeader()){
    		pi.playPortalSound();
    		pi.getPlayer().getEventInstance().warpEventTeam(926110203)
    		return true;
    	}else{
    		pi.playerMessage(5,"请队长先通过");
    		return false;
    	}
    } else {
        pi.playerMessage(5, "传送门尚未开启。");
        return false;
    }
}