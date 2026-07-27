
var status = 0;
var del = null;
var index = 1;
var slot = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	
	if (CheckStatus(mode)) {
		
	   
			
		if(status == 0){
			
			var text = "\r\n\t\t\t\t\t\t\t\t\t\t\t#e#r背包清理#n#k\r\n\r\n"
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += `#L901##fUI/Basic.img/CheckBox/${setI(1)}# ${setB(1)}装备#l `;
			text += `#L902##fUI/Basic.img/CheckBox/${setI(2)}# ${setB(2)}消耗#l `;
			text += `#L903##fUI/Basic.img/CheckBox/${setI(3)}# ${setB(3)}设置#l `;
			text += `#L904##fUI/Basic.img/CheckBox/${setI(4)}# ${setB(4)}其他#l `;
			text += `#L905##fUI/Basic.img/CheckBox/${setI(5)}# ${setB(5)}特殊#l `;
			
			text += "\r\n\r\n"
			
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n";
			
			
			
			for(let i=1; i <= 96; i++){
				let item = cm.getInventory(index).getItem(i);
				if(item && item.getItemId()){
					text += `#L${i}##i${item.getItemId()}#\t #l`;
				}else{
					text += "\t\t\t\t\t "
				}
				
				if ((i) % 4 === 0) {
					text += "\r\n\r\n";
				}
			}
			
			
			text += "\r\n\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n";
			
			cm.sendSimple(text);
			
			
		} else if(status == 1){
			
			if(selection >= 900){
				index = selection - 900;
				status = -1;
				action(1, 0, 0);
			}else{
				
				del = cm.getInventory(index).getItem(selection);
				if(del && del.getItemId()){
					if(del.getFlag() === 55){
						cm.sendOk("你不能销毁正在锁定中的物品");
						status = -1;
					}else{
						let id = del.getItemId();
						slot = selection;

						var text = `\t你要销毁背包中 #r第 ${index} 栏 第 ${selection} 格 #k的这个道具吗？ \r\n\r\n`;
						text += `\t#i${id}# #r#t${id}# x ${del.getQuantity()}#k\r\n\r\n`;
						text += `\t#e提示：销毁后不可恢复，请谨慎操作！\r\n\r\n`
						cm.sendYesNo(text)
					}
				}else{
					cm.sendOk("读取物品信息失败，请联系管理员！");
					cm.dispose();
				}
			}
		}else if(status === 2){
			cm.getPlayer().saveLog("背包清理",del.getItemId(),-del.getQuantity());
			cm.removeAllByInventorySlot(index,slot);
			cm.sendNext("销毁成功！");
			status = -1;
		} else {
			cm.dispose();
		}
	}	
}

function setB(i){
	return index === i ? "#b" : "#k";
}

function setI(i){
	return index === i ? "1" : "0";
}

function CheckStatus(mode){
	
	if (mode == -1) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
	if (status == -1) {
		cm.dispose();
		return false;
	}	
	return true;
	
}
