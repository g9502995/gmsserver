
var status;

let config = [
	{item : 1112900,count : 1,expire : 604800000},
	{item : 5340100,count : 1,expire : 86400000 * 3},
	{item : 2430152,count : 1},
	{item : 2022239,count : 1},
	{item : 2430100,count : 100},
	{item : 2430101,count : 100}
];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (CheckStatus(mode)){
		
		if (status === 0) {
			let text = "\r\n赞助任意金额可领取以下礼包，每个账号仅限领取一次\r\n\r\n\r\n";
			
			for(let i=0;i < config.length;i++){
				text += `\t#k #i${config[i].item}:# #t${config[i].item}:# × ${config[i].count}`;
				if(config[i].expire){
					text += `\t#r（限时${config[i].expire / 86400 / 1000}天）`;
				}
				text += "\r\n";
			}
	
			
			text += "\r\n#b";
			text += "#L1#我要现在领取！#l\r\n";
			text += "#L99#返回#l\r\n"
			cm.sendSimple(text);
		
		} else {

			if(selection === 99){
				cm.dispose();
	            cm.openNpc(9010000, "赞助中心");
	            return;
			}
	
			if(cm.getPlayer().getUserData("首充领取")){
				
				cm.sendNext("您已领取过了，本礼包仅限领取1次");
				
			}else if(cm.getAccountExtendValue("累计充值") * 1 === 0){
				
				cm.sendNext("还未赞助过，不能领取本礼包！")
				
			}else{
			
				const itemId = config.map(item => item.item);
				const itemCount = config.map(item => item.count);
				if(itemId.length > 0 && !cm.canHoldAll(itemId , itemCount)){
					cm.sendOk("背包空间不足！");
					cm.dispose();
				}else{
					for (const v of config){
						cm.gainItem(v.item,v.count,false,true,v.expire || -1);
					}
				
					cm.getPlayer().serverMessage("领取首次赞助大礼包！");
					cm.getPlayer().saveUserData("首充领取" , "1");
					cm.sendNext("#b领取成功\r\n#k已将礼包内容放到您的背包\r\n#r感谢支持!!!")
				}
				
			}
			
			status = -1;
		} 
	}
}


function CheckStatus(mode)
{
	if (mode == -1)
	{
		cm.dispose();//点击了取消，停止，结束
		return false;
	}
	
	if (mode == 1)
	{
		status++;
	}
	else
	{
		status--;
	}
	
	if (status == -1)
	{
		cm.dispose();//防止第一层对话带有上一项或者取消按钮而产生bug。
		return false;
	}	
	return true;
}