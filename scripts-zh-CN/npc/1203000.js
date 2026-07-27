//熊铁匠

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
            cm.sendNext("好武器会挑选自己的主人！")
        } else {
            cm.dispose();
        }
    }
} 