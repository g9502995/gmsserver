loadScript('./common.js');
//钻石戒指
var id = 1112808;
var maxLevel = 120;
const attr = [1, 1, 1, 1, 1, 2];
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance()
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var storage = null;
var status;
var item = null;
var itemWarp = 5040000;  //传送道具
const dropData = getDropMuData();
var cfg;
var target = null;
function start(){
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

        if(status === 0){

        	cfg = getItem(1);

			item = ch.haveItemId(id);

			if(item){

				if(item.getLevel() >= maxLevel){
					cm.sendOk(`你的#i${id}#已达到上限！`);
					cm.dispose();
					return;
				}

				cfg = getItem(item.getLevel());

			}
			var lv = 1;
			var text = "";
			text += `\r\n\t选择戒指：#i${id}# #r#t${id}#`;
			if(item){
				text += `（＋${item.getLevel()}）`;
				lv = item.getLevel() + 1;
			}
			text += "#k\r\n";
            text += "\r\n\t锻造属性："
            text += ` 力量 #r${alignText(attr[0] * lv)}\t#k 敏捷 #r${alignText(attr[1] * lv)}\t#k 攻击力 #r${alignText(attr[4] * lv)} #k\r\n`;
            text += `\t\t\t\t\t\t 智力 #r${alignText(attr[2] * lv)}\t#k 运气 #r${alignText(attr[3] * lv)}\t#k 魔法力 #r${alignText(attr[5] * lv)} #k\r\n`;
            
            
            text += "\r\n"
            text += "\t需求材料：\r\n\r\n";
			
			text += `\t\t\t#i4031138# 金　币 ${alignText(formatUnit(cfg.money),6)}（已有 ${formatUnit(cm.getMeso())}）\r\n`
			
			cfg.item.forEach(v=>{
				const drop = getDropById(v.id , dropData)
				if(drop.length > 0){
					text += `\t\t#b#L${v.id}##i${v.id}:# #t${v.id}:# ${alignText(v.count + "个",5)}（已有 ${formatUnit(getItemQuantity(v.id))}）#l\r\n`;
				} else {
					text += `\t\t\t #i${v.id}:# #t${v.id}:# ${alignText(v.count + "个",5)}（已有 ${formatUnit(getItemQuantity(v.id))}）\r\n`;
				}
			})


			
			
			text +="\r\n\r\n#b"
			text +="#L1##e我已凑齐，帮我锻造吧！#n#l\r\n";
			text += "　\r\n"
			cm.sendSimple(text)
					
			
		} else if (status === 1){
	
		
			if(selection === 1){

				let itemText;
				for(let i=0;i < cfg.item.length ; i++){
					let v = cfg.item[i];
					if(v.count > getItemQuantity(v.id)){
						itemText = `所需物品 #i${v.id}# #t${v.id}:# 不足！`;
						break;
					}
				}

				if(cfg.money > cm.getMeso()){
					cm.sendOk("金币不足！")
				} else if(itemText){
					cm.sendOk(itemText);
				} else if(!item && !cm.canHold(id)){
					cm.sendOk("背包不足！")
				} else if(item && ch.haveItemEquipped(id)){
					cm.sendOk("请先将戒指脱下来！");
				}else{
						
					for(let i=0; i < cfg.item.length;i++){
						gainItem(cfg.item[i].id,-cfg.item[i].count);
						cm.getPlayer().saveLog(cm.getNpc(),cfg.item[i].id,-cfg.item[i].count);
					}
					cm.gainMeso(-cfg.money);
					ch.saveLog(cm.getNpc(),0,-cfg.money);
					
					var equip = item && item.getItemId() ? item.copy() : ii.getEquipById(id);
		
					const up = equip.getLevel() + 1 ;

                    equip.setStr(attr[0] * up)
                    equip.setDex(attr[1] * up)
                    equip.setInt(attr[2] * up)
                    equip.setLuk(attr[3] * up)
                    equip.setWatk(attr[4] * up)
                    equip.setMatk(attr[5] * up)
                    equip.setLevel(up)
					
					if(item && item.getItemId()){
						cm.removeAllByInventorySlot(1,getEquipSlot(id));
					}
						
					cm.gainEquip(equip);
					
					ch.sendPacket(PacketCreator.showSpecialEffect(15));
					ch.sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/ItemMake/Success"));
					
					ch.serverMessage("厉害了，居然锻造成功了", equip);

					ch.saveDayData("今日锻造装备" , 1, true);
					
				}

				cm.dispose();

			} else {
				var text = `#i${selection}# #t${selection}# 掉落怪物如下，打算传送过去吗？\r\n`;
				var drop = getDropById(selection , dropData);

				drop.forEach(v=>{
					const mapId = v.map[Math.floor(Math.random() * v.map.length)];
					text +=`#b#L${mapId}# ${alignText(v.level,3,"left")} ${alignText(v.name,9)}  #r(消耗#t${itemWarp}#)#l\r\n`;
				})

				cm.sendSimple(text);
			}

		} else if (status === 2){
			
			if(selection > 0){
				if(!cm.getItemQuantity(itemWarp)){
					cm.sendNext(`#t${itemWarp}#不足!`);
				} else {
					cm.warp(selection);
					cm.gainItem(itemWarp , -1);
				}
			} 

			cm.dispose();
	
			
			
		}else {
            cm.dispose();
        }
    }
} 

