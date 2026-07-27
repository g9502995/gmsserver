
//100万金币

var status = -1;
let id = 2430111;
var num = 0;
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
	if(num > 100)num = 100;

	if (status === 0) {
		
		if(num > 1){
			let text = `\t你有 #i${id}# #r#t${id}# × ${im.getItemQuantity(id)} #k要打开多少？\r\n\r\n#b`;
			text += `#L${num}#打开${num}个！\r\n`;
			text += "#L1#打开1个！\r\n\r\n";
			im.sendSimple(text);
		}else{
			if(num == 1)open()
			im.dispose();
		}
		
	} else {
		
		if(selection > 0 && num >= selection)open(selection)
		
		im.dispose();
	
	} 
	
}


function open(count = 1){
	if(im.getMeso() < 1000000000){
		im.getPlayer().serverMessage(`打开${count}个`,id,`获得${1000000 * count}金币！`);
		im.gainItem(id , -count,false,false,false);
		im.getPlayer().saveLog(id,-count);
		im.gainMeso(1000000 * count);
		im.getPlayer().saveLog(id,0,1000000 * count);
		
	}else{
		im.dropMessage(1,"使用失败，金币余额太多！");
	}
}
