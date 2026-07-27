
var status = 0;

var city = Array(
	Array(104000000,500,"明珠港\t\t",27), 
	Array(100000000,800,"射手村\t\t",3), 
	Array(101000000,800,"魔法密林\t"), 
	Array(102000000,800,"勇士部落\t",4), 
	Array(103000000,800,"废弃都市\t",4), 
	Array(120000000,800,"诺特勒斯号",9),
	Array(105040300,1000,"林中之城\t"),
	Array(140000000,1000,"里恩\t\t\t"),
	Array(110000000,1000,"黄金海岸\t"),
	Array(200000000,1000,"天空之城\t"),
	Array(211000000,5000,"冰峰雪域\t",16), 
	Array(230000000,1000,"水下世界\t"),
	Array(222000000,1000,"童话村\t\t"),
	Array(220000000,5000,"玩具城\t\t"),
	Array(701000000,5000,"上海外滩\t"),
	Array(250000000,5000,"武陵\t\t\t"), 
	Array(260000000,5000,"阿里安特\t"),  
	Array(600000000,5000,"新叶城\t\t"), 
	Array(240000000,5000,"神木村\t\t"),  
	Array(261000000,1000,"玛加提亚\t"), 
	Array(221000000,1000,"地球本部\t"), 
	Array(251000000,3000,"百草堂\t\t"),
	Array(801000000,5000,"昭和村\t\t"),
	Array(550000000,10000,"吉隆都市\t"),
	Array(551000000,10000, "干榜村\t\t")
	
);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	// cm.message(`mode : ${mode} type : ${type} selection : ${selection}`);

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
		text += "#L903##fUI/Basic.img/CheckBox/1# #b城镇传送#l  \t\t";
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
			text+=`#L${i}##b${map[2]}#k（${map[1]}金币）#l\r\n`;
		}
		
		text += "\r\n\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		
		text += "\r\n";
		
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
			if(selection == 903) openNpc("城镇传送");
			if(selection == 904) openNpc("练级传送");
			if(selection == 905) openNpc("首领传送");
			
		}else{
			
			var mapData = city[selection];
			var mapId = mapData[0];
			var mapGold = mapData[1];
			if (mapGold > cm.getMeso()) {
				cm.sendOk("金币不足！");
			}else{
				cm.gainMeso(-mapGold);
				cm.getPlayer().saveLog("城镇传送",0,-mapGold);
				cm.getPlayer().saveLocationOnWarp();
				cm.warp(mapId,mapData[3] || 0)
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
