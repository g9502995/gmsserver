loadScript('./common.js');
//蓝心戒指
var id = 1112902;
const cfg = [
    {
        item: [
            { id: 4011007,count: 2 },
            { id: 4021009,count: 2 },
            { id: 4033000,count: 10 }
        ],
        attr: [1,1,1,1,1,2],money: 500000,money1: 400
    },
    {
        item: [
            { id: 4011007,count: 4 },
            { id: 4021009,count: 4 },
            { id: 4033000,count: 20 }
        ],
        attr: [2,2,2,2,2,4],money: 1000000,money1: 600
    },
    {
        item: [
            { id: 4011007,count: 6 },
            { id: 4021009,count: 6 },
            { id: 4033000,count: 30 }
        ],
        attr: [3,3,3,3,3,6],money: 1500000,money1: 800
    },
    {
        item: [
            { id: 4011007,count: 8 },
            { id: 4021009,count: 8 },
            { id: 4033000,count: 40 }
        ],
        attr: [4,4,4,4,4,8],money: 2000000,money1: 1000
    },
    {
        item: [
            { id: 4011007,count: 10 },
            { id: 4021009,count: 10 },
            { id: 4033000,count: 50 }
        ],
        attr: [5,5,5,5,5,10],money: 2500000,money1: 1200
    },
    {
        item: [
            { id: 4011007,count: 14 },
            { id: 4021009,count: 14 },
            { id: 4033000,count: 60 }
        ],
        attr: [6,6,6,6,6,12],money: 3000000,money1: 1400
    },
    {
        item: [
            { id: 4011007,count: 18 },
            { id: 4021009,count: 18 },
            { id: 4033000,count: 70 }
        ],
        attr: [7,7,7,7,7,14],money: 3500000,money1: 1600
    },
    {
        item: [
            { id: 4011007,count: 22 },
            { id: 4021009,count: 22 },
            { id: 4033000,count: 80 }
        ],
        attr: [8,8,8,8,8,16],money: 4000000,money1: 1800
    },
    {
        item: [
            { id: 4011007,count: 26 },
            { id: 4021009,count: 26 },
            { id: 4033000,count: 90 }
        ],
        attr: [9,9,9,9,9,18],money: 4500000,money1: 2000
    },
    {
        item: [
            { id: 4011007,count: 30 },
            { id: 4021009,count: 30 },
            { id: 4033000,count: 100 }
        ],
        attr: [10,10,10,10,10,20],money: 5000000,money1: 2200
    },
    {
        item: [
            { id: 4011007,count: 34 },
            { id: 4021009,count: 34 },
            { id: 4033000,count: 110 }
        ],
        attr: [13,13,13,13,13,26],money: 6000000,money1: 3200
    },
    {
        item: [
            { id: 4011007,count: 38 },
            { id: 4021009,count: 38 },
            { id: 4033000,count: 120 }
        ],
        attr: [15,15,15,15,15,30],money: 7000000,money1: 4200
    },
    {
        item: [
            { id: 4011007,count: 42 },
            { id: 4021009,count: 42 },
            { id: 4033000,count: 130 }
        ],
        attr: [17,17,17,17,17,34],money: 8000000,money1: 5200
    },
    {
        item: [
            { id: 4011007,count: 46 },
            { id: 4021009,count: 46 },
            { id: 4033000,count: 140 }
        ],
        attr: [19,19,19,19,19,38],money: 9000000,money1: 6200
    },
    {
        item: [
            { id: 4011007,count: 50 },
            { id: 4021009,count: 50 },
            { id: 4033000,count: 150 }
        ],
        attr: [21,21,21,21,21,42],money: 10000000,money1: 7200
    },
    {
        item: [
            { id: 4011007,count: 54 },
            { id: 4021009,count: 54 },
            { id: 4033000,count: 160 }
        ],
        attr: [23,23,23,23,23,46],money: 11000000,money1: 8200
    },
    {
        item: [
            { id: 4011007,count: 58 },
            { id: 4021009,count: 58 },
            { id: 4033000,count: 170 }
        ],
        attr: [25,25,25,25,25,50],money: 12000000,money1: 9200
    },
    {
        item: [
            { id: 4011007,count: 62 },
            { id: 4021009,count: 62 },
            { id: 4033000,count: 180 }
        ],
        attr: [27,27,27,27,27,54],money: 13000000,money1: 10000
    },
    {
        item: [
            { id: 4011007,count: 66 },
            { id: 4021009,count: 66 },
            { id: 4033000,count: 190 }
        ],
        attr: [29,29,29,29,29,58],money: 14000000,money1: 11000
    },
    {
        item: [
            { id: 4011007,count: 70 },
            { id: 4021009,count: 70 },
            { id: 4033000,count: 200 }
        ],
        attr: [31,31,31,31,31,62],money: 15000000,money1: 12000
    }
];
var storage = null;
var status;
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance()
var up = cfg[0];
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

            item = ch.haveItemId(id);

            if(item){

                up = cfg[item.getLevel()];

                if(!up){
                    cm.sendOk(`你的#i${id}#已达到上限！`);
                    cm.dispose();
                    return;
                }
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
            text += ` 力量 #r${alignText(up.attr[0])}\t#k 敏捷 #r${alignText(up.attr[1])}\t#k 攻击力 #r${alignText(up.attr[4])} #k\r\n`;
            text += `\t\t\t\t\t\t 智力 #r${alignText(up.attr[2])}\t#k 运气 #r${alignText(up.attr[3])}\t#k 魔法力 #r${alignText(up.attr[5])} #k\r\n`;
            
            
            text += "\r\n"
            text += "\t需求材料：\r\n\r\n";
            
            text += `\t\t#i4031138# 金　币 ${alignText(formatUnit(up.money),6)}（已有 ${formatUnit(cm.getMeso())}）\r\n`
            text += `\t\t#i4033010# 点　券 ${alignText(formatUnit(up.money1),6)}（已有 ${formatUnit(ch.getCash(1))}）\r\n`
            
            for(let i=0; i < up.item.length; i++){
                let v = up.item[i];
                text += `\t\t#i${v.id}:# ${formatItemName(v.id)} ${alignText(v.count+"个",6)}（已有：${formatUnit(getItemQuantity(v.id))}）\r\n`;
            }
            
            text +="\r\n#b"
            text +="#L1#我已凑齐，帮我锻造吧！#l\r\n";
            cm.sendSimple(text)
		
			
			
			
		} else if (status == 1){
			
			if(selection === 1){

                let itemText;
                for(let i=0;i < up.item.length ; i++){
                    let v = up.item[i];
                    if(v.count > getItemQuantity(v.id)){
                        itemText = `所需物品#t${v.id}#不足！`;
                        break;
                    }
                }
                if(itemText){
                    cm.sendOk(itemText);
                } else if(up.money > cm.getMeso()){
                    cm.sendOk("金币不足！");
                } else if (up.money1 > ch.getCash(1)){
                    cm.sendOk("点券不足！");
                } else if(itemText){
                    cm.sendOk(itemText);;
                } else if(!item && !cm.canHold(id)){
                    cm.sendOk("背包不足！")
                } else if(item && ch.haveItemEquipped(id)){
                    cm.sendOk("请先将戒指脱下来！");
                }else{
                        
                    for(let i=0; i < up.item.length;i++){
                        gainItem(up.item[i].id,-up.item[i].count);
                        cm.getPlayer().saveLog(cm.getNpc(),up.item[i].id,-up.item[i].count);
                    }
                    cm.gainMeso(-up.money);
                    ch.saveLog(cm.getNpc(),0,-up.money);

                    ch.gainCash(-up.money1);
                    ch.saveLog(cm.getNpc(),1,-up.money1);
                    
                    var equip = item && item.getItemId() ? item.copy() : ii.getEquipById(id);
        

                    equip.setStr(up.attr[0])
                    equip.setDex(up.attr[1])
                    equip.setInt(up.attr[2])
                    equip.setLuk(up.attr[3])
                    equip.setWatk(up.attr[4])
                    equip.setMatk(up.attr[5])
                    equip.setLevel(equip.getLevel() + 1 )
                    
                    if(item && item.getItemId()){
                        cm.removeAllByInventorySlot(1,getEquipSlot(id));
                    }
                        
                    cm.gainEquip(equip);
                    
                    ch.sendPacket(PacketCreator.showSpecialEffect(15));
                    ch.sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/ItemMake/Success"));
                    
                    ch.serverMessage("厉害了，居然锻造成功了", equip);

                    ch.saveDayData("今日锻造装备" , 1, true);
                    
                }

            } 

            cm.dispose();
			
			
		}else {
            cm.dispose();
        }
    }
} 


//读取某物品数量
function getItemQuantity(id) {
    var count = cm.getItemQuantity(id);
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

function formatItemName(id){
    if(id == "4011007"){
        return "月　石"
    }else if (id == "4021009"){
        return "星　石"
    }else {
        return `#t${id}:#`;
    }
}