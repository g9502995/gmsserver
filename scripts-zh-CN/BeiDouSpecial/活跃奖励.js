var status;
var reward = [
	{ 
		"number" : 100, 
		"reward" : [ 
			[2430110,1],
			[2430101,2],
			[2430164,1],
			[5040000,1],
			[5220000,1],
			[2430190,1],
		] 
	},
	{ 
		"number" : 150, 
		"reward" : [
			[2430110,2],
			[2430101,4],
			[2430163,2],
			[5040000,1],
			[5220000,1],
			[2430190,1],
		] 
	},
	{ 
		"number" : 200, 
		"reward" : [
			[2430110,3],
			[2430101,6],
			[2430157,1],
			[5040000,1],
			[5220000,1],
			[2430154,1],
			[2430190,1],
		] 
	},
	{ 
		"number" : 250, 
		"reward" : [
			[2430110,4],
			[2430101,8],
			[2430155,1],
			[5220000,1],
			[5040000,1],
			[2430154,1],
			[2430190,2],
		] 
	},
	{ 
		"number" : 300, 
		"reward" : [ 
			[2430110,5],
			[2430101,10],
			[5040000,1],
			[2430150,1],
			[2430156,1],
			[2049100,1],
			[5220000,3],
			[2430154,3],
			[2430190,3],
		] 
	},
];


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode == -1) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}

	const ch = cm.getPlayer();

	const copy = [ "废弃都市", "玩具塔", "女神塔", "毒雾森林", "海盗船"];
	var copyDone = 0;
	copy.forEach(item => {
		copyDone += ch.getDayData(`${item}今日完成次数`) * 1;
	})
	

	var data = [
		{ name : "月卡特权", count : 1, complete : cm.getItemQuantity(2430161), jifen : 40},
		{ name : "每日赞助", count : 1, complete : ch.getUserDayData("今日赞助") * 1, jifen : 40},
		{ name : "道具制作", count : 1, complete : ch.getDayData("今日道具制作") * 1, jifen : 15},
		{ name : "购买双倍", count : 1, complete : ch.getDayData("今日购买双倍") * 1, jifen : 10},
		{ name : "收集任务", count : 10, complete : ch.getDayData("每日任务完成数") * 1, jifen : 20},
		{ name : "每日副本", count : 10, complete : copyDone, jifen : 30},
		{ name : "挑战闹钟", count : 1, complete : ch.getDayData("今日挑战闹钟") * 1, jifen : 15},
		{ name : "挑战妖僧", count : 1, complete : ch.getDayData("今日挑战妖僧") * 1, jifen : 15},
		{ name : "挑战扎昆", count : 1, complete : ch.getDayData("今日挑战扎昆") * 1, jifen : 15},
		{ name : "锻造装备", count : 1, complete : ch.getDayData("今日锻造装备") * 1, jifen : 15},
		{ name : "钓鱼收获", count : 50, complete : ch.getDayData("今日钓鱼") * 1, jifen : 10},
		{ name : "击杀首领", count : 10, complete : ch.getDayData("今日击杀首领") * 1, jifen : 15},
		{ name : "击杀野怪", count : 1500, complete : ch.getTodayKillCount(), jifen : 15},
		{ name : "使用恶魔卡", count : 1, complete : ch.getDayData("今日使用恶魔卡") * 1, jifen : 15},
		{ name : "使用天使卡", count : 1, complete : ch.getDayData("今日使用天使卡") * 1, jifen : 10},
		{ name : "挑战宝藏城", count : 1, complete : ch.getDayData("宝藏城今日进入次数") * 1, jifen : 15},
		{ name : "挑战巨魔蝙蝠", count : 1, complete : ch.getDayData("今日挑战巨魔蝙蝠") * 1, jifen : 15},
		{ name : "挑战暗黑龙王", count : 1, complete : ch.getDayData("今日挑战暗黑龙王") * 1, jifen : 15},
		{ name : "参与答题正确", count : 9, complete : ch.getDayData("今日答题正确") * 1, jifen : 20},
		
	];

	var total = 0; 		//活跃度总分
	var activity = 0;   //角色今日活跃度分数
	data.forEach(item => {
		total += item.jifen;
		item.ok = 0;
		if(item.complete >= item.count){
			item.ok = 1;
			activity += item.jifen;
		}
	})

	var giveData = getGive();


	
    if (status == 0) {

    	var text = "";
		text += "#L991##fUI/Basic.img/CheckBox/0# #k在线奖励#l\t\t\t";
		text += "#L992##fUI/Basic.img/CheckBox/0# #k等级奖励#l\t\t\t";
		text += "#L993##fUI/Basic.img/CheckBox/0# #k在线活动#l\r\n";
		text += "#L994##fUI/Basic.img/CheckBox/1# #b活跃奖励#l\t\t\t";
		text += "#L995##fUI/Basic.img/CheckBox/0# #k暴击抽奖#l\t\t\t";
		text += "#L996##fUI/Basic.img/CheckBox/0# #k福利礼包#l";
		text += "\r\n\r\n"
		
		text += "\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		
		text += "\r\n\r\n";
		
		text += `\t#k 今日活跃度：#B${getPercent(activity,total)}# #r${activity}#k / ${total}\r\n\r\n`;
		
		reward.forEach((v,i) => {
			if(!giveData.includes(String(v.number))){
				text += `#b#L${i}#领取【${v.number}】活跃奖励#l\r\n`;
			}
		})

		text += "\r\n #k"

		reward.forEach((v,i) => {
			if(giveData.includes(String(v.number))){
				text += `\t 已领【${v.number}】活跃奖励\r\n`;
			}
		})
		
		text += "\r\n\t"
		for(let i=0; i < 44; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}

		text += "\r\n";

		text += "\r\n#d"

		data.sort((a, b) => a.ok - b.ok).forEach( (v,i) => {
			if(i < 7){
				text += "\t"
				if(v.ok){
					text += "#d";
				} else {
					text += "#k";
				}
				text += `〔${v.jifen}〕${v.name}〔${v.complete} / ${v.count}〕`;
				
				// if(index % 2 === 0){
					// text += "\t";
				// } else {
					text += "\r\n";
				// }
			}

		})

		text += "#L800##d 查看更多活跃项目...#l"
		
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

		} else if (selection === 800){
			var text = "\r\n"

			data.sort((a, b) => a.ok - b.ok).forEach( (v,i) => {
				
				text += "\t"
				if(v.ok){
					text += "#d";
				} else {
					text += "#k";
				}
				text += `〔${v.jifen}〕${v.name}〔${v.complete} / ${v.count}〕`;
				
				// if(index % 2 === 0){
					// text += "\t";
				// } else {
					text += "\r\n";
				// }
				

			})
			cm.sendNext(text);
			status = -1;
		} else {
			
			const r = reward[selection];

			// cm.saveOrUpdateAccountExtendValue("今日领取活跃", "[]",true);

			var text = "\r\n";
			if(activity >= r.number){
				if(!giveData.includes(String(r.number))){

					var itemId = [] , itemCount = [];
					r.reward.forEach( item => {
						const [id, num] = item;
						itemId.push(id);
						itemCount.push(num);
					})
					
					if(itemId.length > 0 && !cm.canHoldAll(itemId , itemCount)){
						cm.sendOk(`背包空间不足`);
						cm.dispose();
						return;
					}else{

						r.reward.forEach(item => {
							const [id,num] = item;
							cm.gainItem(id,num);
							cm.getPlayer().saveLog("活跃奖励",id,num);
						})

						cm.getPlayer().serverMessage(`领取了【${r.number}】活跃度奖励！`);
						
						setGive(r.number);
						text += "恭喜成功领取以下奖励：";
						
					}
					
				} else {
					text += "你今日已领取过本奖励：";
				}

			} else {
				text += `活跃度达到【${r.number}】可领取奖励`;
			}

			text += "\r\n\r\n";

			r.reward.forEach( item => {
				const [id,num] = item;
				text += `\t#i${id}:# #t${id}:# x ${num}\r\n`;
			})

			cm.sendNext(text);
			status = -1;
			
		}
		
	} else {
		cm.dispose();
	}
}	


/**
 * 计算完成百分比
 * @param {number} done - 已完成数量
 * @param {number} total - 总数量
 * @param {number} decimals - 保留小数位数，默认0
 * @returns {string} 百分比字符串
 */
function getPercent(done, total, decimals = 0) {
  // 防止除数为0
  if (total === 0) return "0%";
  const rate = (done / total) * 100;
  return rate.toFixed(decimals);
}


function getGive() {
	let data = cm.getPlayer().getUserDayData("今日领取活跃");
	if(data){
		return data.split(",");
	}
	return [];
}

function setGive(value) {
	let data = getGive();
	const levelStr = String(value);
	if(!data.includes(levelStr)){
		data.push(levelStr);
	}
	const newValue = data.join(",")
	cm.getPlayer().saveUserDayData("今日领取活跃", newValue);
}