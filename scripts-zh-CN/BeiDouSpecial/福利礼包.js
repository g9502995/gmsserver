var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}

	const ch = cm.getPlayer();

	var reward = [];

	const gift = ch.getUserData("福利礼包", true);
	if(gift){
		reward.push(...JSON.parse(gift));
	}


	const date = new Date();
	const weekNum = date.getDay();  // 0=周日，1=周一...6=周六
	if(weekNum === 2){
		if(!ch.getUserWeekData("福利礼包222")){
			reward.push({
				id : 222,
				name : "维护补偿",
				item : [
					[5360042,1,1],
					[5211048,1,1],
					[2450000,1],
					[2430100,10],
					[2430101,10],
					[2430110,10]
				],
				type : 'week' 
			})
		}
	}


	// 全局活动，比如维护补偿什么的，定义一个读取
	const activity = [];
	if(activity){
		reward.push(...activity);
	}
	
	var newData = [];
	reward.forEach(v => {
		if(!ch.getUserData(`福利礼包${v.id}`)){
			newData.push(v);
		}
	})

	reward = newData;
		

    if (status == 0) {

    	var text = "";
		text += "#L991##fUI/Basic.img/CheckBox/0# #k在线奖励#l\t\t\t";
		text += "#L992##fUI/Basic.img/CheckBox/0# #k等级奖励#l\t\t\t";
		text += "#L993##fUI/Basic.img/CheckBox/0# #k在线活动#l\r\n";
		text += "#L994##fUI/Basic.img/CheckBox/0# #k活跃奖励#l\t\t\t";
		text += "#L995##fUI/Basic.img/CheckBox/0# #k暴击抽奖#l\t\t\t"
		text += "#L996##fUI/Basic.img/CheckBox/1# #b福利礼包#l"
		text += "\r\n\r\n"
		
		text += "\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		
		text += "\r\n\r\n";
		
		text += "#k"

		if(reward.length === 0){
			text += "\t暂无可领礼包！"
		}else{
			reward.forEach((v,i)=>{
				text += `#b#L${v.id}#领取${v.name}#l\r\n`;
			})
		}
		
		cm.sendSimple(text);
		
    } else if (status == 1 ) {

    	if(selection > 900){
			
			//进入菜单
			cm.dispose();
			
			if(selection === 991)cm.openNpc(9010000, "在线奖励");
			if(selection === 992)cm.openNpc(9010000, "等级奖励");
			if(selection === 993)cm.openNpc(9010000, "在线活动");
			if(selection === 994)cm.openNpc(9010000, "活跃奖励");
			if(selection === 995)cm.openNpc(9010000, "暴击抽奖");
			if(selection === 996)cm.openNpc(9010000, "福利礼包");
			
		}else{

			var data = reward.find(item => item.id * 1 === selection);
				
			if(data){

				var itemId = [] , itemCount = [];
				data.item.forEach( v => {
					const [id, num] = v;
					itemId.push(id);
					itemCount.push(num);
				})
				
				if(itemId.length === 0){
					cm.sendOk("奖励配置无效");
					cm.dispose();
				} else {

					var text = "礼包内容：\r\n\r\n"
					data.item.forEach(v => {
						var [id,num, expire] = v;
						text += `\t#i${id}:# #t${id}:# x ${num}\r\n`;
					})

					text += "#b";
					text += `#L${selection}#好的，现在领取！#l\r\n`;
					text += `#L999#一会儿再领!#l\r\n`;
					

					cm.sendSimple(text)
					
				}
				
			}else {
				cm.sendOk("未找到礼包");
				cm.dispose();
			}
			

			
		}

	} else if (status === 2){

		if(selection !== 999){

			var data = reward.find(item => item.id * 1 === selection);
					
			if(data){

				var itemId = [] , itemCount = [];
				data.item.forEach( v => {
					const [id, num] = v;
					itemId.push(id);
					itemCount.push(num);
				})
				
				if(itemId.length === 0){
					cm.sendOk("奖励配置无效");
					cm.dispose();
				} else if(!cm.canHoldAll(itemId , itemCount)){
					cm.sendOk(`背包空间不足`);
					cm.dispose();
				} else {

					var text = "恭喜你领取以下奖励：\r\n\r\n"
					data.item.forEach(v => {
						var [id,num, expire] = v;
						if(expire){
							expire = expire * 60 * 60 * 1000
						}
						cm.gainItem(id,num,false,true,expire || -1);
						ch.saveLog("福利礼包",id,num);
						text += `\t#i${id}:# #t${id}:# x ${num}\r\n`;
					})

					ch.serverMessage(`领取了福利礼包！`);

					if(data.type === 'week'){
						ch.saveUserWeekData(`福利礼包${data.id}`,1);
					}else{
						ch.saveUserData(`福利礼包${data.id}`,1);
					}
					

					cm.sendNext(text)
					
				}
				
			}else {
				cm.sendOk("未找到礼包");
			}
		} else {
			cm.sendNext("好的！")
		}
		status =-1;
		
	} else {
		cm.dispose();
	}
}	

