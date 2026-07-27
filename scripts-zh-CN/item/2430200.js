const id = 2430200;
//辉耀自选宝箱
var cfg = [
	{ id: 1005980, name: '无尽辉耀骑士头盔', job: 1 },
	{ id: 1005981, name: '无尽辉耀魔法师帽', job: 2 },
	{ id: 1005982, name: '无尽辉耀弓箭手帽', job: 3 },
	{ id: 1005983, name: '无尽辉耀飞侠头巾', job: 4 },
	{ id: 1005984, name: '无尽辉耀海盗帽', job: 5 },

	{ id: 1102775, name: '无尽辉耀骑士披风', job: 1 },
	{ id: 1102794, name: '无尽辉耀魔法师披风', job: 2 },
	{ id: 1102795, name: '无尽辉耀弓箭手披风', job: 3 },
	{ id: 1102796, name: '无尽辉耀飞侠披风', job: 4 },
	{ id: 1102797, name: '无尽辉耀海盗披风', job: 5 },

	{ id: 1042433, name: '无尽辉耀骑士盔甲', job: 1 },
	{ id: 1042434, name: '无尽辉耀魔法师长袍', job: 2 },
	{ id: 1042435, name: '无尽辉耀弓箭手斗篷', job: 3 },
	{ id: 1042436, name: '无尽辉耀飞侠衬衫', job: 4 },
	{ id: 1042437, name: '无尽辉耀海盗大衣', job: 5 },

	{ id: 1082636, name: '无尽辉耀骑士手套', job: 1 },
	{ id: 1082637, name: '无尽辉耀法师手套', job: 2 },
	{ id: 1082638, name: '无尽辉耀弓箭手手套', job: 3 },
	{ id: 1082639, name: '无尽辉耀飞侠手套', job: 4 },
	{ id: 1082640, name: '无尽辉耀海盗手套', job: 5 },

	{ id: 1062285, name: '无尽辉耀骑士裤', job: 1 },
	{ id: 1062286, name: '无尽辉耀魔法师裤', job: 2 },
	{ id: 1062287, name: '无尽辉耀弓箭手裤', job: 3 },
	{ id: 1062288, name: '无尽辉耀飞侠裤', job: 4 },
	{ id: 1062289, name: '无尽辉耀海盗裤', job: 5 },

	{ id: 1073030, name: '无尽辉耀骑士鞋', job: 1 },
	{ id: 1073032, name: '无尽辉耀法师鞋', job: 2 },
	{ id: 1073033, name: '无尽辉耀弓箭手鞋', job: 3 },
	{ id: 1073034, name: '无尽辉耀飞侠鞋', job: 4 },
	{ id: 1073035, name: '无尽辉耀海盗鞋', job: 5 }
];
const job = ["战士","法师","弓箭手","飞侠","海盗"];
var equip = [];
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

		const ch = im.getPlayer();
		// const id = im.getScriptName() * 1;


		if(status === 0){
 		
	 		var text = "请选择你需要的职业？\r\n\r\n#b"
	 		

	 		job.forEach((v,i)=>{
	 			text += `#L${i+1}# ${v}#l\t`;
	 		})

	 		text += "　\r\n"

	 		im.sendSimple(text);

	 	} else if (status === 1){
	 		
	 		var text = "请选择你需要的装备！\r\n\r\n#b"
	 		

	 		equip = cfg.filter(v=> v.job === selection);

	 		equip.forEach(v=>{
	 			text += `#L${v.id}# #i${v.id}:# #t${v.id}:# #l \r\n `
	 		})

	 		im.sendSimple(text);

	 	} else if (status === 2){

	 		if(im.canHold(selection)){
	 			im.gainItem(selection,1,false,true,false);
	 			im.gainItem(id, -1);
	 			im.serverMessage("打开了辉耀装备自选箱获得了",selection);
	 		} else {
	 			im.dropMessage(1,"背包空间不足！");
	 		}

	 		im.dispose();


	 	} else {
	 		im.dispose();
	 	}
		

		
	}

}



