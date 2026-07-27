loadScript('./common.js');
var status;
var storage = null;
const dropData = getDropData();
const items = [
	{ id : 1149999, item : [ [4000000,88],[4000016,88],[4000019,88],[4000011,88],[4033000,2] ]  },
	{ id : 1149998, item : [ [4000006,188],[4000012,188],[4000004,188],[4000003,188],[1149999,1],[4033000,4] ]  },
	{ id : 1149997, item : [ [4000017,288],[4000002,288],[4000001,288],[4000005,288],[1149998,1],[4033000,6] ]  },
	{ id : 1149996, item : [ [4000037,388],[4000195,388],[4000018,388],[4000324,388],[1149997,1],[4033000,8] ]  },
	{ id : 1149995, item : [ [4000325,488],[4000329,488],[4000328,488],[4000326,488],[4011007,1],[4021009,1],[1149996,1],[4033000,10] ]  },
	{ id : 1149994, item : [ [4000333,588],[4000015,588],[4000034,588],[4000009,588],[4011007,2],[4021009,2],[1149995,1],[4033000,12] ]  },
	{ id : 1149993, item : [ [4000007,688],[4000008,688],[4000020,688],[4000161,688],[4011007,3],[4021009,3],[1149994,1],[4033000,14] ]  },
	{ id : 1149992, item : [ [4000162,788],[4000164,788],[4000197,788],[4000196,788],[4011007,4],[4021009,4],[1149993,1],[4033000,16] ]  },
	{ id : 1149991, item : [ [4000165,888],[4000042,888],[4000063,888],[4000106,888],[4011007,5],[4021009,5],[1149992,1],[4033000,18] ]  },
	{ id : 1149990, item : [ [4000085,988],[4000084,988],[4000103,988],[4000153,988],[4011007,6],[4021009,6],[1149991,1],[4033000,20] ]  },
	{ id : 1149989, item : [ [4000166,1088],[4000334,1088],[4000335,1088],[4000032,1088],[4011007,7],[4021009,7],[1149990,1],[4033000,25] ]  },
	{ id : 1149988, item : [ [4000107,1188],[4000095,1188],[4000353,1188],[4000356,1188],[4011007,8],[4021009,8],[1149989,1],[4033000,30] ]  },
	{ id : 1149987, item : [ [4000024,1288],[4000108,1288],[4000109,1288],[4000206,1288],[4011007,9],[4021009,9],[1149988,1],[4033000,35] ]  },
	{ id : 1149986, item : [ [4000070,1388],[4000096,1388],[4000113,1388],[4000168,1388],[4011007,10],[4021009,10],[1149987,1],[4033000,40] ]  },
	{ id : 1149985, item : [ [4000099,1488],[4000104,1488],[4000105,1488],[4031151,1488],[4011007,11],[4021009,11],[1149986,1],[4033000,45] ]  },
	{ id : 1149984, item : [ [4000026,1588],[4000013,1588],[4000035,1588],[4000043,1588],[4011007,12],[4021009,12],[1149985,1],[4033000,50] ]  },
	{ id : 1149983, item : [ [4000100,1688],[4000167,1688],[4000059,1688],[4000110,1688],[4011007,13],[4021009,13],[1149984,1],[4033000,55] ]  },
	{ id : 1149982, item : [ [4000115,1788],[4000123,1788],[4000116,1788],[4000127,1788],[4011007,14],[4021009,14],[1149983,1],[4033000,60] ]  },
	{ id : 1149981, item : [ [4000154,1888],[4000358,1888],[4000045,1888],[4000023,1888],[4011007,15],[4021009,15],[1149982,1],[4033000,65] ]  },
	{ id : 1149980, item : [ [4000359,1988],[4000039,1988],[4000058,1988],[4000060,1988],[4011007,16],[4021009,16],[1149981,1],[4033000,70] ]  },
	{ id : 1149979, item : [ [4000357,2088],[4000031,2088],[4000036,2088],[4000044,2088],[4011007,17],[4021009,17],[1149980,1],[4033000,75] ]  },
	{ id : 1149978, item : [ [4000111,2188],[4000112,2188],[4000114,2188],[4000117,2188],[4011007,18],[4021009,18],[1149979,1],[4033000,80] ]  },
	{ id : 1149977, item : [ [4000088,2288],[4000354,2288],[4000363,2288],[4000120,2288],[4011007,19],[4021009,19],[1149978,1],[4033000,85] ]  },
	{ id : 1149976, item : [ [4000159,2388],[4000178,2388],[4000276,2388],[4000121,2388],[4011007,20],[4021009,20],[1149977,1],[4033000,90] ]  },
	{ id : 1149975, item : [ [4000102,2488],[4000076,2488],[4000078,2488],[4000101,2388],[4011007,21],[4021009,21],[1149976,1],[4033000,100] ]  },
	{ id : 1149974, item : [ [4000364,2588],[4000365,2588],[4000061,2588],[4000118,2588],[4011007,22],[4021009,22],[1149975,1],[4033000,110] ]  },
	{ id : 1149973, item : [ [4000277,2688],[4000278,2688],[4000155,2688],[4000204,2688],[4011007,23],[4021009,23],[1149974,1],[4033000,120] ]  },
	{ id : 1149972, item : [ [4000280,2788],[4000119,2788],[4000122,2788],[4000156,2788],[4011007,24],[4021009,24],[1149973,1],[4033000,130] ]  },
	{ id : 1149971, item : [ [4000205,2888],[4000158,2888],[4000279,2888],[4000172,2888],[4011007,25],[4021009,25],[1149972,1],[4033000,140] ]  },
	{ id : 1149970, item : [ [4000291,2988],[4000332,2988],[4000048,2988],[4000170,2988],[4011007,26],[4021009,26],[1149971,1],[4033000,150] ]  },
	{ id : 1149969, item : [ [4000292,3088],[4000171,3088],[4000360,3088],[4000070,3088],[4011007,27],[4021009,27],[1149970,1],[4033000,160] ]  },
	{ id : 1149968, item : [ [4000283,3188],[4000293,3188],[4000287,3188],[4000072,3088],[4011007,28],[4021009,28],[1149969,1],[4033000,170] ]  },
	{ id : 1149967, item : [ [4000071,3288],[4000286,3288],[4000299,3288],[4000030,3288],[4011007,29],[4021009,29],[1149968,1],[4033000,180] ]  },
	{ id : 1149966, item : [ [4000022,3388],[4000025,3388],[4000033,3388],[4000051,3388],[4011007,30],[4021009,30],[1149967,1],[4033000,190] ]  },
	{ id : 1149965, item : [ [4000055,3488],[4000069,3488],[4000177,3488],[4000300,3488],[4011007,31],[4021009,31],[1149966,1],[4033000,200] ]  },
	{ id : 1149964, item : [ [4000087,3588],[4000041,3588],[4000082,3588],[4000052,3588],[4011007,32],[4021009,32],[1149965,1],[4033000,220] ]  },
	{ id : 1149963, item : [ [4000143,3688],[4000128,3688],[4000285,3688],[4000282,3688],[4011007,33],[4021009,33],[1149964,1],[4033000,240] ]  },
	{ id : 1149962, item : [ [4000129,3788],[4000289,3788],[4000027,3788],[4000057,3788],[4011007,34],[4021009,34],[1149963,1],[4033000,260] ]  },
	{ id : 1149961, item : [ [4000144,3888],[4000185,3888],[4000186,3888],[4000049,3888],[4011007,35],[4021009,35],[1149962,1],[4033000,280] ]  },
	{ id : 1149960, item : [ [4000130,3988],[4000056,3988],[4000361,3988],[4000074,3988],[4011007,36],[4021009,36],[1149961,1],[4033000,300] ]  },

];
const money = 1000000;
var data = items[0];
const attr = [2,2,2,2,1,1];
var id = null;
data.level = 1;
var isCard = 0;
var itemWarp = 5040000;  //传送道具
function start() {
	status = -1;
	isCard = cm.getItemQuantity(2430161); 
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
		cm.dispose();
		return;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
	

    if (status === 0) {

    

    	items.forEach((v,i) => {
			if(cm.haveItemWithId(v.id,true)){
				id = v.id
			}
		})
    	
    	if(id){

			data = getNextItem(id);

			if(data){
				items.forEach((v,i) => {
					if(v.id === id){
						data.level = i + 1;
					}
				})
			}
 
		}

		if(!data || !data.id){
			cm.sendNext("我正在搜罗更好的勋章，等我！");
			cm.dispose();
			return;
		}

		var text = ""
					
		

		text += "\r\n\t奖励勋章\t#r #i"+data.id+"# #t"+data.id+"# "
                    

		text += `\r\n\t#k\t\t\t\t\t 力量 #r${alignText(data.level * attr[0])}#k\t敏捷 #r${alignText(data.level * attr[1])}#k\t攻击力 #r${alignText(data.level * attr[4])}#k\r\n`;
		text += `\t\t\t\t\t\t 智力 #r${alignText(data.level * attr[2])}#k\t运气 #r${alignText(data.level * attr[3])}#k\t魔法力 #r${alignText(data.level * attr[5])}#k\r\n`;
		
		text += "\r\n\t收集物资\r\n";
		
		data.item.forEach((v,i) => {
			const [itemId , itemCount] = v;
			const mapId = getMapId(itemId,dropData);
			if(mapId){
				v.push(mapId);
				text += `\t\t#b#L${mapId}##i${itemId}:# ${alignText(itemCount + "个",5)}（已有 ${formatUnit(getItemQuantity(itemId))} 个）#l\r\n`;
			}
			
		})

		text += "\r\n#k"

		data.item.forEach(v => {
			const [itemId , itemCount, mapId] = v;
			if(!mapId){
				text += `\t\t\t #i${itemId}:# ${alignText(itemCount + "个",5)}（已有 ${formatUnit(getItemQuantity(itemId))} 个）\r\n`;
			}
		})
		text += `\t\t\t#i4031138# ${alignText(formatUnit(data.level * money),5)}（已有 ${formatUnit(cm.getMeso())}）\r\n`;
		

		text += "#b"
		text += `\r\n#L9##fUI/UIWindow.img/Quest/icon6/0# #b#e我已集齐，给我吧#n#l`
							

		cm.sendSimple(text);
    	
		
    } else if (status === 1) {

    	if(selection === 9){


    		//拥有戒指了判断是否在身上
			// if(cm.getPlayer().haveItemEquipped(id)){
				// cm.sendOk(`请先把 #i${id}# #t${id}# 脱下来！`);
				// cm.dispose();
				// return;
			// }

	    	let err = 0;
	    	data.item.forEach(v => {
	    		const [itemId , itemCount] = v;
	    		if(itemCount > getItemQuantity(itemId)){
	    			if(itemId < 4000000){
	    				err = `先把 #i${itemId}# #t${itemId}# 脱下来`;
	    			} else {
	    				err = `所需 #i${itemId}:# #t${itemId}# 不足，至少需要${itemCount}个！`;
	    			}
	    		}
	    	})

	    	data.money = data.level * money;

	    	if(err){
	    		cm.sendOk(err);
	    	} else if(data.money > cm.getMeso()){
	    		cm.sendOk("金币不足！")
	    	} else if(!cm.canHold(data.id)){
	    		cm.sendOk("背包空间不足！");
	    		cm.dispose();
	    	} else {
	    		var equip = cm.getItem().getEquipById(data.id);
				equip.setStr(data.level * attr[0])
				equip.setDex(data.level * attr[1])
				equip.setInt(data.level * attr[2])
				equip.setLuk(data.level * attr[3])
				equip.setWatk(data.level * attr[4])
				equip.setMatk(data.level * attr[5])
				cm.gainEquip(equip);
				cm.getPlayer().serverMessage("收集了" , equip);
				cm.sendOk("请收好，交易愉快！");

				data.item.forEach(v => {
					const [itemId, itemCount] = v;
					gainItem(itemId , -itemCount);
					cm.getPlayer().saveLog("勋章收集" , itemId, -itemCount);
				})

				cm.gainMeso(-data.money);
				cm.getPlayer().saveLog("勋章收集" , 0, -data.money);

	    	}

	    	status = -1;


	    } else {

	    	var text =`物品产出地 #r#m${selection}##k，给我一个#i${itemWarp}:# #t${itemWarp}:#帮你传送过去！\r\n\r\n`;
	    	text += `#b#L${selection}#是的，送我过去！#l\r\n`;
	    	text += "#L0#我自己去！#l\r\n";
	    	cm.sendSimple(text);

	    }
    	
	} else if (status === 2){

		if(selection > 0){
			if(cm.getItemQuantity(itemWarp)){
				cm.warp(selection);
				cm.gainItem(itemWarp,-1);

			} else {
				cm.sendNext(`${itemWarp}不足！`);
			}
		} 

		cm.dispose();
	}
}	



