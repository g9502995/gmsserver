loadScript('./common.js');
var status;
const items = [4008001,4008002,4008003,4008004];
const money = 1000000;
const coupon = 1000;
const odds = 85;
const expItem = [4033000,100];
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
		cm.dispose();
		
	} else {

	
		if (mode == 1) {
			status++;
		} else {
			status--;
		}
		
	

	    if (status === 0) {

	    	var text = "\r\n\t你打算转换什么碎片！\r\n\r\n";

	    	
			text += "#b"

			items.forEach(v => {
				text += `#L${v}# #i${v}:# #t${v}:# （已有 ${cm.getItemQuantity(v)}）#l\r\n`;
			})

			cm.sendSimple(text);

		} else if (status === 1){

			var text =`\r\n\t\t我将概率为你转换 #i${selection}# #t${selection}# × 100\r\n\r\n`

			text += "\t\t需求材料：\r\n\r\n"
			items.forEach(v=> {
				if(v !== selection){
					text +=`\t\t\t#i${v}# #t${v}:# × ${formatUnit(100)} （已有 ${formatUnit(cm.getItemQuantity(v))}）\r\n`;
				}
			})

			
			text += `\t\t\t#i4031138# 金币 × ${formatUnit(money)} （已有 ${formatUnit(cm.getMeso())}）\r\n`;
			text += `\t\t\t#i4033010# 点券 × ${formatUnit(coupon)} （已有 ${formatUnit(cm.getPlayer().getCash(1))}）\r\n`;
			text += `\t\t\t#i${expItem[0]}# #t${expItem[0]}# × ${formatUnit(expItem[1])} （已有 ${formatUnit(cm.getItemQuantity(expItem[0]))}）\r\n`;


			text += "\r\n"

			text += `\r\n\t\t#r成功几率：${formatUnit(odds)}％#d\r\n`;

			text += "\r\n#b"
			text += `#L${selection}#我已凑齐，帮我转换吧#l\r\n`;
			text += "#L999#我再考虑考虑#l\r\n"


			cm.sendSimple(text);

		} else if (status === 2){

			if(selection === 999){
				cm.dispose();
			} else {

				const ch = cm.getPlayer();
				var err;
				items.forEach(v=>{
					if(v !== selection){
						if(100 > cm.getItemQuantity(v)){
							err = `所需要的 #i${v}# #t${v}# 不足！`;
						}
					}
				})
				if(err){
					cm.sendNext(err)
					cm.dispose()
				} else if (money > cm.getMeso()){
					cm.sendNext("金币不足")
					cm.dispose()
				} else if (coupon > ch.getCash(1)){
					cm.sendNext("点券不足")
					cm.dispose()
				} else if (expItem[1] > cm.getItemQuantity(expItem[0])){
					cm.sendNext("历练水不足");
					cm.dispose();
				} else if (!cm.canHold(selection , 100)) {
					cm.sendNext("背包空间不足");
					cm.dispose();
				} else {

					items.forEach(v => {
						if(v !== selection){
							cm.gainItem(v, -100);
						} 
					})
					if(money > 0) cm.gainMeso(-money);
					if(coupon > 0) ch.gainCash(-coupon);
					if(expItem[0]) cm.gainItem(expItem[0], -expItem[1]);

					const int =  getRandomInt(1,100);
					const loss = int > odds;
					if(!loss){
						cm.gainItem(selection,100);
						cm.sendNext("恭喜，转换成功了！");
						ch.serverMessage("成功转换了100个",selection);
					} else {
						cm.sendNext("很遗憾，这次失败了，请再接再厉！");
						
					}
					status = -1;
				}

			}

	    	
		} else {
			cm.dispose();
		}
	}	

}