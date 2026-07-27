
/**
 * @description 拍卖行中心脚本
 */

var status = -1;
var boss = [];
function start() {
    action(1, 0, 0)
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else if (mode === -1) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    if(!cm.getPlayer().isGM() && cm.getPlayer().getLevel() < 8){
    	cm.sendOk("等级大于8级再来！");
    	cm.dispose();
    	return;
    }

    var PacketCreator = Java.type('org.gms.util.PacketCreator');
  	
  	const ch = cm.getPlayer();
  	const key = ch.getKeymap().get(1);
  	if(key){
  		const d = key.getAction()
  		cm.message("key" + d.toString())

  	}

  	


   
    // cm.getClient().sendPacket(PacketCreator.openExternalBrowser("http://www.baidu.com"));

    if (status === 0) {
		let text = "\r\n\t\t欢迎来到 #r北斗·荣耀冒险岛 #k帮助服务中心\r\n";
		
		text += "\r\n\t\t群号：9657582\r\n"

		text += "\r\n\t"
		for(let i=0; i < 43; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		

        text += " \r\n\r\n#b";
		text += "\t#L1#综合传送#l\t\t\t#L2#赞助中心#l\t\t\t#L3#快捷商店#l\r\n";
		text += " \r\n";
		
        text += "\t#L4#历练任务#l\t\t\t#L8#福利领取#l\t\t\t#L6#物品保管#l\r\n";
		text += " \r\n";
		text += "\t#L5#副本挑战#l\t\t\t#L11#师徒系统#l\t\t\t#L9#道具制作#l\r\n";
		text += " \r\n";
		text += "\t#L13#销毁道具#l\t\t\t#L14#全服排行#l\t\t\t#L12#双倍购买#l\r\n";
		text += " \r\n";


		
		
		if(cm.getPlayer().isGM()){
			text += "\r\n\t"
			for(let i=0; i < 43; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}

			text += " \r\n"
			text += "\r\n\t\t\t\t\t\t\t\t\t\t\t#r内测功能\r\n#b";
			text += "\t#L20#野外首领#l\t#L21#查看掉落#l\t#L22#领取物资#l\t#L23#领取月卡#l\r\n";
			text += "\t#L24#领取经验卡#l"
			text += "\r\n"

			cm.message("空间剩余：" + cm.getInventory(1).getNumFreeSlot())

		}

		
		// text += "#fUI/StatusBar/number/0##fUI/StatusBar/number/1##fUI/StatusBar/number/2#"

		text += "\r\n\t"
		for(let i=0; i < 43; i++){
			text +="#fMap/MapHelper/minimap/match#";
		}
		text += "\r\n";

		text += "\r\n";
		text += `\t\t #k金\t币：\t#r${formatUnit(cm.getMeso())}#k\r\n`
		text += `\t\t #k点\t券：\t#r${formatUnit(cm.getPlayer().getCashShop().getCash(1))}#k\r\n`
		text += `\t\t #k抵用券：\t#r${formatUnit(cm.getPlayer().getCashShop().getCash(2))}#k`;
		text += "\r\n"
		if(cm.getPlayer().isGM()){
			text += "\t\t\t\t\t\t\t\t\t\t#b#L99#GM管理专页#l";
		}

		// cm.getPlayer().showDamage(4);


		if(cm.getPlayer().isGM()){

			cm.message("职业ID：" + parseInt(cm.getJobId() / 10 ));
			
			//cm.dropMessage(1,"技能等级已达到当前上限 30")
			cm.message("位置 ：" + cm.getPlayer().getPosition() )
			cm.message("今日杀怪数量：" + cm.getPlayer().getTodayKillCount());
			// cm.getPlayer().saveCharToDB();
			//cm.getPlayer().showHint("#b#e升级获得5点能力点已为你自动加到智力。" , 300)
			// cm.message("状态：" + cm.getPlayer().getEffect(5010026) === null);

			// cm.getPlayer().autoRechargeShoot()
		}
		
		
		//cm.message("力量 " + cm.getPlayer().getStr())
		//cm.message("敏捷 " + cm.getPlayer().getDex())
		//cm.message("智力 " + cm.getPlayer().getInt())
		//cm.message("运气 " + cm.getPlayer().getLuk())
		// cm.message("职业：" + cm.getPlayer().getJob().getId())

		
		// cm.message("这里" + cm.getPlayer().calcCombatPower())

		//cm.gainAndEquipAttr(1112908,-19,3,3,3,3)

		// cm.showIntro("Effect/Direction1.img/aranTutorial/face");
		// cm.showIntro("Effect/Direction1.img/aranTutorial/ClickLilin");

		//cm.gainAndEquip(1112908,-12)
		//cm.removeEquipFromSlot(-12)
		
		
		//cm.gainItem(2430101,100,false,true,2592000000)
		
		// cm.forceStartQuest(3230)
		//cm.message("状态：" + cm.getQuestStatus(30187))
		//cm.message("进度：" + cm.getQuestProgressInt(30006,4230101))
		//cm.message("重置：" + cm.resetAllQuestProgress(30006))
		//cm.forceCompleteQuest(30187)
		
		// cm.message("地图测试：" + cm.getMap().reportMonsterSpawnPoints(cm.getPlayer()))

		// cm.dropMessage(1,"技能等级已上限,使用能手册可突破");
	
		// cm.playerMessage(6,"asdf")
		// var skillId = 2321001;


		// cm.message("技能等级：" + cm.getPlayer().getSkillLevel(skillId))
		// cm.message("技能有效期：" + cm.getPlayer().getSkillExpiration(skillId));
		// cm.message("技能是否限制等级：" + cm.getPlayer().getMasterLevel(skillId));

		// cm.teachSkill(10001007,3,1,-1);


		//cm.cancelItem(2023000)
		// cm.useItem(2022070)
		// cm.useItem(2022530)

		// cm.gainItem(1032060)


		// var skill = cm.getPlayer().getRemainingSps();
		// cm.message("测试" + skill.toString())
		// cm.getPlayer().gainSp(-1,4,false)

		//useSkill(4111001)


		function useBUFF(id) {
			const ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
			const ii = ItemInformationProvider.getInstance();
			var mse = ii.getItemEffect(id)
			if(mse != null){
				mse.applyTo(cm.getPlayer())
				cm.message("使用成功")
			}else{
				cm.message("未找到效果")
			}

		}

		// useBUFF(2022445)
		// useBUFF(2022530)
		
		//cm.cancelItem(2023202)
		
		//cm.teachSkill(9101100, 101, 0, 999999999);
		//9101100

		//cm.teachSkill(8, 1, 1, -1);
		
		//cm.message("第一栏是不是有0格：" + cm.getPlayer().haveItemEquipped(1112108))
		
		// cm.getPlayer().removeJailExpirationTime()
		// cm.getPlayer().setExtraExpRate(0);
		// cm.message("经验值：" + cm.getPlayer().getExtraExpRate());
		// cm.getPlayer().startMapEffect("恭喜你答对了", 5120011,1000);

		//cm.message("正在使用的椅子:" + cm.getPlayer().getChair())
		
		//cm.getPlayer().getCashShop().gainCash(2, 5000);
		//cm.getPlayer().getCashShop().gainCash(1, 500);
		
		//cm.getPlayer().message("获取抵用券 (+5000)");
		
		//cm.playSound("Dojang/start");
		// cm.showEffect("dojang/start/stage");
		//cm.showEffect("dojang/start/number/32");  //最大32


		
		//关联文件：Sound.wz/Field.img
		//cm.getPlayer().sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/IncEXP"));
		// cm.getPlayer().sendPacket(PacketCreator.showItemLevelup())

		// cm.getPlayer().sendPacket(PacketCreator.showEffect("event/coconut/victory"));
		// cm.getPlayer().sendPacket(PacketCreator.playSound("Coconut/Victory"));
		
		
		// cm.getPlayer().sendPacket(PacketCreator.showEffect("quest/carnival/win"));
		// cm.getPlayer().sendPacket(PacketCreator.playSound("MobCarnival/Win"));

		// cm.getPlayer().sendPacket(PacketCreator.showEffect("quest/carnival/lose"));
		// cm.getPlayer().sendPacket(PacketCreator.playSound("Coconut/Failed"));
		

		// cm.getPlayer().sendPacket(PacketCreator.showEffect("quest/carnival/lose"));
		// cm.getPlayer().sendPacket(PacketCreator.playSound("MobCarnival/Lose"));

		// cm.getPlayer().sendPacket(PacketCreator.showEffect("quest/party/wrong_kor"))
		// cm.getPlayer().sendPacket(PacketCreator.playSound("Party1/Failed"));
		
		// cm.getPlayer().sendPacket(PacketCreator.playSound("5th_Maple/prize"));
		// cm.getPlayer().sendPacket(PacketCreator.playSound("5th_Maple/Loose"));
		
		// cm.getClient().getChannelServer().broadcastPacket(PacketCreator.startMapEffect(`欢迎来到冒险岛！`,5120004,true));
		// cm.getPlayer().startMapEffect(`欢迎  说点悄悄话 』 来到冒险岛！`,5120007 , 300000)

		// cm.setQuestProgress(30162 , 1 , 0);
		
		// var old = quest.getProgress(8200008);

		var taskId = 32000
		// var quest = cm.isQuestActive(taskId);

		// var quest = cm.getPlayer().getQuest(taskId);

		// var pos = cm.getPlayer().getPosition();

		const Point = Java.type('java.awt.Point');
		const LifeFactory = Java.type('org.gms.server.life.LifeFactory');


		//在地图上召唤个怪物
		
		// const mob = LifeFactory.getMonster(9400589)
		// const pos = new Point(537,-472)

		// cm.getMap().spawnMonsterOnGroundBelow(mob,pos);
		// cm.getMap().moveMonster(9400589,537,-472)
		// cm.getMap().killAllMonsters()

		// cm.getMap().killMonster(mob, null, false);
		// cm.getMap().killMonster(9400589)

		// cm.message("背包数量：" + cm.getPlayer().getSlots(4));
		// cm.completeQuest(taskId)
		
		// cm.message("启动任务" + cm.getPlayer().getQuestItemCount());
		// cm.completeQuestKill(taskId);

		// cm.getPlayer().getQuest(taskId).forceComplete()

		//修改某任务进度，这个是击杀怪物数量改为5
		// cm.setQuestProgress(taskId,1210100 , "001");
		// cm.setQuestProgress(taskId,1210101 , "002");

		// cm.startQuestKill(taskId,1210100, 200);
		// cm.startQuest(taskId);


		// cm.message("设置好任务 怪物ID：" + cm.getPlayer().getQuest(taskId).getProgressid());

		//得到某任务的进度，这个是击杀怪物的数量

		// cm.message("击杀数量：" + cm.getQuestProgressInt(taskId, 1210100));


		// cm.message("任务状态：" + cm.isQuestStarted(taskId))

		// cm.setQuestProgress(taskId,1210101 , "001");

		// cm.message("击杀数量：" + cm.getQuestProgressInt(taskId, 1210101));



		//超过26天后不显示
		// cm.getPlayer().sendPacket(PacketCreator.earnTitleMessage("屏幕中央的黄字"));
			
			// var item = cm.getInventory(1).getItem(1);

			//cm.getPlayer().serverMessage("强化至+7" , item);
			// cm.getPlayer().serverMessage(item,"强化至+7");
			// cm.getPlayer().serverMessage("百宝箱抽到了",item, "真是太幸运了！");


			//向玩家发消息
			//0 增加[Notice]前缀的蓝色消息
			//1 弹窗
			//2 白背景的悄悄话(小喇叭)，格式为“发言人 : 你好呀”
			//3 超级喇叭(用法未知)
			//4 顶部滚动消息，需要频道号传入，第二参数就是频道号，内容为三参数
			//5 红色消息
			//6 蓝色消息文字
        	// cm.getPlayer().dropMessage(3,"asdf",9010000)
			// cm.getPlayer().gainExp(1, true,false,true)
		//cm.getPlayer().sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/ItemMake/Success"));
		
		
       
		
        cm.sendSimple(text);
    } else if (status === 1) {

       	if(selection == 1)openNpc("城镇传送");
       	if(selection == 2)openNpc("赞助中心");
       	if(selection == 3){

       		openNpc("兑换商城");
       		return;
       		var text = "要打开哪个商店呢？\r\n\r\n#b";
       		
       		text += "#L999#打开杂货店#l\r\n";
       		text += "#L998#快速出售物品#l\r\n"
       		
       		cm.sendSimple(text);
       	}
       	if(selection == 4)openNpc("每日任务");
       	if(selection == 5)openNpc("副本奖励");
       	if(selection == 6)openNpc("物品保管");
       	if(selection == 7)openNpc("周历任务");
       	if(selection == 8)openNpc("在线奖励");
       	if(selection == 9)openNpc("道具制作");
       	if(selection == 10)openNpc("物品保管");
       	if(selection == 11){
       		cm.dispose();
       		cm.openNpc(9310201);
       	}
       	if(selection == 12)openNpc("双倍购买");
       	if(selection == 13)openNpc("背包清理");
       	if(selection == 14)openNpc("全服排行");
       	if(selection == 20){

       		em = cm.getEventManager("boss");
       		boss = em.getProperty("boss");
       		boss = boss ? JSON.parse(boss) : [];

       		var text = ""
       		for (var i = 0; i < boss.length; i++) {

       			if(boss[i].notice){
	       			const map = em.getChannelServer().getMapFactory().getMap(boss[i].map);
	       			text += `#L${i}# ${boss[i].name}（${boss[i].level}级）（${boss[i].spawn}分钟）`;
	       			if(map.getMonsterById(boss[i].id)){
	       				text += "（存活）"
	       			}
	       			text += "\r\n";
	       		}
       		}

       		cm.sendSimple(text);

       		
       	}
       	if(selection == 21)openNpc("当前地图掉落");
       	if(selection == 22){

       		let total = cm.getPlayer().getUserData("内测物资");
       		var text = `领取成功！你已累计领取了${total + 1}次！\r\n`;
       		if( total > 0){
       			cm.sendOk("你已经领取过物资");
       			cm.dispose();
       			return;
       		}
       		let giveItem = [2430100, 2430101];
       		var giveCount = [3000,3000];
       		if(cm.canHoldAll(giveItem,giveCount)){
       			for (var i = 0; i < giveItem.length; i++) {
       				cm.gainItem(giveItem[i],giveCount[i]);
       			}
       		}
       		cm.saveUser("内测物资" , 1);
       		cm.sendOk("领取成功");
       		cm.dispose();
       		
       		
       	}

       	if(selection == 23){
       		let item = 2430162;
   			if(cm.canHold(item)){
   				cm.gainItem(item);
   				cm.sendOk("领取成功");
   				cm.saveUser("内测月卡",1);
   			}else{
   				cm.sendOk("背包不足");
   			}
       		cm.dispose();
       	}

       	if(selection == 24){
       		cm.gainItem(2430122,1000)
       		cm.dispose();
       	}


       	if(selection == 69)openNpc("在线玩家");
       	if(selection == 72)openNpc("去打副本");

       	if(selection == 99)openNpc("GM");

       	

    } else if (status == 2){

    	if(selection == 999){
    		openNpc("杂货商店");
    	}else if (selection == 998){
    		openNpc("快速出售");
    	}else{
	    	cm.warp(boss[selection].map);
	    	cm.dispose();
	    }
	    	
    } else {
        cm.dispose();
    }
}


function msg(textValue) {
	
	//通知消息  1普通框弹出提示，2：带浅蓝色背景的提示，5为红色 6为蓝色，其他报错
  
	const Server = Java.type('org.gms.net.server.Server');
	const PacketCreator = Java.type('org.gms.util.PacketCreator');
	let s = Server.getInstance();
	let w = s.getWorlds();
	for (let i = 0; i < w.length; i++) {  
		w[i].broadcastPacket(PacketCreator.serverNotice(6,"test"))
	}

	s.broadcastGMMessage(cm.getPlayer().getWorld(), PacketCreator.earnTitleMessage("登录了游戏"));
	
	
}



function useSkill(id) {
	// body...
	var ch = cm.getPlayer();
	var skill = ch.getSkill(id)
	if(skill){
		var lv = ch.getSkillLevel(id);
		if(lv){
			
			skill.getEffect(lv).applyTo(ch);
			
			
		}
	}
}

function openNpc(scriptName) {
    cm.dispose();
    if(scriptName == "杂货商店"){
    	cm.openShopNPC(1011100);
    }else{
    	cm.openNpc(9010000, scriptName);
	}
}



/**
 * 格式化数字，超过万/亿时显示对应单位
 * @param {number|string|null|undefined} num - 要格式化的数字
 * @param {number} decimalDigits - 保留的小数位数，默认2位
 * @param {string} fallback - 非法数字兜底文案，默认'0'
 * @returns {string} 格式化后的字符串
 */
function formatUnit(num, decimalDigits = 2, fallback = '0') {
    // 转为数字
    const number = Number(num);
    // 校验是否有效数字
    if (isNaN(number) || !isFinite(number)) {
        return fallback;
    }

    // 单位配置：从大到小匹配
    const units = [
        { threshold: 1e8, divisor: 1e8, unit: '亿' },
        { threshold: 1e4, divisor: 1e4, unit: '万' },
    ];

    // 匹配亿、万单位
    for (const item of units) {
        if (Math.abs(number) >= item.threshold) {
            // 先四舍五入保留小数
            const fixedNum = (number / item.divisor).toFixed(decimalDigits);
            // 清除末尾无效0与小数点
            const cleanNum = parseFloat(fixedNum).toString();
            return `${cleanNum}${item.unit}`;
        }
    }

    // 小于万：统一保留指定位小数并清除末尾0，保持逻辑统一
    const smallFixed = number.toFixed(decimalDigits);
    return parseFloat(smallFixed).toString();
}