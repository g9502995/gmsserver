
/**
	通用计时器
 	By: Ming 
 	zqm@qq.com
 **/

var giftTime = [];  	//已发送福利时间
let today = new Date().toLocaleDateString();
var stallTips = [];  	//自由市场获得经验加成文字是否已提示的标志
var roleExp = {};    	//角色当前经验值倍率缓存
var dayTaskTipsCache = {};   //每日任务缓存     
// const Server = Java.type('org.gms.net.server.Server');
const PacketCreator = Java.type('org.gms.util.PacketCreator');
const ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
const ii = ItemInformationProvider.getInstance();


// 初始化实例
function init() {

	//答题活动时间区间
	em.setProperty("oxStartTime" , "19:20");
	em.setProperty("oxEndTime" , "19:50");

	// 将频道加成设置为初始值
	em.getWorldServer().setExpRate(1);
	em.getWorldServer().setDropRate(1);
	em.getWorldServer().setMesoRate(1);
	// em.getWorldServer().setBossDropRate(1);

	// 滚动公告初始值空
	em.getWorldServer().setServerMessage("");

	run2();
	run3();
	run4();
	run5();
	run6();
	// 仅在频道1运行。
	// if(em.getChannelServer().getId() == 1) 
}


//间隔1秒操作
function run2(){

	
	open2x(); //双倍活动

	if(em.getChannelServer().getId() == 1){
		ox(); 	 //在线答题活动
	}
	

	gift();  //定时发放礼物（点券，抵用券等）

	player((ch)=>{
		if(!ch.getCashShop().isOpened()){
			checkCode(ch); 	//检查是否有验证码询问，超时作弊判定处理
			stallExp(ch);  	//自由市场摆摊增加经验值
			autoMakeExp(ch); //自动制作历练水
			tipsExpRate(ch); //经验值倍率改变提示
			autoHp(ch); //补药
		}
	})

	em.schedule("run2", 1 * 1000);
}

//间隔15分钟处理一次，用于计算玩家战力
function run3() {
	player((ch)=>{
		giveGuildAttr(ch) //检查帮派属性，若玩家离开了帮派需要更新
		tipsMessage(ch) //月卡未领取提示

		//calcCombatPower方法携带自动更新值并返回
		ch.message("你的战力参考值为：" + ch.calcCombatPower());
	})
	em.schedule("run3", 15 * 60 * 1000);
}

//间隔5分钟处理一次，用于在线泡点
function run4() {
	player((ch)=>{
		ol(ch);
	})
	em.schedule("run4", 5 * 60 * 1000);
}

//间隔1分钟执行，
function run5() {
	player((ch)=>{

		// 钓鱼
		fishing(ch);

		//自动出售装备
		autoSaleEquip(ch)

		// 自动补充弓标
		if(ch.haveItem(3996011)) ch.autoRechargeShoot()
		
	})
	em.schedule("run5", 1 * 60 * 1000);
}

//间隔3秒执行
function run6() {
	player((ch)=>{
		dayTaskTips(ch); //每日任务收集数提示
	})
	em.schedule("run6", 3 * 1000);
}

//角色处理
function player(run) {
	let players = em.getWorldServer().getPlayerStorage().getAllCharacters(); 
	for(let i=0;i < players.length; i++){
		let ch = players[i];
		if(run){
			if(ch.getClient().getChannelServer().getId() == em.getChannelServer().getId()){
				run(ch);
			}
		}
	}
}

function cancelSchedule() {}


/**
 * 全服开始双倍活动
 * @Desc   双倍和双爆在同一时间，可以不在一天
 * @Author Ming
 * @Date   2026-01-10
 */
var start2xTime = "20:00";
var end2xTime = "21:00";

