
var status = 0;
var give = [
	{id : 2340000, count : 1, num : 200},
	{id : 2049100, count : 1, num : 100},
	{id : 4021009, count : 1, num : 30},
	{id : 4011007, count : 1, num : 30},
	{id : 2430160, count : 1, num : 10},
	{id : 2430166, count : 1, num : 500},
	{id : 5510000, count : 1, num : 10},
	
];
var item = 4000601;
var count = 0;
var data = null;
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
	
	
		
	    if (status == 0) {
			
			var text = ""
            text += "#L990##fUI/Basic.img/CheckBox/0# #k每日任务#l\t\t\t" 
            text += "#L993##fUI/Basic.img/CheckBox/0# #k周历任务#l\t\t\t";
            text += "#L994##fUI/Basic.img/CheckBox/1# #b奖励兑换#l";
            
            text += "\r\n\r\n\r\n"
            
            text += "\t"
            for(let i=0; i < 44; i++){
                text +="#fMap/MapHelper/minimap/match#";
            }
            
            text += "\r\n\r\n";
			
			
				
			text += `\t #k你可以使用任务币兑换以下物品： #b\r\n\r\n`
			
			for(let i=0 ; i < give.length; i++){
				text += `#L${i}# 兑换 #t${give[i].id}:# × ${give[i].count}#l\r\n`
			}
			
			text += "\r\n"
			
			text += "　\r\n"
			
			cm.sendSimple(text);
				
			
	    } else if (status == 1 ) {
			
			if(selection > 900){
				//进入菜单
				cm.dispose();
				
				if(selection === 990)cm.openNpc(9010000, "每日任务");
				if(selection === 991)cm.openNpc(9010000, "在线奖励");
				if(selection === 992)cm.openNpc(9010000, "副本奖励");
				if(selection === 993)cm.openNpc(9010000, "周历任务");
				if(selection === 994)cm.openNpc(9010000, "任务兑换");
				if(selection === 995)cm.openNpc(9010000, "副本兑换");
				
			}else{
				
				data = give[selection];
				
				count = cm.getItemQuantity(item)
				var text = `\r\n\t兑换 #i${data.id}:# ${data.count} #t${data.id}:##k 需#r${data.num}#t${item}:#！\r\n\t#k你有${count}个#t${item}:#，你确定要兑换吗？\r\n`;
				
				text += "\r\n#b"
				text += `#L1#兑换 1个 #t${data.id}##l\r\n`;
				text += `#L10#兑换 10个 #t${data.id}##l\r\n`;
				text += "#L99#返回#l\r\n"
				
				cm.sendSimple(text);
				
				
			}
			
		} else if (status == 2){
			
			if(selection == 99){
				status = -1;
				action(1, 0, 0);
			}else if(selection  >= 1){
			
				var number = data.count * data.num * selection;
				
				if(number > count){
					cm.sendOk(`#t${item}#不足！`);
					cm.dispose();
				}else{
					if(cm.canHold(data.id,number)){
						cm.gainItem(data.id , data.count * selection);
						cm.getPlayer().saveLog("任务兑换",data.id,data.count * selection);
						cm.getPlayer().serverMessage(`使用${cm.getItem().getName(item)}兑换了`,data.id);
						cm.gainItem(item,-number);
						cm.getPlayer().saveLog("任务兑换",item,-number);
						cm.sendNext("兑换成功！")
						status = -1;
					}else{
						cm.sendNext("背包空间不足！");
						cm.dispose();
					}
					
				}
				
			}
			
		
		} else {
			cm.dispose();
		}
	}
		
}



