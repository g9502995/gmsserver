//装备重置符
var status = -1;
var id = 2430165;
var item = null;
loadScript('./common.js');
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

			var text = `#t${id}#可将装备的卷轴强化等级和属性不影响改造等级还原`;
			text += "需将装备放到装备栏第一格\r\n";

			text += "\r\n#b"
			text += "#L1#准备好了开始吧！#l\r\n";

			im.sendSimple(text);
			
		} else if (status === 1){

			item = im.getInventory(1).getItem(1);

			if(!item || !item.getItemId()){

				im.sendOk("请将需要重置的装备放到装备栏第一格")
				im.dispose();

			} else if ( ii.isCash( item.getItemId() ) ){

				im.sendOk("现金装备不能被重置");
				im.dispose();

			} else if (item.getExpiration() > 0){

				im.sendOk("限时装备不能被重置");
				im.dispose();

			} else if (ii.isPickupRestricted(item.getItemId())){

				im.sendOk("固有道具不能被重置");
				im.dispose();

			} else if (item.getLevel() === 0){

				im.sendOk(`#r #i${item.getItemId()}# #t${item.getItemId()}# #k没有使用过强化卷轴，不能被重置`);
				im.dispose();

			} else {

				var text = "\r\n\t即将对这件装备进行重置，你确定要这么做吗？\r\n";

				text += `\r\n\t#r #i${item.getItemId()}# #t${item.getItemId()}#`
	            text += "\r\n\r\n\r\n#b"
	            text += "#L1#是的，重置这件装备吧！#l\r\n";
	            text += "#L2#不是，我再放放#l\r\n"
				im.sendSimple(text);
			
			} 

		} else if (status === 2){

			if(selection === 1){

				//重置
				var equip = im.getItem().getEquipById(item.getItemId());

				
				var attr = [1, 1, 1, 1, 1, 1, 1, 2];
				var level = item.getLevel() * 1;
				var itemLv = item.getItemLevel() * 1;
				var clv = item.getCustomUpgradeCount();

				
				// 改造等级
				if(clv > 0){
					equip.setCustomUpgradeCount(clv);

					equip.setStr(equip.getStr() + (clv * attr[0]))
					equip.setDex(equip.getDex() + (clv * attr[1]))
					equip.setInt(equip.getInt() + (clv * attr[2]))
					equip.setLuk(equip.getLuk() + (clv * attr[3]))
					equip.setWatk(equip.getWatk() + (clv * attr[4]))
					equip.setMatk(equip.getMatk() + (clv * attr[5]))
					equip.setAcc(equip.getAcc() + (clv * attr[6]))
					equip.setAvoid(equip.getAvoid() + (clv * attr[7]))
				}

				// 道具等级，如永恒的养成类，这里需要根据永恒装备升级大师处Attr数据
				// 永恒支持重置
				if(itemLv > 100){
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



				const name = item.getOwner();
				if(name){
	    			const getData = getName(name);
	    			var setData = [];
	    			getData.forEach(v => {
	    				const data = getName(v);
	    				setData.push({
	    					name : v[1],
	    					attr : v[0] * 1
	    				})
	    			})

		    		setData.forEach( v=> {
		    			
	    				if(v.name === '力'){
	    					equip.setStr(equip.getStr() * 1 + v.attr);
	    				} else if(v.name === '敏'){
	    					equip.setDex(equip.getDex() * 1 + v.attr);
	    				} else if(v.name === '智'){
	    					equip.setInt(equip.getInt() * 1 + v.attr);
	    				} else if(v.name === '运'){
	    					equip.setLuk(equip.getLuk() * 1 + v.attr);
	    				} else if(v.name === '龙'){
	    					equip.setStr(equip.getStr() * 1 + 1);
	    					equip.setDex(equip.getDex() * 1 + 1);
	    					equip.setInt(equip.getInt() * 1 + 1);
	    					equip.setLuk(equip.getLuk() * 1 + 1);
	    					equip.setWatk(equip.getWatk() * 1 + 2);
	    					equip.setMatk(equip.getMatk() * 1 + 3);
	    				} else if (v.name === '血'){
	    					equip.setHp(equip.getHp() * 1 + 50);
	    				} else if (v.name === '蓝'){
	    					equip.setMp(equip.getMp() * 1 + 50);
	    				} else if (v.name === '防'){
	    					equip.setWdef(equip.getWdef() * 1 + 10);
	    				} else if (v.name === '抗'){
	    					equip.setMdef(equip.getMdef() * 1 + 10);
	    				} else if (v.name === '命'){
	    					equip.setAcc(equip.getAcc() * 1 + 10);
	    				} else if (v.name === '迅'){
	    					equip.setSpeed(equip.getSpeed() * 1 + 5);
	    					equip.setJump(equip.getJump() * 1 + 5);
	    				} else if (v.name === '攻'){
	    					equip.setWatk(equip.getWatk() * 1 + 1);
	    				} else if (v.name === '魔'){
	    					equip.setMatk(equip.getMatk() * 1 + 2);
	    				} else if (v.name === '福'){
	    					equip.setUpgradeSlots(equip.getUpgradeSlots() * 1 + 1);
	    				}
		    		})
		    		equip.setOwner(name);
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