function open2x() {
	
	const date = new Date(); 
	const day = date.getDay(); // 星期几（0=周日，6=周六）
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    //仅在1线执行一次，全频道修改
    if(em.getChannelServer().getId() !== 1)return false;


    // 周五周六双倍延时到22点
    // if([5,6].includes(day))end2xTime = "22:00";
    

    // 判断是否在双倍活动
    const isOpen2xExp = isOpenTime(start2xTime , end2xTime);

    // 判断是否在双爆活动
    const isOpen2xDrop = [5,6].includes(day) && isOpenTime(start2xTime , end2xTime);

  	const expRate = em.getWorldServer().getExpRate(); 
  	const dropRate = em.getWorldServer().getDropRate();
    // const mesoRate = em.getWorldServer().getMesoRate(); //单独金币爆率，我觉得没有意义

    // em.getWorldServer().setExpRate(1);
    // em.getWorldServer().setDropRate(1);
    // em.getWorldServer().setMesoRate(1);

    var message = {};

    // 开启双倍
    if (isOpen2xExp && expRate !== 2) {
   		em.getWorldServer().setExpRate(2);
    	em.getWorldServer().dropMessage(5, "狩猎双倍经验活动已开启！");
    	message.exp = 1;
    	em.setProperty("open2xExp" , "1");
    }

    // 关闭双倍
    if (!isOpen2xExp && expRate !== 1) {
        em.getWorldServer().setExpRate(1); 
        em.getWorldServer().dropMessage(5, "狩猎双倍经验活动已结束！");
        message.exp = 0
        em.setProperty("open2xExp" , "0");
    }
	
	
    // 开启双爆
    if (isOpen2xDrop && dropRate !==2) {
        em.getWorldServer().setDropRate(2);
        em.getWorldServer().setMesoRate(2);
        // em.getWorldServer().setBossDropRate(2);
        em.getWorldServer().dropMessage(5, "狩猎双倍爆率活动已开启！");
        message.drop = 1;
        em.setProperty("open2xDrop" , "1");
    }

    // 关闭双爆
    if (!isOpen2xDrop && dropRate !== 1) {
        em.getWorldServer().setDropRate(1); 
        em.getWorldServer().setMesoRate(1); 
        // em.getWorldServer().setBossDropRate(1);
        em.getWorldServer().dropMessage(5, "狩猎双倍爆率活动已结束！");
        message.drop = 0;
        em.setProperty("open2xDrop" , "0");
    }

    var text = "狩猎";
    if(message.exp === 1)text += "双倍经验";
    if(message.drop == 1)text += "双倍爆率";

    text += `活动已开启！时间：${start2xTime} ~ ${end2xTime}`;

    if(message.exp === 1 || message.drop === 1 ){
    	em.getWorldServer().setServerMessage(text);
    }

    if(message.exp === 0 || message.drop === 0){
    	em.getWorldServer().setServerMessage("");
    }

	
}


//答题
function ox(){

	const oxStartTime = em.getProperty("oxStartTime");
	const oxEndTime = em.getProperty("oxEndTime");
	const text = `OX问答活动开始了，自由市场找活动专员阿江！活动时间：${oxStartTime} ~ ${oxEndTime}`;
    if(isOpenTime(oxStartTime, oxEndTime)){

    	if(em.getProperty("openOX") !== "1"){
    		em.getWorldServer().setServerMessage(text);
        	em.getWorldServer().dropMessage(5, text);
    	}
    	
    	em.setProperty("openOX" , "1");
    	
    }else{

    	if(em.getProperty("openOX") == "1"){

    		if(em.getWorldServer().getServerMessage() == text){
		    	em.getWorldServer().setServerMessage("");
		    }

    		const map = em.getChannelServer().getMapFactory().getMap(109020001);
	    	map.setOxQuiz(false);
		    em.setProperty("openOX" , "0");
	    }

    }

}


// 在线泡点
function ol(ch) {
	//在自由市场
	if(ch.getMapId() === 910000000){

		//坐下了
		// if(ch.getChair() === 3010018){

		//拥有椅子
		if(ch.haveItem(3010018)){
			ch.message("椰子树沙滩椅效果：");
			ch.gainCash(1,20);
			ch.saveLog("泡点奖励",2,20);
			ch.gainExp(86);
		}
	}
}

