
var status = 0;
var give = [
	{ money : 5000000, item : [{id : 4000602, count : 1888}], id : 2430162 , count : 1},
	{ money : 300000, item : [{id : 4033004, count : 150}], id : 2430158 , count : 1},
	// { money : 100000, item : [{id : 4033004, count : 35}], id : 2430159 , count : 1},
	
	// { money : 1000000, item : [{id : 4033004, count : 100},{id : 4000602, count : 20}] , id : 2430113, count : 1},
	{ money : 10000000, item : [{id : 4000602, count : 300}] , id : 2430165, count : 1},
	{ money : 10000000, item : [{id : 4000602, count : 999}] , id : 2430166, count : 1},
	{ money : 1000000, item : [{id : 4033004, count : 10}], id : 2430171, count : 1},
	{ money : 2000000, item : [{id : 4033004, count : 20}], id : 2430172, count : 1},
	{ money : 3000000, item : [{id : 4033004, count : 50}], id : 2430173, count : 1},
	{ money : 5000000, item : [{id : 4033004, count : 100}], id : 2430174, count : 1},


];
var data = null;
var money = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode < 0) {
        cm.dispose();
    } else {
		if (mode == 1) {
            status++;
        } else {
            status--;
        }
	
	
		
	    if (status == 0) {
			
			var text = ""
			
			text += "#L992##fUI/Basic.img/CheckBox/0# #k副本奖励#l \t\t";
			text += "#L995##fUI/Basic.img/CheckBox/1# #b副本兑换#l \t\t";
			
			text += "\r\n\r\n\r\n"
			
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n#b";
			
			for(let i=0 ; i < give.length; i++){
				text += `#L${i}# 兑换 #t${give[i].id}:# × ${give[i].count}#l\r\n`
			}
			
			text += "\r\n"
			
			text += "　\r\n"
			
			cm.sendSimple(text);
				
			
	    } else if (status == 1 ) {
			
			if(selection > 900){
				//进入菜单
				cm.dispose();
				
				if(selection === 990)cm.openNpc(9010000, "每日任务");
				if(selection === 991)cm.openNpc(9010000, "在线奖励");
				if(selection === 992)cm.openNpc(9010000, "副本奖励");
				if(selection === 993)cm.openNpc(9010000, "周历任务");
				if(selection === 994)cm.openNpc(9010000, "任务兑换");
				if(selection === 995)cm.openNpc(9010000, "副本兑换");
				
			}else if(selection >= 0){
				
				data = give[selection];
				
				var text = `要兑换 #r#i${data.id}:# #t${data.id}:# #k 需要你提供以下物资：\r\n\r\n\r\n`;
				
				if(data.money){
					text += `\t\t#i4031138# 金币 × ${formatUnit(data.money)} \t（已有 ${formatUnit(cm.getMeso())}）\r\n`
				}
				for(let i = 0; i < data.item.length; i++){
					text += `\t\t #i${data.item[i].id}:# #t${data.item[i].id}:# × ${formatUnit(data.item[i].count)}  \t（已有 ${cm.getItemQuantity(data.item[i].id)}）\r\n`;
				}
				
				text += "　\r\n";
				text += "#b"
				text += "#L1#我已满足条件，给我吧！#l\r\n"
				text += "#L2#我再看看#l\r\n"
				cm.sendSimple(text);
			}
			
		} else if (status == 2){

			if(selection === 1){

				const ch = cm.getPlayer();
				
				if(data.money && data.money > cm.getMeso()){
					cm.sendOk("金币不足！")
					cm.dispose();
				}else{
					var itemText;
					for(let i=0;i < data.item.length; i++){
						var v = data.item[i];
						if(v.count > cm.getItemQuantity(v.id)){
							itemText = `所需#t${v.id}#不足！`;
							break;
						}
					}
					if(itemText){
						cm.sendOk(itemText);
						cm.dispose();
					}else{
						if(cm.canHold(data.id,data.count)){
							if(data.money){
								cm.gainMeso(-data.money);
								ch.saveLog("副本兑换",0,-data.money);
							}
							var dataName = [];
							for(let i=0;i < data.item.length; i++){
								var v = data.item[i];
								cm.gainItem(v.id,-v.count);
								ch.saveLog("副本兑换",v.id,-v.count);
								dataName.push(cm.getItem().getName(v.id));
							}
							cm.gainItem(data.id,data.count || 1);
							ch.saveLog("副本兑换",data.id,data.count || 1);
							ch.serverMessage(`使用${dataName.join("")}兑换了`,data.id);
							cm.sendNext("兑换成功！");
							status = -1;
						}else{
							cm.sendNext("背包空间不足！");
							cm.dispose();
						}
						
					}
				}
			} else if (selection === 2){
				status = -1;
				action(1,0,0)
			} else {
				cm.dispose();
			}
			
			
		
		} else {
			cm.dispose();
		}
	}
		
}

/**
 * 格式化数字，超过万/亿时显示对应单位
 * @param {number|string} num - 要格式化的数字（支持数字或数字字符串）
 * @param {number} decimalDigits - 保留的小数位数，默认2位
 * @returns {string} 格式化后的字符串
 */
function formatUnit(num, decimalDigits = 2) {
    // 1. 转换为数字并校验合法性
    const number = Number(num);
    if (isNaN(number)) {
        return '0'; // 非数字返回0
    }

    // 定义单位对应的阈值和除数
    const units = [
        { threshold: 1e8, divisor: 1e8, unit: '亿' }, // 1亿 = 100000000
        { threshold: 1e4, divisor: 1e4, unit: '万' }, // 1万 = 10000
    ];

    // 2. 遍历单位，判断数字所属区间
    for (const item of units) {
        if (Math.abs(number) >= item.threshold) {
            // 计算转换后的值并保留指定小数位
            const converted = (number / item.divisor).toFixed(decimalDigits);
            // 去除末尾的0和多余的小数点（例如1.00万 → 1万，1.20亿 → 1.2亿）
            const formatted = parseFloat(converted).toString();
            return formatted + item.unit;
        }
    }

    // 3. 小于万的数字，直接返回（也可根据需求保留小数位）
    return number.toString();
}


