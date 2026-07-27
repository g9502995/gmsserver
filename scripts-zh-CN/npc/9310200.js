//装备改造

var status;
var item;
var money1 = 0;
var money = 0;
// var slot = [ "帽子", "脸饰", "眼饰", "披风", "手套", "耳环", "上衣", "套服",  "裤裙", "盾牌", "武器", "鞋子","腰带","坠子","戒指"]
var level = [
	{ level: 1, money: 1000000, money1 : 200 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 10}] , rate : 100},
	{ level: 2, money: 2000000, money1 : 400 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 20}] , rate : 90},
	{ level: 3, money: 3000000, money1 : 600 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 30}] , rate : 80},
	{ level: 4, money: 4000000, money1 : 800 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 40}] , rate : 70},
	{ level: 5, money: 5000000, money1 : 1000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 50}] , rate : 60},
	{ level: 6, money: 6000000, money1 : 2000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 60}] , rate : 50},
	{ level: 7, money: 7000000, money1 : 3000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 70}] , rate : 45},
	{ level: 8, money: 8000000, money1 : 4000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 80}] , rate : 40},
	{ level: 9, money: 9000000, money1 : 5000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 90}] , rate : 35},
	{ level: 10, money: 10000000, money1 : 6000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 100}] , rate : 30},
	{ level: 11, money: 11000000, money1 : 8000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 120}] , rate : 28},
	{ level: 12, money: 12000000, money1 : 10000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 140}] , rate : 26},
	{ level: 13, money: 13000000, money1 : 12000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 160}] , rate : 24},
	{ level: 14, money: 14000000, money1 : 15000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 180}] , rate : 22},
	{ level: 15, money: 15000000, money1 : 20000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 200}] , rate : 20},
	{ level: 16, money: 16000000, money1 : 25000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 220}] , rate : 18},
	{ level: 17, money: 17000000, money1 : 30000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 240}] , rate : 17},
	{ level: 18, money: 18000000, money1 : 35000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 260}] , rate : 16},
	{ level: 19, money: 19000000, money1 : 40000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 280}] , rate : 15},
	{ level: 20, money: 20000000, money1 : 50000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 300}] , rate : 14},
	{ level: 21, money: 22000000, money1 : 60000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 330}] , rate : 13},
	{ level: 22, money: 24000000, money1 : 80000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 360}] , rate : 12},
	{ level: 23, money: 26000000, money1 : 100000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 390}] , rate : 11},
	{ level: 24, money: 28000000, money1 : 150000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 420}] , rate : 10},
	{ level: 25, money: 30000000, money1 : 200000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 450}] , rate : 9},
	{ level: 26, money: 33000000, money1 : 250000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 480}] , rate : 8},
	{ level: 27, money: 36000000, money1 : 300000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 510}] , rate : 7},
	{ level: 28, money: 40000000, money1 : 350000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 550}] , rate : 6},
	{ level: 29, money: 50000000, money1 : 400000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 590}] , rate : 5},
	{ level: 30, money: 90000000, money1 : 500000 , item : [{id : 4033007,count : 1}, {id : 4033000, count : 650}] , rate : 1},
];

//不能改造的部位
var pass = ['勋章']; 

var attr = [1, 1, 1, 1, 1, 1, 1, 2];
var data = level[0]
var rate = false;
var rateId = 4033008;
var rateNum = 12;
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');;
var ii = ItemInformationProvider.getInstance();

