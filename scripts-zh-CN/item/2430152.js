
//透明时装箱（限时）
var id = 2430152;
var status = -1;
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance()

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
		
		var item = [
			1002186,1082102,1032024,1072153
		];
		
		var etime = new Date().getTime() + (7 * (24 * 60 * 60 * 1000))
		if(im.canHoldAll(item) && im.getItemQuantity(id)){
			for(let i=0; i < item.length;i++){
				
				var equip = ii.getEquipById(item[i])
					equip.setStr(5)
					equip.setDex(5)
					equip.setInt(5)
					equip.setLuk(5)
					equip.setExpiration(etime)
				im.gainEquip(equip);
				sendMsg(equip,im);
				
				
			}
			im.gainItem(id,-1);
			im.getPlayer().saveLog(id,-1);
		}else{
			im.message("背包空间不足！");
		}
		
		
		im.dispose();
		
	
	} else {
		im.dispose();
	}
	
}

function sendMsg(equip,im){
	var PacketCreator = Java.type('org.gms.util.PacketCreator');
	var world = im.getClient().getChannelServer()
	world.broadcastPacket(PacketCreator.itemMegaphone(`[系统] ${im.getPlayer().getName()} : 打开透明时装箱获得！`, false, im.getClient().getChannel(),equip))				
}

