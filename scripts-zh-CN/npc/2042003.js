var status = 0;
var request;

function start() {
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
			
			cm.sendYesNo("等待其他玩家来挑战你。。不想等了，就让我送你出去吧？")
		
		}else{
			
            cm.warpParty(980000000);
            cm.cancelCPQLobby();
            cm.dispose();
        }
    }
}

