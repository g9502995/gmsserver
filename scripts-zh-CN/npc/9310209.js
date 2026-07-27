loadScript('./common.js');
var status;
var item = null;
var data;
var rate = false;
var rateId= 4033008;
var rateNum = 12;
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');;
var ii = ItemInformationProvider.getInstance();
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var storage = null;
var cfg = {
    slot : [ "宠物左戒指","宠物右戒指" ],
    level : [
        {  money : 500000, item : [ [4000606,1],[4033000,20],[4001126,10],[4030012,10],[4000021,10],[4005004,1] ], rate : 100 },
        {  money : 600000, item : [ [4000606,1],[4033000,20],[4001126,20],[4030012,20],[4000021,20],[4005004,2] ], rate : 90 },
        {  money : 800000, item : [ [4000606,2],[4033000,30],[4001126,30],[4030012,30],[4000021,30],[4005004,3] ], rate : 85 },
        {  money : 1000000, item : [ [4000606,2],[4033000,30],[4001126,50],[4030012,50],[4000021,40],[4005004,4] ], rate : 70 },
        {  money : 1200000, item : [ [4000606,3],[4033000,50],[4001126,100],[4030012,100],[4000021,50],[4005004,5] ], rate : 65 },
        {  money : 1600000, item : [ [4000606,3],[4033000,70],[4001126,200],[4030012,200],[4000021,60],[4005004,6] ], rate : 45 },
        {  money : 1800000, item : [ [4000606,5],[4033000,100],[4001126,300],[4030012,300],[4000021,70],[4005004,7] ], rate : 42 },
        {  money : 2200000, item : [ [4000606,6],[4033000,125],[4001126,400],[4030012,400],[4000021,80],[4005004,8] ], rate : 39 },
        {  money : 2400000, item : [ [4000606,7],[4033000,150],[4001126,500],[4030012,500],[4000021,90],[4005004,9] ], rate : 36 },
        {  money : 2600000, item : [ [4000606,8],[4033000,175],[4001126,600],[4030012,600],[4000021,100],[4005004,10] ], rate : 29 },
        {  money : 3000000, item : [ [4000606,9],[4033000,200],[4001126,700],[4030012,700],[4000021,110],[4005004,11] ], rate : 28 },
        {  money : 3200000, item : [ [4000606,10],[4033000,230],[4001126,800],[4030012,800],[4000021,120],[4005004,12] ], rate : 26 },
        {  money : 3600000, item : [ [4000606,11],[4033000,260],[4001126,900],[4030012,900],[4000021,130],[4005004,13] ], rate : 24 },
        {  money : 4000000, item : [ [4000606,12],[4033000,290],[4001126,1000],[4030012,1000],[4000021,140],[4005004,14] ], rate : 22 },
        {  money : 4500000, item : [ [4000606,15],[4033000,320],[4001126,1100],[4030012,1100],[4000021,150],[4005004,15] ], rate : 20 },
        {  money : 4800000, item : [ [4000606,20],[4033000,350],[4001126,1200],[4030012,1200],[4000021,160],[4005004,16] ], rate : 10 },
        {  money : 5500000, item : [ [4000606,25],[4033000,400],[4001126,1300],[4030012,1300],[4000021,170],[4005004,17] ], rate : 8 },
        {  money : 6000000, item : [ [4000606,30],[4033000,450],[4001126,1400],[4030012,1400],[4000021,180],[4005004,18] ], rate : 6 },
        {  money : 6500000, item : [ [4000606,40],[4033000,500],[4001126,1500],[4030012,1500],[4000021,190],[4005004,19] ], rate : 5 },
        {  money : 7000000, item : [ [4000606,60],[4033000,600],[4001126,1600],[4030012,1600],[4000021,200],[4005004,20] ], rate : 3 }
    ]
}

const attr = [1, 1, 1, 1, 1, 2];
function start() {
	status = -1;
	action(1, 0, 0);
}


