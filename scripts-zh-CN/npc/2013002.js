
/**
 *2013002.js - Minerva the Goddess
 *@author Ronan
 */
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (cm.getPlayer().getMapId() == 920010100) { //Center tower
            if (status == 0) {
                cm.sendSimple("我已经解除了阻止通往塔楼监狱储藏室的咒语。\r\n你可能会在那里找到一些好东西……\r\n\r\n#b#L1#我不找了，直接去拿奖励离开！#l\r\n#L2#我去看看#l");
            } else if (status == 1) {
				if(selection === 1){
					cm.warp(920011300, 0);
				} else {
					cm.sendNext("好，我在这里等你哟！")
				}
				
				cm.dispose();
            }

        } else if (cm.getPlayer().getMapId() == 920011100) {
            if (status == 0) {
                cm.sendYesNo("所以，你准备好退出了吗？");
            } else if (status == 1) {
                cm.warp(920011300, 0);
                cm.dispose();
            }

        } else if (cm.getPlayer().getMapId() == 920011300) {
            if (status == 0) {
                cm.sendNext("谢谢你不仅修复了雕像，还救出了我脱离困境。愿女神的祝福与你同在，直到最后……作为感激之情，请接受这份纪念品，以表彰你的勇敢。");
            } else if (status == 1) {

            	const ch = cm.getPlayer();

				var eim = ch.getEventInstance(); 

				if(eim){

					if(eim.giveEventReward(cm.getPlayer())){
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
						ch.saveDayData(cache,1,true);

						var cache = copy + "总完成次数"
						ch.saveData(cache,1,true);

						ch.serverMessage(`完成了【${copy}】组队任务！`);

						player.warp(910002000, 2);

					} else{

						cm.sendOk("背包空间不足！");
					
					}
				}
				
				cm.dispose();
				
                
            }
        }
    }
}
