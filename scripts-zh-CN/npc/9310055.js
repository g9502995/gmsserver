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

			var text = "在我这里 #r按键盘的上键 #k会有意想不到的功能？\r\n";
			cm.sendOk(text);

		
		} else {
			cm.dispose();
		}
	}
}