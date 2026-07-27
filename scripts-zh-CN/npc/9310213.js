//永恒装备升级
var status;
var item;
var money1 = 0;
var money = 0;
var level = [
	{ level: 2, money: 2000000, money1 : 400 , item : [{id : 4033000, count : 20}] , rate : 10},
	{ level: 3, money: 3000000, money1 : 600 , item : [{id : 4033000, count : 30}] , rate : 10},
	{ level: 4, money: 4000000, money1 : 800 , item : [{id : 4033000, count : 40}] , rate : 10},
	{ level: 5, money: 5000000, money1 : 1000 , item : [{id : 4033000, count : 50}] , rate : 10},
	{ level: 6, money: 6000000, money1 : 1500 , item : [{id : 4033000, count : 60}] , rate : 10},
	{ level: 7, money: 7000000, money1 : 2200 , item : [{id : 4033000, count : 70}] , rate : 10},
	{ level: 8, money: 8000000, money1 : 3200 , item : [{id : 4033000, count : 80}] , rate : 10},
	{ level: 9, money: 9000000, money1 : 4400 , item : [{id : 4033000, count : 90}] , rate : 10},
	{ level: 10, money: 10000000, money1 : 6000 , item : [{id : 4033000, count : 100}] , rate : 10},
	{ level: 11, money: 11000000, money1 : 8000 , item : [{id : 4033000, count : 120}] , rate : 10},
	{ level: 12, money: 12000000, money1 : 10500 , item : [{id : 4033000, count : 150}] , rate : 10},
	{ level: 13, money: 13000000, money1 : 12500 , item : [{id : 4033000, count : 170}] , rate : 10},
	{ level: 14, money: 14000000, money1 : 15500 , item : [{id : 4033000, count : 200}] , rate : 10},
	{ level: 15, money: 15000000, money1 : 19500 , item : [{id : 4033000, count : 220}] , rate : 10},
	{ level: 16, money: 16000000, money1 : 24000 , item : [{id : 4033000, count : 240}] , rate : 10},
	{ level: 17, money: 17000000, money1 : 29000 , item : [{id : 4033000, count : 260}] , rate : 10},
	{ level: 18, money: 18000000, money1 : 35000 , item : [{id : 4033000, count : 320}] , rate : 10},
	{ level: 19, money: 19000000, money1 : 40000 , item : [{id : 4033000, count : 400}] , rate : 10},
	{ level: 20, money: 20000000, money1 : 50000 , item : [{id : 4033000, count : 500}] , rate : 10},
];

var attr = [1, 1, 1, 1, 1, 1];
var data = level[0]
var rate = false;
var rateId = 4033008;
var rateNum = 12;
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');;
var ii = ItemInformationProvider.getInstance();

