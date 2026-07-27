loadScript('./common.js');
//月卡特权盒子

var status = -1;

let id = 2430162;

var cfg = getCardReward();

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
		
		var text = "\r\n\t打开可直接获得：\r\n\r\n"
		for(let i=0;i < cfg.length; i++){
			if(cfg[i].open){
				text += `\t\t#d #t${cfg[i].id}:# × ${cfg[i].count}`;
				if(cfg[i].expire){
					text += `\t#r（限时${fTime(cfg[i].expire)}）`;
				}
				text += "\r\n";
			}
		}
		
		text += `\r\n\r\n\t#k#t2430161#每天可打开1次，可获得：\r\n\r\n`
		for(let i=0;i < cfg.length; i++){
			if(!cfg[i].open){
				text += `\t\t#d #t${cfg[i].id}:# × ${cfg[i].count}`;
				if(cfg[i].expire){
					text += `\t#r（${fTime(cfg[i].expire)}）`;
				}
				text += "\r\n";
			}
		}
		text += "　\r\n"
		text +="#b"
		text += "\t你是否现在打开本礼包？\r\n"
		text += "　\r\n"
		
		im.sendYesNo(text);
		
	} else if(status == 1){
		
		if(!im.getItemQuantity(2430161) && im.getItemQuantity(id)){
			const data = cfg.filter(item => item.open == 1);
			const itemId = data.map(item => item.id);
			const itemCount = data.map(item => item.count);
			if(itemId.length > 0 && !im.canHoldAll(itemId , itemCount)){
				im.sendOk("背包空间不足！");
			}else{
				for (const v of data){
					im.gainItem(v.id,v.count,false,true,v.expire || -1);
					im.getPlayer().saveLog(id,v.id,v.count);
				}
				im.gainItem(id,-1);
				im.getPlayer().saveLog(id,-1);
				sendMessage("开通月卡特权！" , 1);
				im.sendOk("已将礼包物品放到您的背包！")
				im.getPlayer().saveUserData("月卡开通次数" , 1 , true);
			}
		}else{
			im.sendOk(`已有#t2430161#，等到期后再打开！`);
		}
		
		
		
		
		im.dispose();
	} else {
		im.dispose();
	}
	
}



function sendMessage(value,istop = 0){
	var world = im.getClient().getChannelServer()
	if(istop){
		let players = world.getPlayerStorage().getAllCharacters(); 
		for(let i=0;i < players.length; i++){
			players[i].startMapEffect(`恭喜 ${im.getPlayer().getName()} ${value}`, 5121016);
		}
	}
	im.getPlayer().serverMessage(value);
	
}

//使用BUFF，有相同技能存在时会替换
function sendBuff(id , im){
	var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
	var ii = ItemInformationProvider.getInstance()
	var mse = ii.getItemEffect(id)
	if(mse != null)mse.applyTo(im.getPlayer())
}


function fTime(value){
	let cash = value / 1000;
	if(cash > 86400) return (cash / 86400) + "天";
	return (cash / 60 / 60) + "小时";
}