// 发放礼品
function gift() {

	//每天发放时间
	var targetTimes = ['20:00', '20:30', '21:00'];

	//当前日期
	var currentDate = new Date().toLocaleDateString();

	//当前时间格式化
	var currentTime = formatTime(new Date(), 'HH:mm');

	// 跨天判断：日期变了就清空已执行记录
	if (currentDate !== today) {
		giftTime = [];
		today = currentDate;
	}

	//判断当前时间是否符合发放时间和是否未发过
	if(targetTimes.includes(currentTime) && !giftTime.includes(currentTime)){
		
		let money1 = 2000;
		let money2 = 3000;

		player((ch)=>{
			ch.gainCash(2,money2);
			ch.gainCash(money1);
			ch.saveLog("在线活动",0,1,money1);
			ch.saveLog("在线活动",0,2,money2);
			ch.yellowMessage("GM给福利了！！！");
			if(!ch.getCashShop().isOpened()){
				ch.startMapEffect("GM给福利了！！！", 5121016);
				// sendBuff(2022453,ch); //赠送一个BUFF
			}
		})
		giftTime.push(currentTime);
	}
	
}


//自动制作历练水
function autoMakeExp(ch) {
	const needExp = 500000;
	const makeCount = Math.trunc(ch.getExp() / needExp);
	if(makeCount > 0){
		if(ch.haveItem(3996000)){
			var player = ch.getAbstractPlayerInteraction();
			ch.loseExp(makeCount * needExp,false,false);
			player.gainItem(4033000,makeCount,false);
			ch.serverMessage(`成功制作${makeCount}个`,4033000);
			ch.message(`生命鸟为你制作${makeCount}个历练水，已有数量：${player.getItemQuantity(4033000)}`);
			ch.saveDayData("今日道具制作" , makeCount, true);
			ch.saveData("累计制作历练水" , makeCount , true);
		}
	}
}


// 自动出售装备
function autoSaleEquip(ch){
	const api = ch.getAbstractPlayerInteraction();
	const item = api.getInventory(1)
	const slot = item.getNumFreeSlot();
	if(ch.haveItem(3996010) && slot <= 5){
		var items = [];
		for (var i = 1; i <= 96 - slot; i++) {
			let v = item.getItem(i);
			if( v && v.getItemId()){
				const price =  ii.getWholePrice(v.getItemId());

				var isAdd = 1;
				if(v.getExpiration() > 0) isAdd = 0;
				if(price < 1000) isAdd = 0;
				if(v.getLevel() > 0) isAdd = 0;
				if(v.getOwner()) isAdd = 0;
				if(v.getItemLevel() > 1) isAdd = 0;
				if(v.getItemExp() > 0) isAdd = 0;
				if(v.getCustomUpgradeCount() > 0) isAdd = 0;
				if(isAdd){
					items.push([v.getItemId() , price]);
				}
			}
		}
		var money = 0;
		items.forEach(v=>{
			const [id , price] = v;
			ch.gainItem(id,-1);
			ch.saveLog("快速出售",id,-1);
			money += price;
		})
		ch.gainMeso(money);
		ch.serverMessage("快捷出售获得" + formatUnit(money,0) + "金币");
		ch.message("自动出售完成");
		ch.saveLog("快速出售", 0, money);
	}
}



//经验值变化时弹出经验值提示！
function tipsExpRate(ch) {
	var rid = ch.getId();
	var exp = Number(ch.getExpRateTotal()).toFixed(1);
	var drop = Number(ch.getDropRateTotal()).toFixed(1);
	var rate = [ exp, ch.getMesoRate(), drop, ch.getBossDropRate() ];
	
	if(!roleExp[rid] || JSON.stringify(roleExp[rid]) !== JSON.stringify(rate) ){
		ch.showRateTips();
		roleExp[rid] = rate;
	}
	
}


// 一些特别提示
function tipsMessage(ch) {
	
	//月卡未领取提示
	if(ch.haveItem(2430161)){
		if(!ch.getDayData("今日领取月卡奖励")){
			ch.message("你今天月卡奖励没领，点击月卡特权证物就能领了，过期就浪费啦！");
		}
	}

	if(!ch.hasMerchant())ch.message("在自由市场摆摊后杀怪可获得附加经验值！");
	
}

