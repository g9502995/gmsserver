var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
       
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            
            cm.sendNext(`嗨，我是 #p${cm.getNpc()}#。`);
            cm.dispose();
          
        } else {
            cm.dispose();
        }
    }
}