function action(mode, type, selection) {

	if (mode <= -1) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}


		if (status == 0) {

			var text = "我是时装锻造大师，我可以将你的宠物戒指强化后赋予更强的能力，你打算让我帮你做什么？\r\n";

            
			text += "\r\n#b";
			
			text += "#L1#我想强化宠物戒指#l\r\n";

			cm.sendSimple(text);

		} else if (status == 1) {
            var text = "请将要强化的宠物时装 #r戒指#k 放到 #r装备栏的第1格#k\r\n宠物的时装可以到商城购买！\r\n";
            text += "\r\n放好的话我们要开始了！\r\n";
            cm.sendNext(text);

        } else if (status == 2){

            item = cm.getInventory(1).getItem(1);

            if(item && item.getItemId()){

                const id = item.getItemId();

                var text = "\r\n\t请你确认强化后的属性和需求材料以及成功率，\r\n\t若失败将失去材料，保留原有等级和属性！\r\n"
                    text += "\r\n\t选择时装：#r #i"+item.getItemId()+"# #t"+item.getItemId()+"# "
                    if(item.getLevel() > 0){
                        text +=`＋ ${item.getLevel()}`;
                    }
                    text += "\t\r\n#k"
                    
                    // cm.message("调试：" + item.getExpiration())
                    
                    if(ii.isCash(id) && item.getExpiration() === -1 && cfg.slot.includes(getEquipType(id))){
                        
                        data = cfg.level[item.getLevel()];
                        
                        if(data && data.money){
                            
                            text += "\r\n\t赋予属性："
                            text += ` 力量 #r${alignText(attr[0],2)}\t#k 敏捷 #r${alignText(attr[1])}\t#k 攻击力 #r${alignText(attr[4])} #k\r\n`;
                            text += `\t\t\t\t\t\t 智力 #r${alignText(attr[2])}\t#k 运气 #r${alignText(attr[3])}\t#k 魔法力 #r${alignText(attr[5])} #k\r\n\r\n`;
                            
                            
                            text += "\t需求材料：";

                            
                                text += ` 金币 ${data.money}\r\n`;
                            

                            for (var i = 0; i < data.item.length; i++) {
                                var v = data.item[i];
                                text += `\t\t\t\t\t\t #t${v[0]}:# ${alignText(v[1],3)}（已有 ${getItemQuantity(v[0])}）\r\n`;
                            }

                            text += "\r\n";

                            text += `\t成功几率：${data.rate}%`;
                            if(rate){
                                text += `〔#r${data.rate + rateNum}%〕`;
                            }
                            
                            text += `\r\n\t\t\t\t\t#L3##fUI/Basic.img/CheckBox/${isSelect(rate,true)}# #r使用#t${rateId}:#提高${rateNum}%#l\r\n`;
                            text += `\r\n\r\n#L9##fUI/UIWindow.img/Quest/icon6/0# #b好的，开始强化吧#l`
                            text += "　\r\n"
                            
                            cm.sendSimple(text)
                        }else{
                            cm.sendOk("这件时装已经强化极限了，等后续版本再来吧！")
                            cm.dispose();
                        }
                        
                        
                    }else{
                        text += `\r\n\t我不能强化你选择的这件时装！\r\n\t我暂时仅支持：\r\n\t${cfg.slot.join("、")}\r\n`
                        cm.sendOk(text)
                        cm.dispose();
                    }

            }else{
                cm.sendOk("装备栏第1格没有时装！");
                cm.dispose();
            }

            
        } else if (status == 3){

            if(selection < 9){
                if(selection == 3)rate = !rate;
                status = 1;
                action(1, 0, 1);
                return;
            }else{

                let ch = cm.getPlayer();

                if(data.money > cm.getMeso()){
                    cm.sendOk("金币不足");
                } else if(rate && !getItemQuantity(rateId)){
                    cm.sendOk(`#t${rateId}#不足，无法提高几率！`);
                    
                } else {
                    var ckItem = 0;
                    for (var i = 0; i < data.item.length; i++) {
                        var v = data.item[i];
                        if( v[1] > getItemQuantity(v[0]) ){
                            ckItem = v[0];
                            break;
                        }
                    }
                    if(ckItem){
                        cm.sendOk(`需求材料#t${ckItem}#不足！`);
                    }else{

                        for (var i = 0; i < data.item.length; i++) {
                           var v = data.item[i];
                           gainItem(v[0] , -v[1]);
                           ch.saveLog(cm.getNpc(),v[0],-v[1]);
                        }      
                        var rateLast = data.rate;
                        if(rate){
                            rateLast += rateNum;
                            gainItem(rateId,-1);  
                            ch.saveLog(cm.getNpc(),rateId,-1);
                        }

                        cm.gainMeso(-data.money);
                        ch.saveLog(cm.getNpc(),0,-data.money);
                        if(getRate(rateLast)){

                            const up = item.getLevel() + 1 ;
                        
                            var equip = item.copy();

                                equip.setStr(attr[0] * up)
                                equip.setDex(attr[1] * up)
                                equip.setInt(attr[2] * up)
                                equip.setLuk(attr[3] * up)
                                equip.setWatk(attr[4] * up)
                                equip.setMatk(attr[5] * up)
                                equip.setLevel(up)

                            cm.removeAllByInventorySlot(1,1);
                            cm.gainEquip(equip);

                            ch.serverMessage(equip,"强化成功！");

                            ch.sendPacket(PacketCreator.showSpecialEffect(15));
                            ch.sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/ItemMake/Success"));
                            //cm.getPlayer().sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/ItemMake/Failure"));
                            cm.sendOk("锻造成功！请检查你的背包！");  

                            ch.saveDayData("今日锻造装备" , 1, true);
                        } else {
                            cm.sendOk("强化失败");

                        }   


                    }
                }

                status = 1;

            }

		} else {
			cm.dispose();
		}
	}
}

function isSelect(v,t){
    if(v === t)return 1;
    return 0;
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