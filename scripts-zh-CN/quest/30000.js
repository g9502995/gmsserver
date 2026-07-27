/*
StudyJS-By HaiLong

BaseFunction:                                                             type |          mode               |  section
0:  sendYesNo(str) -[弹出Yes/No对话框]                                     1   |  是=1,否=0,结束=-1          |     \
1:  sendNext(str)  -[弹出带有下一个的对话框]                               0   |  下一项=1,结束=-1           |     \
2:  sendPrev(str)  -[弹出带有上一个的对话框]                               0   |  上一项=0,结束=-1           |     \
3:  sendOk(str)    -[弹出带有确定的对话框]                                 0   |  确定=1,结束=-1             |     \
4:  sendNextPrev(str)      -[弹出上&下一个的对话框]                        0   |  上一项=0,下一项=1,停止=-1  |     \
5:  sendAcceptDecline(str) -[弹出接受&拒绝的对话框]                        12  |  接受=1,拒绝=0,结束=-1      |     \  
6:  sendSimple(str) -[弹出带有选项(#L索引# xxx #l)的对话框]                4   |  选择=1,结束=0              |  选择的索引       
7:  sendStyle(str,int styles[]) -[弹出选择造型的对话框]                    0   |  确定=1,取消=0,结束=-1      |  选择的索引
8:  sendGetNumber(str,int def, int min, int max) -[弹出输入数字的对话框]   0   |  确定=1,结束=0              |  输入的数字
9:  setGetText(str) -[保存指定的字符串]                                    \   |          \                  |     \
10: sendGetText(str) -[弹出带有输入字符串的对话框]                         0   |  确定=1,结束=0              |     \
11: getText(str) -[返回sendGetText(str)/setGetText(str)寫入的字符串]       \   |          \                  |     \

AllowFunction-could use directly
-gainMeso获取金币(int gain);
 */


var status = -1;
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');;
var ii = ItemInformationProvider.getInstance();
//Start
function start(mode, type, selection) {
	if (mode <= 0) {
        qm.dispose();
    } else {
       if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0){
			//第一层对话
			qm.sendSimple("欢迎新的冒险者#r#h ##k，为了帮你快速冒险，准备了一些特色功能和奖励！\r\n\r\n中下方#r商城图标 #k旁边的 #r帮助图标 #k是便捷服务入口，丰富的功能祝您旅途愉快~！\r\n\r\n#b#L1#好的，领取新人奖励！")
	    } else if (status == 1) {
			
			const isGive = qm.getPlayer().getData("新人礼包");
			qm.sendOk("送你一些物资，希望对你有所帮助！\r\n\r\n祝你游戏愉快");
			if(!isGive){
				give()
				qm.getPlayer().saveData("新人礼包",1);
			}
			
			qm.forceStartQuest();
			qm.forceCompleteQuest();
			
			qm.dispose();	
		
		} else {
			qm.dispose();
		}
	}
}

function end(mode, type, selection){
	qm.sendOk("希望对您的冒险有所帮助!");		
}

function give(){
	qm.gainMeso(100000);
	qm.gainItem(2000007,50);
	if(qm.haveItem(4161001)){
		qm.gainItem(4161001,-1);
	}
	
	if(qm.haveItem(4161047)){
		qm.gainItem(4161047,-1);
	}
	
	qm.gainItem(2430033,1);	

	addEquip(1002191,[1,1,1,1],1);
	addEquip(1082162,[1,1,1,1],1);
	addEquip(1042009,[1,1,1,1],1);
	addEquip(1062044,[1,1,1,1],1);
	addEquip(1072244,[1,1,1,1],1);
	addEquip(1702224,[1,1,1,1],1);


	qm.gainItem(2023010,100);
	qm.gainItem(5040000,10);

	qm.useItem(2450000);
	qm.useItem(2022070);
	
	qm.gainItem(5000024,1,false,true,2592000000)
	qm.gainItem(1812000,1,false,true,2592000000)
	qm.gainItem(1812001,1,false,true,2592000000)
	qm.gainItem(1812002,1,false,true,2592000000)
	qm.gainItem(1812003,1,false,true,2592000000)
	qm.gainItem(1812004,1,false,true,2592000000)
	qm.gainItem(1812005,1,false,true,2592000000)
	qm.gainItem(1812006,1,false,true,2592000000)

	

	sendMsg(`欢迎新人 『 ${qm.getPlayer().getName()} 』 来到冒险岛！`);
}


function sendMsg(value){
	var players = qm.getClient().getChannelServer().getPlayerStorage().getAllCharacters();
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
	qm.gainEquip(equip);
}



