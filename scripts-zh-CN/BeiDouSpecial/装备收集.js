
var status = 0;
var storage = null;
var data = [
	
	{	//海盗头巾
		max : 3, reward : [2430130,3],
		items : [
			[1002391,3],
			[1002392,3], 
			[1002393,3], 
			[1002394,3], 
			[1002395,3] 
		],
	},
	{ //马绍尔手套
		max : 3, reward : [2430130,3],
		items : [
			[1082175,3],
			[1082176,3],
			[1082177,3],
			[1082178,3],
			[1082179,3],
		]
	},
	{ //破旧的披风
		max : 3, reward : [2430130,3],
		items : [
			[1102079,3],
			[1102080,3],
			[1102081,3],
			[1102082,3],
			[1102083,3],
		],
	},


	{ //滑雪板
		max : 3, reward : [2430130,3],
		items : [
			[1432015,3],
			[1432016,3],
			[1432017,3],
			[1432018,3],
			[1442046,3],
		],
	},
	{ //工地手套
		max : 3, reward : [2430130,3],
		items : [
			[1082145,3],
			[1082146,3],
			[1082147,3],
			[1082148,3],
			[1082149,3],
			[1082150,3],
		],
	},
	{	//绿色蝶形领结
		max : 3, reward : [2430130,3],
		items : [
			[1122001,3],
			[1122002,3], 
			[1122003,3], 
			[1122004,3], 
			[1122005,3],
			[1122006,3] 
		],
	},
	{ //冲浪板
		max : 3, reward : [2430130,3],
		items : [
			[1442026,3],
			[1442027,3],
			[1442028,3],
			[1442029,3],
			[1442065,3],
			[1442066,3],
		],
	},

	{
		// 盾牌
		max : 3, reward : [2430130,4],
		items : [
			[1092008,3],
			[1092022,3],
			[1092021,3],
			[1092029,3],
			[1092049,3],
			[1092050,3],
		],
	},

	{ //盖亚披风
		max : 3, reward : [2430130,4],
		items : [
			[1102084,3],
			[1102085,3],
			[1102086,3],
			[1102087,3],
			[1102021,3],
			[1102022,3],
			[1102023,3],
			[1102024,3],
		]
	},
	{ //绿色冒险+浪人披风
		max : 3, reward : [2430130,3],
		items : [
			[1102000,3],
			[1102001,3],
			[1102002,3],
			[1102003,3],
			[1102004,3],
			[1102041,3],
			[1102042,3],
		]
	},

	{ // 伞
		max : 3, reward : [2430130,4],
		items : [
			[1302016,3],
			[1302017,3],
			[1302025,3],
			[1302026,3],
			[1302027,3],
			[1302028,3],
			[1302029,3],
		]
	},

	{ //圣诞鹿的鼻子
		max : 3, reward : [2430130,5],
		items : [
			[1012011,3],
			[1012012,3],
			[1012013,3],
			[1012014,3],
			[1012015,3],
			[1012016,3],
			[1012017,3],
			[1012018,3],
			[1012019,3],
			[1012020,3],
		],
	},

	{ // 枫叶
		max : 3, reward : [2430130,8],
		items : [
			[1442024,3],
			[1302030,3],
			[1332025,3],
			[1382012,3],
			[1412011,3],
			[1422014,3],
			[1432012,3],
			[1452022,3],
			[1462019,3],
			[1082252,3],
			[1472032,3],
			[1492020,3],
			[1482020,3],
			[1092030,3],
			[1302067,3],
		],
	}
];

