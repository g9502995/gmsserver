loadScript('./common.js');
//月卡特权凭证
var status = -1;
const id = 2430161;

var cfg = getCardReward(1);


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

		let giveTime = im.getPlayer().getDayData("今日领取月卡奖励") * 1;

		if(giveTime){
			im.sendOk(`今天已在 #r${formatTime(giveTime,'HH:mm:ss')}#k 领取过了！明天再来吧！`)
			im.dispose();
		}else{
			var text = "\r\n\t尊敬的月卡特权冒险者，你是否现在领取以下奖励？\r\n\r\n"
		
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
			
			im.sendYesNo(text);
		}
	
	} else if(status == 1){
		
		const itemId = cfg.map(item => item.id);
		const itemCount = cfg.map(item => item.count);
		if(itemId.length > 0 && !im.canHoldAll(itemId , itemCount)){
			im.sendOk("背包空间不足！");
		}else{
			if(im.getItemQuantity(id)){
				for (const v of cfg){
					im.gainItem(v.id,v.count,false,true,v.expire || -1);
					im.getPlayer().saveLog(id,v.id,-v.count);
					im.getPlayer().serverMessage(`领取${v.count}个` , v.id, "月卡奖励");
				}
				im.getPlayer().saveDayData("今日领取月卡奖励" , new Date().getTime().toString());
				
				im.sendOk("已将礼包物品放到您的背包！")
				
				const cardNum= im.getPlayer().getUserData("月卡开通次数") * 1;
				if( cardNum < 1 ){
					im.getPlayer().saveUserData("月卡开通次数" , 1)
				}
				
			}
		}
		
		im.dispose();
	} else {
		im.dispose();
	}

	
}


function fTime(value){
	let cash = value / 1000;
	if(cash > 86400) return (cash / 86400) + "天";
	return (cash / 60 / 60) + "小时";
}


function formatTime(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  let targetDate;
  if (date instanceof Date) {
	targetDate = date;
  } else {
    const timestamp = Number(date);
    if (!isNaN(timestamp) && isFinite(timestamp)) {
      targetDate = new Date(timestamp);
      if (isNaN(targetDate.getTime())) {
        targetDate = new Date();
      }
    } else {
      targetDate = new Date();
    }
  }
  
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // 补零：01-12
  const day = String(targetDate.getDate()).padStart(2, '0'); // 补零：01-31
  const hours = String(targetDate.getHours()).padStart(2, '0'); // 补零：00-23
  const minutes = String(targetDate.getMinutes()).padStart(2, '0'); // 补零：00-59
  const seconds = String(targetDate.getSeconds()).padStart(2, '0'); // 补零：00-59

  // 替换格式字符串中的占位符
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}
