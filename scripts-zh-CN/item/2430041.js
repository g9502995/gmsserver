//金币袋
var id = 2430041;
function start(){
    
    if(im.getItemQuantity(id)){
		var role = im.getPlayer();
		var add = getRandomInRange();
		im.gainMeso(add);
		im.gainItem(id,-1);
		role.saveLog("打开礼包",id,0,add);
		role.saveLog("打开礼包",id,-1);
	
		role.serverMessage("使用了",id,"获得了 " + add + " 金币！");
	}

    im.dispose();
}


// 随机生成一个数字
function getRandomInRange(min = 60000 , max = 500000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