var item1; //旧装备
var item2; //新装备
var needMoney = 500000;
var money = 0;
var needMoney1 = 5000;
var money1 = 0;
function start() {
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


        const ch = cm.getPlayer();
					
        if (status == 0) {
			var text = "我是装备改造大师，请问有什么可以帮你！\r\n";
			
			text += "\r\n#b";
			text += "#L1#我想改造装备#l\r\n";
			text += "#L3#我想把装备改造等级继承#l\r\n";
			
			
            cm.sendSimple(text)
		} else if (status == 1){
			
			
			
			if(selection === 1){
				//改造装备


				var text = "请将需改造的非现金和非限时装备放在装备栏第1格\r\n\r\n";
				
				text += "#L1##b我已放好，下一步！#l\r\n";

				cm.sendSimple(text)
				
				
				
			}
			
			
			
			if(selection === 3){
				
				money1 = cm.getPlayer().getCashShop().getCash(1) * 1;
				money = cm.getMeso();
				
				
				var text = "\r\n\t我可以将你的同类装备改造等级继承到新装备上！\r\n\r\n"
				
				text += "\t继承条件：\r\n"
				text += "\t\t1．把改造过的旧装备放到装备栏的第1格\r\n";
				text += "\t\t2．把未改造的新装备放到装备栏的第2格#k\r\n";
				text += `\t\t3．点券 ${alignText(formatUnit(needMoney1),5)}（已有 ${formatUnit(money1)}）\r\n`;
				text += `\t\t4．金币 ${alignText(formatUnit(needMoney),5)}（已有 ${formatUnit(money)}）\r\n`;
				
				text += "\r\n#b#L6#我已准备好，开始继承吧！#l\r\n"
				
				cm.sendSimple(text);	
			}
			
        } else if (status == 2){
			
			if (selection == 1 ){
				item = cm.getInventory(1).getItem(1);
				
				money1 = cm.getPlayer().getCashShop().getCash(1) * 1;
				money = cm.getMeso();
				
				
				if(item && item.getItemId()){
					
					var id = item.getItemId();
					var text = "\r\n\t请你确认改造后的属性和需求材料以及成功几率，\r\n\t若失败将失去材料，保留原有等级和属性！\r\n"
					
					text += "\r\n\t"
					for(let i=0; i < 43; i++){
						text +="#fMap/MapHelper/minimap/match#";
					}
					
					text += "\r\n";
					
					text += "\r\n\t选择装备：#r #i"+item.getItemId()+"# #t"+item.getItemId()+"# "
                    
                   
                    if(item.getCustomUpgradeCount() > 0){
                        text +=`（改 ${item.getCustomUpgradeCount()}）`;
                    }

                    text +="\r\n"

					
					if(!ii.isCash(id) && item.getExpiration() === -1 && !pass.includes(getEquipType( item.getItemId() ) ) ){
						
						data = level.find(v => v.level === item.getCustomUpgradeCount() + 1);


						
						if(data && data.level){
							
							
							
							text += `\r\n\t#k增加属性：力量 #r${alignText(attr[0])}#k敏捷 #r${alignText(attr[1])}#k攻击力 #r${alignText(attr[4])}#k回避率 #r${alignText(attr[6])}#k\r\n`;
							text += `\t\t\t\t\t\t智力 #r${alignText(attr[2])}#k运气 #r${alignText(attr[3])}#k魔法力 #r${alignText(attr[5])}#k命中率 #r${alignText(attr[7])}#k\r\n\r\n`;
							
							text += "\t改造需求：\r\n\r\n";
							text += `\t\t1．金　币 ${alignText(formatUnit(data.money),5)}（已有 ${formatUnit(money)}）\r\n`;
							text += `\t\t2．点　券 ${alignText(formatUnit(data.money1),5)}（已有 ${formatUnit(money1)}）\r\n`;
							
							for(let i=0; i < data.item.length; i++){
								text += `\t\t${i+3}．#t${data.item[i].id}:# ${alignText(data.item[i].count + "个",5)}（已有 ${formatUnit(cm.getItemQuantity(data.item[i].id))} 个）\r\n`;
							}
							
							
							
							text += `\r\n\t成功几率：${toFullNumber(data.rate)}%`;
							if(rate){
								text += `#r〔${toFullNumber(data.rate + rateNum)}%〕`;
							}
							text += `\r\n\t\t#L3##fUI/Basic.img/CheckBox/${isSelect(rate,true)}# #r使用#t${rateId}:#提高${toFullNumber(12)}％#l\r\n`;
							
							text += `\r\n\r\n#L9##fUI/UIWindow.img/Quest/icon6/0# #b#e开始改造吧#n#l`
							
							text += "　"
							
							cm.sendSimple(text)
						}else{
							cm.sendOk("这件装备已经改造极限了，等后续版本再来吧！")
							cm.dispose();
						}
					
						
					}else{
						text += "\r\n\t#k不能被改造装备，可能是\r\n"
						text += "\t★ 限时的\r\n"
						text += "\t★ 现金装或时装\r\n"
						if(pass){
							text += "\t★ " + pass.toString() + " 部位！"
						}
						cm.sendOk(text)
						cm.dispose();
					}
				}else{
					cm.sendOk("请将需改造的装备放到装备栏第1格！然后找我！")
					cm.dispose();
				}
			}else if (selection == 6){
				
				item1 = cm.getInventory(1).getItem(1);
				item2 = cm.getInventory(1).getItem(2);
				
				
				
				var text = "";
				
				if(!item1){
					text += "请将改造过需转移的旧装备放到装备栏第1格\r\n";
				}else if(!item2){
					text += "请将未改造需继承的新装备放到装备栏第2格\r\n";
				}else if( getEquipType(item1.getItemId()) !== getEquipType(item2.getItemId()) ){
					text += "两件装备必须位置相同！\r\n";
				}else if(ii.isCash(item1.getItemId()) || item1.getExpiration() !== -1){
					text += "不支持现金装备继承！\r\n";
				}else if(ii.isCash(item2.getItemId()) || item2.getExpiration() !== -1){
					text += "不支持现金装备继承！\r\n";

				}else if (pass.includes(getEquipType(item2.getItemId()) ) ){
					text += "不支持的部位！\r\n";

				}else if(item1.getCustomUpgradeCount() === 0){
					text += "第1格装备必须是改造过的！\r\n";
				}else if(item2.getCustomUpgradeCount() > 0){
					text += "第2格装备必须是未改造过的！\r\n";
				}else if (needMoney > money){
					text += "金币不足！";
				}else if (needMoney1 > money1){
					text += "点券不足！";
				}
				
				if(text){
					cm.sendOk(text);
					
				}else{
					
					let itemLv = item1.getCustomUpgradeCount() ;
					
					if(itemLv){
						var equip = item1.copy();
							equip.setStr(item1.getStr() - (itemLv * attr[0]))
							equip.setDex(item1.getDex() - (itemLv * attr[1]))
							equip.setInt(item1.getInt() - (itemLv * attr[2]))
							equip.setLuk(item1.getLuk() - (itemLv * attr[3]))
							equip.setWatk(item1.getWatk() - (itemLv * attr[4]))
							equip.setMatk(item1.getMatk() - (itemLv * attr[5]))
							equip.setAcc(item1.getAcc() - (itemLv * attr[6]))
							equip.setAvoid(item1.getAvoid() - (itemLv * attr[7]))
							equip.setCustomUpgradeCount(0)
							cm.removeAllByInventorySlot(1,1);
							cm.gainEquip(equip);
					
					
						var equip = item2.copy()
							equip.setStr(item2.getStr() + (itemLv * attr[0]))
							equip.setDex(item2.getDex() + (itemLv * attr[1]))
							equip.setInt(item2.getInt() + (itemLv * attr[2]))
							equip.setLuk(item2.getLuk() + (itemLv * attr[3]))
							equip.setWatk(item2.getWatk() + (itemLv * attr[4]))
							equip.setMatk(item2.getMatk() + (itemLv * attr[5]))
							equip.setAcc(item2.getAcc() + (itemLv * attr[6]))
							equip.setAvoid(item2.getAvoid() + (itemLv * attr[7]))
							equip.setCustomUpgradeCount(item1.getCustomUpgradeCount())
							cm.removeAllByInventorySlot(1,2);
							cm.gainEquip(equip);
						
							cm.gainMeso(-needMoney);
							ch.saveLog(cm.getNpc(),0,-needMoney);
							ch.gainCash(-needMoney1);
							ch.saveLog(cm.getNpc(),1,-needMoney1);
							ch.serverMessage(equip , "继承成功！");
							

						cm.sendOk("继承成功");
					
					}else{
						cm.sendOk("未配置，请联系管理员！");
					}

				}
				
				cm.dispose();
				
				
			}
		} else if (status == 3){
			if(selection == 3){
				
				//是否使用幸运道具的处理
				rate = !rate;
				
				status = 1;
				action(1, 0, 1);
			}

			if (selection == 9){
				//执行改造
				
				
				let lost = 0;
				if(data.money > money)lost = "金币不足！";
				for(let i=0; i < data.item.length; i++){
					if(data.item[i].count > cm.getItemQuantity(data.item[i].id)){
						lost = `需求#r#t${data.item[i].id}##k数量不足！`;
						break;
					}
				}
				if(data.money1 > money1)lost = "点券不足！";
				if(rate && !cm.getItemQuantity(rateId))lost=`#t${rateId}#不足！`
				if (
					[pass].includes(
						getEquipType( item.getItemId() ) 
					) 
				){
					lost = "不支持的部位！";
				}
				if(!lost){
					var rateLast = data.rate;
					if(rate)rateLast += rateNum;
					if(getRate(rateLast)){
						
						var equip = item.copy();
						equip.setStr(item.getStr() + attr[0])
						equip.setDex(item.getDex() + attr[1])
						equip.setInt(item.getInt() + attr[2])
						equip.setLuk(item.getLuk() + attr[3])
						equip.setWatk(item.getWatk() + attr[4])
						equip.setMatk(item.getMatk() + attr[5])
						equip.setAcc(item.getAcc() + attr[6])
						equip.setAvoid(item.getAvoid() + attr[7])
						equip.setCustomUpgradeCount(item.getCustomUpgradeCount() + 1);
						cm.removeAllByInventorySlot(1,1);
						cm.gainEquip(equip);
						
						ch.serverMessage(equip , "改造成功！");
						ch.sendPacket(PacketCreator.showSpecialEffect(15));
				
						cm.sendNext("改造成功！");
						
					}else{
						ch.sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/ItemMake/Failure"));
						cm.sendNext("改造失败！");
					}

					cm.gainMeso(-data.money);
					ch.saveLog(cm.getNpc(),0,-data.money);
					ch.gainCash(-data.money1);
					ch.saveLog(cm.getNpc(),1,-data.money1);

					for (var i = 0; i < data.item.length; i++) {
						let v = data.item[i];
						cm.gainItem(v.id,-v.count);
						ch.saveLog(cm.getNpc(),v.id,-v.count);
					}
					
					if(rate){
						cm.gainItem(rateId,-1);
						ch.saveLog(cm.getNpc(),rateId,-1);
					}

					ch.saveDayData("今日锻造装备" , 1, true);
					
				}else{
					cm.sendOk(lost);
					cm.dispose();
				}
				
				
				
			}

		} else if (status == 4){

			status = 1;
			action(1, 0, 1);
			return;
				
			
        } else {
            cm.dispose();
        }
    }
} 

