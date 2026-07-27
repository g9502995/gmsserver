
var status = 0;


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
		cm.dispose();
		// openNpc("9900001");
		return;
	}

	if (mode == 1) {
		status++;
	} else {
		status--;
	}

	if(!cm.getPlayer().isGM()){
		cm.dispose();
		return;
	}
	
	if(status == 0){
		
		var text = "\t\t\t\t\t\t\t\t\t\t\t#e#rGM管理中心#n#k\r\n#b"

		text += "#L1#在线玩家#l\t#L2#超级商店#l\t#L3#整容合集#l\t#L4#UI查询#l\r\n";
		text += "#L5#本图掉落#l\t#L6#制作装备#l\t#L7#强化第1格#l\t#L8#查看第1格#l\r\n";
		text += "#L9#释放技能#l\t#L10#改造装备#l\t#L11#满级第1格#l\t#L12#经验第1格#l\r\n";
	
		
	
		
		text += "\r\n";
		
		cm.sendSimple(text);
		
		
	} else if(status == 1){
		
		
		switch (selection) {
			case 1 : openNpc("在线玩家");break;
			case 2 : openNpc("超级商店");break;
			case 3 : openNpc("Salon");break;
			case 4 : openNpc("UI查询");break;
			case 5 : openNpc("当前地图掉落");break;
			case 6 :

				//这是个例子 
				//const ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
				//const ii = ItemInformationProvider.getInstance()
				//const equip = ii.getEquipById(1702220)
				//equip.setStr(10)
				//equip.setWatk(50)
				//cm.gainEquip(equip);
				
				
				cm.getPlayer().gainEquip(
					1072116,  // itemId：装备唯一ID（示例为某武器ID）
					1000,     // attStr：力量（默认）
					1000,     // attDex：敏捷（默认）
					1000,     // attInt：智力（默认）
					1000,     // attLuk：运气（默认）
					1000,     // attHp：血量（默认）
					1000,     // attMp：蓝量（默认）
					1000,     // pAtk：攻击力（默认）
					10000,     // mAtk：魔法力（默认）
					1000,     // pDef：物理防御（默认）
					1000,     // mDef：魔法防御（默认）
					1000,     // acc：命中率（默认）
					1000,     // avoid：回避（默认）
					1000,     // hands：攻击速度（默认）
					100,     // speed：移动速度（默认）
					100,     // jump：跳跃力（默认）
					7,     // upgradeSlot：可升级次数（默认）
					-1       // expireTime：-1L 表示永久有效
				);
				status = -1;
				break;
			case 7 : 
				var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
				var ii = ItemInformationProvider.getInstance()
				var InventoryManipulator = Java.type('org.gms.client.inventory.manipulator.InventoryManipulator');
                var InventoryType = Java.type('org.gms.client.inventory.InventoryType');
				var item = cm.getInventory(1).getItem(1);
				var text = "当前第一格装备：\r\n"
				text +="\tID：" + item.getItemId() + "\r\n";
				text +="道具名称：#t" + item.getItemId() + "#\r\n";
				text +="未知  ID：" + item.getCashId() + "\r\n";
				text +="拥有数量：" + item.getQuantity() + "\r\n";
				text +="是否封印：" + item.getFlag() + "\r\n";
				text +="到期时限：" + item.getExpiration() + "\r\n";
				text +="当前星级：" + item.getOwner() + "\r\n";
				text +="背包位置：" + item.getPosition() + "\r\n";
				text +="是否能交易：" + !item.isUntradeable() + "\r\n";
				text +="宠物ID：" + item.getPetId() + "\r\n";
				text +="物品等级：" + item.getItemLevel() + " / " +  ii.getEquipLevel(item.getItemId(),true) + "\r\n"
				text +="改造等级：" + item.getCustomUpgradeCount() + "\r\n"
				
				
				
				//读取这件装备的初始属性
				
				var equip = item.copy();
				
				//将原来的装备属性修改
				// equip.setFlag(1);  //锁定
				// equip.setOwner("4星级") //星级
				equip.setStr(item.getStr() * 1 + 9999);
				equip.setDex(item.getDex() * 1 + 9999);
				equip.setInt(item.getInt() * 1 + 9999);
				equip.setLuk(item.getLuk() * 1 + 9999);
				equip.setLevel(9);
				// equip.setCustomUpgradeCount(equip.getCustomUpgradeCount() + 1);


				
				//删除这一格
				InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.EQUIP, 1, 1, false);
				
				//新装备发送到背包;
				InventoryManipulator.addFromDrop(cm.getClient(), equip,true);

				cm.getPlayer().saveCharToDB();
				
				cm.sendOk(text);
				status = -1;
				break;

			case 8 :

				var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
				var ii = ItemInformationProvider.getInstance()
				var InventoryManipulator = Java.type('org.gms.client.inventory.manipulator.InventoryManipulator');
                var InventoryType = Java.type('org.gms.client.inventory.InventoryType');
				var item = cm.getInventory(1).getItem(1);
				var text = "当前第一格装备：\r\n"
				text +="\tID：" + item.getItemId() + "\r\n";
				text +="道具名称：#t" + item.getItemId() + "#\r\n";
				text +="未知  ID：" + item.getCashId() + "\r\n";
				text +="未知  SN：" + item.getSN() + "\r\n";
				text +="拥有数量：" + item.getQuantity() + "\r\n";
				text +="是否封印：" + item.getFlag() + "\r\n";
				text +="到期时限：" + item.getExpiration() + "\r\n";
				text +="当前星级：" + item.getOwner() + "\r\n";
				text +="背包位置：" + item.getPosition() + "\r\n";
				text +="是否能交易：" + !item.isUntradeable() + "\r\n";
				text +="宠物ID：" + item.getPetId() + "\r\n";
				text +="物品等级：" + item.getItemLevel() + " / " +  ii.getEquipLevel(item.getItemId(),true) + "\r\n"
				text +="经验值：" + item.getItemExp() + "\r\n"
				text +="改造等级：" + item.getCustomUpgradeCount() + "\r\n"
				text +="技能激活：" + item.getSkill() + "\r\n"


				cm.sendOk(text);
				status = -1;
				break;
			case 9 : 
				cm.sendGetNumber("请输入释放的技能ID",0,0,99999999);
				break;
			case 10 : 
				var InventoryManipulator = Java.type('org.gms.client.inventory.manipulator.InventoryManipulator');
                var InventoryType = Java.type('org.gms.client.inventory.InventoryType');
				var item = cm.getInventory(1).getItem(1);
				var text = "当前第一格装备：\r\n"
				text +="\tID：" + item.getItemId() + "\r\n";
				text +="道具名称：#t" + item.getItemId() + "#\r\n";
				text +="未知  ID：" + item.getCashId() + "\r\n";
				text +="未知  SN：" + item.getSN() + "\r\n";
				text +="拥有数量：" + item.getQuantity() + "\r\n";
				text +="是否封印：" + item.getFlag() + "\r\n";
				text +="到期时限：" + item.getExpiration() + "\r\n";
				text +="当前星级：" + item.getOwner() + "\r\n";
				text +="背包位置：" + item.getPosition() + "\r\n";
				text +="是否能交易：" + !item.isUntradeable() + "\r\n";
				text +="宠物ID：" + item.getPetId() + "\r\n";
				text +="物品等级：" + item.getItemLevel() + "\r\n"
				

				//读取这件装备的初始属性
				var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
				var equip = item.copy();
				
				//将原来的装备属性修改
				equip.setCustomUpgradeCount(equip.getCustomUpgradeCount() + 1);

				text +="改造等级：" + equip.getCustomUpgradeCount() + "\r\n"
				
				//删除这一格
				InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.EQUIP, 1, 1, false);
				
				//新装备发送到背包;
				InventoryManipulator.addFromDrop(cm.getClient(), equip,true);

				cm.getPlayer().saveCharToDB();

				cm.sendOk(text);

				break;

			case 11 : 
				var InventoryManipulator = Java.type('org.gms.client.inventory.manipulator.InventoryManipulator');
                var InventoryType = Java.type('org.gms.client.inventory.InventoryType');
                var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
				var ii = ItemInformationProvider.getInstance()
				var item = cm.getInventory(1).getItem(1);
				var text = "当前第一格装备：\r\n"
				text +="\tID：" + item.getItemId() + "\r\n";
				text +="道具名称：#t" + item.getItemId() + "#\r\n";
				text +="未知  ID：" + item.getCashId() + "\r\n";
				text +="未知  SN：" + item.getSN() + "\r\n";
				text +="拥有数量：" + item.getQuantity() + "\r\n";
				text +="是否封印：" + item.getFlag() + "\r\n";
				text +="到期时限：" + item.getExpiration() + "\r\n";
				text +="当前星级：" + item.getOwner() + "\r\n";
				text +="背包位置：" + item.getPosition() + "\r\n";
				text +="是否能交易：" + !item.isUntradeable() + "\r\n";
				text +="宠物ID：" + item.getPetId() + "\r\n";
				text +="物品等级：" + item.getItemLevel() + "\r\n"
				

				//读取这件装备的初始属性
				var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
				var equip = item.copy();
				
				//将原来的装备属性修改
				equip.setItemLevel(ii.getEquipLevel(item.getItemId(),true));

				text +="改造等级：" + equip.getCustomUpgradeCount() + "\r\n"
				
				//删除这一格
				InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.EQUIP, 1, 1, false);
				
				//新装备发送到背包;
				InventoryManipulator.addFromDrop(cm.getClient(), equip,true);

				cm.getPlayer().saveCharToDB();

				cm.sendOk(text);

				break;

			case 12 : 
				var InventoryManipulator = Java.type('org.gms.client.inventory.manipulator.InventoryManipulator');
                var InventoryType = Java.type('org.gms.client.inventory.InventoryType');
                var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
				var ii = ItemInformationProvider.getInstance()
				var item = cm.getInventory(1).getItem(1);
				var text = "当前第一格装备：\r\n"
				text +="\tID：" + item.getItemId() + "\r\n";
				text +="道具名称：#t" + item.getItemId() + "#\r\n";
				text +="未知  ID：" + item.getCashId() + "\r\n";
				text +="未知  SN：" + item.getSN() + "\r\n";
				text +="拥有数量：" + item.getQuantity() + "\r\n";
				text +="是否封印：" + item.getFlag() + "\r\n";
				text +="到期时限：" + item.getExpiration() + "\r\n";
				text +="当前星级：" + item.getOwner() + "\r\n";
				text +="背包位置：" + item.getPosition() + "\r\n";
				text +="是否能交易：" + !item.isUntradeable() + "\r\n";
				text +="宠物ID：" + item.getPetId() + "\r\n";
				text +="物品等级：" + item.getItemLevel() + "\r\n"
				text +="物品经验值：" + item.getItemExp() + "\r\n"
				

				//读取这件装备的初始属性
				var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
				var equip = item.copy();
				
				//将原来的装备属性修改
				// equip.setItemLevel(ii.getEquipLevel(item.getItemId(),true) - 1);
				// equip.setItemLevel(7);
				// equip.setSkill(1);
				// equip.setItemExp(99);
				item.gainItemExp(cm.getClient(), 500000);

				text +="改造等级：" + equip.getCustomUpgradeCount() + "\r\n"
				
				//删除这一格
				// InventoryManipulator.removeFromSlot(cm.getClient(), InventoryType.EQUIP, 1, 1, false);
				
				//新装备发送到背包;
				// InventoryManipulator.addFromDrop(cm.getClient(), equip,true);

				// cm.getPlayer().saveCharToDB();

				cm.sendOk(text);

				break;


			default : cm.dispose();
		}

	} else if (status == 2){

		if(selection > 0){
			useBUFF(12101000);
		}else{
			cm.dispose();
		}
		
		
	} else {
		cm.dispose();
	}
}

