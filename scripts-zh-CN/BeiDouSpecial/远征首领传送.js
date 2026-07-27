
var status = 0;

var boss = Array(		
	Array(230040420,0,"鱼王\t\t\t"), 
	Array(220080000,0,"闹钟\t\t\t"),
	Array(674030100,0,"宝藏城\t\t"), 
	Array(702070400,0,"妖僧\t\t\t"),		
	Array(211042300,0,"扎昆\t\t\t"),
	Array(105100100,0,"巨魔蝙蝠\t"),			
	Array(240040700,0,"暗黑龙王\t"),
	// Array(270050000,0,"品克缤\t\t"), //直接去开启
	Array(270000100,0,"品克缤\t\t") //要完成任务才能去开启
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
		cm.dispose();
		openNpc("9900001");
		return;
	}

	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
	if(status == 0){
		
		var text = "\t\t\t\t\t\t\t\t\t\t\t#e#r综合传送#n#k\r\n"
		text += "\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		
		text += "#L900##fUI/Basic.img/CheckBox/0# #k自由市场#l  \t\t";
		text += "#L901##fUI/Basic.img/CheckBox/0# #k副本传送#l  \t\t";
		text += "#L902##fUI/Basic.img/CheckBox/0# #k打造传送#l  \t\t\r\n";
		text += "#L903##fUI/Basic.img/CheckBox/0# #k城镇传送#l  \t\t";
		text += "#L904##fUI/Basic.img/CheckBox/0# #k练级传送#l  \t\t";
		text += "#L905##fUI/Basic.img/CheckBox/1# #b首领传送#l  \t\t";
		
		text += "\r\n\r\n"
		
		text += "\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		
		text += "\r\n";

		text += "#L999# #fUI/UIWindow.img/Quest/icon6/0# #r 野外首领传送#l\r\n\r\n"
		
		for(let i=0; i < boss.length; i++){
			let map = boss[i];
			text+=`#L${i}##b${map[2]}#k（消耗1个#t5041000#）#l\r\n`;
		}

		
		
		text += "\r\n　\r\n";
		
		cm.sendSimple(text);
		
		
	} else if(status == 1){
		
		if(selection == 900){
			if(cm.getPlayer().getMapId() !== 910000000){
				cm.getPlayer().saveLocation("FREE_MARKET");
			}
			cm.warp(910000000,"in01");
			cm.dispose();
		}else if(selection == 901){
			cm.warp(910002000,2);
			cm.dispose();
		}else if(selection == 902){
			cm.warp(910001000,2);
			cm.dispose();
		}else if(selection > 900){
			if(selection == 901) openNpc("副本传送");
			if(selection == 903) openNpc("城镇传送");
			if(selection == 904) openNpc("练级传送");
			if(selection == 905) openNpc("首领传送");

			if(selection == 999) openNpc("首领传送");
			
		}else{
			
			var mapData = boss[selection];
			var mapId = mapData[0];
			var mapPos = mapData[1];
			if (!cm.haveItem(5041000)) {
				cm.sendOk("#t5041000#不足");
			}else{
				if(cm.getPlayer().getMapId() !== 910000000){
					cm.getPlayer().saveLocationOnWarp();
				}
				cm.warp(mapId,mapPos);
				cm.gainItem(5041000,-1);
				cm.getPlayer().saveLog("首领传送",cm.getNpc(),5041000,-1);
				
			}
			cm.dispose();
			
		}
		
		
	} else {
		cm.dispose();
	}
		
}

function openNpc(npc){
	cm.dispose();
	cm.openNpc(9010000, npc);
}
