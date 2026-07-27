var status;
var cfg = [
	{ id: 1003424, name: '黄金三叶草帽子', probability: 50 },
	{ id: 1102361, name: '黄金三叶草背包', probability: 50 },
	{ id: 1042234, name: '黄金三叶草T恤', probability: 50 },
	{ id: 1082415, name: '黄金三叶草手套', probability: 50 },
	{ id: 1062150, name: '黄金三叶草裤子', probability: 50 },
	{ id: 1072639, name: '黄金三叶草鞋', probability: 50 },
	{ id: 1003843, name: '奇怪的狐狸面具', probability: 150 },
	{ id: 1112952, name: '希拉的愤怒', probability: 100 },
	{ id: 1005980, name: '无尽辉耀骑士头盔', probability: 100 },
	{ id: 1005981, name: '无尽辉耀魔法师帽', probability: 100 },
	{ id: 1005982, name: '无尽辉耀弓箭手帽', probability: 100 },
	{ id: 1005983, name: '无尽辉耀飞侠头巾', probability: 100 },
	{ id: 1005984, name: '无尽辉耀海盗帽', probability: 100 },

	{ id: 1102775, name: '无尽辉耀骑士披风', probability: 100 },
	{ id: 1102794, name: '无尽辉耀魔法师披风', probability: 100 },
	{ id: 1102795, name: '无尽辉耀弓箭手披风', probability: 100 },
	{ id: 1102796, name: '无尽辉耀飞侠披风', probability: 100 },
	{ id: 1102797, name: '无尽辉耀海盗披风', probability: 100 },

	{ id: 1042433, name: '无尽辉耀骑士盔甲', probability: 100 },
	{ id: 1042434, name: '无尽辉耀魔法师长袍', probability: 100 },
	{ id: 1042435, name: '无尽辉耀弓箭手斗篷', probability: 100 },
	{ id: 1042436, name: '无尽辉耀飞侠衬衫', probability: 100 },
	{ id: 1042437, name: '无尽辉耀海盗大衣', probability: 100 },

	{ id: 1082636, name: '无尽辉耀骑士手套', probability: 100 },
	{ id: 1082637, name: '无尽辉耀法师手套', probability: 100 },
	{ id: 1082638, name: '无尽辉耀弓箭手手套', probability: 100 },
	{ id: 1082639, name: '无尽辉耀飞侠手套', probability: 100 },
	{ id: 1082640, name: '无尽辉耀海盗手套', probability: 100 },

	{ id: 1062285, name: '无尽辉耀骑士裤', probability: 100 },
	{ id: 1062286, name: '无尽辉耀魔法师裤', probability: 100 },
	{ id: 1062287, name: '无尽辉耀弓箭手裤', probability: 100 },
	{ id: 1062288, name: '无尽辉耀飞侠裤', probability: 100 },
	{ id: 1062289, name: '无尽辉耀海盗裤', probability: 100 },

	{ id: 1073030, name: '无尽辉耀骑士鞋', probability: 100 },
	{ id: 1073032, name: '无尽辉耀法师鞋', probability: 100 },
	{ id: 1073033, name: '无尽辉耀弓箭手鞋', probability: 100 },
	{ id: 1073034, name: '无尽辉耀飞侠鞋', probability: 100 },
	{ id: 1073035, name: '无尽辉耀海盗鞋', probability: 100 },
	{ id: 1012170, name: '恐怖鬼娃的伤口', probability: 100 },
];

var item = null;
var money = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	

    if (status == 0) {

    	var text = "\r\n\t仅支持百宝箱产出的部分极品装备回收\r\n\r\n\t需将要回收极品装备放到物品装备栏的第一格\r\n\r\n";
		
		text += "#b"

		text += "#L1#我已放好，回收吧！#l\r\n";
		text += "#L2#查看可回收的装备#l\r\n";
		text += "\r\n"
		text += "#L3#返回#l\r\n";
		
		
		cm.sendSimple(text);

	} else if (status == 1) {

		if(selection === 1){

			item = cm.getInventory(1).getItem(1);

			if(item){
				var isok = 0;
				var id = item.getItemId();
				cfg.forEach(v => {
					if(v.id === id){
						isok = 1;
						money = v.probability
					}
				})
				if(!isok){
					cm.sendNext(`装备栏第一格的这件 #r#t${id}# #k不在回收之内`);
					cm.dispose();
				} else {
					var text = `这件 #i${id}# #r#t${id}# #k的回收价是：${money}积分\r\n你真的要回收吗？\r\n\r\n`;
					text += "#b"
					text += `#L1#是的，我确定以${money}积分回收#l\r\n`;
					text += "#L2#我再考虑考虑！#l\r\n";
					cm.sendSimple(text);
				}
			} else {
				cm.sendNext("请将需回收的装备放到装备栏第一格");
				cm.dispose();
			}

		} else if (selection === 3) {
			cm.dispose();
			cm.openNpc(9110009);


		} else {
			var text = "仅回收以下物品：\r\n\r\n#b";

			cfg.forEach(v => {
				text += `\t#i${v.id}:# #t${v.id}:# （${v.probability}积分）\r\n`
			})

			cm.sendNext(text);
			status =-1;
		}
		
		
    } else if (status === 2 ) {
    	if(selection === 1){

    		const ch = cm.getPlayer();
			var total = ch.getData("百宝箱抽奖次数") * 1;
			var jifen = ch.getData("百宝箱积分");

			if(total > 0 && jifen === ""){
				ch.saveData("百宝箱积分" , total);
				jifen = total;
			}

			ch.saveLog("极品回收", item.getItemId(), -1);
			ch.serverMessage("回收了极品装备",item.getItemId());
			cm.removeAllByInventorySlot(1,1);

			ch.saveData("百宝箱积分" , money , true);
			cm.sendNext(`回收成功，本次回收获得 ${money} 积分。当前积分总额：${jifen * 1 + money}`);
			cm.dispose();


    	}else {
    		cm.dispose();
    	}
    	
	} else {
		cm.dispose();
	}
}	