function openNpc(scriptName) {
    cm.dispose();
    if(scriptName == "杂货商店"){
    	cm.openShopNPC(1011100);
    } else if (scriptName == "超级商店"){
    	cm.openShopNPC(9900001);
    } else {
    	cm.openNpc(9010000, scriptName);
	}
}

function useBUFF(id) {
	var mse = cm.getSkill(id).getEffect(1)
	if(mse != null){
		mse.applyTo(cm.getPlayer())
		cm.message("使用成功")
	}else{
		cm.message("未找到效果" + id)
	}
}

// useBUFF(2022445)
// useBUFF(2022530)
		


// var InventoryType = Java.type('org.gms.client.inventory.InventoryType');
// var str = "增加N个物品是否超出空间："

// str += "\r\n 装备栏1" + cm.getInventory(1).isFull(30)
// str += "\r\n 装备栏2" + cm.getPlayer().getInventory(InventoryType.EQUIP).isFull(30)
// str += "\r\n 消耗栏1" + cm.getPlayer().getInventory(InventoryType.ETC).isFull(30)
// str += "\r\n 设置栏1" + cm.getPlayer().getInventory(InventoryType.SETUP).isFull(30)
// str += "\r\n 其他栏1" + cm.getPlayer().getInventory(InventoryType.USE).isFull(30)
// str += "\r\n 特殊栏1" + cm.getPlayer().getInventory(InventoryType.CASH).isFull(30)