//每日任务收集数量提示
function dayTaskTips(ch) {
	let player = ch.getAbstractPlayerInteraction();
	let rid = ch.getId();
	let id = 31000; //每日任务ID

	if(player.isQuestStarted(id)){

		var itemId = ch.getQuest(id).getProgressid();
		if(itemId){

			var v = dayTaskTipsCache[rid]

			if(!v || itemId !== v[0]){
				v = [
					itemId,
					player.getItem().getName(itemId),
					ch.getDayData("每日任务收集数") * 1
				];
			}
			var total = player.getItemQuantity(itemId);

			// 月卡处理
			if(player.getItemQuantity(2430161)){
				var data = ch.getData("保管物品");
	            if(data){
	                JSON.parse(data).forEach(item =>{
			            if(item[0] == itemId){
			                total += item[1];
			            }
			        })
	            }
	        }
            

			if(v[3] !== total){
				var text = `[收集任务] ${v[1]} ${total} / ${v[2]}`;
				ch.message(text);
				ch.centerMessage(text);
				v[3] = total;
				dayTaskTipsCache[rid] = v;
			}
		}
	}
}


// 钓鱼
function fishing(ch){
	
	if(ch.getMapId() === 741000206 && !ch.getCashShop().isOpened()){ 
		//正在钓鱼场 ，不在商城
		if(ch.getChair() === 3011000){ //正在使用钓鱼椅子
			let player = ch.getAbstractPlayerInteraction();
			if(ch.haveItem(2300000) && ch.haveItem(5340001)){
				var isok = (Math.floor(Math.random() * 10000) + 1) !== 500;
				isok = true;
				if(isok){
					// 概率把鱼竿损坏
					let item = drawLottery();
					if(item && item.id){
						if(ch.canHold(item.id,1)){
							player.gainItem(item.id,1,false,true,false);
							ch.saveLog("钓鱼",0,item.id,1);

						}else{
							ch.message("背包满了，小鱼放生了！");
						}
						ch.saveDayData("今日钓鱼",1,true);
						if(item.prob < 5){
							ch.serverMessage("在钓鱼场钓到了" , item.id);
						}
					}else{
						ch.message("有鱼咬钩后溜走了！");
					}
					player.gainItem(2300000,-1);
					ch.saveLog("钓鱼",0,2300000,-1);
				}else{
					
					if(!player.getItemQuantity(5340002)){
						player.npcTalk(9330046, `鱼竿被你拉坏了！\r\n\r\n记录时间：#b${formatTime()}`);
					}

					
					player.message(`鱼竿使用过度，坏掉了！${formatTime()}`);

					player.gainItem(5340001,-1,false,false);
					player.gainItem(5340002,1,false,false);

				}
			}
		}
	}
	
}



//检查是否正在摆摊，额外增加10%经验
function stallExp(ch) {
	let id = ch.getId();
	if(ch.hasMerchant()){
		ch.setExtraExpRate(10);
		if(!stallTips.includes(id)){
			ch.message("摆摊状态已开启，杀怪额外获得10%经验加成！");
			stallTips.push(id);
		}
	}else{
		ch.setExtraExpRate(0);
		const index = stallTips.indexOf(id);
		if(index > -1){
			ch.message("摆摊状态已关闭，杀怪额外经验加成被取消了！");
			stallTips.splice(index,1);
		}
	}
}


//检查验证码
function checkCode(ch) {
	let code = ch.getData("验证码");
	if(code){
		code = JSON.parse(code);

		// [时间，状态0未效验，1，正确，2错误]
		let targetTime = new Date(code[0]).getTime();
		let currentTime = Date.now();
		let diffSeconds = Math.round((currentTime - targetTime) / 1000);

		if(diffSeconds >= 30 && diffSeconds <= 3600){ //回答超时
			if(!code[1])movePlayer(ch,code);
		}

	} 
}