function getEquipType(id){
	if(id >= 1942000)return '龙神吊坠';
	if(id >= 1902000)return '坐骑';
	if(id >= 1832000)return '宠物右戒指';
	if(id >= 1822000)return '宠物左戒指';
	if(id >= 1802000)return '宠物的装备';
	if(id >= 1302000)return '武器';
	if(id >= 1140000)return '勋章';
	if(id >= 1132000)return '腰带';
	if(id >= 1122000)return '坠子';
	if(id >= 1112000)return '戒指';
	if(id >= 1102000)return '披风';
	if(id >= 1092000)return '盾牌';
	if(id >= 1080000)return '手套';
	if(id >= 1070000)return '鞋子';
	if(id >= 1060000)return '裤裙';
	if(id >= 1050000)return '套服';
	if(id >= 1040000)return '上衣'
	if(id >= 1032000)return '耳环';
	if(id >= 1020000)return '眼饰';
	if(id >= 1010000)return '脸饰';
	if(id >= 1000000)return '帽子';
}




/**
 * 根据传入的成功率（百分比）返回成功/失败
 * @param {number} rate - 成功率（0~100，如 60 表示 60%）
 * @returns {string} 成功 / 失败
 */
function getRate(rate) {
  // 校验并修正成功率范围（确保在 0~100 之间）
  const validPercent = Math.max(0, Math.min(100, rate));
  // 转换为 0~1 的概率系数，与随机数对比
  return Math.random() <= validPercent / 100 ? true : false;
}


