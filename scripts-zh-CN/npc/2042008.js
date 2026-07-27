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
			
			cm.sendYesNo("你是打算要离开吗？\r\n若有挑战者向你发起挑战会询问你的，请耐心等待！");
		}else{
            cm.warpParty(980030000, 4);
            cm.cancelCPQLobby();
            cm.dispose();
        }
    }
}

