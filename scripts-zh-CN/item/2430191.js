//装备重置符
var status = -1;
var id = 2430191;
var item1 = null;
var item2 = null;

var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');;
var ii = ItemInformationProvider.getInstance();

												
function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {

	if (mode <= 0) {
        im.dispose();
    } else {
	    if (mode === 1) {
	        status++;
	    } else {
	        status--;
	    }
		
		if(!im.haveItem(id)){
			//强开
			im.dispose();
			return;
		}

		if (status === 0) {

			var text = `#t${id}#可将装备的卷轴强化等级转移到另外一件装备上`;
			text += "需将强化过的旧装备放到装备栏第1格\r\n";
			text += "需将未强化的新装备放到装备栏第2格\r\n"
			text += "\r\n#b"
			text += "#L1#准备好了开始吧！#l\r\n";

			im.sendSimple(text);
			
		} else if (status === 1){

			item1 = im.getInventory(1).getItem(1);
			item2 = im.getInventory(1).getItem(2);

			if(!item1 || !item1.getItemId()){

				im.sendOk("需将强化过的旧装备放到装备栏第1格")
				im.dispose();

			} else if (!item2 || !item2.getItemId()){

				im.sendOk("需将未强化的新装备放到装备栏第2格")
				im.dispose();

			} else if (item1.getItemId() === item2.getItemId()){

				im.sendOk("两件装备一样，没有必要转移！");
				im.dispose();

			} else if ( ii.isCash( item1.getItemId() ) || ii.isCash( item2.getItemId() ) ){

				im.sendOk("现金装备不能被转移");
				im.dispose();

			} else if (item1.getExpiration() > 0 || item2.getExpiration() > 0){

				im.sendOk("限时装备不能被转移");
				im.dispose();

			} else if (ii.isPickupRestricted(item1.getItemId()) || ii.isPickupRestricted(item2.getItemId()) ){

				im.sendOk("固有道具不能被转移");
				im.dispose();

			} else if (item1.getLevel() === 0){

				im.sendOk(`#r #i${item1.getItemId()}# #t${item1.getItemId()}# #k旧装备没有使用过强化卷轴!`);
				im.dispose();

			} else if (item2.getLevel() > 0){

				im.sendOk(`#r #i${item2.getItemId()}# #t${item2.getItemId()}# #k新装备已被强化过卷轴!`);
				im.dispose();

			} else {

				var text = "";

				text += `\t旧装备：#r #i${item1.getItemId()}# #t${item1.getItemId()}#\r\n`;
				text += `\t新装备：#r #i${item2.getItemId()}# #t${item2.getItemId()}#\r\n`;
	            text += "\r\n\r\n\r\n#b"
	            text += "#L1#是的，开始转移吧！#l\r\n";
	            text += "#L2#不是，我再放放#l\r\n"
				im.sendSimple(text);
			
			} 

		} else if (status === 2){

			if(selection === 1){

				//重置
				var equip = im.getItem().getEquipById(item1.getItemId());

				
				var attr = [1, 1, 1, 1, 1, 1, 1, 2];
				var level = item.getLevel() * 1;
				var itemLv = item.getItemLevel() * 1;
				var clv = item.getCustomUpgradeCount();

				
				// 改造等级
				if(clv > 0){
					equip.setCustomUpgradeCount(clv);

					equip.setStr(equip.getStr() + (level * attr[0]))
					equip.setDex(equip.getDex() + (level * attr[1]))
					equip.setInt(equip.getInt() + (level * attr[2]))
					equip.setLuk(equip.getLuk() + (level * attr[3]))
					equip.setWatk(equip.getWatk() + (level * attr[4]))
					equip.setMatk(equip.getMatk() + (level * attr[5]))
					equip.setAcc(equip.getAcc() + (level * attr[6]))
					equip.setAvoid(equip.getAvoid() + (level * attr[7]))
				}

				// 道具等级，如永恒的养成类，这里需要根据永恒装备升级大师处Attr数据
				if(itemLv > 1){
					equip.setItemLevel(itemLv);

					itemLv--;
					equip.setStr(equip.getStr() + (itemLv * attr[0]))
					equip.setDex(equip.getDex() + (itemLv * attr[1]))
					equip.setInt(equip.getInt() + (itemLv * attr[2]))
					equip.setLuk(equip.getLuk() + (itemLv * attr[3]))
					equip.setWatk(equip.getWatk() + (itemLv * attr[4]))
					equip.setMatk(equip.getMatk() + (itemLv * attr[5]))
					equip.setAcc(equip.getAcc() + (itemLv * attr[6]))
					equip.setAvoid(equip.getAvoid() + (itemLv * attr[7]))
				}

				
				equip.setFlag(item.getFlag());
				
				



				//删除这一格
				im.removeAllByInventorySlot(1,1);
				
				im.gainEquip(equip);

				im.gainItem(id, -1);
				im.getPlayer().saveLog(id,-1);
				im.getPlayer().serverMessage("重置了" , equip);

				im.sendOk("重置成功！");

				im.dispose();
				
			} else {
				im.sendOk("好的，把装备放第一格再使用重置卷吧！");
				im.dispose();
			}


		} else {
			im.dispose();
		}
	}
	
}