//移动角色到牢房
function movePlayer(ch,code) {

	var limitTime = 10; //关入牢房N分钟
	var mapId = 300000012; //牢房地图Id

	var msgText = "疑似使用作弊程序，已被巡查机器人逮捕！"

	//公告提示
	ch.serverMessage(msgText);
	//如果不是在牢房中被重复惩罚时，记录原地图，为了释放时回归原图
	if(ch.getMapId() !== mapId)ch.saveLocation("JAIL");
	

	//移入牢房
	ch.changeMap(mapId);

	//设置释放时间
	ch.addJailExpirationTime(limitTime * 60 * 1000);
	
	//记录抓起来的时间
	// 时间 | 状态 0未验证 1验证通过 2已抓起来 | 关了N分钟，缺省为0
	var cache = [code[0] || formatTime(), 2, code[2] ? code[2] + limitTime : limitTime];
	ch.saveData("验证码",JSON.stringify(cache));
	
}

//自动补药，仅用于客户端出现怪物不显示血条无法补血的情况
function autoHp(ch) {

	//穿戴的了宠物的自动HP
	//927480在武陵道场
	if( ch.haveSlotItem(-124) &&  ch.getMap().getFieldLimit() == 0 ){


		// 定义基础属性
		const maxHP = ch.getMaxHp(); 			// 角色最大血量
		const currentHP = ch.getHp(); 				// 角色当前血量
		
		const hpkey = ch.getKeymap().get(91);  //角色HP药水存放键值
		if(!hpkey)return;
		
		const autoHpItemId = hpkey.getAction();   // 自动补药的药水
		if(!autoHpItemId)return;
		
		const item = ii.getItemEffect(autoHpItemId);
		if(!item)return;
		
		const potionHeal = item.getHp(); 			// 药水恢复血量


		// 计算补药触发阈值（核心逻辑）
		const potionThreshold = maxHP - potionHeal;

		// 计算角色当前血量拥有比例
		const potionThresholdratio = maxHP * 0.4;

		//补充条件：
		//使用的药品补HP至少大于0
		//角色血量大于0，为了判断不是死亡状态
		//血量最大血量小于补药值，保证不浪费
		//血量值小于百分比
		if(potionHeal > 0 && currentHP > 0 && potionThreshold >= currentHP && currentHP <= potionThresholdratio){
			if(ch.haveItem(autoHpItemId)){
				const player = ch.getAbstractPlayerInteraction(); 
				player.gainItem(autoHpItemId,-1,false,false);
				ch.saveLog("系统补药",0,autoHpItemId,1);
				item.applyTo(ch);
				ch.sendPacket(PacketCreator.enableActions());
				player.playSound("Party3/Eat");
			}
		}
	}
}

// 删除或发放家族属性
function giveGuildAttr(ch) {
	if(ch.getCashShop().isOpened()){
		return;
	}
	let player = ch.getAbstractPlayerInteraction();
	let gid = ch.getGuildId();
	let slot = -151;
	let equip = 1112000;   //闪光戒指
	if(!gid){
		if(player.haveItemWithId(equip,true)){
			player.removeEquipFromSlot(slot);
		}
	}else{
		let attr = ch.getData(`${gid}_属性`);
	    if(attr && !player.haveItemWithId(equip,true)){
	        attr = JSON.parse(attr);
	        if(!attr[4])attr[4]=0;
	        if(!attr[5])attr[5]=0;
	        player.gainAndEquipAttr(equip,slot,attr[0],attr[1],attr[2],attr[3],attr[4],attr[5]);
	    }
	}
}




/**
 * 判断是否已经达到活动时间内
 * @Desc   无
 * @Author Ming
 * @Date   2026-01-05
 * @param  {[type]}   start 开始时间：20:00
 * @param  {[type]}   end   结束时间：20:30
 * @return {Boolean}
 */
function isOpenTime(start,end) {
    const currentTime = formatTime(new Date(), 'HH:mm');
    const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };
    const currentTotal = timeToMinutes(currentTime);
    const startTotal = timeToMinutes(start);
    const endTotal = timeToMinutes(end);
    return currentTotal >= startTotal && currentTotal <= endTotal;
}


/**
 * 判断指定日期与今天是否相差超过15天
 * @param {string|Date} targetDate - 指定日期，可以是日期字符串（如"2026-01-01"）或Date对象
 * @returns {boolean} - true表示超过15天，false表示未超过
 */
