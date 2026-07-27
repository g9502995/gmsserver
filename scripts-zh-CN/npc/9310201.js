
var status;

var cfg = {
	takeLevel : 50,  //收徒等级
	lookLevelMin : 15,  //拜师最小等级
	lookLevelMax : 70,  //拜师最大等级
	outLevel : 80,     //出师等级
	max : 5, 			//同时拥有最大徒弟数量
	teacher : {
		reward : [
			{item : 5220000, count : 20},
			{item : 2049100, count : 1},
			{item : 2430040, count : 20},
			{item : 2430100, count : 50},
			{item : 2430101, count : 100},
			{item : 4000603, count : 10}
		]
	},
	pupil : [
		{item : 5220000, count : 10},
		{item : 2049100, count : 1},
		{item : 2430040, count : 10},
		{item : 2430100, count : 20},
		{item : 2430101, count : 100},
		
	],
	gold : [
		{item : 2049100, count :1, gold : 10},
		{item : 2340000, count :1, gold : 30},
		{item : 2430040, count :10,gold : 1},
		{item : 4011007, count :1, gold : 5},
		{item : 4021009, count :1, gold : 5}
	]
}




// 退出师门标识
let exit = null;

// 清理徒弟
let out = null;

// 领取奖励标识
let give = null;

// 积分兑换
let gold = null;

let id = 4000603; //威望币

const ExtendUtil = Java.type('org.gms.util.ExtendUtil');

//脚本启动
function start() {
    status = -1;
    action(1, 0, 0);
}

