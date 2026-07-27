/*
脚本：新人福利礼包
 */

var id = 2430033;

var cfg = [
	{
		level : 9,
		items : [
			{id : 2430110, count : 1},
			{id : 2430120, count : 5},
			{id : 2430101, count : 50},
			{id : 2000002, count : 350},
			{id : 2000006, count : 350},
			
		],
	},
	{
		level : 15,
		items : [
			{id : 2430101, count : 50},
			{id : 2000002, count : 480},
			{id : 2000006, count : 480},
			{id : 2450000, count : 2},
			
		],
	},
	{
		level : 25,
		items : [
			{id : 2430101, count : 50},
			{id : 2430026, count : 1},
			{id : 2000002, count : 500},
			{id : 2000006, count : 500},
			{id : 2450000, count : 2},
			
		],
	},
	{
		level : 35,
		items : [
			{id : 2430101, count : 50},
			{id : 2430027, count : 1},
			{id : 5150044, count : 1},
			{id : 5151001, count : 1},
			{id : 2450000, count : 2},
			{id : 5030006, count : 1 , expire : 14 * (24 * 60 * 60 * 1000)},
			
		],
	},
	{
		level : 45,
		items : [
			{id : 2000002, count : 300},
			{id : 2000006, count : 300},
			{id : 2430101, count : 50},
		]
	},
	{
		level : 60,
		items : [
			{id : 2000002, count : 300},
			{id : 2000006, count : 300},
			{id : 2430101, count : 50},
		]
	}
]


var isGive = [];
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	var ol = cm.getLevel() * 1;
	
	isGive = getStatus();
	
	if (CheckStatus(mode)) {
		
	    if (status == 0) {

	    	var text = "";
			text += "#L991##fUI/Basic.img/CheckBox/0# #k在线奖励#l\t\t\t";
			text += "#L992##fUI/Basic.img/CheckBox/1# #b等级奖励#l\t\t\t";
			text += "#L993##fUI/Basic.img/CheckBox/0# #k在线活动#l\r\n";
			text += "#L994##fUI/Basic.img/CheckBox/0# #k活跃奖励#l\t\t\t";
			text += "#L995##fUI/Basic.img/CheckBox/0# #k暴击抽奖#l\t\t\t";
			text += "#L996##fUI/Basic.img/CheckBox/0# #k福利礼包#l\t\t\t";
			text += "\r\n\r\n"
			
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n\r\n";
			
			text += "\t#k你的等级：#r"+ol+" 级#k，你想领取奖励吗？\r\n\r\n"; 
			
			text += getRewardListText()
			
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
				
				let give = cfg[selection];
				
				if(give.level > cm.getLevel() ){
					
					let text = `\r\n\t等级未达到 #b${give.level}级 #k 升级后再来吧！#k\r\n\r\n`;

					text += "\t礼包内容：\r\n\r\n";
					for(let i=0; i < give.items.length; i++){
						text += `\t\t#i${give.items[i].id}:# #t${give.items[i].id}:# × ${give.items[i].count}\r\n`
					}
					
					cm.sendNext(text)
					status = -1;
				}else{
				
					// 验证背包是否充足
					const normalItems = give.items.filter(obj => obj.id >= 1_000_000);
					const itemId = normalItems.map(item => item.id)
					const itemCount = normalItems.map(item => item.count);
					if(itemId.length > 0 && !cm.canHoldAll(itemId , itemCount)){
						cm.sendOk(`背包空间不足`);
						cm.dispose()
					}else{
						let text = `\r\n\t你已成功领取 #b【${give.level}级】奖励！#k\r\n\r\n`;
						for(let i=0; i < give.items.length; i++){
							text += `\t#i${give.items[i].id}:# #t${give.items[i].id}:# × ${give.items[i].count}\r\n`
							cm.gainItem(give.items[i].id,give.items[i].count,false,true,give.items[i].expire || -1);
							cm.getPlayer().saveLog("等级奖励",give.items[i].id,give.items[i].count);
						}
						
						cm.getPlayer().serverMessage(`领取了【${give.level}级】奖励！`);
						
						isGive.push(give.level);
						
						setStatus(give.level);
						
						if(isGive.length == cfg.length){
							if(cm.getItemQuantity(id))cm.gainItem(id , -1);
							cm.getPlayer().saveLog("等级奖励",id,-1);
							text += "\r\n\r\n\t#r已领取全部等级奖励，祝你游戏愉快！\r\n\r\n"
						}
						
						cm.sendNext(text);
						status = -1;
					}
				}
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
	let data = cm.getPlayer().getUserData("等级奖励");
	if(data){
		return data.split(",");
	}
	return [];
}

/**
 * 保存领取状态
 */
function setStatus(value){;
	let data = getStatus();
	const levelStr = String(value);
	if(!data.includes(levelStr)){
		data.push(levelStr);
	}
		
	const newValue = data.join(",")
	cm.getPlayer().saveUserData("等级奖励", newValue);
}



function getRewardListText() {
	let listtext = [];
	let CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
	let CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";
	let CheckBox_2 = "#fUI/Basic.img/CheckBox/2#";
	let use = getStatus();
		

	return cfg.map((obj, i) => {
		const isReceived  = use.includes(String(obj.level)); 
		const isClaimable = cm.getLevel() >= obj.level;
		let text = "";

		cfg[i] = {
			...obj,
			isReceive: isReceived,
			isClaimed: isClaimable,
		};

		if (!isReceived) {
			listtext.push(1);
			if (isClaimable) {
				text += `#L${i}##b领取【${obj.level}级】奖励 ${CheckBox_0}#k\r\n#l`;
			}else{
				text += `#L${i}##r查看【${obj.level}级】奖励 ${CheckBox_2}#k\r\n#l`;
			}
		} else {
			if (i == 0) text += "\r\n";
			if(listtext[i-1] === 1) text += "\r\n\r\n"
			text += `\t  已领【${obj.level}级】奖励 ${CheckBox_1}\r\n`;
			listtext.push(0);
		}
		return text;
	}).join("");
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