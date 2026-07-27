// 兑换商城
var status = 0;
var give = [
	{ i : 2, money1 : 500, item : [], id : 2023010, count : 1000},

	{ i : 6, money1 : 2000, item : [], id : 2430157, count : 10},
	{ i : 7, money1 : 3000 , item : [], id : 5040000, count : 30},
	{ i : 8, money1 : 7000 , item : [], id : 5041000, count : 30},
	{ i : 9, money1 : 4500, item :[], id : 2022345, count : 10},
	{ i : 10, money1 : 100000 , item: [], id : 5520000, count :1},
	{ i : 11, money1 : 10000, item : [], id : 2430101, count : 100},
	{ i : 12, money1 : 1500, item : [], id : 3010018, count : 1, num : [1]},
	{ i : 3, money1 : 5000, item : [], id : 2430113, count : 1, num : [1]},
	{ i : 13, money1 : 3000, item :[], id : 5510000, count : 1},
	{ i : 4, money1 : 50000, item :[], id : 2430165, count : 1},
	{ i : 1, money1 : 3000, item :[], id : 4033009, count : 1},
	{ i : 5, money1 : 200, item : [], id : 2430190, count : 1,num : [1,10,100,1000]},
	
];
var data = null;
var money = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
        cm.dispose();
    } else {
		if (mode == 1) {
            status++;
        } else {
            status--;
        }
	
	
		const ch = cm.getPlayer();

	    if (status == 0) {

	    	var text = ""
			text += "#L990##fUI/Basic.img/CheckBox/1# #b兑换商城#l\t\t\t" 
			text += "#L991##fUI/Basic.img/CheckBox/0# #k杂货商店#l\t\t\t" 
			text += "#L992##fUI/Basic.img/CheckBox/0# #k快速出售#l\r\n"
			text += "#L993##fUI/Basic.img/CheckBox/0# #k双倍购买#l\t\t\t" 
			text += "\r\n\r\n"
			
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
				
				if(selection === 990)cm.openNpc(9010000, "兑换商城");
				if(selection === 991)cm.openShopNPC(1011100);
				if(selection === 992)cm.openNpc(9010000, "快速出售");
				if(selection === 993)cm.openNpc(9010000, "双倍购买");
				
			}else{
				
				data = give[selection];
				data.buy = cm.getPlayer().getUserWeekData(`每周限购项目${data.i}已购次数`) * 1;
				
				var text = `#r#i${data.id}:# #t${data.id}:# `;

				if(data.count > 1){
					text += "×" + data.count + " "
				}

				text += " #k";
				
				if(data.week){
					text += `每周限购${data.week}个，你已购${data.buy}个\r\n\r\n`;
				}

				text += `需`
				var items = [];
				
				if(data.money){
					items.push(`${formatUnit(data.money)}金币 （已有 ${formatUnit(cm.getMeso())}）`)
				}
				for(let i = 0; i < data.item.length; i++){
					items.push(`${formatUnit(data.item[i].count)} #t${data.item[i].id}:# （已有 ${cm.getItemQuantity(data.item[i].id)}）`);
				}
				
				if(data.money1){
					items.push(`${formatUnit(data.money1)}点券 （已有 ${formatUnit(ch.getCash(1))}）`)
				}
				
				if(data.money2){
					items.push(`${formatUnit(data.money2)}抵用券 （已有 ${formatUnit(ch.getCash(2))}）`)
				}

				
				if(items.length > 1){
					for(let i=0;i < items.length; i++){
						text += `\t\t${i+1}．${items}\r\n`;
					}
				}else{
					text += `${items}\r\n`;
				}

				text += "\r\n\t请问你打算购买几份呢？\r\n";
					
				text += "\r\n#b";

				if(data.num){
					data.num.forEach(v => {
						text += `#L${v}#我要${v}份（${v * data.count}个）#l\r\n`;
					})
				} else {
					text += `#L1#购买1份（${data.count}个）#l\r\n`;
					text += `#L5#购买5份（${data.count * 5}个）#l\r\n`;
					text += `#L10#购买10份（${data.count * 10}个）#l\r\n`;
				}

				text += "#L999#返回#l\r\n"
				
				text += "　\r\n";
				cm.sendSimple(text);
				
				
				
			}
			
		} else if (status == 2){

			if(selection === 999){
				status = -1;
				action(1,0,0);
			} else {

				const count = selection > 0 ? selection : 1;
				
				if(data.week && (data.buy * count) > data.week){
					cm.sendOk("购买次数不足！");
				}else if(data.money && (data.money * count) > cm.getMeso()){
					cm.sendOk("金币不足！")
				}else if(data.money1 && (data.money1 * count) > ch.getCash(1)){
					cm.sendOk("点券不足！")
				}else if(data.money2 && (data.money2 * count) > ch.getCash(2)){
					cm.sendOk("抵用券不足！")
				}else if(data.only && cm.getItemQuantity(data.id)){
					cm.sendOk("已有物品，不推荐重复购买！");
				}else{
					var itemText;
					for(let i=0;i < data.item.length; i++){
						var v = data.item[i];
						if(v.count * count  > cm.getItemQuantity(v.id)){
							itemText = `所需#t${v.id}#不足，至少需要${v.count * count}个！`;
							break;
						}
					}
					if(itemText){
						cm.sendOk(itemText)
						cm.dispose();
					}else{
						if(cm.canHold(data.id,data.count * count)){
							if(data.money)cm.gainMeso(-(count * data.money));
							if(data.money1){
								ch.gainCash(1,-(data.money1 * count))
							}
							if(data.money2){
								ch.gainCash(2,-(data.money2 * count))
							}
							for(let i=0;i < data.item.length; i++){
								var v = data.item[i];
								var n = v.count * count;
								cm.gainItem(v.id,-n);
								ch.saveLog("兑换商城",v.id,-n);
							}

							cm.gainItem(data.id,data.count * count,false,true,data.expire || -1);
							ch.saveLog("兑换商城",data.id,data.count * count);
							if(data.week){
								ch.saveUserWeekData(`每周限购项目${data.i}已购次数`,1, true);
							}

							ch.serverMessage("购买了", data.id);
							cm.sendOk("购买成功");
							status = -1;
						}else{
							cm.sendOk("背包空间不足！");
							cm.dispose();
						}
						
					}
				}
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


