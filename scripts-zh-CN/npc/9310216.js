loadScript('./common.js');

// 冒险之心条件配置
var seal = { 
	id : [1122041,1122042], 
	count : 3, 
	compose : 1122045,
	money : 500000, 
	item : []
}

// 苏醒冒险之心
var up = {
	id : [1122043,1122044,1122045],
	count : 3,
	compose : 1122051,
	money : 1000000,
	item : [[4001126, 100], [4033000, 20]]
}

// 觉醒冒险之心
var awaken = {
	id : [1122051],
	count : 3,
	compose : 1122057,
	money : 5000000,
	item : [[4001126, 300], [4033000, 100]]
}

var storage=null;
var status;
var isCard = 0;

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

		isCard = cm.getItemQuantity(2430161); 

		if (status === 0) {

			var text = "我是坠子锻造大师，请问我可以帮你吗？\r\n\r\n";

			text += "#b";

			text += `#L1#我想合成冒险之心#l\r\n`;
			text += `#L2#我想苏醒冒险之心#l\r\n`;
			text += `#L3#我想觉醒冒险之心#l\r\n`;
			text += "#L4#了解冒险之心#l\r\n";

			cm.sendSimple(text);

		} else if(status === 1){

			if(selection === 1){

				var text = `即将合成 #i${seal.compose}:# #r#t${seal.compose}:#（70级）#k \r\n\r\n`;
				text += "需求材料：\r\n\r\n";


				text += `\t#i${seal.id[0]}:# #t${seal.id[0]}:#（10级） × ${seal.count}\r\n`

				if(seal.money > 0){
					text += `\t#i4031138# 金币 × ${seal.money}\r\n`
				}

				text += "\r\n";
				

				text += "\r\n#b"
				text += "#L1#我已凑齐吧，开始吧#l\r\n";
				
				cm.sendSimple(text);

			} else if (selection === 2){

				var text = `打造 #i${up.compose}:# #r#t${up.compose}:#\r\n\r\n`;
				text += "#k需求材料：\r\n\r\n";

				text += `\t#i${seal.compose}:# #t${seal.compose}:#（70级） × ${up.count}\r\n`

				up.item.forEach(v=>{
					const [id, count] = v;
					text += `\t#i${id}:# #t${id}:# × ${count}\r\n`
				})

				if(up.money > 0){
					text += `\t#i4031138# 金币 × ${up.money}\r\n`
				}

				text += "\r\n";
				

				text += "\r\n#b"
				text += "#L2#我已凑齐吧，开始吧#l\r\n";

				cm.sendSimple(text);

			} else if (selection === 3){

				const itemId = awaken.id[0];

				var text = `打造 #i${awaken.compose}:# #r#t${awaken.compose}:#\r\n\r\n`;
				text += "#k需求材料：\r\n\r\n";


				text += `\t#i${itemId}:# #t${itemId}:# × ${awaken.count}\r\n`

				awaken.item.forEach(v=>{
					const [id, count] = v;
					text += `\t#i${id}:# #t${id}:# × ${count}\r\n`
				})

				if(awaken.money > 0){
					text += `\t#i4031138# 金币 × ${awaken.money}\r\n`
				}

				text += "\r\n";
				

				text += "\r\n#b"
				text += "#L3#我已凑齐吧，开始吧#l\r\n";

				cm.sendSimple(text)

			} else if(selection === 4){

				var text = "冒险之心是一件精品项链，原本是封印的，通过我的打造可以将它觉醒并提高能力，你可以到百宝箱抽奖或者击杀武陵道场首领！\r\n"
				cm.sendNext(text);

				status =-1;
				

			} else {
				cm.dispose();
			}
		
			
		} else if (status === 2){

			if(selection === 1 || selection === 2 || selection === 3){
				// 合成或进阶冒险之心

				var config = selection === 1 ? seal : selection === 2 ? up : awaken;


				var equip = []; 

				const box = cm.getInventory(1);
				for (var i = 1; i <= 96; i++) {
					let v = box.getItem(i);
					if( v && v.getItemId()){
						if(config.id.includes(v.getItemId())){
							equip.push(v.getItemId());
						}
					}
				}

				if(config.count > equip.length){
					cm.sendNext(`需求的 #i${config.id[0]}:# 不足${config.count}个`);
				} else if(config.money > cm.getMeso()){
					cm.sendNext("金币不足！");
				} else if(!cm.canHold(config.compose,1)){
					cm.sendNext("背包空间不足！")
				} else {

					var err;
					config.item.forEach(v=>{
						const [id, count] = v;
						if(count > getItemQuantity(id)){
							err = `所需 #i${id}# 数量不足${count}个！`;
						}
					})
					if(!err){

						// 扣除3个坠子
						equip.forEach((v,i) => {
							if( i < config.count){
								cm.gainItem(v,-1);
							}
						})
						if(config.money) cm.gainMeso(-config.money);

						cm.gainItem(config.compose);
						cm.getPlayer().serverMessage("锻造了" , config.compose);
						cm.sendNext("恭喜，成功了！");
					} else {
						cm.sendNext(err);

					}



				}

				

			} 


			cm.dispose();


		} else {
			cm.dispose();
		}
		
	}
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