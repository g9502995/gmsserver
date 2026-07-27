var status;
var cfg = [
	{ id: 1003424, name: '黄金三叶草帽子', probability: 500 },
	{ id: 1102361, name: '黄金三叶草背包', probability: 500 },
	{ id: 1042234, name: '黄金三叶草T恤', probability: 500 },
	{ id: 1082415, name: '黄金三叶草手套', probability: 500 },
	{ id: 1062150, name: '黄金三叶草裤子', probability: 500 },
	{ id: 1072639, name: '黄金三叶草鞋', probability: 500 },
	{ id: 1003843, name: '奇怪的狐狸面具', probability: 1000 },
	{ id: 1112952, name: '希拉的愤怒', probability: 2000 },
	{ id: 1112951, name: '麦格纳斯的愤怒',probability : 2000 },
	{ id: 2430200, name: '辉耀装备箱', probability: 1000 },
	{ id: 1012170, name: '恐怖鬼娃的伤口', probability: 2000 },
	{ id: 2430167, name: '动漫时装随机箱', probability: 1000},
	{ id: 2049100, name: '混沌卷轴60%', probability: 100 },
	{ id: 2340000, name: '祝福卷轴', probability: 200 },
	{ id: 2450000, name: '幸运的狩猎', probability: 100 },

];
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
	
	const ch = cm.getPlayer();
	var total = ch.getData("百宝箱抽奖次数") * 1;
	var jifen = ch.getData("百宝箱积分");

	if(total > 0 && jifen === ""){
		ch.saveData("百宝箱积分" , total);
		jifen = total;
	}


    if (status == 0) {

    	var text = "\r\n\t每参与1次百宝箱抽奖，可获得1积分！\r\n\r\n";

    	text += `\t你当前积分：#r${jifen}\r\n\r\n`
		
		text += "#b"

		cfg.forEach((v,i) => {
			text += `#L${i}# #t${v.id}:# （积分：${v.probability}）#l\r\n`;
		})

		text += "\r\n#L999# 返回#l\r\n";
		
		
		cm.sendSimple(text);
		
		
    } else if (status == 1 ) {

    	if(selection === 999){

    		cm.dispose();
    		cm.openNpc(9110009)


    	} else {
	    	const item = cfg[selection];
	    	if(item.id){

	    		if(item.probability > jifen){
	    			cm.sendNext("积分不足！");
	    		} else if (!cm.canHold(item.id)) {
	    			cm.sendNext("背包空间不足！");
	    		} else {
	    			cm.gainItem(item.id,1);
	    			ch.saveLog("抽奖积分",item.id,1);
	    			ch.saveData("百宝箱积分" , -item.probability , true);
	    			cm.sendNext("兑换成功！");
	    			ch.serverMessage("在【快乐百宝箱】使用积分兑换了一件", item.id);
	    		}
	    		

	    	}else {
	    		cm.sendNext("读取数据错误");
	    	}

	    	cm.dispose();
	    }

    	
    	
	} else {
		cm.dispose();
	}
}	

