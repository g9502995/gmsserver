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

        if (status === 0) {

            if (cm.getMapId() === 270000000) {

                var text = "\r\n你可以找 #b#p2140000# #k完成任务后进入恐怖的品克缤副本入口，也可以给我#r2000点券#k，我可以把你传送过去！\r\n\r\n";

                text += "#b#L1#好的，帮我传送过去！#l\r\n";
                text += "#L2#请让我考虑考虑！#l\r\n";

                cm.sendSimple(text);

            } else {
                cm.sendNext("这片森林的魔力太神奇了……");
                cm.dispose();
            }

        } else if (status === 1) {
            if (selection === 1) {
                if (cm.getCash() >= 2000) {
                    cm.warp(270050000);
                    cm.gainCash(1, -1000);
                } else {
                    cm.sendOk("点券不足！");
                }
            }
            cm.dispose();


        } else {

            cm.dispose();
        }

    }
}