var selectItem = null;
var cache = [];
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (CheckStatus(mode)) {
		
		cache = getItem();
			
		if(status == 0){

			var text = "\r\n\t我正在收集这些宝物，看看你有哪些呢？\r\n\r\n";

			for (var i = 0; i < data.length; i++) {
				text += `#L${i}#`;
				for(var n=0; n < data[i].items.length; n++){
					text += `#i${data[i].items[n]}:#`;
				}
				text += "#l\r\n";
			}

			text += "　\r\n";
			cm.sendSimple(text);
			
	    } else if (status == 1 ) {

			selectItem = data[selection];
			selectItem.index = selection;
			selectItem.give = cm.getPlayer().getData('收集装备次数' + selection) * 1;
			
			if(selectItem.give >= selectItem.max ){
				cm.sendNext("收集次数已达到上限！")
				status = -1;
			}else{

				var text = "\r\n"
				
				text += `\t需集齐以下${selectItem.items.length}种物品，集齐一次奖励·`
				text += `#r #i${selectItem.reward[0]}:# #t${selectItem.reward[0]}:# ${selectItem.reward[1]}个`
				text += ` #k\r\n\t最多集 ${selectItem.max} 次，你已集 ${selectItem.give} 次！\r\n`;

				text += "\r\n\r\n";

				selectItem.success = 1;  //是否收集完成
				selectItem.boxCount = 0; //背包内是否存在物品
				for(let i=0; i < selectItem.items.length; i++){

					let item = selectItem.items[i];

					// [物品ID，需数量，已提交，背包已有数量，还需要提交多少个]

					text += `\t\t#i${item[0]}:# 需${item[1]}个`;
					
					item[2] = getFind(item[0],cache);
					
					text += ` #r已集${item[2]}个#k`

					//该项没有集齐标志为未完成
					if(item[2] != item[1])selectItem.success = 0;

					// 计算还需要提交几个
					let need = item[1] - item[2];

					if(need > 0){

						// 读取背包该物品数量
						item[3] = getItemQuantity(item[0]);
						
						// 根据背包物品计算需扣除的量
						item[4] = need > item[3] ? item[3] : need;

						if(item[3]){
							selectItem.boxCount += item[3];
							text += `#b（已有${item[3]}个）#k`;
						}
					}

					text += "\r\n";
				}

				text += "\r\n#b";

				//完成显示领取按钮
				if(selectItem.success){
					text += `#L999#以上已集齐，领取完成奖励！#l\r\n`
					text += "　\r\n"
					cm.sendSimple(text);
				}else if(selectItem.boxCount){
					text += "#L998#一键提交已有物品#l\r\n"
					text += "　\r\n"
					cm.sendSimple(text);
				}else{
					cm.sendNext(text);
				}
			}

		} else if (status == 2){

			if(selection == 999){

				if(cm.canHold(selectItem.reward[0], selectItem.reward[1])){

					selectItem.give += 1;
					cm.gainItem(selectItem.reward[0], selectItem.reward[1]);
					cm.getPlayer().saveLog("装备收集",selectItem.reward[0],selectItem.reward[1]);
					cm.getPlayer().saveData('收集装备次数' + selectItem.index, selectItem.give.toString());
					cm.getPlayer().serverMessage(`完成装备收集，领取了${selectItem.reward[1]}个`, selectItem.reward[0]);
					for (var i = 0; i < selectItem.items.length; i++) {
						gainNeedItem(selectItem.items[i][0] , -selectItem.items[i][1]);

					}
					
					cm.sendNext("领取奖励成功！");
					status = -1;
				}else{
					cm.sendOk("背包空间不足！");
					cm.dispose();
				}

			}else if (selection == 998){
				// 提交包内物品

				if(selectItem.give >= selectItem.max ){
					var text = "收集次数已达到上限！";
					
				}else{

					var send = [];
					for (var i = 0; i < selectItem.items.length; i++) {
						
						let item = selectItem.items[i];

						if(item[3] > 0){

							// [物品ID，需数量，已提交，背包已有数量，本次需扣除的数量]

							if(item[4] > 0){
								gainNeedItem(item[0] , item[4]);
								gainItem(item[0] , -item[4]);
								cm.getPlayer().saveLog("装备收集",item[0],-item[4]);
								send.push([item[0] , item[4]]);
							}

						}
					}

					if(send.length > 0){

						var text = `\r\n本次收集：\r\n\r\n`

						for(let i=0;i < send.length; i++){
							text += `#i${send[i][0]}# × ${send[i][1]}`;
							if( (i+1) % 3 === 0){
								text += "\r\n"
							} else {
								text += "\t\t\t"
							}
						}

						cm.getPlayer().serverMessage(`在自由市场的后街小贩提交了收集装备！`);

					}else{
						var text = "没有什么可以回收的！";
					}
				}

				cm.sendNext(text)

				status = -1;

			}else{
				status = -1;
				action(1, 0, 0);
			}
			
		} else {
			cm.dispose();
		}
	}	
}