var item1; //旧装备
var item2; //新装备
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	
    if (mode <= 0 ) {
        cm.dispose();
    } else {

    	if (mode == 1) {
            status++;
        } else {
            status--;
        }

        const ch = cm.getPlayer();
					
        if (status == 0) {
			var text = "我是永恒装备提升大师，请问有什么可以帮你！\r\n";
			
			text += "\r\n#b";
			text += "#L1#我想升级装备#l\r\n";
			text += "#L2#我想了解永恒装备#l\r\n";
			// text += "#L3#我想把装备改造等级继承#l\r\n";
			
			
            cm.sendSimple(text)
		} else if (status == 1){
			
			if(selection === 1){
				var text = "请将永恒装备放在装备栏第1格\r\n\r\n";
				
				text += "#L1##b我已放好，下一步！#l\r\n";

				cm.sendSimple(text)
				
			} else if (selection === 2){
				cm.sendNext("永恒装备可使用#r#t4033000:##k和相关材料提高等级，升级后可提高装备的属性加成，6级时还有几率领悟到增加技能等级的属性！若未领悟后续升级也不会领悟，6级非常关键。\r\n技能按装备所属职业固定领悟！");
				status = -1;
			}
			
        } else if (status == 2){
			

				item = cm.getInventory(1).getItem(1);
				
				money1 = ch.getCash(1);
				money = ch.getMeso();

				
				
				if(item && equipData(item.getItemId())){
					
					const id = item.getItemId();
					var text = "\r\n\t请你确认升级属性和需求材料以及相关几率\r\n"
					
					text += "\r\n\t"
					for(let i=0; i < 43; i++){
						text +="#fMap/MapHelper/minimap/match#";
					}
					
					text += "\r\n";
					
					text += "\r\n\t选择装备：#r #i"+id+"# #t"+id+"# "
                    
                   
                    if(item.getItemLevel() > 0){
                        text +=`（${item.getItemLevel()}级）`;
                    }

                    text +="\r\n"

					
			
					data = level.find(v => v.level === item.getItemLevel() + 1);

					
					if(data && data.level){
						
						
						
						text += `\r\n\t#k增加属性：力量 #r${alignText(attr[0])}#k敏捷 #r${alignText(attr[1])}#k攻击力 #r${alignText(attr[4])}#k\r\n`;
						text += `\t\t\t\t\t\t智力 #r${alignText(attr[2])}#k运气 #r${alignText(attr[3])}#k魔法力 #r${alignText(attr[5])}#k\r\n\r\n`;
						
						text += "\t升级需求：\r\n\r\n";
						text += `\t\t金　币 ${alignText(formatUnit(data.money),5)}（已有 ${formatUnit(money)}）\r\n`;
						text += `\t\t点　券 ${alignText(formatUnit(data.money1),5)}（已有 ${formatUnit(money1)}）\r\n`;
						
						data.item.forEach((v,i) => {
							text += `\t\t#t${v.id}:# ${alignText(v.count,5)}（已有 ${formatUnit(cm.getItemQuantity(v.id))} 个）\r\n`;
						})
						
						if(data.level === 6 && !item.getSkill()){

						
							text += `\r\n\t领悟技能几率：${toFullNumber(data.rate)}%`;
							if(rate){
								text += `#r〔${toFullNumber(data.rate + rateNum)}%〕`;
							}

							text += `\r\n\t\t#L3##fUI/Basic.img/CheckBox/${isSelect(rate,true)}# #r使用#t${rateId}:#提高${toFullNumber(12)}％#l\r\n`;
						

						}
						
						text += `\r\n\r\n#L9##fUI/UIWindow.img/Quest/icon6/0# #b#e开始升级吧#n#l`
						
						text += "　"
						
						cm.sendSimple(text)
					}else{
						cm.sendOk("这件装备已经升级极限了，等后续版本再来吧！")
						cm.dispose();
					}
					
					
				}else{
					cm.sendOk("你的装备栏第1格不是永恒装备！")
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

				data.item.forEach(v => {
					if(v.count > cm.getItemQuantity(v.id)){
						lost = `需求#r#t${v.id}##k数量不足！`;
					}
				})

				if(data.money1 > money1)lost = "点券不足！";
				if(rate && !cm.getItemQuantity(rateId))lost=`#t${rateId}#不足！`
				if(!lost){
					var rateLast = data.rate;
					if(rate)rateLast += rateNum;
					
					var equip = item.copy();
					equip.setStr(item.getStr() + attr[0])
					equip.setDex(item.getDex() + attr[1])
					equip.setInt(item.getInt() + attr[2])
					equip.setLuk(item.getLuk() + attr[3])
					equip.setWatk(item.getWatk() + attr[4])
					equip.setMatk(item.getMatk() + attr[5])
					equip.setItemLevel(item.getItemLevel() + 1);

					if(data.level === 6 && !item.getSkill()){
						const result = getRate(rateLast)
						if(result){
							equip.setSkill(1);
							ch.serverMessage("升级" , equip, "意外领悟到技能增加！");
						}
						
					}

					cm.removeAllByInventorySlot(1,1);
					cm.gainEquip(equip);
					ch.serverMessage("升级",equip , "成功！");
					ch.sendPacket(PacketCreator.showSpecialEffect(15));
					
					cm.sendNext("升级成功！");

					if(rate){
						ch.gainItem(rateId,-1);
						ch.saveLog(cm.getNpc(),rateId,-1);
					}

					ch.gainMeso(-data.money);
					ch.saveLog(cm.getNpc(),0,-data.money);
					ch.gainCash(-data.money1);
					ch.saveLog(cm.getNpc(),1,-data.money1);

					ch.saveDayData("今日锻造装备" , 1, true);

					data.item.forEach(v => {
						ch.gainItem(v.id,-v.count);
						ch.saveLog(cm.getNpc(),v.id,-v.count);
					})

					
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



function equipData(id) {
	//允许养成升级的永恒装备  
	const equip = [
		//头
		1002776,
		1002777,
		1002778,
		1002779,
		1002780,

		//手套
		1082234,
		1082235,
		1082236,
		1082237,
		1082238,

		// 衣服
		1052155,
		1052156,
		1052157,
		1052158,
		1052159,

		// 靴子
		1072355,
		1072356,
		1072357,
		1072358,
		1072359,

		// 武器
		1302081,
		1312037,
		1322060,
		1332073,
		1332074,
		1372044,
		1382057,
		1402046,
		1412033,
		1422037,
		1432047,
		1442063,
		1452057,
		1462050,
		1472068,
		1482023,

		// 盾牌
		1092057,
		1092058,
		1092059,

		// 披风
		1102172,

		// 玉佩
		1122012,
	]; 

	if(id){
		return equip.includes(id * 1);
	}
	return false;
}