function getIndex(items,id) {
	items.forEach((v,i) => {
		if(v.id === id){
			return i + 1;
		}
	})
}


/**
 * 获取当前ID的下一条数据
 * @param {number} targetId 目标id
 * @returns {object|null} 下一条对象，找不到/最后一条返回null
 */
function getNextItem(targetId) {
  const idx = items.findIndex(v => v.id === targetId);
  // id不存在
  if (idx === -1) return null;
  // 已经是最后一条，无下一条
  if (idx >= items.length - 1) return null;
  // 返回下一项
  return items[idx + 1];
}



//读取某物品数量
function getItemQuantity(id) {
    var count = cm.getItemQuantity(id);
    if(isCard){
        //月卡需要到存储仓库找
        if(!storage){
            var data = cm.getPlayer().getData("保管物品");
            if(data){
                storage = JSON.parse(data);
            }
        }
        if(storage){
        	storage.forEach(v=>{
	            if(v[0] == id){
	                count += v[1];
	            }
	        })
        }
        
    }
    return count;
}

//扣除某物品，若背包中不足，扣除仓库中的
function gainItem(id,number) {
    var count = cm.getItemQuantity(id);
    
    if(count >= Math.abs(number)){
        cm.gainItem(id,number);
    }else{

        if(isCard){

            var need = Math.abs(number) - count;

            if(count > 0)cm.gainItem(id,-count);
            
            if(need > 0)storage = gainStorageItem(id,-need);
            
        }
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
    cm.getPlayer().saveData("保管物品",JSON.stringify(newData));
    return newData;
}


function getMapId(dropDataid, dropData) {
    // 遍历每一条掉落配置
    for (const v of dropData) {
        // 判断当前配置的掉落列表是否包含目标物品ID
        if (v.drop.includes(dropDataid)) {
            const mapList = v.map;
            // 随机返回一个地图ID
            return mapList[Math.floor(Math.random() * mapList.length)];
        }
    }
    // 全部遍历完都没匹配到，返回null
    return null;
}