loadScript('./common.js');
var status = 0;
const questId = 31000; //周历任务ID
const task = getDropData();
const give = [
	{id : 4000601, count : 1, add : 0},  //任务币 //固定
	{id : 2430100, count : 1, add : 0},  //点券卡 //固定
	{id : 2430101, count : 1, add : 1},  //抵用券 //每次+1
	{id : 2430121, count : 1, add : 1},  //经验池 //每次+1
	{id : 2430110, count : 1, add : 1},  //金币   //每次+1
    {id : 4033006, count : 10, max : 10},
    {id : 2430164, count : 3, max : 10},
    {id : 5510000, count : 1, max : 10},
    {id : 2430190, count : 3, max : 10},
    {id : 2430255, count : 5, max : 10, expire : 3 * 60 * 60 * 1000},
    {id : 2430154, count : 10, max : 10, expire : 3 * (24 * 60 * 60 * 1000)},  //第10次送
];

var taskData = null;    //进行的任务
var maxCount = 10;      //最多完成次数
var minLevel = 30;      //参与最小等级
var itemCount = 100;    //所需物品数量
var moneyWarp = 20000;  //传送金币
var itemWarp = 5040000;  //传送道具
var resetGold = 300;    //重置任务需要点券
var questComplete = 0;  //已完成任务数
var questGive = 0;      //已领取任务数
var isCard = 0;
var storage = null;
function start() {
	status = -1;
	questGive = getData("每日任务领取数") * 1;
    questComplete = getData("每日任务完成数") * 1;
	isCard = cm.getItemQuantity(2430161); 
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	
	if (CheckStatus(mode)) {
		
	    if (status == 0) {
			
			var text = ""
			text += "#L990##fUI/Basic.img/CheckBox/1# #b每日任务#l\t\t\t" 
			text += "#L993##fUI/Basic.img/CheckBox/0# #k周历任务#l\t\t\t";
			text += "#L994##fUI/Basic.img/CheckBox/0# #k奖励兑换#l";
			text += "\r\n\r\n\r\n"
			
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n\r\n";
			
			if(cm.getPlayer().getLevel() >= minLevel){
				
				taskData = checkQuest();
			
				if(taskData){
				
					text += `\t #k需要收集 #r#i${taskData.id}# #t${taskData.id}# × ${taskData.count} #k`
					if(!isCard)text += `〔月卡减半〕`
					text += `\r\n\r\n\t #k完成奖励：\r\n\r\n`;
					
					getReward().forEach((v,i) => {
                        text += `\t\t ${i+1}．#t${v.id}:# × ${v.count}\r\n`
                    })
					
					text += "\r\n"
					text += `#L1##fUI/UIWindow.img/Quest/icon9/0# #b#e我已收集到 #n${getItemQuantity(taskData.id)}#e 个，第 ${questGive} 次提交！#n#l\r\n`;
					text += `#L3##fUI/UIWindow.img/Quest/icon9/0# #r#e花${resetGold}点券换个任务#n\r\n`;
					text += `#L4##fUI/UIWindow.img/Quest/icon9/0# #d#e查看总奖励#l\r\n`
					text += "#L2##fUI/UIWindow.img/Quest/icon9/0# #k#e把我送到产出地#n\r\n";
					
					
					cm.sendSimple(text);
				}else{
					text += `\t #r我今天已为你派发了 #e${questGive} #n次任务！明天再来吧！`;
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
				
				if(selection === 1 && taskData){
                    var complete = getItemQuantity(taskData.id);
					if(complete >= taskData.count){
                        var giveData = getReward();
						const itemsId = giveData.map(item => item.id);
                        const itemsCount = giveData.map(item => item.count);
						if(itemsId.length > 0 && !cm.canHoldAll(itemsId , itemsCount)){
							cm.sendNext("背包空间不足！");
						}else{
							giveData.forEach((v,i) => {
                                cm.gainItem(v.id, v.count,false,true,v.expire || -1);
                                cm.getPlayer().saveLog("每日任务",v.id,v.count);
                            })
							cm.sendNext("提交成功");
							gainItem(taskData.id, -taskData.count);
                            cm.getPlayer().saveLog("每日任务",taskData.id,-taskData.count);
							completeQuest();
                            questComplete++;
                            setData("每日任务完成数", questComplete);

							let text = `领取了【每日任务】第${questComplete}次奖励！`;
							if(isCard)text += "月卡特权减半完成！";
							cm.getPlayer().serverMessage(text);
							taskData = newQuest(1);
							
						}
						status = -1;
						
					}else{
						cm.sendNext(`\r\n\t你还需收集 #r#i${taskData.id}# × ${taskData.count - complete}`);
                        status = -1;
					}
					
					
					
				}else if (selection === 2){

                    var text = `你确定要传送至 #r#i${taskData.id}# #t${taskData.id}# #k产出地 吗？\r\n`;
                        text += "#b\r\n";
                        // text += `#L1#花${moneyWarp}金币传送至产地！\r\n`;
                        text += `#L2#使用#t${itemWarp}#传送至产地！\r\n`;
					cm.sendSimple(text);
				
                }else if (selection === 3){
					
                    if(taskData){
						
						if(resetGold > cm.getPlayer().getCashShop().getCash(1)){
							cm.sendNext("点券不足！");
						}else{

							cm.getPlayer().gainCash(-resetGold);
                            cm.getPlayer().saveLog("每日任务",1,-resetGold);
                            cm.getPlayer().serverMessage("重置了1个每日任务！");
                            taskData = newQuest()
							cm.sendNext("重置成功！已获得新任务！");
						}
						
					}else{
						cm.sendNext("你当前没有任务！");
						
					}
					status = -1;
				} else  if (selection === 4){

					var totalReward = calcTotalReward(give, maxCount)

					var text = "完成次数累计" + maxCount + "次总奖励一览：\r\n\r\n#b"
					totalReward.forEach(v => {
						text += `\t\t#i${v.id}:# #t${v.id}:# x ${v.totalGet}\r\n`
					})
					cm.sendNext(text);
					status = -1;
				}
				
				
			}
		} else if (status == 2){

            if(selection == 1 && moneyWarp > cm.getMeso()){
                cm.sendOk("金币不足！")
                status =-1;
            }else if(selection == 2 && !cm.haveItem(itemWarp) ){
                cm.sendOk(`#t${itemWarp}#不足！`);
                status =-1;
            }else{
                var mapId = getMapId();
                if(mapId){
                    if(selection == 1){
                        cm.gainMeso(-moneyWarp);
                        cm.getPlayer().saveLog("每日任务",0,-moneyWarp);
                    }
                    if(selection == 2){
                        cm.gainItem(itemWarp,-1);
                        cm.getPlayer().saveLog("每日任务",itemWarp,-1);
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
        return quest;
    }else{
        return newQuest(1);
    }
}

/**
 * 获得正在完成的任务
 * @Desc   无
 * @Author Ming
 * @Date   2026-02-10
 * @return {id : ID, count : 数量}
 */
function getQuest() {
    var id = getData("每日任务收集物");
    if(id){
        return {
            id : id,
            count : getData("每日任务收集数") * 1,
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
    const itemId = getLevelQuest();
     // 抽取到任务
    if(itemId){

        

        const quest = {
            id : itemId,
            count : Math.floor(isCard > 0 ? itemCount / 2 : itemCount),  // 需数，月卡用户减
        }

        if(add){

            //领取数大于或等于最大领取数拦截
            if(questGive >= maxCount) return false;
            questGive++;
            setData("每日任务领取数" , questGive);
            
        }

        
        cm.startQuestItem(questId,quest.id,quest.count);
        setData("每日任务收集物" , quest.id);
        setData("每日任务收集数" , quest.count);

        
        return quest
    }
}

//标记任务完成
function completeQuest() {
    cm.completeQuestItem(questId);
    setData("每日任务收集物",0);
}



// 获得奖励配置，这里是根据完成次数获得的奖励
function getReward() {
    let newData = [];
    for(let i = 0; i < give.length; i++){
        let obj = { ...give[i] }
        if(obj.add > 0){
            obj.count = obj.add * (1 + questComplete)
        }

        if(obj.max){
            if(obj.max == (1 + questComplete)){
                newData.push(obj);
            }
        }else{
            newData.push(obj);
        }
        
    }
    return newData;
}

function getLevelQuest(){
	let level = cm.getPlayer().getLevel() * 1;
	
	//从配置数据中根据用户等级找到比他等级低不超10级左右的
	let data = [];
	for (let i=0; i < task.length; i++){
		let v = task[i];
		
		//查询任务等级小于角色等级，和角色等级最多大于任务等级N（当角色50级，取20~50级任务）
		if(v.level <= level && v.level > (level - 30)){
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
	


    const mergedData = data.flatMap(v => v.drop);
    const uniqueData = [...new Set(mergedData)];
    const itemId = uniqueData[Math.floor(Math.random() * uniqueData.length)];
	return itemId;
	
	
	
}

//获得任务目标所在地图ID
function getMapId() {

    var map = task.filter( v => {
        if(v.drop.includes(taskData.id)){
            return true
        }
    });

    const mergedData = map.flatMap(v => v.map);
    const uniqueData = [...new Set(mergedData)];
    return uniqueData[Math.floor(Math.random() * uniqueData.length)];

}



//读取某物品数量
function getItemQuantity(id) {
    var count = cm.getItemQuantity(id);
    if(isCard){
        //月卡需要到存储仓库找
        if(!storage){
            var data = cm.getPlayer().getData("保管物品");
            if(data){
                storage = JSON.parse(data);
            }
        }
        if(storage){
        	storage.forEach(v=>{
	            if(v[0] == id){
	                count += v[1];
	            }
	        })
        }
        
    }
    return count;
}

//扣除某物品，若背包中不足，扣除仓库中的
function gainItem(id,number) {
    var count = cm.getItemQuantity(id);
    
    if(count >= Math.abs(number)){
        cm.gainItem(id,number);
    }else{

        if(isCard){

            var need = Math.abs(number) - count;

            if(count > 0)cm.gainItem(id,-count);
            
            if(need > 0)storage = gainStorageItem(id,-need);
            
        }
    }
}

/**
 * 调整指定物品的数量（支持增减，数量≤0则删除）
 * @param {Number} targetKey - 要调整的目标数字（如2430100）
 * @param {Number} change - 数量变化值（-1表示减1，1表示加1）
 * @returns {Array} 处理后的新数组（不修改原数组）
 */
function gainStorageItem(targetKey, change) {
    const sourceData = storage;
    const newData = sourceData.map(item => [...item]);
    const targetIndex = newData.findIndex(([key]) => key === targetKey);
    if (targetIndex === -1) return newData;
    const targetItem = newData[targetIndex];
    const newCount = targetItem[1] + change;
    if (newCount > 0) {
        targetItem[1] = newCount;
    } else {
        newData.splice(targetIndex, 1);
    }
    cm.getPlayer().saveData("保管物品",JSON.stringify(newData));
    return newData;
}



// 随机生成一个数字
function getRandomInRange(min = 40 , max = 60) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * 读取数据
 * @returns {string}
 */
function getData(name) {
	let data = cm.getPlayer().getDayData(name);
	if(data){
		return JSON.parse(data)
	}
	return false;
}

/**
 * 保存数据
 */
function setData(name,value){;
	cm.getPlayer().saveDayData(name, JSON.stringify(value));
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



/**
 * 计算完成10次任务每个物品累计获得数量
 * @param {Array} itemList 奖励物品数组
 * @param {Number} totalTimes 完成总次数，这里固定10
 * @returns {Array} 每个物品id+单次规则明细+累计总数
 */
function calcTotalReward(itemList, totalTimes = 10) {
    // 1~n求和公式 n*(n+1)/2
    const sumSeq = n => n * (n + 1) / 2;
    const result = [];

    for (const item of itemList) {
        let total = 0;
        let ruleDesc = "";

        if ("max" in item) {
            // 有max：仅第10次发放，前面不给
            total = item.count;
            ruleDesc = `仅第${item.max}次发放，每次${item.count}`;
        } else {
            if (item.add === 0) {
                // add=0 每次固定count
                total = item.count * totalTimes;
                ruleDesc = `add=0，每次固定${item.count}，共${totalTimes}次`;
            } else if (item.add === 1) {
                // add=1 第1次1倍、第2次2倍…第10次10倍
                total = item.count * sumSeq(totalTimes);
                ruleDesc = `add=1，逐次递增，1~${totalTimes}次总和倍数${sumSeq(totalTimes)}`;
            }
        }

        result.push({
            id: item.id,
            countBase: item.count,
            rule: ruleDesc,
            totalGet: total
        });
    }

    return result;
}