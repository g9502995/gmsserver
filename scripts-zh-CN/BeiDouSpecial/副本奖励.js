
var status = 0;
var cfg = [
	{name:"废弃都市", count : 3},
	{name:"玩具塔", count : 3},
	{name:"女神之塔", count : 2},
	{name:"毒雾森林", count : 2},
	{name:"海盗船", count : 2}
];
var give = [
	{ 
		index : "奖励⒈", name : "〔完成任意一项副本〕", count : 1, 
		
		// id  领取数量， 月卡用户领取倍率
		items : [
			{id : 2000002, count : 50, card : 2},
			{id : 2000006, count : 50, card : 2},
			{id : 2430040, count : 3, card : 2},
			{id : 2430190, count : 1, card : 1}
		]
	},
	{ 
		index : "奖励⒉", name : "〔完成任意三项副本〕", count : 3, items : [
			{id : 2000002, count : 100, card : 2},
			{id : 2000006, count : 100, card : 2},
			{id : 2430040, count : 5, card : 2},
			{id : 5220000, count : 1, card : 2},
			{id : 2430100, count : 10,card : 1},
			{id : 4033006, count : 20,card  : 1},
			{id : 2430190, count : 3, card : 2},
			{id : 2430156, count : 3, card : 2},
			{id : 2430255, count : 5, card : 2, expire : 1 * 60 * 60 * 1000},
			{id : 2430154, count : 20, card : 1, expire : 3 * (24 * 60 * 60 * 1000)},
		]
	},
	{
		index : "奖励⒊", name : "〔完成任意五项副本〕",count : 5, isCard : 1, items : [
			{id : 2049100, count : 1 , card : 1},
			{id : 2430040, count : 5, card : 1},
			{id : 2430100, count : 10, card : 1},
			{id : 4033007, count : 1, card : 1},
			{id : 4033006, count : 20,card  : 1},
			{id : 2430190, count : 5, card : 1},
			{id : 2430154, count : 20, card : 1, expire : 3 * (24 * 60 * 60 * 1000)},
		]
	}
]

