
var status = 0;


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	
	if (CheckStatus(mode)) {
		
			
			
		if(status == 0){

			var text = "\t\t\t\t\t\t\t\t\t\t\t#e#r福利领取#n#k\r\n"
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			
			
			text += "\r\n\r\n#b\t"
			
			text += "#L1#在线奖励#l\t\t";

			text += "#L2#等级奖励#l\t\t";

			text += "#L3#副本福利#l\r\n";
			

			text += "　\r\n"
			text += "\r\n";
			
			cm.sendSimple(text);
			
			
	    } else if (status == 1 ) {
			
			if(selection == 1){
				openNpc("在线奖励");
			} else if(selection == 2){
				openNpc("等级奖励");
			} else if (selection == 3){
				openNpc("副本奖励");
			} else {
				cm.dispose();
			}
			
			
		} else {
			cm.dispose();
		}
	}	
}


function openNpc(npc){
	cm.dispose();
	cm.openNpc(9010000, npc);
}
function CheckStatus(mode){
	
	if (mode == -1) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
	if (status == -1) {
		cm.dispose();
		return false;
	}	
	return true;
	
}
