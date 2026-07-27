
//动漫时装箱
const id = 2430167;
function start() {

	if(!im.haveItem(id)){
		//强开
		im.dispose();
		return;
	}

	var data = [];
	for (var i = 1; i < 94; i++) {
		data.push( 1076000 + i );
	}

	const ch = im.getPlayer();
	// const id = im.getScriptName() * 1;


	const item = data[Math.floor(Math.random() * data.length)];
	if(im.canHold(item)){
		im.gainItem(item,1);
		im.gainItem(id,-1,false,false);
		ch.serverMessage("打开了 " + im.getItem().getName(id) + " 获得了", item);
	}else{
		im.message("背包空间不足！");
	}
		
	im.dispose();

}




