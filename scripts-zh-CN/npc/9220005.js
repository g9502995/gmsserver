/**
 Roodolph - Happy ville
 @author fantier123
 **/
var status;
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

        if (status == 0) {
            if (cm.getChar().getMapId() == 209000000) {
                cm.sendYesNo("你想前往 #b冰雪地带#k 的地方吗？\r\n\r\n那里太冷了，要准备 #i1472063##r#t1472063# #k抵御严寒！");
            } else if (cm.getChar().getMapId() == 209080000) {
                cm.sendYesNo("你希望回到幸福村吗？");
            } else {
                cm.sendOk("你还好吗？");
                cm.dispose();
            }
		} else if (status == 1){
			if (cm.getChar().getMapId() == 209000000) {
				cm.warp(209080000, 0);
			} else if (cm.getChar().getMapId() == 209080000) {
				cm.warp(209000000, 0);
			}
			cm.dispose();
        
        } else {
            cm.dispose();
        }
    }
} 