//动作
function action(mode, type, selection) {

	if (mode <= 0) {
        cm.dispose();
    } else {
		
	    if (mode === 1) {
	        status++;
	    } else{
	        status--;
	    }

	    cm.sendOk("暂不开放");
	    cm.dispose();
	    return;

	    let rule = cm.getPlayer(); 
	
		if (status === 0) {
			var text ="\r\n\t\t\t\t\t#e欢迎来到#r 师徒系统 #k服务中心#n\t\t\t\t\r\n#b";
			text +="\r\n\t\t#L1#带徒入门#l \t\t\t\t\t\t#L2#带徒出师#l\r\n";
			text +="\r\n\t\t#L3#退出师门#l \t\t\t\t\t\t#L4#我的徒弟#l\r\n";
			text +="\r\n\t\t#L5#领取师徒奖励#l \t\t\t\t#L6##t4000603#兑换#l\r\n#k";
			text +="\r\n\r\n\r\n\t系统说明：\r\n"
			text +=`\r\n\t◆ 等级〔#r${cfg.lookLevelMin} - ${cfg.lookLevelMax}#k〕级可拜师`
			text +=`\r\n\t◆ 等级达到〔#r${cfg.takeLevel}#k〕级可收徒`
			text +=`\r\n\t◆ 徒弟达到〔#r${cfg.outLevel}#k〕级可出师`
			cm.sendSimple(text);

		}else if(status === 1){
			if(selection === 1){
				
				cm.sendOk(take());
				status =-1;
				
			}else if (selection === 2){
				cm.sendOk(qualified());
				status =-1;
				
			}else if (selection === 3){
				let myPid = getData(rule.getId(), "我的师傅");
				if(!myPid[0]){
					cm.sendOk("你还没有拜入师门，无需退出！");
					status = -1;
				}else{
					exit = myPid;
					cm.sendYesNo(`退出后 #b${myPid[1]}#k 不再是你的师傅，你真的要退出？`);
				}
			}else if (selection === 4){
				
				let myPupil = getData(rule.getId(), "我的徒弟");
				
				if(myPupil.length > 0){
					let text = "以下是我未出师的徒弟：\r\n\r\n";
					for (var i = 0; i < myPupil.length; i++) {
						let s = myPupil[i];
						text += `#L${s[0]}#${i+1}.\t\t #b${s[1]}#k#l\r\n`;
					}
					
					cm.sendSimple(text);
				}else{
					cm.sendOk("你还没有收徒！");
					status =-1;
				}
				
			}else if (selection === 5){
				let text = "每带一位徒弟出师后，师傅和徒弟都可以来领取1份奖励：\r\n\r\n";
				text += `#r未领师傅奖励： #b#e${cm.getCharacterExtendValue("我的师傅奖励") || 0} 份#n #k\r\n`
				text += `#r未领徒弟奖励： #b#e${cm.getCharacterExtendValue("我的徒弟奖励") || 0} 份#n #k\r\n\r\n`
				text += `【师傅奖励详情】#k\r\n\r\n`;
				text += getRewardList(cfg.teacher.reward) + "\r\n\r\n\r\n";
				text += `【徒弟奖励详情】#k\r\n\r\n`;
				text += getRewardList(cfg.pupil) + "\r\n\r\n";
				give = 1;
				cm.sendYesNo(text);
			}else if (selection === 6){
				let text = `\r\n\t你可以使用 #r#t${id}:#（已有 #c${id}#）#k 兑换以下物品！`;
				text += "\r\n\r\n" + getRewardList(cfg.gold ,1) + "\r\n\r\n\r\n";
				text += "\t#b#L990#返回#l\r\n"
				gold = 1;
				cm.sendSimple(text);
			}
			
		}else if(status === 2){

			if(selection === 990){
				status = -1;
				action(1,0,0);
				return;
			}
			
		
			if(gold){
				let back = exchange(selection);
				cm.sendNext(back);
				gold = null;
				status = -1;
			}else if(give){
				cm.sendOk(setGive());
				give = null;
				status = -1;
			}else if (exit){

				//退出师门
				let myPupil = getData(exit[0], "我的徒弟");

				let newPupil = [];
				myPupil.forEach(v => {
					if(v[0] !== rule.getId()){
						newPupil.push(v);
					}
				})

				setData(exit[0] , "我的徒弟" , newPupil)
				cm.saveOrUpdateCharacterExtendValue("我的师傅" , "");
				rule.serverMessage(`退出了 ${exit[1]} 的师门！`);
				cm.sendOk("退出师门成功！");
				exit = null;
				status = -1;
			} else {

				let myPupil = getData(rule.getId(), "我的徒弟");
				let name = ""

				myPupil.forEach((v,i) => {
					if(v[0] == selection){
						name = v[1];
					}
				})

				if(name){
					out = [selection,name];
					cm.sendYesNo(`你是否打算把 #b${name}#k 请离师门？`);
				}else{
					cm.sendNext("出现问题");
					cm.dispose();
				}
				
			}
			
		}else if (status == 3){

			let myPupil = getData(rule.getId(), "我的徒弟");
			let members = [];
			myPupil.forEach((v,i) => {
				if(v[0] !== out[0]){
					members.push(v);
				}else{
					setData(v[0], "我的师傅" , []);
				}
			})

			setData(rule.getId() , "我的徒弟" , members);
			cm.sendOk("请离成功！");
			rule.serverMessage(`将 ${out[1]} 请离了师门！`);
			status = -1;

			
		}else{
			
			cm.dispose();
		}
	}
	
	
}

//师徒分兑换
function exchange(item){

	let myGold = cm.getItemQuantity(id);
	let reward = cfg.gold.find(obj => obj.item === item);

	
	if(!reward.item)return "奖励异常！";
	if(reward.gold > myGold) return `#t${id}#不足！#r至少需要：${reward.gold}`
	let back = send([reward]);
	if(back === "发送完毕"){
		cm.gainItem(id,-reward.gold)
		cm.getPlayer().saveLog("师徒兑换", cm.getNpc(), id, - reward.gold);
		cm.getPlayer().serverMessage("在师徒兑换了道具");
		return "兑换成功！";
	}
	return back;
}

