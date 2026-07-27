/**
 * @author: Ronan
 * @npc: Ellin
 * @map: Ellin PQ
 * @func: Ellin PQ Coordinator
 */

var status = 0;
var mapid;
var gold = 500;
function start() {
    mapid = cm.getPlayer().getMapId();
	
    status = -1;
	
		
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            var ellinStr = ellinMapMessage(mapid);
            if (mapid == 930000000) {
                cm.sendNext(ellinStr);
			} else if (mapid == 930000200 || mapid == 930000100 || mapid == 930000600){
				cm.sendSimple(ellinStr);
            } else if (mapid == 930000300) {
                var eim = cm.getEventInstance();

                if (eim.getIntProperty("statusStg4") == 0) {
                    eim.showClearEffect(cm.getMap().getId());
                    eim.setIntProperty("statusStg4", 1);
                }

                cm.sendNext(ellinStr);
            } else if (mapid == 930000400) {
				
                if (cm.haveItem(4001169, 20)) {
                    if (cm.isEventLeader()) {
                        cm.sendNext("哦，你带来了它们！我们现在可以继续了，我们要继续吗？");
                    } else {
                        cm.sendOk("你已经带来了他们，但你不是队长！请让队长把弹珠给我……");
                        cm.dispose();

                    }
                } else {
                    if (cm.getEventInstance().gridCheck(cm.getPlayer()) != 1) {
						cm.getEventInstance().gridInsert(cm.getPlayer(), 1);
                    } 
					var mobs = cm.getMap().countMonsters();
					if (mobs > 0) {
						if (!cm.haveItem(2270004)) {
							if (cm.canHold(2270004, 20)) {
								cm.gainItem(2270004, 20);
								cm.sendSimple(ellinStr);

							} else {
								cm.sendOk("在领取净化器之前，请确保你的使用物品栏有足够的空间！");
								cm.dispose();
							}
						} else {
							cm.sendSimple(ellinStr);
						}
					} else {
						cm.sendYesNo("你们已经捕捉到了所有的 #o9300174#。让队长把所有的 #b20 #t4001169##k 给我，然后我们继续。" + "\r\n\r\n也许你是 #r想退出吗#k？请三思，也许你的队友还在努力尝试这个副本。");
					}
                    
                }
            } else {
				
                cm.sendSimple(ellinStr);
            }
        } else if (status == 1) {
            if (mapid == 930000000) {
            } else if (mapid == 930000300) {
                cm.getEventInstance().warpEventTeam(930000400);
            } else if (mapid == 930000400) {
				
				if(selection === 1){
					if(cm.getPlayer().getCashShop().getCash(2) >= gold){
						cm.getPlayer().gainCash(-gold,true);
            			cm.getPlayer().saveLog("毒物森林副本",cm.getNpc(),2,-gold);
						cm.getEventInstance().warpEventTeam(930000500);
					}else{
						cm.sendOk("抵用券不足");
					}
					
				}else{
				
					if (cm.haveItem(4001169, 20) && cm.isEventLeader()) {
						cm.gainItem(4001169, -20);
						cm.getEventInstance().warpEventTeam(930000500);
					} else {
						cm.sendOk("不足20颗#t4001169#");

					}
				}
			} else if(mapid == 930000200){
				if(selection === 1){
					//抵用券过关
						
					if(cm.getPlayer().getCashShop().getCash(2) >= gold){
						cm.getPlayer().gainCash(-gold,true);
            			cm.getPlayer().saveLog("毒雾森林副本",cm.getNpc(),2,-gold);
						cm.getEventInstance().warpEventTeam(930000300);
					}else{
						cm.sendOk("抵用券不足");
					}
						
				}else{
					cm.warp(930000800, 0);
				}
            } else {
                cm.warp(930000800, 0);
            }

            cm.dispose();
        }
    }
}

function ellinMapMessage(mapid) {
    switch (mapid) {
        case 930000000:
            return "欢迎来到毒雾森林。通过进入传送门继续前进。";

        case 930000100:
            return `这些 #b#o9300172##k 被污染的怪物已经占领了该区域。我们必须消灭所有这些被污染的怪物，才能继续前进。\r\n\r\n\r\n#L2##b我要离开！#l\r\n`;

        case 930000200:
            return `一根巨大的脊柱挡住了前方的路。要移除这道障碍，我们必须取回 #b#o9300173##k 携带的毒素，以此驱散这根过度生长的脊柱。但天然状态下的毒素无法直接使用，因为它的浓度过高。可让它掉落在 #b泉水中#k 稀释后才能用.\r\n\r\n#L1##b花${gold}抵用券直接过关#l\r\n`;

        case 930000300:
            return "太好了，你终于找到我了。现在我们可以继续往森林深处走了。";

        case 930000400:
            return `#b#o9300175##k 已经占领了这片区域。但它们并非普通怪物，不仅再生速度极快，#r普通武器和魔法对它们完全无效#k 。必须使用 #b#t2270004##k! 来净化这些被污染的怪物！让队长从它们身上收集 20 颗#t${4001169}#给我.\r\n\r\n#L1##b花${gold}抵用券直接过关#l\r\n\r\n`;

        case 930000600:
            return `这就是森林所有问题的根源！把拿到的魔法石放在祭坛上，做好准备，获得毒珠扔到泉水里面净化石巨人！\r\n\r\n#L2##b我要离开！#l\r\n`;

        case 930000700:
            return "就是这样，你们做到了！太感谢你们净化了这片森林！";

    }
}