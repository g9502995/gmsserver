loadScript('./common.js');
var status = -1;
const id = 2430197;
const count = 10;
const item = 2430177;
const money = 5000000;

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {

    if(mode <= 0){
        im.dispose();
        return;
    }
	
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    const total = im.getItemQuantity(id);

    if(!total){
		//强开
		im.dispose();
		return;
	}
	
	if (status === 0) {

		var text = `\r\n\t你需要制作 #r#i${item}:# #t${item}:##k 吗？\r\n\r\n`

        text += `\t需要材料：\r\n\r\n`
        text += `\t\t#i${id}:# #t${id}:# × ${formatUnit(count)} #r（已有 ${formatUnit(total)}）#k\r\n`
        text += `\t\t#i4031138# 金币 × ${formatUnit(money,0)} #r（已有 ${formatUnit(im.getMeso(),0)}）#k\r\n `
        
		text += "\r\n#b"
    	text += `#L1#我要制作1个#l\r\n`;
        if(total >= 5 * count){
            text += `#L5#我要制作5个#l\r\n`
        }
        if(total >= 10 * count){
            text += `#L10#我要制作10个#l\r\n`
        }
        text += "#L999#以后再说#l\r\n";

    	text += "　\r\n"

    	im.sendSimple(text);

    } else if (status === 1){

        if(selection === 999){
            im.dispose()
        } else {
            const sum = count * selection;
            if(money * selection > im.getMeso()){
                im.sendNext("金币不足！");
            } else if( sum > total){
                im.sendNext(`需要给我 ${sum} 个 #i${id}:# #t${id}:#`)
            } else if (!im.canHold(item,selection)){
                im.sendNext("背包空间不足！");
            } else {
                im.gainItem(id, -sum);
                im.gainItem(item, selection);
                im.sendNext("好的，请拿好！");
                im.gainMeso(-(money * selection));
                im.getPlayer().serverMessage(`制作${selection}本`, item);
            }
        }

	
	} else {
		im.dispose();
	}

	
}
