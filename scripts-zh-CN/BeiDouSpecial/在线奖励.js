
var status = 0;

var cfg = [
	{
		level:60, items:[
			{id:2430101,count:10},
		]
	},
	{
		level:120, items:[
			{id:5072000,count:5},
			{id:2430100,count:1},
		]
	},
	{
		level:180, items:[
			{id:5150040,count:5},
			{id:2430100,count:2},
		]
	},
	{
		level:240, items:[
			{id:5130000,count:2},
			{id:2430100,count:3},	
		]
	},
	{
		level:360, items:[
			{id:2430164,count:1},
			{id:5220000,count:2},
			{id:2430100,count:5},	
			{id:2430101,count:10},
		]
	}
]

var isGive = [];
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	var ol = Math.floor(cm.getOnlineTime() / 60);
	
	isGive = getStatus();
	
	if (CheckStatus(mode)) {
		
	    if (status == 0) {
			
			var text = "";
			text += "#L991##fUI/Basic.img/CheckBox/1# #b在线奖励#l\t\t\t";
			text += "#L992##fUI/Basic.img/CheckBox/0# #k等级奖励#l\t\t\t";
			text += "#L993##fUI/Basic.img/CheckBox/0# #k在线活动#l\r\n";
			text += "#L994##fUI/Basic.img/CheckBox/0# #k活跃奖励#l\t\t\t";
			text += "#L995##fUI/Basic.img/CheckBox/0# #k暴击抽奖#l\t\t\t";
			text += "#L996##fUI/Basic.img/CheckBox/0# #k福利礼包#l";
			text += "\r\n\r\n"
			
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n\r\n";
			
			text += "\t 你今天已在线：#r"+formatMinutes(ol)+" #k，注意休息哦！\r\n\r\n";
			
			text += getRewardListText()

			text += "\r\n#r#e#L888#领取以上所有达标奖励#l#n";
			
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
			
			} else if (selection === 888){

				var isok = 0;

				cfg.forEach((v) => {

					//在线时间达标，且没有领取过，执行领取
					if(ol >= v.level && !isGive.includes(String(v.level))){
						const normalItems = v.items.filter(obj => obj.id >= 1_000_000);
						const itemId = normalItems.map(item => item.id)
						const itemCount = normalItems.map(item => item.count);
						if(itemId.length > 0 && cm.canHoldAll(itemId , itemCount)){
							isGive.push(v.level);
							setStatus(v.level);
							v.items.forEach((item)=>{
								cm.gainItem(item.id,item.count);
								cm.getPlayer().saveLog("在线奖励",item.id,item.count);
							})
							isok++;
							cm.getPlayer().serverMessage(`领取了【${formatMinutes(v.level)}】在线奖励！`);
						}
					}
				})

				if(isok){
					cm.sendNext("恭喜，领取达标奖励成功！");
				}else{
					cm.sendNext("没有什么可能领取的！");
				}

				

				status = -1;


			} else {
				
				if(isGive.length !== cfg.length){
					
					let give = cfg[selection];
					
					const isClaimable = ol >= give.level;
					
					if(isClaimable){
						const isReceived  = isGive.includes(String(give.level)); 
						if(!isReceived){
							// 验证背包是否充足
							const normalItems = give.items.filter(obj => obj.id >= 1_000_000);
							const itemId = normalItems.map(item => item.id)
							const itemCount = normalItems.map(item => item.count);
							if(itemId.length > 0 && !cm.canHoldAll(itemId , itemCount)){
								cm.sendOk(`背包空间不足`);
							}else{
								let text = `\r\n\t你已成功领取 #b【${formatMinutes(give.level)}】在线奖励！#k\r\n\r\n\r\n`;
								for(let i=0; i < give.items.length; i++){
									text += `\t#i${give.items[i].id}:# #t${give.items[i].id}:# × ${give.items[i].count}\r\n\r\n`
									cm.gainItem(give.items[i].id,give.items[i].count);
									cm.getPlayer().saveLog("在线奖励",give.items[i].id,give.items[i].count);
								}
								isGive.push(give.level);
								cm.getPlayer().serverMessage(`领取了【${formatMinutes(give.level)}】在线奖励！`);
								setStatus(give.level);
								cm.sendNext(text);
								
							}
						}
					}else{
						let text = `\r\n\t在线 #b【${give.level}分钟】#k可领取的奖励：#k\r\n\r\n`;
						for(let i=0; i < give.items.length; i++){
							text += `\t#i${give.items[i].id}:# #t${give.items[i].id}:# × ${give.items[i].count}\r\n`
						}
						cm.sendNext(text);
					}
					
				}
				status = -1;
			}
		} else {
			cm.dispose();
		}
	}	
}



/**
 * 获取领取状态
 * @returns {string}
 */
function getStatus() {
	let data = cm.getPlayer().getUserDayData("今日在线奖励领取状态");
	if(data){
		return data.split(",");
	}
	return [];
}

/**
 * 保存领取状态
 */
function setStatus(value){
	let data = getStatus();
	const levelStr = String(value);
	if(!data.includes(levelStr)){
		data.push(levelStr);
	}
		
	const newValue = data.join(",")
	cm.getPlayer().saveUserDayData("今日在线奖励领取状态", newValue);
}



function getRewardListText() {
	let listtext = [];
	let CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
	let CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";
	let CheckBox_2 = "#fUI/Basic.img/CheckBox/2#";
	let use = getStatus();
	var ol = Math.floor(cm.getOnlineTime() / 60);
		

	return cfg.map((obj, i) => {
		const isReceived  = use.includes(String(obj.level)); 
		const isClaimable = ol >= obj.level;
		let text = "";

		cfg[i] = {
			...obj,
			isReceive: isReceived,
			isClaimed: isClaimable,
		};

		if (!isReceived) {
			listtext.push(1);
			if (isClaimable) {
				text += `#L${i}##b领取【${fatTime(obj.level)}小时】在线奖励 ${CheckBox_0}#k\r\n#l`;
			} else {
				text += `#L${i}##r查看【${fatTime(obj.level)}小时】在线奖励 ${CheckBox_2}#k\r\n#l`;
			}
		} else {
			if (i > 0 && listtext[i-1] === 1) text += "\r\n";
			text += `\t  已领【${fatTime(obj.level)}小时】在线奖励 ${CheckBox_1}\r\n`;
			listtext.push(0);
		}
		return text;
	}).join("");
}

function fatTime(value){
	return value / 60;
}

/**
 * 分钟数格式化为“N小时 N分钟”
 * @param {number} totalMinutes - 总分钟数（非负整数）
 * @returns {string} 格式化后的字符串
 */
function formatMinutes(totalMinutes) {
    // 校验输入：转为非负整数（避免负数、小数问题）
    const minutes = Math.max(0, Math.floor(Number(totalMinutes) || 0));
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    // 拼接结果（按场景优化显示）
    const parts = [];
    if (hours > 0) parts.push(`${hours}小时`);
    if (remainingMinutes > 0 || hours === 0) parts.push(`${remainingMinutes}分钟`);
    
    return parts.join('');
}


function CheckStatus(mode){
	
	if (mode == -1) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
	if (status == -1) {
		cm.dispose();
		return false;
	}	
	return true;
	
}