//领取奖励
function setGive(){
	let myTeacherNum = cm.getCharacterExtendValue("我的师傅奖励") || 0;
	let myPupilNum = cm.getCharacterExtendValue("我的徒弟奖励") || 0;
	
	if(myTeacherNum == 0 && myPupilNum == 0)return "快去把门徒带出师再来"
	
	//师傅奖励
	if(myTeacherNum > 0){
		
		let back = send(cfg.teacher.reward,myTeacherNum);
		
		if(back === "发送完毕"){
			
			cm.saveOrUpdateCharacterExtendValue("我的师傅奖励" , "");
			
			cm.getPlayer().serverMessage(`领取了带徒奖励！`)
			
			return `已成功领取${myTeacherNum}份师傅奖励！`;

		}
		
		return back;
	}
	
	//徒弟奖励
	if(myPupilNum > 0){
		
		let back = send(cfg.pupil,myPupilNum);
		
		if(back === "发送完毕"){
			
			cm.saveOrUpdateCharacterExtendValue("我的徒弟奖励" , "");
			
			cm.getPlayer().serverMessage(`领取了出师奖励！`)
			
			return `已成功领取${myPupilNum}份徒弟奖励！`;
		}
		
		return back;
	}
	
}

//发送奖励
function send(reward , count = 1){
	
	// 验证背包是否充足
	const normalItems = reward.filter(obj => obj.item >= 1_000_000);
	const itemId = normalItems.map(item => item.item)
	const itemCount = normalItems.map(item => item.count * count);
	if(!cm.canHoldAll(itemId , itemCount)){
		return `背包空间不足`;
	}
	
	for (const v of reward){
		cm.gainItem(v.item, v.count * count);
		cm.getPlayer().saveLog("师徒兑换", cm.getNpc(), v.item, v.count * count);
	}

	return "发送完毕";
	
}



// 带徒出师
function qualified(){
	if(cm.getPlayer().getMapId() !== 910000000)return "请到自由市场找我";
	if (cm.getParty() === null)return "请与你的徒弟组队后再来。";
	if (!cm.isLeader())return "请你作为队长与徒弟过来！";

	let player = cm.getPlayer();
	
	//队员处理
	let party = cm.getParty().getMembers();
	if(party.size() !== 2)return "你只能和你的徒弟两人组队！";
	
	
	let myPupil = getData(player.getId(), "我的徒弟");
	let error;
	let members = [];
	for (var i = 0; i < party.size(); i++) {
		let ch = party.get(i);
		// 排除带队人
		if(ch.getId() !== player.getId()){
			if(ch.getMapId() === player.getMapId()){
				if (ch.getLevel() >= cfg.outLevel ) {
				
					let is = myPupil.filter(item => item[0] === ch.getId())
					if(is.length > 0){
						members.push([ch.getId() , ch.getName()]);
						
					}else{
						error = `玩家 #b${ch.getName()} #k不是你的徒弟！` ;
					}
				}else{
					error = `玩家 #r${ch.getName()} #k未达到出师等级，需要达到：#b${cfg.outLevel}级`;
				}
			} else {
				error = `让你徒弟过来！`;
			}
			
		}
	} 
	if(error)return error;
	
	
	//创建奖励余额数
	player.saveData("我的师傅奖励" , members.length , true);

	
	for (var i = 0; i < members.length; i++){
		let v = members[i]
		setData(v[0], "我的徒弟奖励" , 1);
		setData(v[0], "我的师傅" , []);
		player.serverMessage(`将徒弟 ${v[1]} 带出师啦！`);

	}

	let newArray = [];
	myPupil.forEach((v,i) => {
		let is = members.filter(item => item[0] === v[0]);
		if(is.length === 0){
			newArray.push(v);
		}
	})

	setData(player.getId() , "我的徒弟" , newArray);
	
	return "出师成功！" ;
	
}



