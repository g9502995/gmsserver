loadScript('./common.js');
//精石戒指
var id = 1112321;
var cfg = [
	{item : [ {id : 4033001, count : 1},{id : 4033000, count : 10} ], money : 100000 , money2 : 1000},
	{item : [ {id : 4033001, count : 2},{id : 4033000, count : 20} ], money : 150000 , money2 : 1500},
	{item : [ {id : 4033001, count : 3},{id : 4033000, count : 30} ], money : 300000 , money2 : 2000},
	{item : [ {id : 4033001, count : 4},{id : 4033000, count : 40} ], money : 450000 , money2 : 2500},
	{item : [ {id : 4033001, count : 5},{id : 4033000, count : 50} ], money : 500000 , money2 : 3000},
	{item : [ {id : 4033001, count : 6},{id : 4033000, count : 60} ], money : 600000 , money2 : 3500},
	{item : [ {id : 4033001, count : 7},{id : 4033000, count : 70} ], money : 800000 , money2 : 4000},
	{item : [ {id : 4033001, count : 8},{id : 4033000, count : 80} ], money : 1000000 , money2 : 4500},
	{item : [ {id : 4033001, count : 9},{id : 4033000, count : 90} ], money : 1500000 , money2 : 5000},
	{item : [ {id : 4033001, count : 10},{id : 4033000, count : 100} ], money : 2000000 , money2 : 6000},
];
var index = 0;
var status;
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance()
var roleAttr = null ;  //已生成的属性
var item = null;
var money = 0;
var money1 = 0;
var money2 = 0;
var updata = null;
var attrMax = [4,4,4,4,1,2];
var index = 0;
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
					
        if (status == 0) {
			var text = `我是首饰锻造师，我可以帮你锻造 #i${id}:# #t${id}:#\r\n`;
			
			text += "\r\n#b";
			text += `#L1#我想制作戒指！#l\r\n`;
			text += `#L2#我想提升戒指！#l\r\n`;
			text += `#L3#我想了解灵魂药水！#l\r\n`;
			
			
            cm.sendSimple(text)
			
		} else if (status == 1){
			
			money = cm.getMeso();
			money2 = ch.getCashShop().getCash(2);
			
			
			if(selection == 1){
				
				var text = `\r\n\t制作 #r#t${id}##k 需要你提供这些物品\r\n\r\n`;
				
				text += `\t\t1．金　币 ${alignText(formatUnit(cfg[0].money),6)}（已有：${formatUnit(money)}）\r\n`
				text += `\t\t2．抵用券 ${alignText(formatUnit(cfg[0].money2),6)}（已有：${formatUnit(money2)}）\r\n`
				
				for(let i=0; i < cfg[0].item.length; i++){
					let v = cfg[0].item[i];
					text += `\t\t${i+3}．#t${v.id}:# ${alignText(v.count + '个',6)}（已有：${formatUnit(cm.getItemQuantity(v.id))}）\r\n`;
				}
				
				text +="\r\n#b"
				text +="#L11#我已凑齐，帮我制作吧！#l\r\n";
				cm.sendSimple(text)
				
			}
			
			if(selection == 2){
			
				//判断有没有戒指
				if(cm.haveItemWithId(id,true)){
						
					item = ch.haveItemId(id);
					
					updata = cfg[item.getLevel()];
					
					if(!updata){
						cm.sendOk("已满级，请等待下一个版本更新！")
						cm.dispose();
					}else{
					
						var roleAttr = getData("灵魂药水");
					
						if(!roleAttr || roleAttr.length == 0){
							var text = `\r\n\t需先制作 #r${formatUnit(item.getLevel() + 1)}级灵魂药水 #k，制作的属性有不稳定性！\r\n\r\n`
						
							text += "\t需求材料：\r\n#r"
							
							text += `\t\t1．金　币 ${alignText(formatUnit(updata.money),6)}（已有：${formatUnit(money)}）\r\n`
							text += `\t\t2．抵用券 ${alignText(formatUnit(updata.money2),6)}（已有：${formatUnit(money2)}）\r\n`
							for(let i=0; i < updata.item.length; i++){
								let v = updata.item[i];
								text += `\t\t${i+3}．#t${v.id}:# ${alignText(v.count,6)}（已有：${formatUnit(cm.getItemQuantity(v.id))}）\r\n`;
							}
							
							text += "　\r\n"
							
							text += "#b"
							
							text += "#L21#我已集齐，开始制作！#l\r\n";
							text += "#L22#知道了，等我凑齐再来！#l\r\n";
							
							cm.sendSimple(text)
						}else{
							
							var text = `\r\n\t${item.getLevel() + 1}级灵魂药水制作成功，注入戒指可提升：\r\n\r\n`;
							
							text += "#r"
							text += `\t 力量 + ${roleAttr[0]}  \t 敏捷 + ${roleAttr[1]} \t 攻击力 + ${roleAttr[4]}\r\n`
							text += `\t 智力 + ${roleAttr[2]}  \t 运气 + ${roleAttr[3]} \t 魔法力 + ${roleAttr[5]}\r\n`
							
							text += "\r\n"
							text += "#b";
							text += `#L23#好，注入戒指吧！#l\r\n`;
							text += `#L24#我不太满意，丢掉重做一个！\r\n`;
							cm.sendSimple(text)
						
						}
					
					}
					
				}else{
					cm.sendOk(`你还没有#t${id}#，请先制作一个再来！`);
					status = -1;
				}
			}
			
			if(selection == 3){
				var text = `\r\n灵魂药水是提升 #r#t${id}##k 的关键\r\n但每次制作出来的属性都不稳定\r\n\r\n属性随机增加：\r\n`;
				text += `\t力量 0 - ${attrMax[0]}  \t 敏捷 0 - ${attrMax[1]} \t 攻击力 0 - ${attrMax[4]}\r\n`
				text += `\t智力 0 - ${attrMax[2]}  \t 运气 0 - ${attrMax[3]} \t 魔法力 0 - ${attrMax[5]}\r\n`
							
				cm.sendNext(text);
				status = -1;
			}
			
		} else if (status == 2){
			
			if(selection == 11){
				//制作精石戒指
				
				if(!cm.haveItemWithId(id,true)){
					
					
					if(cfg[0].money > money){
						cm.sendOk("金币不足！")
					}else if(cfg[0].money2 > money2){
						cm.sendOk("抵用券不足！")
					}else{
						let itemText;
						for(let i=0;i < cfg[0].item.length ; i++){
							let item = cfg[0].item[i];
							if(item.count > cm.getItemQuantity(item.id)){
								itemText = `所需物品#t${item.id}#不足！`;
								break;
							}
						}
						if(itemText){
							cm.sendOk(itemText);
						}else{
							if(cm.canHold(id)){
								cm.gainItem(id);
								for(let i=0; i < cfg[0].item.length;i++){
									let v = cfg[0].item[i];
									cm.gainItem(v.id,-v.count);
									ch.saveLog(cm.getNpc(),v.id,-v.count);
								}
								cm.gainMeso(-cfg[0].money);
								ch.saveLog(cm.getNpc(),0,-cfg[0].money);
								ch.gainCash(-cfg[0].money2,true);
								ch.saveLog(cm.getNpc(),2,-cfg[0].money2);
								ch.serverMessage(id,"制作成功！");
								ch.saveDayData("今日锻造装备" , 1, true);
								cm.sendOk("制作成功！");
							}else{
								cm.sendOk("背包不足！");
							}
						}
					}
				}else{
					cm.sendOk("你只能同时拥有1个");
				}
					
				cm.dispose();
			
			}else if (selection == 21){
				
				if(updata.money > money){
					cm.sendOk("需求金币不足！")
					status = -1;
				}else if (updata.money2 > money2 ){
					cm.sendOk("需求抵用券不足！")
					status = -1;
				}else{
					
					let itemText;
					for(let i=0; i < updata.item.length; i++){
						let v = updata.item[i];
						if(v.count > cm.getItemQuantity(v.id)){
							itemText = `需求#r#t${v.id}##k数量不足！`;
							break;
						}
					}
					
					if(itemText){
						cm.sendOk(itemText)
						status = -1;
					}else{
					
						setData("灵魂药水" , []);
						
						//生成灵魂药水
						var attr = [];
						
						for(let i=0; i<attrMax.length;i++){
							attr.push(getRandomInt(0,attrMax[i]));
						}
						
						for(let i=0; i < updata.item.length;i++){
							cm.gainItem(updata.item[i].id,-updata.item[i].count);
							ch.saveLog(cm.getNpc(),updata.item[i].id,-updata.item[i].count);
						}
						
						cm.gainMeso(-updata.money);
						ch.saveLog(cm.getNpc(),0,-updata.money);
						ch.gainCash(-updata.money2,true);
						ch.saveLog(cm.getNpc(),2,-updata.money2);
						ch.serverMessage("制作灵魂药水成功！");
						
						setData("灵魂药水" , attr);
						status = 0;
						action(1, 0, 2);
					}
				}
				
			}else if(selection == 23){
				index = 1;
				cm.sendYesNo("注入灵魂药水后，戒指提升1级，是否继续注入？");
				
			}else if(selection == 24){
				index = 2
				
				var text = "\r\n\t丢掉灵魂药水材料也损失，请慎重考虑，确定丢掉重做吗？\r\n\r\n";
				text += "\t需求材料：\r\n#r"
							
				text += `\t\t1．金　币 ${alignText(formatUnit(updata.money),6)}（已有 ${formatUnit(money)}）\r\n`
				text += `\t\t2．抵用券 ${alignText(formatUnit(updata.money2),6)}（已有 ${formatUnit(money2)}）\r\n`
				for(let i=0; i < updata.item.length; i++){
					let v = updata.item[i];
					text += `\t\t${i+3}．#t${v.id}:# ${alignText(v.count,6)}（已有 ${formatUnit(cm.getItemQuantity(v.id))}）\r\n`;
				}
				
				text += "　\r\n"
							
				cm.sendYesNo(text)
				
				
			}else{
				
				cm.dispose();
			}
			
		}else if (status == 3){
			
			if(index == 1){
				//注入属性

				if(ch.haveItemEquipped(id)){
					cm.sendOk("请先将戒指脱下来！");
				} else {
				
					let attr = getData("灵魂药水");
					
					if(attr && attr.length > 0){
						
						var equip = item.copy();
						
							equip.setStr(item.getStr() + attr[0])
							equip.setDex(item.getDex() + attr[1])
							equip.setInt(item.getInt() + attr[2])
							equip.setLuk(item.getLuk() + attr[3])
							equip.setWatk(item.getWatk() + attr[4])
							equip.setMatk(item.getMatk() + attr[5])
							equip.setLevel(item.getLevel() + 1)
							
						cm.removeAllByInventorySlot(1,getEquipSlot(id));
						cm.gainEquip(equip);
						setData("灵魂药水" , []);
						// sendMsg(equip);
						ch.serverMessage(equip, `强化成功！`);
						ch.sendPacket(PacketCreator.showSpecialEffect(15));
						ch.sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/ItemMake/Success"));
						ch.saveDayData("今日锻造装备" , 1, true);
						cm.sendOk("注入成功！");
					}else{
						cm.sendOk("请先制作灵魂药水");
					}
				}
				cm.dispose();
				
			}else if(index == 2){
			
				//点去了确认丢弃重做
				status = 1;
				action(1, 0, 21);
			}
			
		}else {
            cm.dispose();
        }
    }
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
