
//点券卡

var status = -1;
var num = 0;
let id = 2430100;

function start() {
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
	
	num = im.getItemQuantity(id);

	if(num > 1000)num = 1000;

	if (status === 0) {
		
		if(num > 1){
			let text = `\t你有 #i${id}# #r#t${id}# × ${im.getItemQuantity(id)} #k要打开多少？\r\n\r\n#b`;
			text += `#L${num}#打开${num}张！\r\n`;
			text += "#L1#打开1张！\r\n";
			im.sendSimple(text);
		}else{
			if(num == 1)open()
			im.dispose();
		}
		
	} else if (status === 1) {
		if(selection > 0 && num >= selection)open(selection)
		im.dispose();
	
	} else {
		im.dispose();
	}
	
}


function open(count = 1){
	var ch = im.getPlayer();
	if(ch.getCashShop().getCash(1) > 1000000000){
		im.dropMessage(1,"使用失败，点券余额太多")
	}else{
		ch.serverMessage(`打开${count}张`,id,`获得${100 * count}点券！`);
		im.gainItem(id , -count,false,false,false);
		ch.saveLog(id,-count);
		ch.gainCash(100 * count);
		ch.saveLog(id,1,100 * count);
		
	}
}
