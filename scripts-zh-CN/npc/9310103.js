//小猫戒指 首饰锻造大师
loadScript('./common.js');
var status;
const PacketCreator = Java.type('org.gms.util.PacketCreator');
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance()
var id = 1112216;

const data = [
  { money: 1000000, item : [ [4033005,500] ],},
  { money: 1500000, item : [ [4033005,1000] ] },
  { money: 2000000, item : [ [4033005,1500] ] },
  { money: 2500000, item : [ [4033005,2000] ] },
  { money: 3000000, item : [ [4033005,2500] ] },
  { money: 3500000, item : [ [4033005,3000],[4033000,1] ] },
  { money: 4000000, item : [ [4033005,3500],[4033000,3] ] },
  { money: 4500000, item : [ [4033005,4000],[4033000,5] ] },
  { money: 5000000, item : [ [4033005,4500],[4033000,8] ] },
  { money: 5500000, item : [ [4033005,5000],[4033000,10] ] },
  { money: 6000000, item : [ [4033005,5500],[4033000,20] ] },
  { money: 6500000, item : [ [4033005,6000],[4033000,30] ] },
  { money: 7000000, item : [ [4033005,6500],[4033000,40] ] },
  { money: 7500000, item : [ [4033005,7000],[4033000,50] ] },
  { money: 8000000, item : [ [4033005,7500],[4033000,60] ] },
  { money: 8500000, item : [ [4033005,8000],[4033000,70] ] },
  { money: 9000000, item : [ [4033005,8500],[4033000,80] ] },
  { money: 9500000, item : [ [4033005,9000],[4033000,90] ] },
  { money: 10000000, item : [ [4033005,9500],[4033000,100] ] },
  { money: 10500000, item : [ [4033005,10000],[4033000,110] ] },
  { money: 11000000, item : [ [4033005,10500],[4033000,120] ] },
  { money: 11500000, item : [ [4033005,11000],[4033000,130] ] },
  { money: 12000000, item : [ [4033005,11500],[4033000,140] ] },
  { money: 12500000, item : [ [4033005,12000],[4033000,150] ] },
  { money: 13000000, item : [ [4033005,12500],[4033000,160] ] },
  { money: 13500000, item : [ [4033005,13000],[4033000,170] ] },
  { money: 14000000, item : [ [4033005,13500],[4033000,180] ] },
  { money: 14500000, item : [ [4033005,14000],[4033000,190] ] },
  { money: 15000000, item : [ [4033005,14500],[4033000,200] ] },
  { money: 15500000, item : [ [4033005,15000],[4033000,220] ] }
];

const attr = [1,1,1,1,1,2,1,2];
var cfg = data[0];
var item = null;
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

        const ch = cm.getPlayer();

        if (status === 0){

        	item = ch.haveItemId(id);
			
			if(item){

				if(item.getLevel() >= data.length){
					cm.sendOk(`你的#i${id}#已达到上限！`);
					cm.dispose();
					return;
				}

				cfg = data[item.getLevel()];

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
            text += `力量#r${alignText(attr[0] * lv)}#k `
            text += `敏捷#r${alignText(attr[1] * lv)}#k `
            text += `攻击力#r${alignText(attr[4] * lv)}#k `
            text += `回避率#r${alignText(attr[6] * lv)}#k\r\n`;
            text += `\t\t\t\t\t\t智力#r${alignText(attr[2] * lv)}#k `
            text += `运气#r${alignText(attr[3] * lv)}#k `
            text += `魔法力#r${alignText(attr[5] * lv)}#k `
            text += `命中率#r${alignText(attr[7] * lv)}#k\r\n`;
            
            
            text += "\r\n"
            text += "\t需求材料：\r\n\r\n";
			
			text += `\t\t#i4031138# 金币 ${alignText(formatUnit(cfg.money),6)}（已有 ${formatUnit(cm.getMeso())}）\r\n`
			
			cfg.item.forEach(v => {
				const [id,count] = v;
				text += `\t\t#i${id}:# #t${id}:# ${alignText(formatUnit(count),6)}（已有：${formatUnit(cm.getItemQuantity(id))}）\r\n`;
			})
		
			
			text +="\r\n#b"
			text +="#L1#我已凑齐，帮我锻造吧！#l\r\n";
			cm.sendSimple(text)

		} else if (status == 1){

			if(selection === 1){

				let itemText;
				for(let i=0;i < cfg.item.length ; i++){
					let v = cfg.item[i];
					if(v[1] > cm.getItemQuantity(v[0])){
						itemText = `所需物品#t${v[0]}#不足！`;
						break;
					}
				}
				if(itemText){
					cm.sendOk(itemText);
				} else if(cfg.money > cm.getMeso()){
					cm.sendOk("金币不足！")
				} else if(!item && !cm.canHold(id)){
					cm.sendOk("背包不足！")
				} else if(item && ch.haveItemEquipped(id)){
					cm.sendOk("请先将戒指脱下来！");
				}else{
						
					for(let i=0; i < cfg.item.length;i++){
						let v = cfg.item[i];
						cm.gainItem(v[0],-v[1]);
						cm.getPlayer().saveLog(cm.getNpc(),v[0],-v[1]);
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
                    equip.setAcc(attr[6] * up)
					equip.setAvoid(attr[7] * up)
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

			} 

	
			cm.dispose();
			
        } else {
            cm.dispose();
        }
    }
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

