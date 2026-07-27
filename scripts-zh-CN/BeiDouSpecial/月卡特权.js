loadScript('./common.js');
var status = 0;
var cfg = getCardReward();
var index = 0;
var isCard = 0;
var openCardPrice = 2000;
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
		const ch = cm.getPlayer();
		const rmb = ch.getUserData("赞助币") * 1;
		isCard = cm.getItemQuantity(2430161);
		
	    if (status == 0) {
			
			var text = "拥有月卡特权后，每日和周历任务需求减半，副本奖励特定道具翻倍等，期限为30天！\r\n";
				text += `\r\n赞助币余额：#r${rmb}\r\n`
				text +="\r\n#b"
				text +="#L1#我想使用赞助币换月卡特权！#l\r\n"
				text +="#L4#我想了解月卡特权奖励！#l\r\n";
				text +="#L99#返回#l\r\n"
				cm.sendSimple(text);
				
		} else if (status == 1){
			
			index = selection;
			
			if(selection === 1){
				
				var text = `\r\n\t你确定要用 #r${openCardPrice} #k赞助币换月卡特权吗？`
				text += "\r\n#b"
				text += "#L1#是的，我要换月卡特权！#l\r\n"
				text += "#L2#返回#l\r\n";
				cm.sendSimple(text);
				
			}
			
			if(selection === 4){
				var text = `\r\n开通月卡特权时可获赠：#i2430162:#\r\n\r\n`
				text += "礼包物品：\r\n\r\n"
				for(let i=0;i < cfg.length; i++){
					if(cfg[i].open){
						text += `\t#b #t${cfg[i].id}:# × ${cfg[i].count}`;
						if(cfg[i].expire){
							text += `\t#r（限时${fTime(cfg[i].expire)}）`;
						}
						text += "\r\n";
					}
				}
				
				text += "\r\n\r\n#k拥有月卡证物限期内每天可领取奖励：#i2430161:#\r\n\r\n"
				text +="领取奖品：\r\n\r\n"
				for(let i=0;i < cfg.length; i++){
					if(!cfg[i].open){
						text += `\t#b #t${cfg[i].id}:# × ${cfg[i].count}`;
						if(cfg[i].expire){
							text += `\t#r（${fTime(cfg[i].expire)}）`;
						}
						text += "\r\n";
					}
				}
				
				text += "　\r\n"
				cm.sendOk(text);
				status = -1;
			}

			if(selection === 99){
				cm.dispose();
				cm.openNpc(9010000, "赞助中心");
			}
		
		} else if (status == 2){
			
			if(selection == 1){
				//赞助币开通
				if(openCardPrice > rmb){
					cm.sendOk("赞助币不足！");
				}else if(!cm.canHold(2430162)){
					cm.sendOk("背包空间不足！");
				}else{
					cm.gainItem(2430162)
					ch.saveUserData("赞助币", -openCardPrice , true);
					cm.message(`失去赞助币 (-${openCardPrice})`);
					cm.sendOk("兑换成功！")
				}

				cm.dispose();
			
			} else {
				status =-1;
				action(1,0,0);
			}
			
			
			
		} else {
			cm.dispose();
		}
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