// 读取仓库数据，结果  [ [id,数量] , [id,数量]  ]  
function getItem(){
    var data = cm.getPlayer().getData("收集物品");
    if(data)return JSON.parse(data);
   	return [];
}

// 查找某物品的已提交的数量
function getFind(id,data){
	var item = data.filter(v => v[0] == id);
	return item.length > 0 ? item[0][1] : 0;
}


//读取某物品数量
function getItemQuantity(id) {
	var count = cm.getItemQuantity(id);
	
	//需要到存储仓库找
	if(!storage){
		var data = cm.getPlayer().getData("抽奖仓库");
		if(data)storage = JSON.parse(data);
	}
	if(storage){
		storage.forEach(v=>{
			if(v[0] == id)count += v[1];
		})
	}
    
    return count;
}

function gainItem(id, number) {
	var count = cm.getItemQuantity(id);
	
	if(count >= Math.abs(number)){
		cm.gainItem(id,number);
	}else{
		const need = Math.abs(number) - count;
		if(count > 0)cm.gainItem(id,-count);
		if(need > 0)storage = gainStorageItem(id,-need);
	}
}


/**
 * 调整指定物品的数量（支持增减，数量≤0则删除）
 * @param {Number} targetKey - 要调整的目标数字（如2430100）
 * @param {Number} change - 数量变化值（-1表示减1，1表示加1）
 * @returns {Array} 处理后的新数组（不修改原数组）
 */
function gainStorageItem(targetKey, change) {
	const sourceData = storage;
	const newData = sourceData.map(item => [...item]);
	const targetIndex = newData.findIndex(([key]) => key === targetKey);
	if (targetIndex === -1) return newData;
	const targetItem = newData[targetIndex];
	const newCount = targetItem[1] + change;
	if (newCount > 0) {
		targetItem[1] = newCount;
	} else {
		newData.splice(targetIndex, 1);
	}
	cm.getPlayer().saveData("抽奖仓库", JSON.stringify(newData));
	return newData;
}

/**
 * 调整指定物品的数量（支持增减，数量≤0则删除）
 * @param {Number} targetKey - 要调整的目标数字（如2430100）
 * @param {Number} change - 数量变化值（-1表示减1，1表示加1）
 * @returns {Array} 处理后的新数组（不修改原数组）
 */
function gainNeedItem(targetKey, change) {
    const newData = getItem().map(item => [...item]);
    const targetIndex = newData.findIndex(key => key[0] === targetKey);
    if (targetIndex === -1) {
    	newData.push([targetKey , change]);
    }else{
	    const targetItem = newData[targetIndex];
	    const newCount = targetItem[1] + change;
	    if (newCount > 0) {
	        targetItem[1] = newCount;
	    } else {
	        newData.splice(targetIndex, 1);
	    }
	}
    cm.getPlayer().saveData("收集物品" , JSON.stringify(newData));
    return newData;
}



function openNpc(npc){
	cm.dispose();
	cm.openNpc(9310208, npc);
}
function CheckStatus(mode){
	
	if (mode == -1) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
	if (status == -1) {
		cm.dispose();
		return false;
	}	
	return true;
	
}