//根据等级获得每级递增的属性，保守每级四维+1，每10级增加+6攻击和+12魔攻
function getAttr(level){
	let attr = [];
	for(let i=0;i < 4;i++){
		attr.push(level * 1);
	}
	if(level % 10 == 0){
		attr.push((level / 10) * 6)
		attr.push((level / 10) * 12)
	}else{
		attr.push(parseInt(level / 10) * 6)
		attr.push(parseInt(level / 10) * 12)
	}
	return attr;
}

//获取升级需求配置，返回item和money数据
function getItem(level){
	var data = {
		item: [
			{ id: 4033002,count: 20 },
			{ id: 4033000,count: 10 },
			{ id: 4004000,count: 40 },
			{ id: 4004001,count: 40 },
			{ id: 4004002,count: 40 },
			{ id: 4004003,count: 40 },
		],
		money: 100000
	}
	
	if(level < 1000)count = 20
	if(level < 130)count = 15;
	if(level < 120)count = 14;
	if(level < 100)count = 13;
	if(level < 80)count = 12;
	if(level < 60)count = 11;
	if(level < 50)count = 10;
	if(level < 40)count = 9;
	if(level < 30)count = 8;
	if(level < 20)count = 7;
	if(level < 10)count = 6;
	if(level < 5)count = 5;
	if(level < 2)count = 0;

	for(let i=0;i < data.item.length; i++){
		let v = data.item[i];
		v.count = v.count + (count * level);
	}

	data.money = data.money + (data.money * count * level);
	

	return data;
	
	
}


//读取某物品数量
function getItemQuantity(id) {
	var count = cm.getItemQuantity(id);
	//需要到存储仓库找
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

    return count;
}


//扣除某物品，若背包中不足，扣除仓库中的
function gainItem(id,number) {
	var count = cm.getItemQuantity(id);
	
	if(count >= Math.abs(number)){
		cm.gainItem(id,number);
	}else{


		var need = Math.abs(number) - count;

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
	cm.getPlayer().saveData("保管物品",JSON.stringify(newData));
    return newData;
}


/**
 * 读取数据
 * @returns {string}
 */
function getData(name) {
	let data = cm.getPlayer().getData(name);
	if(data){
		return JSON.parse(data)
	}
	return false;
}

/**
 * 保存数据
 */
function setData(name,value){;
	cm.getPlayer().saveData(name, JSON.stringify(value));
}


// 获取装备在背包的位置
function getEquipSlot(itemId){
	var index = 0;
	for (let i=1; i <= 96; i++){
		let item = cm.getInventory(1).getItem(i);
		if(item && item.getItemId() === itemId){
			index = i;
			break;
		}
	}
	return index
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


function getDropById(dropDataid, dropData) {
	var item = [];
    for (const v of dropData) {
        if (v.drop.includes(dropDataid)) {
            item.push(v);
        }
    }
    return item;
}