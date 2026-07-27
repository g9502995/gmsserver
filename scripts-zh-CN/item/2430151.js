
//透明时装自选箱
var id = 2430151;
var status = -1;
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance()

var item = [
	1102039,1092067,1702224,1012057,1022079,1072153,1032024,1002186,1082102
];
function start()  {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
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

		var text = "你可以任选一件以下物品！\r\n\r\n"
		for(let i=0; i < item.length; i++){
			text += `#L${i}##i${item[i]}:##l\t\t`;
			if((i+1) % 4 == 0){
				text += "\r\n\r\n";
			}
		}
		
		text += "　\r\n";
		im.sendSimple(text);
		
	}else if (status === 1){


		
		if(im.canHold(item[selection])){
			
			var equip = ii.getEquipById(item[selection])
			im.gainEquip(equip);
			
			
			im.gainItem(id,-1);
			im.getPlayer().saveLog(id,-1);
			
			
			// var world = im.getClient().getChannelServer()
			// world.broadcastPacket(PacketCreator.itemMegaphone(`[系统] ${im.getPlayer().getName()} : 打开${ii.getName(id)}获得！`, false, im.getClient().getChannel(),equip))	
			im.getPlayer().serverMessage(`打开了 [${ii.getName(id)}] 获得了`, equip);
		}else{
			im.message("背包空间不足！");
		}
		
		
		
		im.dispose();
		
	
	} else {
		im.dispose();
	}
	
}