function isOver15Days(targetDate,dayCount = 15) {
    // 处理传入的日期，转换为Date对象
    const compareDate = new Date(targetDate);
    
    // 验证日期是否有效
    if (isNaN(compareDate.getTime())) {
        throw new Error('传入的日期格式无效，请检查日期参数');
    }

    // 获取今天的日期（重置时分秒为0，确保只比较日期）
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 重置目标日期的时分秒
    compareDate.setHours(0, 0, 0, 0);

    // 计算两个日期的时间差（毫秒），取绝对值（无论指定日期是过去还是未来）
    const timeDiff = Math.abs(today.getTime() - compareDate.getTime());
    
    // 转换为天数（1天 = 24小时 * 60分钟 * 60秒 * 1000毫秒）
    const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // 判断是否超过15天
    return dayDiff > dayCount;
}


/**
 * 格式化本地时间
 * @param {Date} date - 要格式化的Date对象（默认当前时间）
 * @param {string} format - 格式字符串（如 'YYYY-MM-DD HH:mm:ss'）
 * @returns {string} 格式化后的时间
 */
function formatTime(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  let targetDate;
  if (typeof date === 'string') {
    targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      console.error('传入的日期字符串无效:', date);
      return '';
    }
  } else if (date instanceof Date) {
    targetDate = date;
  } else {
    targetDate = new Date();
  }

  // 原有格式化逻辑（变量名从date改为targetDate）
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


//概率抽个小鱼
function drawLottery() {
	
	const lotteryConfig = [
		// 顶级价值：旗鱼（⭐⭐⭐⭐⭐）- 总概率11%（稀缺）
		{ id: 4031641, name: "旗鱼(128cm)", prob: 3.5},
		{ id: 4031642, name: "旗鱼(131cm)", prob: 3.0},
		{ id: 4031643, name: "旗鱼(140cm)", prob: 2.5},
		{ id: 4031644, name: "旗鱼(148cm)", prob: 2.0},

		// 高价值：鲑鱼（⭐⭐⭐⭐）- 总概率15%（较稀缺）
		{ id: 4031645, name: "鲑鱼(166cm)", prob: 4.5},
		{ id: 4031646, name: "鲑鱼(183cm)", prob: 4.0},
		{ id: 4031647, name: "鲑鱼(227cm)", prob: 3.5},
		{ id: 4031648, name: "鲑鱼(288cm)", prob: 3.0},

		// 中价值：银鱼（⭐⭐⭐）- 总概率23%（中等概率）
		{ id: 4031633, name: "银鱼(3.6cm)", prob: 6.5},
		{ id: 4031634, name: "银鱼(5cm)", prob: 6.0},
		{ id: 4031635, name: "银鱼(6.5cm)", prob: 5.5},
		{ id: 4031636, name: "银鱼(10cm)", prob: 5.0},

		// 基础价值：鲤鱼（⭐⭐）- 总概率27%（高概率）
		{ id: 4031637, name: "鲤鱼(53cm)", prob: 7.5},
		{ id: 4031638, name: "鲤鱼(60cm)", prob: 7.0},
		{ id: 4031639, name: "鲤鱼(100cm)", prob: 6.5},
		{ id: 4031640, name: "鲤鱼(113cm)", prob: 6.0}
	];
	
	if (!Array.isArray(lotteryConfig) || lotteryConfig.length === 0) return null;

	const validConfig = [];
	let totalProb = 0;

	for (let i = 0; i < lotteryConfig.length; i++) {
		const item = lotteryConfig[i];
		if (typeof item !== 'object' || item === null || !('id' in item) || !('prob' in item)) continue;

		const prizeId = Number(item.id);
		const prob = Number(item.prob);

		if (isNaN(prizeId) || !Number.isInteger(prizeId)) continue;
		if (isNaN(prob) || prob < 0) continue;

		const formattedProb = Math.round(prob * 10) / 10;
		validConfig.push({ id: prizeId, prob: formattedProb });
		totalProb += formattedProb;
	}

	// 过滤无效配置后若为空，返回错误
	if (validConfig.length === 0) return null;

	// 4. 生成0-100的随机数（保留1位小数，与概率精度匹配）
	const random = Math.round(Math.random() * 1000) / 10;

	// 5. 计算概率区间并查找中奖结果
	let currentRange = 0;
	for (const item of validConfig) {
		currentRange += item.prob;
		if (random <= currentRange) return item;
	}

	// 未命中任何区间（概率总和不足100%）
	return null;
}

