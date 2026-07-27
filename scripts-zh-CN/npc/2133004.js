var status = -1;
var gold = 500;
var itemId= 4001163;
function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {

        	if(cm.haveItem(itemId) && cm.isEventLeader()){
        		cm.sendNext(`太好了，你有#t${itemId}#。我会带你们去通往石头祭坛的路。跟我来吧。`);
        	}else{
        		cm.sendSimple(`让队长给我#t${itemId}#，它就在最上面的某一个箱子里面，获得后去下一关消除问题的根源。\r\n\r\n\r\n#b#L1#花${gold}抵用券直接获得#l `);
        	}

         
        } else if (status == 1) {

        	if(cm.haveItem(itemId)){
        		cm.getEventInstance().warpEventTeam(930000600);
        	}else{
        		if(selection == 1){
	        		if(cm.getPlayer().getCashShop().getCash(2) >= gold){
						cm.getPlayer().gainCash(-gold,true);
	            		cm.getPlayer().saveLog("毒物森林副本",cm.getNpc(),2,-gold);
						cm.gainItem(itemId,1);
						cm.getEventInstance().warpEventTeam(930000600);
					}else{
						cm.sendOk("抵用券不足");
					}
				}
        	}

            cm.dispose();
        }
    }
}