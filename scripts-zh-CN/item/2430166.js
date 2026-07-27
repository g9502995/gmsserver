const id = 2430166;
//辉耀宝箱
var data = [
	1005980,
	1005981,
	1005982,
	1005983,
	1005984,
	1102775,
	1102794,
	1102795,
	1102796,
	1102797,
	1042433,
	1042434,
	1042435,
	1042436,
	1042437,
	1082636,
	1082637,
	1082638,
	1082639,
	1082640,
	1062285,
	1062286,
	1062287,
	1062288,
	1062289,
	1073030,
	1073032,
	1073033,
	1073034,
	1073035
];
function start() {

	if(!im.haveItem(id)){
		//强开
		im.dispose();
		return;
	}

	const ch = im.getPlayer();
	// const id = im.getScriptName() * 1;

	const item = data[Math.floor(Math.random() * data.length)];
	if(im.canHold(item)){
		const equip = im.gainItem(item,1,false,true,false);
		im.gainItem(id,-1,false,false);
		ch.serverMessage("打开了 " + im.getItem().getName(id) + " 获得了", equip);
	}else{
		im.message("背包空间不足！");
	}

	im.dispose();

}




