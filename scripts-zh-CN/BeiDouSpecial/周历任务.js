loadScript('./common.js');
var status = 0;
const questId = 32000; //周历任务ID
const task = getDropData();

// id 奖励物品  step 分段奖励（设置5就是50级5级递增）  count 递增数量
const give = [
	{id : 4000601, step : 10, count : 0 },  //任务币 //固定
	{id : 2430100, step : 5, count : 1.3 },  //点券卡 //固定
	{id : 2430101, step : 5, count : 2 },  //抵用券 //每次+1
	{id : 2430121, step : 10, count : 1 },  //经验池 //每次+1
	{id : 2430110, step : 5, count : 2 },  //金币   //每次+1
];

//完成最大次数后的额外奖励
const reward = [
	{id : 2049100, count : 1},
	{id : 2340000, count : 1},
	{id : 4033009, count : 1},
	{id : 2430156, count : 3},
	{id : 2430190, count : 10},
];

var taskData = null; 	//进行的任务
var killNum = 150;      //击杀怪物数量
var maxCount = 50;      //最多完成次数
var minLevel = 50;      //参与最小等级
var moneyWarp = 20000;  //金币传送价格
var questComplete = 0; 	//已完成任务数
var questGive = 0;      //已领取任务数
var isCard = 0;
var resetGold = 300;    //重置任务需要点券
var itemWarp = 5040000;  //传送道具
function start() {
	status = -1;
	questGive = getData("周历任务领取数") * 1;
	questComplete = getData("周历任务完成数") * 1;
	isCard = cm.getItemQuantity(2430161); 
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (CheckStatus(mode)) {
		
	    if (status == 0) {
			
			var text = ""
            text += "#L990##fUI/Basic.img/CheckBox/0# #k每日任务#l\t\t\t" 
            text += "#L993##fUI/Basic.img/CheckBox/1# #b周历任务#l\t\t\t";
            text += "#L994##fUI/Basic.img/CheckBox/0# #k奖励兑换#l";
            text += "\r\n\r\n\r\n"
            
            text += "\t"
            for(let i=0; i < 44; i++){
                text +="#fMap/MapHelper/minimap/match#";
            }
            
            text += "\r\n\r\n";
			
			if(cm.getLevel() >= minLevel){
				
				taskData = checkQuest();
			
				if(taskData){
				
					text += `\t #k需要消灭 #r#o${taskData.id}# × ${taskData.count}#k`
					if(!isCard)text += `〔月卡减半〕`
					text += `\r\n\r\n\t 完成奖励：\r\n\r\n`;
					
                    getReward(questComplete).forEach((v,i) => {
                        text += `\t\t ${i+1}．#t${v.id}:# × ${v.count}\r\n`
                    })
					
					text += "\r\n"
					text += `#L1##fUI/UIWindow.img/Quest/icon9/0# #b#e我已消灭 #n${cm.getQuestTotal(questId)}#e 只，第 ${questGive} 次提交！#n#l\r\n`;
					text += `#L3##fUI/UIWindow.img/Quest/icon9/0# #r#e花${resetGold}点券换个任务#n\r\n`;
					text += `#L4##fUI/UIWindow.img/Quest/icon9/0# #d#e查看总奖励#l\r\n`
					text += "#L2##fUI/UIWindow.img/Quest/icon9/0# #k#e把我送到所在地#n\r\n";
					
					cm.sendSimple(text);
				}else{
					text += `\t #r我本周已为你派发了 #e${questGive} #n次任务！下周再来吧！`;
					cm.sendSimple(text);
					
				}
			}else{
				text += `\t #r你等级不足 ${minLevel} 级，有点弱！练练再来吧！`;
				cm.sendSimple(text);
			}
			
			
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
				
				
				if(selection === 1 ){

                    var completeKill = cm.getQuestTotal(questId);
					
					if(completeKill >= taskData.count){
                        var giveData = getReward(questComplete);
						const itemId = giveData.map(item => item.id);
						const itemCount = giveData.map(item => item.count);
						if(itemId.length > 0 && !cm.canHoldAll(itemId , itemCount)){
							cm.sendNext("背包空间不足！");
						}else{
                            giveData.forEach((v,i) => {
                                cm.gainItem(v.id , v.count);
                                cm.getPlayer().saveLog("周历任务",v.id,v.count);
                            })
							cm.sendNext("提交成功");
							completeQuest();
                            questComplete++;
							setData("周历任务完成数", questComplete);
							
							let text = `领取了【周历任务】第${questComplete}次奖励！`;
							if(isCard)text += "月卡特权减半完成！"
							cm.getPlayer().serverMessage(text);
							taskData = newQuest(1);
							
						}
						status = -1;
						
					}else{
						cm.sendNext(`\r\n\t你还需消灭 #r#o${taskData.id}# × ${taskData.count - completeKill}`);
						status = -1;
					}
					
					
					
				}else if (selection === 2){

                    var text = `你确定要传送至 #r#o${taskData.id}# #k产出地 吗？\r\n`;
                        text += "#b\r\n";
                        // text += `#L1#花${moneyWarp}金币传送至产地！\r\n`;
                        text += `#L2#使用#t${itemWarp}:#传送至产地！\r\n`;
                    cm.sendSimple(text);

					
				}else if (selection === 3){
					if(taskData){
						
						if(resetGold > cm.getPlayer().getCashShop().getCash(1)){
							cm.sendNext("点券不足！");
						}else{
							cm.getPlayer().gainCash(-resetGold);
                            cm.getPlayer().saveLog("周历任务",1,-resetGold);
                            cm.getPlayer().serverMessage("重置了1个历练任务！");
							taskData = newQuest()
							cm.sendNext("重置成功！已获得新任务！");
						}
						
					}else{
						cm.sendNext("你当前没有任务！");
						
					}
					status = -1;
				} else if (selection === 4){

					var text = "完成次数累计" + maxCount + "次总奖励一览：\r\n\r\n#b"
					var totalReward = [];
					for (var i = 0; i < 50; i++) {
						totalReward.push(...getReward(i));
					}

					// 合并同id，count、add分别累加
					const result = Object.values(totalReward.reduce((map, item) => {
					    if (map[item.id]) {
					        map[item.id].count += item.count;
					    } else {
					        map[item.id] = { ...item };
					    }
					    return map;
					}, {}));

					result.forEach(v => {
						text += `#i${v.id}:# #t${v.id}:# x ${v.count}\r\n`;
					})


					cm.sendNext(text);

					status = -1

				}
				
				
			}
		} else if (status == 2){

			if(selection == 1 && moneyWarp > cm.getMeso()){
                cm.sendOk("金币不足！")
                status =-1;
            }else if(selection == 2 && !cm.haveItem(itemWarp,1)){
                cm.sendOk(`#t${itemWarp}#不足！`);
                status =-1;
            }else{

                var mapId = getMapId();
                if(mapId){
                    
                    if(selection == 1){
                        cm.gainMeso(-moneyWarp);
                        cm.getPlayer().saveLog("周历任务",0,-moneyWarp);
                    }
                    if(selection == 2){
                        cm.gainItem(itemWarp,-1);
                        cm.getPlayer().saveLog("周历任务",itemWarp,-1);
                    }
                    cm.warp(mapId);
                }else{
                    cm.sendOk("查找所在地图错误，请重试");
                }
                
                cm.dispose();
            }
			
		} else {
			cm.dispose();
		}
	}	
}


