
var status = 0;

var city = Array(		
	Array(103000000,1000,"废弃都市",[15,255]), 
	Array(221024500,3000,"玩具塔\t",[21,255]), 
	Array(300030100,3000,"毒雾森林",[44,255]),
	Array(200080101,3000,"女神塔\t",[51,255]),	
	Array(251010404,3000,"海盗船\t",[55,255]),	
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	
	if (CheckStatus(mode)) {
		
	   
			
		if(status == 0){
			
			var text = "\r\n\t\t\t\t\t\t\t\t\t\t\t#e#r综合传送#n#k\r\n\r\n"
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "#L900##fUI/Basic.img/CheckBox/0# #k自由市场#l  \t\t";
			text += "#L901##fUI/Basic.img/CheckBox/1# #b副本传送#l  \t\t";
			text += "#L902##fUI/Basic.img/CheckBox/0# #k打造传送#l  \t\t\r\n";
			text += "#L903##fUI/Basic.img/CheckBox/0# #k城镇传送#l  \t\t";
			text += "#L904##fUI/Basic.img/CheckBox/0# #k练级传送#l  \t\t";
			text += "#L905##fUI/Basic.img/CheckBox/0# #k首领传送#l  \t\t";
			
			text += "\r\n\r\n"
			
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n";
			
			for(let i=0; i < city.length; i++){
				let map = city[i];
				text+=`#L${i}##b${map[2]}#k（${map[1]}金币）#r 限 ${map[3][0]} - ${map[3][1]} 级#l\r\n`;
			}
			
			
			text += "\r\n\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n";
			
			cm.sendSimple(text);
			
			
		} else if(status == 1){
			
			if(selection == 900){
				cm.warp(910000000);
				cm.dispose();
			}else if(selection == 902){
				cm.warp(910001000,3);
				cm.dispose();
			}else if(selection > 900){
				if(selection == 901) openNpc("副本传送");
				if(selection == 903) openNpc("城镇传送");
				if(selection == 904) openNpc("练级传送");
				if(selection == 905) openNpc("首领传送");
				
			}else{
				
				var mapData = city[selection];
				var mapId = mapData[0];
				var mapGold = mapData[1];
				if (mapGold > cm.getMeso()) {
					cm.sendOk("金币不足以购买船票！");
				}else{
					cm.gainMeso(-mapGold);
					cm.getPlayer().saveLocationOnWarp();
					cm.warp(mapId)
					
				}
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
