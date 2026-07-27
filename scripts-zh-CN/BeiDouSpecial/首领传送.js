loadScript('./common.js');
var status = 0;

var warp = 5040000;  //传送石ID
var boss = [];

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

		text += "#b"
		text += "#L99# #fUI/UIWindow.img/Quest/icon6/0# #r 远征队首领传送#l\r\n\r\n"

							

 
		var em = cm.getEventManager("boss");
   		var bossData = em.getProperty("boss");
   		if(bossData){
   			boss = JSON.parse(bossData);
   		}
   		const map = em.getChannelServer().getMapFactory();
   		text += `#b`;
   		for (var i = 0; i < boss.length; i++) {

   			const v = boss[i];

   			if(v.notice){
       			text += `#L${i}# ${v.name} ${alignText(v.level,3,"right")}级`;

       			if(cm.getItemQuantity(2430161)){
	       			if(map.getMap(v.map).getMonsterById(v.id)){
	       				text += "（#r存活#b）"
	       			} else {
	       				// text += "#d#b"
	       				// text +=`（${formatMinute(v.spawn)}）`;
	       				if(v.reset !== undefined){
	       					text += `（${diffToHourMin(v.reset)}）`
	       				} else {
	       					text += "（死亡）"
	       				}
	       			}
	       		}

       			text += `#r (消耗#t${warp}#)#b`;

       			text += "#l\r\n";
       		}
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
		}else if (selection === 99){
			cm.dispose();
			cm.openNpc(9010000 , "远征首领传送");
		}else if(selection > 900){
			if(selection == 901) openNpc("副本传送");
			if(selection == 903) openNpc("城镇传送");
			if(selection == 904) openNpc("练级传送");
			if(selection == 905) openNpc("首领传送");
			
		}else{
			
			var mapData = boss[selection];
			if (!cm.haveItem(warp)) {
				cm.sendOk(`#t${warp}#不足`);
			}else{
				if(cm.getPlayer().getMapId() !== 910000000){
					cm.getPlayer().saveLocationOnWarp();
				}
				cm.warp(mapData.map);
				cm.gainItem(warp,-1);
				cm.getPlayer().saveLog("首领传送",cm.getNpc(),warp,-1);
				
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


/**
 * 分钟转 小时/分钟 文字
 * @param {number} minutes - 总分钟数
 * @returns {string} 格式化文字
 */
function formatMinute(minutes) {
  // 容错：非数字、负数统一返回0分钟
  const num = Number(minutes) || 0;
  if (num <= 0) return '0分钟';
  
  const hour = Math.floor(num / 60);
  if (hour >= 1) {
    return `${hour}小时`;
  } else {
    return `${num}分钟`;
  }
}


/**
 * 传入时间，返回距离现在总时长：N小时 或 N分钟
 * @param {string|number|Date} targetTime
 * @returns {string}
 */
function diffToHourMin(targetTime) {
    const diffMs = Math.abs(new Date(targetTime).getTime() - Date.now());
    const totalMin = Math.floor(diffMs / (1000 * 60));
    const hour = Math.floor(totalMin / 60);

    if (hour >= 1) {
        return `${hour}小时`;
    } else {
        return `${totalMin}分钟`;
    }
}