// 检查任务是否存在，若不存在或超时发放新任务
function checkQuest() {
    const quest = getQuest();
    if(quest){
        //有任务时判断如果用户是否放弃了任务
        if(cm.getQuestTotal(questId) === -1) return newQuest(1);
        return quest
    }else{
        return newQuest(1);
    }
}

/**
 * 获得正在完成的任务
 * @Desc   无
 * @Author Ming
 * @Date   2026-02-10
 * @return {id : 怪物ID, count : 需消灭数, kill : 已完成数}
 */
function getQuest() {
    var mobId = getData("周历任务击杀怪");
    if(mobId){
        return {
            id : mobId,
            count : getData("周历任务击杀数") * 1,
        }
    }
}

/**
 * 发放新任务
 * @Desc   无
 * @Author Ming
 * @Date   2026-02-10
 * @param  {[type]}   是否增加领取数，重置任务时处理
 */
function newQuest(add) {
    const data = getLevelQuest();
     // 抽取到任务
    if(data){

        var quest = {
            id : data.id,
            count : Math.floor(isCard ? killNum / 2 : killNum),  // 击杀数，月卡用户减
        }

        if(add){

            //领取数大于或等于最大领取数拦截
            if(questGive >= maxCount)return false;
            questGive++
            setData("周历任务领取数" , questGive);

        }

        cm.startQuestKill(questId,quest.id,quest.count);
        setData("周历任务击杀怪" , quest.id);
        setData("周历任务击杀数" , quest.count);

        return quest;
    }
}

