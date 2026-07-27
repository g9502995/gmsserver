loadScript('./common.js');
// 浪漫，时装锻造师
var status;
var item;  //强化物品名
var data;

var money1 = 0;
var money2 = 0;
var moneyType = 2;
var rate = false;
var rateId= 4033008;
var rateNum = 12;

var item1; //旧装备
var item2; //新装备
var needMoney = 100000;
var money = 0;
var cfg = {
	slot : [ "帽子", "脸饰", "眼饰", "披风", "手套", "耳环", "上衣", "套服",  "裤裙", "盾牌", "武器", "鞋子"],
	level : [
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 90 },
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 65 },
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 60 },
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 55 },
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 50 },
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 45 },
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 42 },
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 39 },
		{ attr : [1,1,1,1,0,0], money : 4000, rate : 36 },
		{ attr : [1,1,1,1,1,2], money : 9000, rate : 29 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 },
		{ attr : [2,2,2,2,1,2], money : 18000, rate : 10 }
	]
}
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');;
var ii = ItemInformationProvider.getInstance();
var PacketCreator = Java.type('org.gms.util.PacketCreator');

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

        if (status == 0) {
			var text = "我是时装锻造大师，我可以将你的时装强化后赋予更强的能力！你打算让我帮你做什么呢？\r\n\r\n#b"
			text+="#L1#我想强化角色时装#l\r\n";
			text+="#L2#我想把角色时装强化等级继承到新时装#l\r\n";
            cm.sendSimple(text)
		} else if (status == 1){
			
			if(selection === 1){

				var text = "\r\n";

				text += "\t#k强化条件：\t#r需将强化的不限时时装放到装备栏第1格！\r\n";
				
				text += "\r\n\t#k支持部位：#r"
				for(let i=1; i <= cfg.slot.length; i++){
					text+= `\t${cfg.slot[i-1]}`;
					if (i % 6 === 0) {
						text += "\r\n\t\t\t\t\t\t";
					}
				}
				text += "\r\n"

				text += "#L1##b我已放好，下一步！#l\r\n";
				
				text +="　\r\n"

				cm.sendSimple(text);
				
				
				
			} else if(selection === 2){

				var text ="\r\n\t即将把一件旧时装的强化等级和相关属性继承到新时装上！\r\n";

				text += "\t继承时装不会失败，但需支付一点金币作为工费！\r\n\r\n";
				
				text += "\t#k继承条件：#r\t需将强化过的旧时装放到装备栏第1格\r\n";
				text += "\t\t\t\t\t\t\t需将未强化的新时装放到装备栏第2格\r\n";
				
				text += "\r\n\t#k支持部位：#r"
				for(let i=1; i <= cfg.slot.length; i++){
					text+= `\t${cfg.slot[i-1]}`;
					if (i % 6 === 0) {
						text += "\r\n\t\t\t\t\t\t";
					}
				}
				text += "\r\n"
				
				text += "#L2##b我已放好，下一步！#l\r\n";
				
				text +="　\r\n"
				cm.sendSimple(text);
				
			}
		} else if (status == 2){

			if(selection == 1){

				item = cm.getInventory(1).getItem(1);
				
				money1 = cm.getPlayer().getCashShop().getCash(1);
				money2 = cm.getPlayer().getCashShop().getCash(2);
				
				
				if(item && item.getItemId()){
					var id = item.getItemId();
					
					var text = "\r\n\t请你确认强化后的属性和需求材料以及成功率，\r\n\t若失败将失去材料，保留原有等级和属性！\r\n"
					text += "\r\n\t选择时装：#r #i"+item.getItemId()+"# #t"+item.getItemId()+"#＋"+item.getLevel()+" \t\r\n#k"
					
					// cm.message("调试：" + item.getExpiration())
					
					if(ii.isCash(id) && item.getExpiration() === -1 && cfg.slot.includes(getEquipType(id))){
						
						data = cfg.level[item.getLevel()];
						
						if(data && data.money){
							
							text += "\r\n\t赋予属性："
							text += ` 力量 #r${alignText(item.getStr() + data.attr[0],2)}\t#k 敏捷 #r${alignText(item.getDex() + data.attr[1],2)}\t #k攻击力 #r${alignText(item.getWatk() + data.attr[4],2)} #k\r\n`;
							text += `\t\t\t\t\t\t 智力 #r${alignText(item.getInt() + data.attr[2],2)}\t#k 运气 #r${alignText(item.getLuk() + data.attr[3],2)}\t #k魔法力 #r${alignText(item.getMatk() + data.attr[5],2)} #k\r\n\r\n`;
							
							
							text += "\t需求材料：\r\n"
							text += `\t\t\t#L2# #fUI/Basic.img/CheckBox/${isSelect(moneyType,2)}# 使用抵用 × ${data.money} \t（余额 ${money2}）#l\r\n`;
							text += `\t\t\t#L1# #fUI/Basic.img/CheckBox/${isSelect(moneyType,1)}# 使用点券 × ${data.money / 2} \t（余额 ${money1}）#l\r\n\r\n\r\n`;
							
							text += `\t成功几率：${data.rate}%`;
							if(rate){
								text += `〔#r${data.rate + rateNum}%〕`;
							}
							
							text += `\r\n\t\t\t#L3##fUI/Basic.img/CheckBox/${isSelect(rate,true)}# #r使用#t${rateId}:#提高${rateNum}%#l\r\n`;
							text += `\r\n\r\n#L9##fUI/UIWindow.img/Quest/icon6/0# #b好的，开始强化吧#l`
							text += "　\r\n"
							
							cm.sendSimple(text)
						}else{
							cm.sendOk("这件装备已经强化极限了，等后续版本再来吧！")
							cm.dispose();
						}
						
						
					}else{
						text += "\r\n\t你选这件时装我没有能力强化它！\r\n"
						cm.sendOk(text)
						cm.dispose();
					}
					
				}else{
					cm.sendOk("请将需强化的时装放到装备栏第1格！然后找我！")
					cm.dispose();
				}
			}

			if(selection == 2){
				// 继承
				item1 = cm.getInventory(1).getItem(1);
				item2 = cm.getInventory(1).getItem(2);
				
				money = cm.getMeso();
				
				var text = ""
				
				var msg="";
				if(!item1 || !item1.getItemId())msg += "\t（错误）请将旧装备放到装备栏第1格\r\n"
				if(!item2 || !item2.getItemId())msg += "\t（错误）请将新装备放到装备栏第2格\r\n";
				if(item2.getLevel()>0)msg += "\t（错误）新装备（被继承的）不能被强化过的"
				if(item1.getItemId() === item2.getItemId())msg += "\t（错误）两件装备不能一样\r\n";
				if(item1.getOwner() || item2.getOwner())msg += "\t（错误）第2格装备不能有宝石\r\n"
				if(!msg){
					var id = item1.getItemId();
					if( !ii.isCash(id) || item1.getExpiration() > -1 || !cfg.slot.includes(getEquipType(id)) ){
						msg += `\t（错误）装备栏第1格 #i${id}# #t${id}# \r\n`;
					}
					id = item2.getItemId();
					if( !ii.isCash(id) || item2.getExpiration() > -1 || !cfg.slot.includes(getEquipType(id)) ){
						msg += `\t（错误）装备栏第2格 #i${id}# #t${id}# \r\n`;
					}
					
					if(item2.getItemId() && getEquipType(item1.getItemId()) !== getEquipType(item2.getItemId())){
						msg += `\r\n\t（错误）两件装备部位不相同！\r\n`
					}
					
					
				}
				
				if(msg){
					text += "\r\n\t#r摆放的两件时装不符合继承条件，请你认真听我说的话！#k\r\n\r\n"
					text += msg;
					text += "　\r\n"
					cm.sendOk(text)
					cm.dispose();
				}else{
					text +="\t\n你确定要将旧装备等级和属性继承到新装备吗？\r\n"
					text += `\r\n\t旧装备： #r#i${item1.getItemId()}# #t${item1.getItemId()}# ＋${item1.getLevel()} #k（装备栏第1格）\r\n`
				
					text += `\t\t\t\t\t\t\t\t 力量 ${alignText(item1.getStr(),2)}\t敏捷 ${alignText(item1.getDex(),2)}\t攻击力 ${alignText(item1.getWatk(),2)}\r\n`;
					text += `\t\t\t\t\t\t\t\t 智力 ${alignText(item1.getInt(),2)}\t运气 ${alignText(item1.getLuk(),2)}\t魔法力 ${alignText(item1.getMatk(),2)}\r\n`;
					
					text += `\r\n\r\n\t新装备：#r#i${item2.getItemId()}# #t${item2.getItemId()}# #k（装备栏第2格）\r\n`
					
					text += `\r\n\t加工费：金币 × #r${needMoney}#k（余额 ${money}）#l\r\n\r\n`;
					
					text += `#L10##fUI/UIWindow.img/Quest/icon6/0# #b是的，开始继承吧！#l`
					
					text +="　\r\n"
							
					cm.sendSimple(text)
					
				}
			}
			
		} else if (status == 3){
			
			if(selection < 9){
				if(selection == 1)moneyType = selection;
				if(selection == 2)moneyType = selection;
				if(selection == 3)rate = !rate;
				status = 1;
				action(1, 0, 1);
				return;
			}else{

				let ch = cm.getPlayer();
				
				if(selection === 9){
					var msg;
					if(moneyType == 1 && data.money / 2 > money1){
						msg = `点券不足，需要${data.money/2} ， 你仅有 ${money1}`;
					}else if(moneyType == 2 && data.money > money2){
						msg = `抵用券不足，需要${data.money} ， 你仅有 ${money2}`;
					}
					
					if(rate && !cm.getItemQuantity(rateId))msg = "幸运道具不足！";
					
					if(!msg){

						
						
						if(moneyType == 1){
							ch.gainCash(-(data.money / 2))
							ch.saveLog(cm.getNpc(),1,-(data.money / 2));
						}
						if(moneyType == 2){
							ch.gainCash(-data.money,true)
							ch.saveLog(cm.getNpc(),2,-data.money);
						}
						
						if(rate){
							cm.gainItem(rateId,-1);
							ch.saveLog(cm.getNpc(),rateId,-1);
						}
						
						
						
						
						var rateLast = data.rate;
						if(rate)rateLast += rateNum;
						if(getRate(rateLast) || ch.isGM()){
					
							var InventoryManipulator = Java.type('org.gms.client.inventory.manipulator.InventoryManipulator');
							var InventoryType = Java.type('org.gms.client.inventory.InventoryType');
							var equip = item.copy();
							
							//equip.setFlag(1);  //锁定
							//equip.setOwner("4星级") //星级
							equip.setStr(item.getStr() + data.attr[0]);
							equip.setDex(item.getDex() + data.attr[1]);
							equip.setInt(item.getInt() + data.attr[2]);
							equip.setLuk(item.getLuk() + data.attr[3]);
							equip.setWatk(item.getWatk() + data.attr[4]);
							equip.setMatk(item.getMatk() + data.attr[5]);
							equip.setLevel(item.getLevel() + 1);
							
							//删除这一格
							InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.EQUIP, 1, 1, false);
							
							//新装备发送到背包;
							InventoryManipulator.addFromDrop(cm.getClient(), equip,false);
							
							ch.sendPacket(PacketCreator.showSpecialEffect(15));
							
							ch.serverMessage(equip,"强化成功！");
							
							// var world = cm.getClient().getChannelServer()
							
							// world.broadcastPacket(PacketCreator.itemMegaphone(`[系统] ${ch.getName()} : 强化至＋${(item.getLevel() * 1 + 1)}`, false, cm.getClient().getChannel(),equip))
				
							msg = "强化成功";
						}else{
							msg = "强化失败";
							ch.sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/ItemMake/Failure"));
						}

						ch.saveDayData("今日锻造装备" , 1, true);

						
						
					}
					
					if(msg){
						
						cm.sendNext(msg);
						status = 2;
						
					}
					
				}else {
					//继承

					
					if(needMoney > money){
						cm.sendOk("金币不足！");
						
					}else{
						let isok = 1;
						if( !ii.isCash(item1.getItemId()) || item1.getExpiration() > -1 || !cfg.slot.includes(getEquipType(item1.getItemId())) ){
							isok = 0;
						}
						if( !ii.isCash(item2.getItemId()) || item2.getExpiration() > -1 || !cfg.slot.includes(getEquipType(item2.getItemId())) ){
							isok = 0;
						}
						
						if(item2.getItemId() && getEquipType(item1.getItemId()) !== getEquipType(item2.getItemId())){
							isok = 0;
						}

						if(item1.getItemId() === item2.getItemId()){
							isok = 0;
						}

						if(item2.getOwner()){
							isok = 0;
						}
						
						if(isok){


							cm.gainMeso(-needMoney);
							ch.saveLog(cm.getNpc(),0,-needMoney);
					
							var InventoryManipulator = Java.type('org.gms.client.inventory.manipulator.InventoryManipulator');
							var InventoryType = Java.type('org.gms.client.inventory.InventoryType');
							
							var equip1 = item1.copy();


							
							var addAttr = getTotalAttrByLv(cfg.level,item1.getLevel());


							// 按实际强化次数增加的属性继承到另外一件上，不管另外一件是什么属性
							// equip1.setStr(item1.getStr() * 1 - addAttr[0]);
							// equip1.setDex(item1.getDex() * 1 - addAttr[1]);
							// equip1.setInt(item1.getInt() * 1 - addAttr[2]);
							// equip1.setLuk(item1.getLuk() * 1 - addAttr[3]);
							// equip1.setWatk(item1.getWatk() * 1 - addAttr[4]);
							// equip1.setMatk(item1.getMatk() * 1 - addAttr[5]);
							// equip1.setLevel(0);

							// var equip2 = item2.copy();
							// equip2.setStr(item2.getStr() * 1 + addAttr[0]);
							// equip2.setDex(item2.getDex() * 1 + addAttr[1]);
							// equip2.setInt(item2.getInt() * 1 + addAttr[2]);
							// equip2.setLuk(item2.getLuk() * 1 + addAttr[3]);
							// equip2.setWatk(item2.getWatk() * 1 + addAttr[4]);
							// equip2.setMatk(item2.getMatk() * 1 + addAttr[5]);
							// equip2.setLevel(item1.getLevel());


							// 两件装备初始化，为了带有属性的时装可以继承到透明时装上
							var equip1 = ii.getEquipById(item1.getItemId());
							var equip2 = ii.getEquipById(item2.getItemId());

							// 原始属性继承
							if(equip1.getStr() > 0){
								equip2.setStr(equip2.getStr() * 1 + equip1.getStr() * 1);
							}
							if(equip1.getDex() > 0){
								equip2.setDex(equip2.getDex() * 1 + equip1.getDex() * 1);
							}
							
							if(equip1.getInt() > 0){
								equip2.setInt(equip2.getInt() * 1 + equip1.getInt() * 1);
							}
							
							if(equip1.getLuk() > 0){
								equip2.setLuk(equip2.getLuk() * 1 + equip1.getLuk() * 1);
							}

							if(equip1.getWatk() > 0){
								equip2.setWatk(equip2.getWatk() * 1 + equip1.getWatk() * 1);
							}

							if(equip1.getMatk() > 0){
								equip2.setMatk(equip2.getMatk() * 1 + equip1.getMatk() * 1);
							}

							if(item1.getLevel() > 0){
								equip2.setStr(equip2.getStr() * 1 + addAttr[0]);
								equip2.setDex(equip2.getDex() * 1 + addAttr[1]);
								equip2.setInt(equip2.getInt() * 1 + addAttr[2]);
								equip2.setLuk(equip2.getLuk() * 1 + addAttr[3]);
								equip2.setWatk(equip2.getWatk() * 1 + addAttr[4]);
								equip2.setMatk(equip2.getMatk() * 1 + addAttr[5]);
								equip2.setLevel(item1.getLevel());
							}		
							

							//删除这一格
							InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.EQUIP, 1, 1, false);
							//新装备发送到背包;
							InventoryManipulator.addFromDrop(cm.getClient(), equip1,true);
							
							
							//删除这一格
							InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.EQUIP, 2, 1, false);
							
							//新装备发送到背包;
							InventoryManipulator.addFromDrop(cm.getClient(), equip2,true);
							
							ch.sendPacket(PacketCreator.showSpecialEffect(15));
							
							ch.serverMessage(equip2,"继承成功！");
							
							// var world = cm.getClient().getChannelServer()
							
							// world.broadcastPacket(PacketCreator.itemMegaphone(`[系统] ${cm.getPlayer().getName()} : 继承了新属性！`, false, cm.getClient().getChannel(),equip2))
				
				
							cm.sendOk("继承成功")

						}else{
							cm.sendOk("装备不符合要求！");
							
						}
						
					}
					
					cm.dispose();
					
				}
				
				
				
				
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


/**
 * 计算装备从1级升到targetLv，6项属性各累计多少点
 * @param {number} targetLv 目标等级 1~20
 * @returns {number[]} [a1,a2,a3,a4,a5,a6]
 */
function getTotalAttrByLv(level,targetLv) {
	let total = [0,0,0,0,0,0];
	for(let i = 0; i < targetLv; i++){
		const curAttr = level[i].attr;
		for(let j = 0; j < 6; j++){
			total[j] += curAttr[j];
		}
	}
	return total;
}