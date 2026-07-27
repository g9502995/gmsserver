
//经验池

var status = -1;
var num = 0;
let id = 2430121;

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

	if (status === 0) {
		
		num = im.getItemQuantity(id);

		if(num > 100) num = 100;

		if(num > 1){
			let text = `\t你有 #i${id}# #r#t${id}# × ${im.getItemQuantity(id)} #k要使用多少？\r\n\r\n#b`;
			text += `#L${num}#使用${num}个！\r\n`;
			text += "#L1#使用1个！\r\n";
			im.sendSimple(text);
		}else{
			if(num == 1)open()
			im.dispose();
		}
		
	} else if (status === 1) {
		
		if(selection > 0 && num >= 1)open(selection)
		im.dispose();
	
	} else {
		im.dispose();
	}
	
}


function open(count = 1){
	const exp = 10000 * count;
	im.getPlayer().serverMessage(`打开${count}个`,id,`获得${exp}经验值！`);
	im.gainItem(id , -count);
	im.getPlayer().saveLog(id,-count);
	im.getPlayer().addExp(exp)
	
}
