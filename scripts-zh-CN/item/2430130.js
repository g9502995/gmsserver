
//能力水

var status = -1;

let id = 2430130;

let total = 0;

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

    const count = im.getItemQuantity(id)
	
	num = count > 1000 ? 1000 : count;
	
	total = im.getPlayer().getData(id.toString()) * 1;

	if (status === 0) {
			
		let text = `\t你有 #i${id}# #r#t${id}# × ${im.getItemQuantity(id)} #k `
		text += `它可以增加能力值！\r\n\t你已累计使用#r${total}个#k，还要服用吗？\r\n\r\n`;
		text += "#b"
		
		if(num > 1){
			text += `#L${num}#服用${num}个\r\n`;
			text += "#L1#服用1个\r\n";
		}else{
			text += "#L1#是的，现在服用#l";
		}
		
		im.sendSimple(text);
		
	} else if (status === 1) {
		
		if(selection > 0 && num >= selection)open(selection)
		
		im.dispose();
	
	} else {
		im.dispose();
	}
	
}


function open(count = 1){
	let ch = im.getPlayer();
	ch.serverMessage(`服用${count}个`,id,`获得${count}点能力值！`)
	im.gainItem(id , -count,false,false,false);
	ch.saveLog(id,-count);
	ch.changeRemainingAp((im.getPlayer().getRemainingAp() * 1) + count,false);
	
	ch.saveData(id.toString(),  count, true);
}

