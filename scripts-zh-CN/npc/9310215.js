function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {

	if (mode <= 0) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status == 0) {

			var text = "你有宝石吗？做到时装上面可以提升它的能力哦！\r\n\r\n";

			text += "#b"
			text += "#L1#宝石制作#l\t\t"
			text += "#L2#宝石镶嵌#l\t\t"
			text += "#L3#碎片转换#l"

			text += "\r\n　\r\n";

			cm.sendSimple(text);

		} else {
			cm.dispose();
			if (selection === 1){
				cm.openNpc(9310215, "宝石制作");
			} else if (selection === 2){
				cm.openNpc(9310215, "宝石镶嵌");
			} else if (selection === 3){
				cm.openNpc(9310215, "碎片转换");
			}
		}
		
	}
}