var doneData = null;
const GameConfig = Java.type('org.gms.config.GameConfig');
var isGive = [];
function start() {
	doneData = getDone();
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	
	isGive = getStatus();
	
	if (CheckStatus(mode)) {
		
	    if (status == 0) {
			
			var text = ""
			
			text += "#L992##fUI/Basic.img/CheckBox/1# #b副本奖励#l \t\t";
			text += "#L995##fUI/Basic.img/CheckBox/0# #k副本兑换#l \t\t";
			
			text += "\r\n\r\n\r\n"
			
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n\r\n";
			
			text += "\t\t#d今日完成副本项目情况\r\n";
			
			// text += `\t#L801##b废\t弃\t都\t市#r\t:\t〔${doneData.data[0].done} / ${doneData.data[0].count}〕#l\r\n`;
			// text += `\t#L802##b玩\t\t具\t\t塔#r\t:\t〔${doneData.data[1].done} / ${doneData.data[1].count}〕#l\r\n`;
			// text += `\t#L803##b女\t\t神\t\t塔#r\t:\t〔${doneData.data[2].done} / ${doneData.data[2].count}〕#l\r\n`;
			// text += `\t#L804##b毒\t物\t森\t林#r\t:\t〔${doneData.data[3].done} / ${doneData.data[3].count}〕#l\r\n`;
			// text += `\t#L805##b海\t\t盗\t\t船#r\t:\t〔${doneData.data[4].done} / ${doneData.data[4].count}〕#l\r\n`;

			text += "\r\n"
			text += `\t\t#k废\t弃\t都\t市#r\t:\t〔${doneData.data[0].done} / ${doneData.data[0].count}〕\r\n`;
			text += `\t\t#k玩\t\t具\t\t塔#r\t:\t〔${doneData.data[1].done} / ${doneData.data[1].count}〕\r\n`;
			text += `\t\t#k女\t\t神\t\t塔#r\t:\t〔${doneData.data[2].done} / ${doneData.data[2].count}〕\r\n`;
			text += `\t\t#k毒\t物\t森\t林#r\t:\t〔${doneData.data[3].done} / ${doneData.data[3].count}〕\r\n`;
			text += `\t\t#k海\t\t盗\t\t船#r\t:\t〔${doneData.data[4].done} / ${doneData.data[4].count}〕\r\n`;
			
			text += "\r\n";
			
			for(let i = 0; i < give.length; i++){
				text += `#L${i}##fUI/UIWindow.img/Quest/icon9/0# #b#e${give[i].index}${give[i].name}#n#l\r\n`;
			}
			

			text += "\r\n\r\n";

			text += "#L993##fUI/UIWindow.img/Quest/icon9/0# #e#r把我传送到副本中心#n#l";

			text += "　\r\n"

			cm.sendSimple(text);
			
			
	    } else if (status == 1 ) {
			
			if(selection > 900){
				
				//进入菜单
				cm.dispose();
				
				
				if(selection === 992)cm.openNpc(9010000, "副本奖励");
				if(selection === 995)cm.openNpc(9010000, "副本兑换");
				if(selection === 993)cm.warp(910002000,2);

			} else if (selection > 800) {

				const index = selection - 801;
				const data = cfg[index];

				//进入
				var text = `\t${data.name}任务今日已完成 ${doneData.data[index].done}次，最多可完成${GameConfig.getServerInt("party_quest_day_limit")}次\r\n`;

				text += "#b"
				text += "#L1#我想直接快速完成1次#l\r\n";
				cm.sendSimple(text);
			
			}else{
				
				
				
				if(isGive.length !== give.length){
					
					var isCard = cm.getItemQuantity(2430161); 
					
					let data = give[selection];
					
					if(data.count > doneData.total || data.isCard && !isCard){
						let text = "\r\n\t";
						if(data.isCard){
							text+= "#r 月卡特权专属"
						}
						text += `#b${data.name} #k可获得以下奖励！`
						
						text += "#k\r\n\r\n";
						for(let i=0; i < data.items.length; i++){
							text += `\t#i${data.items[i].id}:# #t${data.items[i].id}:# × ${data.items[i].count}`
							if(data.items[i].card > 1){
								text += `#r〔月卡特权 ${data.items[i].card} 倍〕#k`
							}
							text += "\r\n";
						}
						cm.sendNext(text);
					}else{
						
						const isReceived  = isGive.includes(String(selection)); 
						if(!isReceived){
							
							
							// 验证背包是否充足
							const normalItems = data.items.filter(obj => obj.id >= 1_000_000);
							const itemId = normalItems.map(item => item.id)
							const itemCount = normalItems.map((item) => {
								if(item.card > 1 && isCard){
									return item.count * item.card;
								}
								return item.count;
							} );
							if(itemId.length > 0 && !cm.canHoldAll(itemId , itemCount)){
								cm.sendOk(`背包空间不足`);
							}else{
								let text = `\r\n\t#b你成功领取以下奖励！#k\r\n\r\n\r\n`;
								let isPush = 0;
								for(let i=0; i < data.items.length; i++){
									let item = data.items[i];
									let count = item.count;
									if(item.card > 0 && isCard){
										count = item.count * item.card;
										isPush = 1;
									}
									text += `\t#i${item.id}:# #t${item.id}:# × ${count}\r\n\r\n`
									cm.gainItem(item.id,count,false,true,item.expire || -1);
									cm.getPlayer().saveLog("副本奖励",item.id,count);
									cm.getPlayer().serverMessage("领取副本奖励" , item.id);
								}
								isGive.push(selection);
								var msg = `领取了${data.name}奖励！`
								if(isPush && !data.isCard){
									msg+="由于月卡特权加倍领取。";
								}

								cm.getPlayer().serverMessage(msg);
								setStatus(selection);
								cm.sendNext(text);
								
							}
						} else{
							
							cm.sendNext("你今天已领取过 #b" + data.name + "#k奖励！请明天再来！");
						}
					}
					
				}else{
					cm.sendOk("今天已领取过了！");
				}
				status = -1;
			}

		} else if (status == 2){

			cm.sendNext("未开放");
			status = -1;

		} else {
			cm.dispose();
		}
	}	
}


function getDone(){
	let total = 0;
	for(let i=0; i < cfg.length; i++){
		var num = cm.getPlayer().getDayData(`${cfg[i].name}今日完成次数`) * 1;
		cfg[i].done = num;   //已完成次数
		
		if(num >= cfg[i].count){
			total++;
		}
		
	}
	
	return {
		data : cfg,
		total : total
	}
	
	
	
}


/**
 * 获取领取状态
 * @returns {string}
 */
function getStatus() {
	let data = cm.getPlayer().getUserDayData("副本完成次数奖励");
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
	cm.getPlayer().saveUserDayData("副本完成次数奖励", newValue);
}



function getRewardListText() {
	let listtext = [];
	let CheckBox_0 = "#fUI/Basic.img/CheckBox/0#";
	let CheckBox_1 = "#fUI/Basic.img/CheckBox/1#";
	let CheckBox_2 = "#fUI/Basic.img/CheckBox/2#";
	let use = getStatus();
		

	return cfg.map((obj, i) => {
		const isReceived  = use.includes(String(obj.level)); 
		const isClaimable = false;
		let text = "";

		cfg[i] = {
			...obj,
			isReceive: isReceived,
			isClaimed: isClaimable,
		};

		if (!isReceived) {
			listtext.push(1);
			if (isClaimable) {
				text += `#L${i}##b领取【${obj.level}分钟】副本奖励 ${CheckBox_0}#k\r\n#l`;
			} else {
				text += `#L${i}##r查看【${obj.level}分钟】副本奖励 ${CheckBox_2}#k\r\n#l`;
			}
		} else {
			if (i > 0 && listtext[i-1] === 1) text += "\r\n";
			text += `\t  已领【${obj.level}分钟】在线奖励 ${CheckBox_1}\r\n`;
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
