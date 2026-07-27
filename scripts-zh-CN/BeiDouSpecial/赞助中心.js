var payMoney = 0; //赞助币
var money = 0; //金币
const bili = 300  //比例 1：300
const url = "http://wan130.com/game/132";
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	
    if (mode <= 0) {
        cm.dispose();
    } else {
		if (mode == 1) {
            status++;
        } else {
            status--;
        }

        const ch = cm.getPlayer();
        const rmb = ch.getUserData("赞助币",true) * 1;

		if (status === 0) {
			
			
			let text = "\r\n谢谢你的赞助，我们将用于服务器运行和研发！\r\n";
			// text += `\r\n网站链接：\r\n#L999##d点此打开网页赞助#l #k \r\n\r\n`
			// text += `\r\n\r\n已有 #r${rmb}#k 赞助币！\r\n\r\n`
			text += `\r\n#b`
			text += "#L99#我想要赞助#l\r\n";
			text += "#L1#我想要点券#l\r\n";
			text += "#L2#我想要月卡特权#l\r\n";
			text += "#L3#我想要活动礼包#l\r\n";
			text += "#L4#我想要首赞礼包#l\r\n";

			cm.sendSimple(text);

		} else if (status === 1) {
			
			if(selection == 1){
				var money1 = ch.getCash(1);
				if(rmb > 0){
					var text = `\r\n\t你有 #r${rmb} 赞助币#k，#r${money1} 点券#k，你想换多少点券？\r\n\r\n`
					var money = [1,10,20,30,50,100,1000];
					for(let i=0;i < money.length; i++){
						text += `#b#L${money[i]}# ${money[i]} 币兑换 ${money[i] * bili} 点券！#l\r\n`
					}
					
					if(ch.getId() === 138 && !ch.getUserData("调价补发")){
						text += "#L997# 调价补发#l\r\n"
					}
					
					text += "#L999# 返回#l\r\n"
					cm.sendSimple(text);
				} else {
					cm.sendNext("你没有赞助币！")
					status = -1;
				}
				
			}else if(selection == 2){
				
				openNpc("月卡特权");
			}else if (selection == 3){
				openNpc("活动礼包");
			}else if (selection == 4){
				openNpc("首充礼包");
			} else if (selection === 99){
				var text = "\t赞助后可获赠赞助币作为奖励！\r\n";
				text += "\r\n#b"
				text += "#L998#点此打开网页去赞助#l\r\n";
				text += "#L999#返回#l\r\n"
				cm.sendSimple(text);
			}else{
				cm.openUrl('http://' + url);
				cm.dispose(); 
			}
		
		} else if (status == 2){
			
			
			if(selection === 999){
				// 后退
				status = -1;
				action(1, 0, 0);
			} else if (selection === 998){

				cm.openUrl(url);
				status =-1;
				action(1, 0, 0);
				
			} else if (selection === 997){
				
				if(!ch.getUserData("调价补发")){
					cm.sendNext("领取成功");
					ch.gainCash(450000);
					ch.saveLog("赞助币补发" , 1 , 450000);
					ch.saveUserData("调价补发" , 1);
					cm.dispose();
				}

			} else {
				if(selection > rmb){
					cm.sendNext("赞助币不足！")
					
				}else{
					ch.saveUserData("赞助币" , -selection, true);
					ch.gainCash(selection * bili);
					ch.saveLog("赞助币兑换", 1,selection * bili);
					cm.message(`失去赞助币 (-${selection})`);
					cm.sendNext("兑换成功！");
				
				}
				status = -1;
			}
			
		} else {
			cm.dispose();
		}
	}
}


function openNpc(id) {
	cm.dispose();
	cm.openNpc(9010000, id);
}
