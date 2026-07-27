loadScript('./common.js');
const ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');;
const ii = ItemInformationProvider.getInstance();

var items = [
	{name : "力", id : 4008101, type : "C", str : 5},
	{name : "力", id : 4008102, type : "B", str : 15},
	{name : "力", id : 4008103, type : "A", str : 25},
	{name : "力", id : 4008104, type : "S", str : 40},
	{name : "敏", id : 4008201, type : "C", dex : 5},
	{name : "敏", id : 4008202, type : "B", dex : 15},
	{name : "敏", id : 4008203, type : "A", dex : 25},
	{name : "敏", id : 4008204, type : "S", dex : 40},
	{name : "智", id : 4008301, type : "C", int : 5},
	{name : "智", id : 4008302, type : "B", int : 15},
	{name : "智", id : 4008303, type : "A", int : 25},
	{name : "智", id : 4008304, type : "S", int : 40},
	{name : "运", id : 4008401, type : "C", luk : 5},
	{name : "运", id : 4008402, type : "B", luk : 15},
	{name : "运", id : 4008403, type : "A", luk : 25},
	{name : "运", id : 4008404, type : "S", luk : 40},
];


var hove = [];

var item = null;
var equip = null;
var index ;
var slot = ["眼饰","帽子","上衣","套装","裤裙","鞋子", "手套", "披风", "耳环"];
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

		if (status === 0){

			hove = [];
			index = 0;
			equip = cm.getInventory(1).getItem(1);

			if(!equip){
				cm.sendNext(`请将要镶嵌的#r时装放到装备栏第一格#k\r\n\r\n仅支持以下部位：\r\n${slot.join("，")}`);
				cm.dispose()
			} else if (!ii.isCash(equip.getItemId())) {
				cm.sendNext(`请将要镶嵌的#r时装放到装备栏第一格#k\r\n\r\n仅支持以下部位：\r\n${slot.join("，")}`);
				cm.dispose()
			} else if (equip.getExpiration() !== -1){
				cm.sendNext("不能是一件限时的装备")
				cm.dispose();
			} else if (!slot.includes(getEquipType(equip.getItemId()))){
				cm.sendNext(`请将要镶嵌的#r时装放到装备栏第一格#k\r\n\r\n仅支持以下部位：\r\n${slot.join("，")}`);
				cm.dispose()
			} else {

				const id = equip.getItemId();
				var text = "\r\n\t请点击装备槽位进行镶嵌宝石\r\n"
					
					text += "\r\n\t"
					for(let i=0; i < 43; i++){
						text +="#fMap/MapHelper/minimap/match#";
					}
					
					text += "\r\n";
					
					text += "\r\n\t选择装备：#r #i"+id+"# #t"+id+"# #k"

					text +="\r\n"

					text += "\t镶嵌宝石：\r\n"

					text += "#b";

				item = getName(equip.getOwner());

				for (var i = 0; i < 4; i++) {
					text += `\t\t\t#L${i}# 宝石槽位${i+1}`
					if(!item[i]){
						text += `（空）`
					} else {

						const t = getGemId(item[i],items);
						text += `（#i${t.id}:# #t${t.id}:#）`
					}
					
					text += `#l\r\n`;
				}

				text += "　\r\n"

				cm.sendSimple(text);
			}


		} else if (status === 1){

			index = selection;

			if(item[selection]){
				// 已镶嵌宝石

				var id = getGemId(item[selection] , items);
				var text = `已镶嵌了 #i${id.id}:# #r#t${id.id}:##k 你打算摘掉吗？\r\n\r\n`
				text += "#b"
				text += "#L1#是的，帮我摘掉#l\r\n";
				text += "#L999#返回#l\r\n"
				cm.sendSimple(text)

			}  else {
				// 未镶嵌宝石

				items.forEach(v=>{
					const count = cm.getItemQuantity(v.id);
					if(count > 0){
						hove.push([v.id, count])
					}
				})

				if(hove.length > 0){

					var text = "你打算镶嵌什么宝石呢？\r\n\r\n#b";
					hove.forEach( (v,i)=> {
						const [id , count] = v;
						text += `#L${id}# #i${id}:# #t${id}:# × ${count} #l`;
						if( (i + 1) % 2 === 0 ){
							text += "\r\n"
						} else {
							text += "\t";
						}
					})

					cm.sendSimple(text);

				} else {
					cm.sendNext("你没有宝石，请先合成吧！");
					cm.dispose();
				}

			}

		} else if (status === 2){
			
			var t = item[index]; 
			
			if(t){

				if(selection === 999){
					status =-1;
					action(1,0,0);
				} else {

					//摘除
					var id = getGemId(t , items);
					if(cm.canHold(id.id)){
						var gemData = items.find( v => v.id === id.id);
						var gemName = gemData.type + gemData.name

						item[index] = null;

						if(gemData.str > 0){
							equip.setStr(equip.getStr() * 1 - gemData.str);
						}

						if(gemData.dex > 0){
							equip.setDex(equip.getDex() * 1 - gemData.dex);
						}

						if(gemData.int > 0){
							equip.setInt(equip.getInt() * 1 - gemData.int);
						}

						if(gemData.luk > 0){
							equip.setLuk(equip.getLuk() * 1 - gemData.luk);
						}

						equip.setOwner(item.join(""));
						var copy = equip.copy();

						cm.removeAllByInventorySlot(1,1);
						cm.gainItem(id.id , 1);
						cm.gainEquip(copy);
						cm.sendNext("摘除成功");
						status = -1;
					} else {
						cm.sendNext("背包空间不足！");
						cm.dispose();
					}
				}


				
				
			} else {
				//镶嵌
				var gemData = items.find( v => v.id === selection);
				var gemName = gemData.type + gemData.name

				item[index] = gemName;

				if(gemData.str > 0){
					equip.setStr(equip.getStr() * 1 + gemData.str);
				}

				if(gemData.dex > 0){
					equip.setDex(equip.getDex() * 1 + gemData.dex);
				}

				if(gemData.int > 0){
					equip.setInt(equip.getInt() * 1 + gemData.int);
				}

				if(gemData.luk > 0){
					equip.setLuk(equip.getLuk() * 1 + gemData.luk);
				}

				equip.setOwner(item.join(""));
				var copy = equip.copy();

				cm.removeAllByInventorySlot(1,1);
				cm.gainEquip(copy);
				cm.gainItem(selection,-1);
				cm.getPlayer().serverMessage(`镶嵌了【${gemName}】宝石` , copy);



				cm.sendNext("镶嵌成功");
			
				status = -1;
			}


			
		
		
		} else {
			cm.dispose();
		}
	}
}

// 根据槽位数据得到镶嵌的什么宝石
function getGemId(item,items) {
	var value = getName(item,1);
	return items.find(v => v.type === value[0] && v.name === value[1]);
}