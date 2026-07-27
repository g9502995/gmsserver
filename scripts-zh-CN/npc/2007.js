

var status = -1;
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance();
//Start
function start(mode, type, selection) {
	if (mode <= 0) {
        cm.dispose();
    } else {
       if (mode == 1) {
            status++;
        } else {
            status--;
        }

        const isGive = cm.getPlayer().getData("新人礼包")

        if(!isGive){
        	cm.sendNext("欢迎你新的冒险者 #b#h ##k，\r\n\r\n中下方#r商城图标 #k旁边的 #r帮助图标 #k是便捷服务入口，丰富的游戏功能帮助你更好的体验，祝您旅途愉快~！")
        	give();
        	cm.getPlayer().saveData("新人礼包" , 1);
        }

       
		cm.dispose();
		
	}
}


function give(){
	cm.gainMeso(100000);
	cm.gainItem(2000007,50);
	if(cm.haveItem(4161001)){
		cm.gainItem(4161001,-1);
	}
	
	if(cm.haveItem(4161047)){
		cm.gainItem(4161047,-1);
	}
	
	cm.gainItem(2430033,1);	

	addEquip(1002191,[1,1,1,1],1);
	addEquip(1082162,[1,1,1,1],1);
	addEquip(1042009,[1,1,1,1],1);
	addEquip(1062044,[1,1,1,1],1);
	addEquip(1072244,[1,1,1,1],1);
	addEquip(1702224,[1,1,1,1],1);


	cm.gainItem(2023010,100);
	cm.gainItem(5040000,10);

	cm.useItem(2450000);
	cm.useItem(2022070);
	
	cm.gainItem(5000024,1,false,true,2592000000)
	cm.gainItem(1812000,1,false,true,2592000000)
	cm.gainItem(1812001,1,false,true,2592000000)
	cm.gainItem(1812002,1,false,true,2592000000)
	cm.gainItem(1812003,1,false,true,2592000000)
	cm.gainItem(1812004,1,false,true,2592000000)
	cm.gainItem(1812005,1,false,true,2592000000)
	cm.gainItem(1812006,1,false,true,2592000000)

	

	sendMsg(`欢迎新人 『 ${cm.getPlayer().getName()} 』 来到冒险岛！`);
}


function sendMsg(value){
	var players = cm.getClient().getChannelServer().getPlayerStorage().getAllCharacters();
	for(let i=0;i < players.length; i++){
		players[i].startMapEffect(value ,5120007,10000);
		players[i].dropMessage(6,`[系统] ${value}`);
	}
}


function addEquip(id,attr,level = 0) {
	var equip = ii.getEquipById(id)
	var cfg = {
		str : 0,   // 力量
		dex : 0,  //敏捷
		int : 0,  //智力
		luk : 0,   //幸运
		watk : 0, // 物理攻击
		matk : 0, //魔法力（默认）
		acc : 0, //命中（默认）
		avoid : 0,// 回避（默认）
	}

	if(attr){
		if(attr[0])cfg.str += attr[0];
		if(attr[1])cfg.dex += attr[1];
		if(attr[2])cfg.int += attr[2];
		if(attr[3])cfg.luk += attr[3];
		if(attr[4])cfg.watk += attr[4];
		if(attr[5])cfg.matk += attr[5];
		if(attr[6])cfg.acc += attr[6];
		if(attr[7])cfg.avoid += attr[7];
	}

	equip.setStr(equip.getStr() + cfg.str)
	equip.setDex(equip.getDex() + cfg.dex)
	equip.setInt(equip.getInt() + cfg.int)
	equip.setLuk(equip.getLuk() + cfg.luk)
	equip.setWatk(equip.getWatk() + cfg.watk)
	equip.setMatk(equip.getMatk() + cfg.matk)
	equip.setAcc(equip.getAcc() + cfg.acc)
	equip.setAvoid(equip.getAvoid() + cfg.avoid)
	equip.setLevel(level);
	cm.gainEquip(equip);
}