// 收徒
function take(){
	if(cm.getPlayer().getMapId() !== 910000000)return "请到自由市场找我";
	if (cm.getParty() === null)return "请与你的徒弟组队后再来。";
	if (!cm.isLeader())return "请与你的徒弟组队后再来。";
	let player = cm.getPlayer();
	if(cfg.takeLevel > player.getLevel())return `你的等级必须达到 #r${cfg.takeLevel}级 #k才能收徒！`;
	
	//队员处理
	let party = cm.getParty().getMembers();
	if(party.size() !== 2)return "请你和你的徒弟两人组队！";
	
	let myPupil = getData(player.getId(), "我的徒弟");
	if(myPupil && (myPupil.length + party.size()) >= cfg.max) return "未出师的徒弟太多，暂不能收徒。#b当前已收徒人数：" + myPupil.length;

	let error;
	let members = [];
	for (var i = 0; i < party.size(); i++) {
		
		let ch = party.get(i);
		
		// 排除带队人
		if(ch.getId() !== player.getId()){

			if(ch.getMapId() === player.getMapId()){
			
				if (ch.getLevel() >= cfg.lookLevelMin && ch.getLevel() <= cfg.lookLevelMax ) {
					
					let pid = getData(ch.getId() , "我的师傅");
					if(pid[0] > 0){
						error = `玩家 #b${ch.getName()} #k还未出师，不能再次拜师！` ;
					}else{
						members.push(ch);
					}
					
				}else{
					error = `#b${ch.getName()} #k未达到收徒条件`;
				}
			} else {
				error = `让你徒弟过来！`;
			}
			
		}
		
	} 
	if(error)return error;
	
	//创建师徒关系
	members.forEach((ch,index)=>{
		myPupil.push([ch.getId()  , ch.getName()]);
		setData(ch.getId() , "我的师傅" , [player.getId(),player.getName()]);
		player.serverMessage(`收 ${ch.getName()} 为徒！`);
	})
	setData(player.getId() , "我的徒弟" , myPupil);
	return "收徒成功！";
}





// 定义物品显示模板的映射表（ES6对象字面量优化）
const ITEM_TEMPLATES = {
	0: '#fUI/Basic.img/BtCoin/normal/0#   #fUI/UIWindow.img/QuestIcon/7/0#',	//金币
	1: '#fUI/CashShop.img/CashItem/0#   #b点券#k',
	2: '#fUI/CashShop.img/CashItem/0#   #b抵用券#k',
	4: '#fUI/CashShop.img/CashItem/0#   #b信用点#k',
	5: '#fUI/UIWindow.img/AriantMatch/characterIcon/2#   #fUI/UIWindow.img/QuestIcon/8/0#',	//经验值
};

/**
 * 生成奖励物品的显示列表
 * @param {number} Select - 奖励索引
 * @param {Number} [selected] - 是否为选择
 * @returns {string} 格式化后的奖励列表字符串，每项用换行符分隔
 */
function getRewardList(reward,selected) {
	
	return reward.map(obj => {
		
		let itemshow = ITEM_TEMPLATES[obj.item] ?? '';// 根据物品ID获取基础显示模板（使用空值合并运算符??）
		// 处理不同物品类型的显示逻辑
		if (obj.item >= 1_000_000) {  // 有效的物品ID≥7位数，使用数字分隔符提高可读性
			if(selected){
				itemshow = `#L${obj.item}# ${obj.gold}个#r#t${id}:##k兑换#i${obj.item}##t${obj.item}# × ${obj.count}`;
			}else{
				itemshow = `#i${obj.item}:#   #r#t${obj.item}# × ${obj.count}#k`;
			}
			
		} else if (itemshow) {// 已知物品追加数量显示
			itemshow += ` × #r${obj.count}#k`;
		
		} else {// 未知物品显示错误提示
			itemshow = `#fUI/UIWindow.img/KeyConfig/BtHelp/mouseOver/0# #r未知物品：[#k ${obj.item} #r]#k`;
		}
		if(obj.desc){
			itemshow += ` ${obj.desc}`
		}
		if(selected){
			return `\t${itemshow}#l`;// 为每项添加统一前缀并返回
		}
		return `\t${itemshow}`;
		
	}).join('\r\n');  // 用回车换行符连接所有项
}



/**
 * 获得角色永久存储数据
 * @returns {array}
 */
function getData(rid,name) {
	let Ext = ExtendUtil.getExtendValue(rid.toString(),"21",name.toString());
	let value = Ext ? Ext.getExtendValue() : ''
	if(value){
		return JSON.parse(value);
	}else{
		return [];
	}
}

/**
 * 保存角色永久存储数据
 * value : array
 */
function setData(rid,name,value){
	ExtendUtil.saveOrUpdateExtendValue(rid.toString(),"21",name.toString(),JSON.stringify(value));
}

