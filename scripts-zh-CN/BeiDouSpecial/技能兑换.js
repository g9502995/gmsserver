loadScript('./common.js');
var status = 0;

const sk1 = getSkills(1)

const sk2 = getSkills(2)

const sk3 = getSkills(3)

const sk4 = getSkills(4)

// 1、2、3、4转技能书售价
const money = [200000,200000,500000,1000000];

// 1、2、3、4转神秘技能书ID
const item = [2430171,2430172,2430173,2430174];

// 需求数量
const count = [10,10,10,10];


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		const ch = cm.getPlayer();


		if (status === 0) {

			var text = "\r\n请问你要兑换什么？\r\n";

			text += "\r\n#b"
			for (var i = 1; i <= 4; i++) {
				text += `#L${i}#我要自选${i}转技能突破能手册！#l\r\n`;
			}

			cm.sendSimple(text);
			
			
	    } else if (status === 1 ) {

	    	var i = selection - 1;

	    	var text = `\r\n想要自选${selection}转突破能手册\r\n`
	    	text += `需给我 #r${formatUnit(count[i])} 本#t${item[i]}:# #k`;
	    	text += `你已有 ${formatUnit(cm.getItemQuantity(item[i]))} 本\r\n`
	    	text += `需给我 #r${formatUnit(money[i])}金币#k 你已有 ${formatUnit(cm.getMeso())}`
	    	text += `\r\n\r\n点击下面能手册进行兑换\r\n`
	    	var skills = getSkills(selection);
	    	text += "\r\n#b"
	    	skills.forEach((v,i) => {
	    		text += `#L${v}##i${v}:##l`
	    		if((i+1) % 6 === 0){
	    			text += "\r\n"
	    		}
	    	})

	    	text += "\r\n\r\n#L999#返回#l";

	    	text += "\r\n　\r\n"


			
			cm.sendSimple(text);

		} else if (status === 2){

			if(selection === 999){

				status = -1;
				action(1,0,0);

			} else {
				var i = getId(selection);
				if(count[i] > cm.getItemQuantity(item[i])){
					cm.sendNext(`#i${item[i]}:# #t${item[i]}:#不足${count[i]}本！`);
				} else if(money[i] > cm.getMeso()){
					cm.sendNext("金币不足！");
				} else if (!cm.canHold(selection)){
					cm.sendNext("背包空间不足");
				} else {
					cm.gainItem(selection);
					cm.gainItem(item[i] , -count[i]);
					ch.saveLog("技能兑换", item[i], -count[i]);
					ch.saveLog("技能兑换", selection,1);
					ch.serverMessage("在市场小贩兑换了" , selection);
					cm.sendNext("请收好，交易愉快！");
				}

				cm.dispose();
			}

		} else if (status === 3){

			

			

			
		} else {
			cm.dispose();
		}
	}	
}

function getId(id) {
	if(sk1.includes(id)){
		return 0;
	}
	if(sk2.includes(id)){
		return 1;
	}
	if(sk3.includes(id)){
		return 2;
	}
	if(sk4.includes(id)){
		return 3;
	}

}


