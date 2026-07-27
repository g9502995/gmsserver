function enter(pi) {
    if (pi.getMap().getReactorByName("rnj3_out3").getState() == 1) {
    	
    	if(pi.isLeader()){
    		pi.playPortalSound();
    		pi.getPlayer().getEventInstance().warpEventTeam(926100203)
    		return true;
    	}else{
    		pi.playerMessage(5,"请队长先通过");
    		return false;
    	}

        
        //pi.warp(926100203, 0); //next
        return true;
    } else {
        pi.playerMessage(5, "传送门尚未开启。");
        return false;
    }
}