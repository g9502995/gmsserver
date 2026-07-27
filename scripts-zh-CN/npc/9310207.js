var status;
const ExpeditionType = Java.type('org.gms.server.expeditions.ExpeditionType');
const exped = ExpeditionType.ARIANT;
function start(){
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
		const dayCount = cm.getPlayer().getDayData("阿里安特竞技场") * 1;		

        if (status == 0) {
			var text = `你要去参加阿里安特竞技吗？${exped.getMinLevel()}~${exped.getMaxLevel()}级就可以！\r\n`;
			
            if(dayCount > 0)text += `你今天已参与${dayCount}次！\r\n`;
			
            cm.sendYesNo(text)
		} else if (status == 1){
			
			cm.warp(980010000)
			
        	cm.dispose();

        } else {
            cm.dispose();
        }
    }
} 