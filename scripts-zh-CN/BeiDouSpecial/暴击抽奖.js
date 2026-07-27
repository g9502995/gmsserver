
var status;
const r = {
    "weight": [
        [100, 100, 100, 100, 50, 50, 50, 50],
        [50, 50, 50, 50, 100, 100, 100, 80],
        [50, 50, 50, 50, 100, 100, 100, 80],
        [50, 50, 50, 50, 100, 100, 100, 80],
        [50, 50, 50, 50, 100, 100, 100, 80],
        [50, 50, 50, 50, 100, 100, 100, 80]
    ],
    "reward": [
        [
            ["金\t币", 0, 10000],
            ["金\t币", 0, 20000],
            ["金\t币", 0, 30000],
            ["金\t币", 0, 40000],
            ["金\t币", 0, 50000],
            ["金\t币", 0, 60000],
            ["金\t币", 0, 70000],
            ["金\t币", 0, 80000]
        ],
        [
            ["抵用券", 2, 15],
            ["点\t券", 1, 15],
            ["抵用券", 2, 20],
            ["点\t券", 1, 20],
            ["抵用券", 2, 25],
            ["点\t券", 1, 25],
            ["抵用券", 2, 30],
            ["点\t券", 1, 30]
        ],
        [
            ["抵用券", 2, 75],
            ["点\t券", 1, 75],
            ["抵用券", 2, 100],
            ["点\t券", 1, 100],
            ["抵用券", 2, 125],
            ["点\t券", 1, 125],
            ["抵用券", 2, 150],
            ["点\t券", 1, 150]
        ],
        [
            ["抵用券", 2, 375],
            ["点\t券", 1, 375],
            ["抵用券", 2, 500],
            ["点\t券", 1, 500],
            ["抵用券", 2, 625],
            ["点\t券", 1, 625],
            ["抵用券", 2, 750],
            ["点\t券", 1, 750]
        ],
        [
            ["抵用券", 2, 1875],
            ["点\t券", 1, 1875],
            ["抵用券", 2, 2500],
            ["点\t券", 1, 2500],
            ["抵用券", 2, 3125],
            ["点\t券", 1, 3125],
            ["抵用券", 2, 3750],
            ["点\t券", 1, 3750]
        ],
        [
            ["抵用券", 2, 9375],
            ["点\t券", 1, 9375],
            ["抵用券", 2, 12500],
            ["点\t券", 1, 12500],
            ["抵用券", 2, 15625],
            ["点\t券", 1, 15625],
            ["抵用券", 2, 18750],
            ["点\t券", 1, 18750]
        ]
    ],
    multi: [[1,60],[1.5,30],[2,10]], // 倍率配置
    canDraw: [0,10,50,250,1250,6250],
    maxDraw: 6
}

var data = [];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode <= 0) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}

    const ch = cm.getPlayer();

    // 获得用户今日抽奖次数
	const numDraw = ch.getUserDayData("今日点券抽奖次数") * 1;

    // 计算用户今日还可以抽奖剩余次数
    const countDraw = r.maxDraw - numDraw;

    const lastCount = countDraw < 0 ? 0 : countDraw;
	
	if(status == 0){

		var text = "";
		text += "#L991##fUI/Basic.img/CheckBox/0# #k在线奖励#l\t\t\t";
		text += "#L992##fUI/Basic.img/CheckBox/0# #k等级奖励#l\t\t\t";
		text += "#L993##fUI/Basic.img/CheckBox/0# #k在线活动#l\r\n";
		text += "#L994##fUI/Basic.img/CheckBox/0# #k活跃奖励#l\t\t\t";
		text += "#L995##fUI/Basic.img/CheckBox/1# #b暴击抽奖#l\t\t\t";
        text += "#L996##fUI/Basic.img/CheckBox/0# #k福利礼包#l";
		text += "\r\n\r\n"
		
		text += "\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		
		text += "\r\n\r\n";

        // ch.saveUserDayData("今日点券抽奖次数", 0);


		text += `\t #k你今天可抽奖次数：#r ${lastCount} \r\n\r\n`;

        if(lastCount > 0){
			
    		text += "\t #k本次抽奖随机抽取下面任意一项奖励：\r\n\r\n";

            data = r.reward[numDraw];

            text += "#r"

            data.forEach((v,i)=>{

                const [name,id,count] = v;
                text +="\t\t\t";
               
                text += name;
                text += `  ${alignText(count,6)}`;

                if(i % 2 === 0){
                    text +="\t"
                }else {
                    text += "\r\n"
                }
                
            })

    		text += "\r\n#b#e";

            text += `#L888#花费 ${r.canDraw[numDraw]}点券 抽取一次#l\r\n`
        }

		

		cm.sendSimple(text);

	}else if (status == 1) {

		if(selection > 900){
			
			//进入菜单
			cm.dispose();
			
			if(selection === 991)cm.openNpc(9010000, "在线奖励");
			if(selection === 992)cm.openNpc(9010000, "等级奖励");
			if(selection === 993)cm.openNpc(9010000, "在线活动");
			if(selection === 994)cm.openNpc(9010000, "活跃奖励");
			if(selection === 995)cm.openNpc(9010000, "暴击抽奖");
            if(selection === 996)cm.openNpc(9010000, "福利礼包");

		} else {
            if (lastCount <= 0) {
                cm.sendNext("抽奖次数不足！");
            } else if(r.canDraw[numDraw] > cm.getPlayer().getCash(1)){
                cm.sendNext("点券不足！");
            } else if (!cm.getItemQuantity(2430161) && lastCount === 1){
                cm.sendNext("本次月卡特权可抽！");
            } else {
                
                // 随机抽取奖励格子下标 1~8
                const weightArr = r.weight[numDraw];
                const hitIndex = randomByWeight(convertWeightArr(weightArr));
                
                // 随机倍率
                const multiple = randomByWeight(r.multi);

                const [itemName, itemId, itemCount] = r.reward[numDraw][hitIndex - 1];

                
                ch.saveUserDayData("今日点券抽奖次数", 1, true);

                cm.sendNext(`恭喜抽中：\r\n\r\n#r${itemName} x ${itemCount}`);

                ch.serverMessage(`在【暴击抽奖】抽中【${itemName.replace("\t", "")}${itemCount}】`);

                if(itemId == 0){
                    ch.gainMeso(itemCount);
                    ch.saveLog("暴击抽奖",0,itemCount);
                } else {
                    ch.gainCash(itemId,itemCount);
                    ch.saveLog("暴击抽奖",itemId,itemCount);
                }

                if(r.canDraw[numDraw] > 0){
                    ch.gainCash(-r.canDraw[numDraw]);
                    ch.saveLog("暴击抽奖",1,-r.canDraw[numDraw]);
                }
                

                
            } 

            status =-1;
			
		}
	}

}


/**
 * 权重随机工具
 * @param weightList [[值,权重],...]
 * @returns 命中的值
 */
function randomByWeight(weightList) {
    let totalWeight = 0;
    for (let item of weightList) {
        totalWeight += item[1];
    }
    let rand = Math.floor(Math.random() * totalWeight) + 1;
    let cur = 0;
    for (let item of weightList) {
        cur += item[1];
        if (rand <= cur) {
            return item[0];
        }
    }
    return weightList[0][0];
}

/**
 * 转换档位权重数组为随机结构
 * @param weightArr [100,50...]
 * @returns [[index+1, weight],...]
 */
function convertWeightArr(weightArr) {
    let list = [];
    for (let i = 0; i < weightArr.length; i++) {
        list.push([i + 1, weightArr[i]]);
    }
    return list;
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