//发一个BUFF
function sendBuff(id , player){
	var mse = ii.getItemEffect(id)
	if(mse != null)mse.applyTo(player)
}


/**
 * 格式化数字，超过万/亿时显示对应单位
 * @param {number|string} num - 要格式化的数字（支持数字或数字字符串）
 * @param {number} decimalDigits - 保留的小数位数，默认2位
 * @returns {string} 格式化后的字符串
 */
function formatUnit(num, decimalDigits = 2) {
    // 1. 转换为数字并校验合法性
    const number = Number(num);
    if (isNaN(number)) {
        return '0'; // 非数字返回0
    }

    // 定义单位对应的阈值和除数
    const units = [
        { threshold: 1e8, divisor: 1e8, unit: '亿' }, // 1亿 = 100000000
        { threshold: 1e4, divisor: 1e4, unit: '万' }, // 1万 = 10000
    ];

    // 2. 遍历单位，判断数字所属区间
    for (const item of units) {
        if (Math.abs(number) >= item.threshold) {
            // 计算转换后的值并保留指定小数位
            const converted = Math.floor(number / item.divisor).toFixed(decimalDigits);
            // 去除末尾的0和多余的小数点（例如1.00万 → 1万，1.20亿 → 1.2亿）
            const formatted = converted.toString();
            return formatted + item.unit;
        }
    }

    // 3. 小于万的数字，直接返回（也可根据需求保留小数位）
    return number.toString();
}



// ---------- 预留函数(空实现) ----------

/**
 * 清理函数
 */
function dispose() {}

/**
 * 设置副本
 * @param {Object} eim 副本实例
 * @param {number} leaderid 队长ID
 */
function setup(eim, leaderid) {}

/**
 * 获取怪物价值
 * @param {Object} eim 副本实例
 * @param {number} mobid 怪物ID
 * @return {number} 总是返回0
 */
function monsterValue(eim, mobid) {return 0;}

/**
 * 解散队伍
 * @param {Object} eim 副本实例
 * @param {Object} player 玩家对象
 */
function disbandParty(eim, player) {}

/**
 * 玩家断开连接
 * @param {Object} eim 副本实例
 * @param {Object} player 玩家对象
 */
function playerDisconnected(eim, player) {}

/**
 * 玩家进入副本
 * @param {Object} eim 副本实例
 * @param {Object} player 玩家对象
 */
function playerEntry(eim, player) {}

/**
 * 怪物被击杀
 * @param {Object} mob 怪物对象
 * @param {Object} eim 副本实例
 */
function monsterKilled(mob, eim) {}

/**
 * 副本超时
 * @param {Object} eim 副本实例
 */
function scheduledTimeout(eim) {}

/**
 * 副本设置完成后
 * @param {Object} eim 副本实例
 */
function afterSetup(eim) {}

/**
 * 队长变更
 * @param {Object} eim 副本实例
 * @param {Object} leader 新队长对象
 */
function changedLeader(eim, leader) {}

/**
 * 玩家退出副本
 * @param {Object} eim 副本实例
 * @param {Object} player 玩家对象
 */
function playerExit(eim, player) {}

/**
 * 玩家离开队伍
 * @param {Object} eim 副本实例
 * @param {Object} player 玩家对象
 */
function leftParty(eim, player) {}

/**
 * 清理副本任务
 * @param {Object} eim 副本实例
 */
function clearPQ(eim) {}

/**
 * 所有怪物被击杀
 * @param {Object} eim 副本实例
 */
function allMonstersDead(eim) {}

/**
 * 玩家取消注册
 * @param {Object} eim 副本实例
 * @param {Object} player 玩家对象
 */
function playerUnregistered(eim, player) {}