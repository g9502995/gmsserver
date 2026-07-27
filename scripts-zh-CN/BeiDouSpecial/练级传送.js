
var status = 0;

var city = [
	[104040000,1000,"射手训练场\t\t\t", [1,15] ], 
	[104010001,1000,"猪的海岸\t\t\t\t", [10,20] ], 
	[103000101,1000,"地铁1号线1\t\t\t",[20,30] ], 
	
	[101030001,1500,"野猪的领土Ⅱ\t\t",[20,35] ], 
	[100040103,3000,"猴子森林Ⅱ\t\t\t",[35,70] ],
	
	[106000002,1200,"危险的峡谷Ⅱ\t\t",[40,60] ],

	[105090300,4000,"龙穴\t\t\t\t\t\t",[40,70] ],

	[103000105,6000,"地铁1号线4\t\t\t",[50,70] ],

	[105040306,5000,"巨人之林\t\t\t\t",[50,70] ],
	[261020500,8000,"研究所C-3\t\t\t\t",[50,70] ],
	[101030110,5000,"第1军营\t\t\t\t\t",[50,75] ],

	[541010010,8000,"幽灵船2\t\t\t\t\t",[60,90] ],
	
	[200010301,8000,"黑暗庭院\t\t\t\t",[70,90] ],
	
	[251010401,8000,"红鼻子海盗团老巢",[70,90] ],
	[600020300,10000,"机械蜘蛛洞穴\t\t",[80,120] ],
	[240020100,10000, "火焰死亡战场\t\t", [80,120]],
	[240040510,12000,"死龙巢穴\t\t\t\t",[110,150] ],
	
];

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
		text += "#L904##fUI/Basic.img/CheckBox/1# #b练级传送#l  \t\t";
		text += "#L905##fUI/Basic.img/CheckBox/0# #k首领传送#l  \t\t";
		
		text += "\r\n\r\n"
		
		text += "\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		
		text += "\r\n";
		
		for(let i=0; i < city.length; i++){
			let map = city[i];
			text+=`#L${i}##b${map[2]}#k（${map[1]}金币）#r 适合 ${map[3][0]} - ${map[3][1]} 级#l\r\n`;
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
			if(selection == 901) openNpc("副本传送");
			if(selection == 903) openNpc("城镇传送");
			if(selection == 904) openNpc("练级传送");
			if(selection == 905) openNpc("首领传送");
			
		}else{
			
			var mapData = city[selection];
			var mapId = mapData[0];
			var mapGold = mapData[1];
			var mapLevel = mapData[3];
			if (mapGold > cm.getMeso()) {
				cm.sendOk("金币不足以购买船票！");
			}else{
				cm.gainMeso(-mapGold);
				cm.getPlayer().saveLog("练级传送",0,-mapGold);
				cm.getPlayer().saveLocationOnWarp();
				cm.warp(mapId)
				
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

