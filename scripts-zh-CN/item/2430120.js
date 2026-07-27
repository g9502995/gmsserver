
//经验池

var status = -1;
var num = 0;
let id = 2430120;

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

    if(num > 100) num = 100;

	if (status === 0) {

		let level = im.getPlayer().getLevel();

		if(level == 10 && im.getPlayer().getJob() == "BEGINNER"){
			im.dropMessage(1,"请转职后再使用！")
			im.dispose();
			return;
		}
		
		if(num > 1){
			let text = `\t你有 #i${id}# #r#t${id}# × ${im.getItemQuantity(id)} #k要使用多少？\r\n\r\n#b`;
			if(level > 10)text += `#L${num}#使用${num}个！\r\n`;
			text += "#L1#使用1个！\r\n\r\n";
			im.sendSimple(text);
			
		}else{
			if(num == 1)open(1)
			im.dispose();
		}
		
	} else if (status === 1) {
		
		
		if(selection > 0 && num >= selection)open(selection);
		
		im.dispose();
	
	} else {
		im.dispose();
	}
	
}


function open(count = 1){
	const ch = im.getPlayer();
	const exp = 1000 * count;
	ch.serverMessage(`打开${count}个`,id,`获得${exp}经验值！`);
	im.gainItem(id , -count);
	ch.saveLog(id,-count);
	ch.addExp(exp);
	
}
