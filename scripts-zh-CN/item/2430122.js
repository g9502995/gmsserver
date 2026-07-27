
//经验池
var status = -1;
var num = 0;
let id = 2430122;

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
		
		const total = im.getItemQuantity(id);
		
		num = total;


		if(num > 1000) num = 1000;
		
		if(num > 1){
			let text = `\t你有 #i${id}# #r#t${id}# × ${total} #k要使用多少？\r\n\r\n#b`;
			text += `#L${num}#使用${num}个！\r\n`;
			text += "#L1#使用1个！\r\n\r\n";
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
	const ch = im.getPlayer();
	const exp = 100000 * count;
	ch.serverMessage(`打开${count}个`,id,`获得${exp}经验值！`);
	im.gainItem(id , -count);
	ch.saveLog(id,-count);
	ch.gainExp(exp);
	
}
