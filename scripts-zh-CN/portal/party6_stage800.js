
// 毒雾森林最后一个传送门
function enter(pi) {
	
	//得到副本完成情况
	var spring = pi.getMap().getReactorById(3008000);
	if (spring != null && spring.getState() > 0) {
		//完成了


		const ch = pi.getPlayer();

		var eim = ch.getEventInstance();

		if(eim){
			const reward = eim.getObjectProperty("reward");
	    	const copy = eim.getEm().getName();
			const player = ch.getAbstractPlayerInteraction();
			const party = eim.getPlayers();
			const count = party.size() * 2
			if(reward.leader && player.isLeader()){
				if(player.canHold(reward.leader)){
					player.gainItem(reward.leader);
					ch.saveLog(copy,0,reward.leader,1);
				}else{
					ch.message("背包已经满了！");
				}
			}

			if(reward.exp)ch.gainExp(reward.exp);
			if(reward.meso)ch.gainMeso(reward.meso);
			if(reward.coin){
				if(player.canHold(reward.coin)){
					player.gainItem(reward.coin);
				}else{
					ch.message("背包已经满了！")
				}
			}
			if(reward.cert){
				if(player.canHold(reward.cert,count)){
					player.gainItem(reward.cert,count);
				}else{
					ch.message("背包已经满了！")
				}
			}

			if(reward.item){
				reward.item.forEach(v => {
					if(player.canHold(v[0],v[1])){
						player.gainItem(v[0],v[1]);
					}else{
						ch.message("背包已经满了！")
					}
				})
			}

			var cache = copy + "今日完成次数"
			ch.saveDayData(cache, (ch.getDayData(cache) * 1) + 1);

			var cache = copy + "总完成次数"
			ch.saveData(cache , (ch.getData(cache) * 1) + 1);

			ch.serverMessage(`完成了【${copy}】组队任务！`);
		}
		

		
	}
	
    pi.playPortalSound();
    pi.warp(910002000, 2);
    return true;
}


