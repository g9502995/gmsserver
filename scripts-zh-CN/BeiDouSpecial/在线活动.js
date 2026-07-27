var status;
var em;
function start() {
	em = cm.getEventManager("通用计时器");
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode == -1) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
    if (status == 0) {

    	var text = "";
		text += "#L991##fUI/Basic.img/CheckBox/0# #k在线奖励#l\t\t\t";
		text += "#L992##fUI/Basic.img/CheckBox/0# #k等级奖励#l\t\t\t";
		text += "#L993##fUI/Basic.img/CheckBox/1# #b在线活动#l\r\n";
		text += "#L994##fUI/Basic.img/CheckBox/0# #k活跃奖励#l\t\t\t";
		text += "#L995##fUI/Basic.img/CheckBox/0# #k暴击抽奖#l\t\t\t";
		text += "#L996##fUI/Basic.img/CheckBox/0# #k福利礼包#l";
		text += "\r\n\r\n"
		
		text += "\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		
		text += "\r\n\r\n";
		
		text += "#d"

		text += "\t⒈ 每天 20:00 ~ 21:00 全服双倍经验！\r\n"
		text += "\t⒉ 每天 20:00 ~ 21:00 GM线上全服发放福利\r\n"
		text += `\t⒊ 每天 ${em.getProperty('oxStartTime')} ~ ${em.getProperty('oxEndTime')} 答题活动\r\n`
		text += "\t⒋ 每天 21:10 ~ 23:30 主城王级首领来袭\r\n"
		text += "\t⒌ 周五周六 20:00 ~ 21:00 全服双倍爆率！\r\n"
		// text += "\t⒌ 周五、周六 双倍经验延时至 22:00\r\n"
		text += "\t⒍ 每天 自由市场摆摊狩猎时额外获得10%经验值\r\n"
		text += "\t⒎ 每天 自由市场泡点获得经验值和点券（需有椅子）\r\n"

		
		cm.sendSimple(text);
		
		
    } else if (status == 1 ) {

    	if(selection > 900){
			
			//进入菜单
			cm.dispose();
			
			if(selection === 991)cm.openNpc(9010000, "在线奖励");
			if(selection === 992)cm.openNpc(9010000, "等级奖励");
			if(selection === 993)cm.openNpc(9010000, "在线活动");
			if(selection === 994)cm.openNpc(9010000, "活跃奖励");
			if(selection === 995)cm.openNpc(9010000, "暴击抽奖");
			if(selection === 996)cm.openNpc(9010000, "福利礼包");

			
		}else{
			
			
		}
		
	} else {
		cm.dispose();
	}
}	