/**
 * 文本对齐格式化方法
 * @param {string} text - 要格式化的文本
 * @param {number} targetLength - 目标长度（以英文字符为单位，默认15）
 * @param {string} position - 对齐方式：'left'左对齐，'right'右对齐，'center'居中（默认'left'）
 * @returns {string} 格式化后的文本
 */
function alignText(text, targetLength = 2, position = 'left') {

    text = toFullNumber(text);
    // 计算文本的显示长度（中文算2个字符，英文/数字算1个）
    let displayLength = 0;
    for (let i = 0; i < text.length; i++) {
        // 判断是否为双字节字符（中文、全角字符等）
        displayLength += /[^\x00-\xff]/.test(text[i]) ? 1 : 1;
    }
    
    // 无论文本多长，都进行格式化处理
    // 如果文本超长，spacesToAdd会是负数，但Math.max会处理为0
    const spacesToAdd = Math.max(0, targetLength - displayLength);
    
    // 根据对齐方式添加空格
    if (position === 'left') {
        // 左对齐：在文本右侧添加空格
        return text + '　'.repeat(spacesToAdd);
    } else if (position === 'right') {
        // 右对齐：在文本左侧添加空格
        return '　'.repeat(spacesToAdd) + text;
    } else if (position === 'center') {
        // 居中：左右平均分配空格
        const leftSpaces = Math.floor(spacesToAdd / 2);
        const rightSpaces = spacesToAdd - leftSpaces;
        return '　'.repeat(leftSpaces) + text + '　'.repeat(rightSpaces);
    }
    
    return text; // 如果position参数错误，返回原文本
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
            return toFullNumber(formatted) + item.unit;
        }
    }

    // 3. 小于万的数字，直接返回（也可根据需求保留小数位）
    return toFullNumber(number).toString();
}

/**
 * 将半角数字转换为全角数字
 * @param {number|string} num - 输入的半角数字（或数字字符串）
 * @returns {string} 转换后的全角数字字符串
 */
function toFullNumber(num) {
    
    if (num === null || num === undefined) {
        return '';
    }
    const str = String(num);
    let result = '';
    for (let char of str) {
        if (char >= '0' && char <= '9') {
            // 数字转全角
            result += String.fromCharCode(char.charCodeAt(0) + 65248);
        } else if (char === '.') {
            // 半角小数点转全角小数点（Unicode：65294）
            result += '．';
        } else {
            result += char;
        }
    }
    return result;

}


function isSelect(v,t){
	if(v === t)return 1;
	return 0;
}