function completeQuest() {
    cm.completeQuestKill(questId);
    setData("周历任务击杀怪" , 0);

}

// 获得奖励配置，这里是根据完成次数获得的奖励
function getReward(complete) {
    let newData = [];
    for(let i = 0; i < give.length; i++){
        let obj = { ...give[i] }
        obj.count = giveNum(maxCount,obj.step,obj.count,complete)
        newData.push(obj);
    }
    
    if(complete + 1 >= maxCount){
        for(let i=0; i < reward.length; i++){
            newData.push(reward[i]);
        }
    }
    return newData;
}

//获得任务目标所在地图ID
function getMapId() {
    var map = task.filter( v => {
        if(v.id == taskData.id){
            return true
        }
    });
    var warp = null;
    if(map[0]){
        warp  = map[0].map[Math.floor(Math.random() * map[0].map.length)]
    }
    return warp;

}

/**
 * 抽取一个任务配置
 * @Desc   无
 * @Author Ming
 * @Date   2026-02-10
 * @return {[type]}
 */
function getLevelQuest(){
	let level = cm.getPlayer().getLevel() * 1;
	
	//从配置数据中 找到比角色等级低不超20级左右的
	let data = [];
	for (let i=0; i < task.length; i++){
		let v = task[i];
		if(v.level <= (level + 15) && v.level >= (level - 15)){
			data.push(v);
		}
	}
	if(!data.length ){
		//没有任务，可能是最高级了
		task.sort((a,b) => b.level - a.level).forEach((v,i)=>{
			if(i < 10){
				data.push(v);
			}
		})
	}

	return data[Math.floor(Math.random() * data.length)];
	
}


// 随机生成一个数字
function getRandomInRange(min = 40 , max = 60) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 计算当前等级对应的奖励数量（含调试用合计信息）
 * @param {number} maxLevel - 奖励最大等级（如50）
 * @param {number} stepPerStage - 每阶包含的等级数（如5，即1-5为1阶）
 * @param {number} increaseNum - 每阶奖励增加的数量（如2）
 * @param {number} currentLevel - 当前查询的等级（如10）
 * @returns {object|string} 包含核心结果和调试合计的对象，参数无效时返回错误提示
 */
function giveNum(maxLevel, stepPerStage, increaseNum, currentLevel) {
    if (
        typeof maxLevel !== 'number' ||
        typeof stepPerStage !== 'number' ||
        typeof increaseNum !== 'number' ||
        typeof currentLevel !== 'number' ||
        maxLevel <= 0 ||
        stepPerStage <= 0 ||
        increaseNum <= 0 ||
        currentLevel <= 0 ||
        currentLevel > maxLevel
    ) {
        return 1;
    }
	
    const stage = Math.ceil(currentLevel / stepPerStage); // 当前等级所在阶数
    const currentReward = stage * increaseNum; // 当前等级奖励数

    // 4. 返回结果（核心结果+调试合计）
    return Math.ceil(currentReward);
}


/**
 * 读取数据
 * @returns {string}
 */
function getData(name) {
	let data = cm.getPlayer().getWeekData(name);
	if(data){
		return JSON.parse(data)
	}
	return false;
}

/**
 * 保存数据
 */
function setData(name,value){;
	cm.getPlayer().saveWeekData(name,JSON.stringify(value));
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