// 发送装备
function sendAttr(obj, item) {
	
	if(!obj)obj = {};

	let cfg = {
		id : "",  			// itemId：装备唯一ID（示例为某武器ID）
		l : null,     		// 力量
		m : null,     		// 敏捷
		z : null,     		// 智力
		y : null,     		// 运气
		hp : null,     		// 血量
		mp : null,     		// 蓝量
		patk : null,     	// 物理攻击（攻击力）
		matk : null,     	// 魔法攻击
		pdef : null,     	// 物理防御（防御力）
		mdef : null,     	// 魔法防御
		acc : null,     	// 命中
		avoid : null,     	// 回避
		hands : null,     	// 攻击速度(手技)
		speed : null,     	// 移动速度
		jump : null,     	// 跳跃力
		up: null,  			// 可升级次数
		expire : -1       	// 到期（分钟数）

	}

	if(obj){
		cfg = Object.assign(cfg,obj);
	}
	
	
	if(item){
		cfg.id = item.getItemId();
		cfg.l = item.getStr();
		cfg.m = item.getDex();
		cfg.z = item.getInt();
		cfg.y = item.getLuk();
		cfg.hp = item.getHp();
		cfg.mp = item.getMp();
		cfg.patk = item 
	}


	cm.getPlayer().gainEquip(
		cfg.id,  // itemId：装备唯一ID（示例为某武器ID）
		cfg.l,     // attStr：力量（默认）
		cfg.m,     // attDex：敏捷（默认）
		cfg.z,     // attInt：智力（默认）
		cfg.y,     // attLuk：运气（默认）
		cfg.hp,     // attHp：血量（默认）
		cfg.mp,     // attMp：蓝量（默认）
		cfg.patk,     // pAtk：物理攻击（默认）
		cfg.matk,     // mAtk：魔法攻击（默认）
		cfg.pdef,     // pDef：物理防御（默认）
		cfg.mdef,     // mDef：魔法防御（默认）
		cfg.acc,     // acc：命中（默认）
		cfg.avoid,     // avoid：回避（默认）
		cfg.hands,     // hands：攻击速度（默认）
		cfg.speed,     // speed：移动速度（默认）
		cfg.jump,     // jump：跳跃力（默认）
		cfg.up,     // upgradeSlot：可升级次数（默认）
		cfg.expire       // expireTime：-1L 表示永久有效
	);
}

