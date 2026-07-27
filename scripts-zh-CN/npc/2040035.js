
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0 && mode == 1) {
            cm.sendNext("恭喜你成功封印了时空裂缝！为了表彰你的辛勤工作，我有一份礼物送给你！拿去吧，这是你的奖品。");
			
        } else if (status == 1) {
            var eim = cm.getEventInstance();

            

            if (!eim.giveEventReward(cm.getPlayer())) {
                cm.sendNext("看起来你的#r装备#k、#r消耗#k或#r其他#k背包中都没有空位。请腾出一些空间，然后再试一次。");
            } else {
				

            	const reward = eim.getObjectProperty("reward");
            	const copy = eim.getEm().getName();
            	const ch = cm.getPlayer();
				const player = ch.getAbstractPlayerInteraction();
				const party = eim.getPlayers();
				const count = party.size() * 2
				if(reward.leader && player.isLeader()){
					if(player.canHold(reward.leader)){
						player.gainItem(reward.leader);
						ch.saveLog(copy,cm.getNpc(),reward.leader,1);
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

				var cache = copy + "今日完成次数"
				ch.saveDayData(cache, (ch.getDayData(cache) * 1) + 1);

				var cache = copy + "总完成次数"
				ch.saveData(cache , (ch.getData(cache) * 1) + 1);

				ch.serverMessage(`完成了【${copy}】组队任务！`);


				cm.warp(910002000,2);

			
            }

            cm.dispose();
        }
    }
}



