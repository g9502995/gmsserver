loadScript('./common.js');
var status = 0;
var gid = null;
var rank = 0;
var index = 0;
var contribute0 = 50;  //今日贡献金币
var contribute1 = 50;  //今日贡献点券
var contribute2 = 50;  //今日贡献抵用券
var contributeMaxCount = 50; //今日贡献最大次数
var contribute = [10000,50,150];
var contributeGive = [4033006,2430154];
var cfg;    //升级配置
var glv;   //家族等级
var giveData = [];
var attr = [0,0,0,0,0,0];
var limit = 0;  //家族最大容纳人数 
const warpItem = 5040000;

function start()  {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {

    if(mode <=0 ){
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    const ch = cm.getPlayer();
    
    gid = ch.getGuildId();

    //cm.gainItem(4033006,100)
    //cm.gainItem(4033000,100)

    if(status == 0){

        if(gid){

            attr = getData(`${gid}_属性`) || [0,0,0,0,0,0];
            if(!attr[4])attr[4]=0;
            if(!attr[5])attr[5]=0;

            rank = ch.getGuildRank(); 

            limit = ch.getGuild().getCapacity();
            
            //身份 1 是族长 2 副组长

            var text = "\r\n你好，我是家族日常事务专员，请问你要做什么？\r\n\r\n"
                text += "#b";
                text += "#L1#我想去做家族任务#l\r\n";
                text += `#L2#我想提升家族属性#l\r\n`;
                text += "#L3#我想为家族做捐献#l\r\n"
                text += `#L4#我想领取家族福利#l\r\n`;

                text += "　\r\n"
        
            cm.sendSimple(text);
        }else{
            cm.sendOk("你还没有家族，我还不能为你服务哦！");
            cm.dispose();
        }
      

    } else if (status == 1) {

        glv = Number((cm.getGuild().getCapacity() - 5) / 5);
        index = selection 
        if(selection == 1){

            var text = `家族任务由族长发起，成员无法单独完成！\r\n帮你传送过去需 #r消耗#t${warpItem}##k，你确定去吗？\r\n`
            text += "\r\n#b";
            text += "#L1#好的，帮我传过去！#l\r\n";
            text += "#L99#我再考虑考虑！#l\r\n"
            cm.sendSimple(text);

        }else if(selection == 2){
            
            var text = `\r\n\t你打算提升哪项属性？\r\n`;
            text += "\r\n#b"
            text += `\t#L9102001#力量〔#r＋${alignText(attr[0],3)}#b〕#l\t\t`;
            text += `#L9102002#敏捷〔#r＋${alignText(attr[1],3)}#b〕#l\r\n`;
            text += `\t#L9102003#智力〔#r＋${alignText(attr[2],3)}#b〕#l\t\t`;
            text += `#L9102004#运气〔#r＋${alignText(attr[3],3)}#b〕#l\r\n`;
            // text += `#L9102005#攻击力#r〔＋${attr[4] || 0}〕#l\r\n`;
            text += "\r\n\r\n"
            text += "#L99#我再考虑考虑！#l\r\n"
            text += "　\r\n"
            cm.sendSimple(text);

        }else if(selection == 3){

            contribute0 = ch.getDayData("贡献金币") * 1;
            contribute1 = ch.getDayData("贡献点券") * 1;
            contribute2 = ch.getDayData("贡献抵用券") * 1; 

            var text = "\r\n你打算为家族贡献些什么呢？\r\n\r\n";
            text += `累计使用圣神水：${ch.getData(`${gid}_GP`) * 1}\r\n`;
            text += "\r\n#b"
            text += `#L0#金\t币〔#r${contribute0}#b / ${contributeMaxCount}〕#l\r\n`;
            text += `#L1#点\t券〔#r${contribute1}#b / ${contributeMaxCount}〕#l\r\n`;
            text += `#L2#抵用券〔#r${contribute2}#b / ${contributeMaxCount}〕#l\r\n`;
            text += "#L99#返回#l\r\n"
            text += "　\r\n"
            cm.sendSimple(text);

        }else if(selection == 4){
            
            let isGive = ch.getDayData("家族福利") * 1;
            if(isGive){
                cm.sendOk("你今天已领取过了，请明天再来哦！");
                status = -1;
            }else{
                var text = `\r\n按家族等级，你今天可领的家族福利：\r\n\r\n`
                text += "\r\n"
                giveData = getGive(glv);
                for (var i = 0; i < giveData.length; i++) {
                    const v = giveData[i];
                    text += `\t\t#i${v.id}# #t${v.id}:# × ${v.count}\r\n`
                }

                text += "\r\n#b"

                text += "#L1#我想现在领取！#l\r\n"
                text += "#L99#返回#l\r\n"
                text += "　\r\n"

                cm.sendSimple(text);
            }
            
        }else{
            cm.dispose();
        }

    } else if (status == 2){

        if(selection === 99){
            status = -1;
            action(1,0,0);
            return;
        }

        // 传送任务地图
        if(index == 1){
            if(!cm.haveItem(warpItem)){
                cm.sendOk(`#t${warpItem}#不足！`);
            }else{
                cm.warp(101030104)
                cm.gainItem(warpItem,-1);
            }

            cm.dispose();
        }

        if(index == 2){
            var text = `\r\n\t要将`;
            var name = '';
                if(selection == 9102001)name = "力量"
                if(selection == 9102002)name = "敏捷"
                if(selection == 9102003)name = "智力"
                if(selection == 9102004)name = "运气"
                if(selection == 9102005)name = "攻击力"
                if(selection == 9102006)name = "魔法力"
            

            var add = attr[(selection - 9102001)] || 0;
           
            cfg = getCfg(add);
            if(cfg.lv){
                text += ` #d${name} 加成提升到 ${add + 1}#k `

                text += `家族等级达到${cfg.lv}级#r（已${glv}级）#k\r\n\r\n`

                text += "\t#k还需给我一些物资：\r\n\r\n"

                text += `#r`
                

                
                text += `\t\t#i4031138# 金币 ${formatUnit(cfg.gold)}\t#r（已有 ${formatUnit(cm.getMeso())}）#k\r\n`;
                for(let i = 0; i < cfg.item.length; i++){
                    text +=`\t\t#i${cfg.item[i].id}:# #t${cfg.item[i].id}:# ${cfg.item[i].count}\t#r（已有 ${cm.getItemQuantity(cfg.item[i].id)}）#k\r\n`;
                }
                text += "\r\n";
                text += "#b"
                text += `#L${selection}#我已备齐，帮我提升！#l\r\n`;
                text += "#L999#返回！#l\r\n";
                
                cm.sendSimple(text);

            }else{
                text += `#r${name} 属性已经满级了，请等待下一个版本！\r\n`;
                cm.sendOk(text);
                cm.dispose();
            }
        }

        if(index == 3){

            var name = selection == 0 ? "金币" : selection == 1 ? "点券" : "抵用券";
            //捐献
            var text = `\r\n每贡献1次${name}颁发1个赤金旗，你打算贡献多少？\r\n`
            text += "#b\r\n"

            var menuNumData = [1,10,20,30,50];
            for(let i=0;i < menuNumData.length; i++){
                text += `#L1${selection}${menuNumData[i]}#使用${formatUnit(contribute[selection] * menuNumData[i])}${name}贡献${menuNumData[i]}次！#l\r\n`;
            }
            
       
            cm.sendSimple(text);
            

        }

        if(index == 4){
            const itemId = giveData.map(item => item.id)
            const itemCount = giveData.map(item => item.count);
            if( itemId.length > 0 && cm.canHoldAll(itemId, itemCount) ){
                for (var i = 0; i < giveData.length; i++) {
                    cm.gainItem(giveData[i].id,giveData[i].count)
                    ch.saveLog("NPC",cm.getNpc(),giveData[i].id,giveData[i].count);
                }
				ch.saveDayData("家族福利",1);
                ch.serverMessage("领取了家族福利！");
                cm.sendOk("领取成功，升级家族可领取更多的奖励哦！");
            }else{
                cm.sendOk("背包空间不足！")
            }
            status = -1;
            
        }

        
       
    } else if (status == 3){
        if(index == 2){
            if(selection == 999){
                status = 0;
                action(1,0,2);
                return;
            }else{
                var name = '';
                if(selection == 9102001)name = "力量"
                if(selection == 9102002)name = "敏捷"
                if(selection == 9102003)name = "智力"
                if(selection == 9102004)name = "运气"
                if(selection == 9102005)name = "攻击力"

                if(name){
                    if(cfg.lv > glv){
                        cm.sendOk("家族等级不足！");
                    }else if(cfg.gold > cm.getMeso()){
                        cm.sendOk("金币不足！")
                    }else{
                        var textItem;
                        for(let i=0; i < cfg.item.length;i++){
                            if(cfg.item[i].count > cm.getItemQuantity(cfg.item[i].id)){
                                textItem = `需求 #t${cfg.item[i].id}# 不足！`;
                                break;
                            }
                        }
                        if(textItem){
                            cm.sendOk(textItem);
                        }else{

                            cm.gainMeso(-cfg.gold);
                            for(let i=0; i < cfg.item.length;i++){
                                cm.gainItem(cfg.item[i].id,-cfg.item[i].count);
                                ch.saveLog("NPC",cm.getNpc(),cfg.item[i].id,-cfg.item[i].count);
                            }

                            attr[selection - 9102001] = attr[selection - 9102001] + 1;
                            setAttr(attr);
                            setData(`${gid}_属性`,attr);
                            ch.serverMessage(`获得【家族${name}+${cfg.level + 1}】属性加成！`);
                            cm.sendOk(`升级${name}+${cfg.level + 1}成功`)
                        }
                    }
                }else{
                    cm.sendOk("失败" + selection)
                }

                
                status = -1;
            }
            
        }

        if(index == 3){
            var value = selection.toString()
            //使用的货币类型 0 金币 1点券 2 抵用券
            var type = value[1];
            var number = value.slice(2) * 1;
            var needCount = contribute[type * 1];
            const giveCount = number * needCount;
            var contributeGiveCount = [];
            for(let i=0;i < number;i++){
                contributeGiveCount.push(number);
            }
            if( cm.canHoldAll(contributeGive,contributeGiveCount) ){
                if(type == "0"){
                    //金币贡献
                    if(needCount > cm.getMeso()){
                        cm.sendOk("金币不足");
                    }else{
                        if((contribute0 + number) > contributeMaxCount){
                            cm.sendOk(`今日最多贡献${contributeMaxCount}次，你已${contribute0}次，请你选择合适的！`)
                        }else{
                            cm.gainMeso(-(number * needCount));
                            ch.saveLog("家族捐献",cm.getNpc(),0,-giveCount);
                            for(let i=0;i < contributeGive.length;i++){
                                cm.gainItem(contributeGive[i] , number);
                                ch.saveLog("家族捐献",cm.getNpc(),contributeGive[i],number);
                            }
                            ch.saveDayData("贡献金币", number);
                            ch.serverMessage("为家族做出了贡献！")
                            cm.sendOk("贡献成功！");
                        }
                    }
                }else if(type == "1"){
                    //点券贡献
                    if(needCount > ch.getCashShop().getCash(1)){
                        cm.sendOk("点券不足");
                    }else{
                        if((contribute1 + number) > contributeMaxCount){
                            cm.sendOk(`今日最多贡献${contributeMaxCount}次，你已${contribute1}次，请你选择合适的！`)
                        }else{
                            ch.gainCash(-giveCount)
                            ch.saveLog("家族捐献",cm.getNpc(),1,-giveCount);
                            for(let i=0;i < contributeGive.length;i++){
                                cm.gainItem(contributeGive[i] , number);
                                ch.saveLog("家族捐献",cm.getNpc(),contributeGive[i],number);
                            }
                            ch.saveDayData("贡献点券", number);
                            ch.serverMessage("为家族做出了贡献！")
                            cm.sendOk("贡献成功！");
                        }
                    }
                }else if(type == "2"){
                    //抵用券贡献
                    if(needCount > ch.getCashShop().getCash(2)){
                        cm.sendOk("抵用券不足");
                    }else{
                        if((contribute2 + number) > contributeMaxCount){
                            cm.sendOk(`今日最多贡献${contributeMaxCount}次，你已${contribute2}次，请你选择合适的！`)
                        }else{
                            ch.gainCash(-giveCount,true);
                            ch.saveLog("家族捐献",cm.getNpc(),2,-giveCount);
                            for(let i=0;i < contributeGive.length;i++){
                                cm.gainItem(contributeGive[i] , number);
                                ch.saveLog("家族捐献",cm.getNpc(),contributeGive[i],number);
                            }
                            ch.saveDayData("贡献抵用券", number);
                            ch.serverMessage("为家族做出了贡献！")
                            cm.sendOk("贡献成功！");
                        }
                    }
                }
            }else{

                cm.sendOk("背包空间不足，贡献成功会有礼品，你腾腾地方吧！")
            }

            status = -1;
        }
        
    } else {
        cm.dispose();
    }
}

//得到福利领取配置
function getGive(level = 1) {
    var cfg = [];
    const intLevel = Math.trunc(Number(level) || 1);
    for(let i=1;i <= 20; i++){
        cfg.push({
            lv : i,
            item : [
                { id : 2430110, count : 5 + (Math.trunc(intLevel / 2))},
                { id : 2430100, count : 1 + (Math.trunc(intLevel / 6))},
                { id : 2430101, count : 2 + (Math.trunc(intLevel / 3))},
            ],
        })
    }
    const result = cfg.filter(item => item.lv === intLevel);
    return result.length > 0 ? result[0].item : [];
}

//获得升级属性的需求数据
function getCfg(level = 0) {
        
    var data = [];
    for (var i = 1; i <= 100; i++) {
        data.push({
            lv : Math.ceil(Number(i / 10)),
            gold : 50000 * i * 2,
            item : [
                { id : 4033000, count : Math.trunc(i * 1 / 2) + 1},
                { id : 4033006, count : i * 20}
            ],
            level : level
        })
    }

    return data[level];
}


function setAttr(attr){
    cm.gainAndEquipAttr(1112000,-151,attr[0],attr[1],attr[2],attr[3],attr[4],attr[5]);
}


function setSkill(level , skill) {
    
    //发放属性
    var SkillFactory = Java.type('org.gms.client.SkillFactory');
    var sk = SkillFactory.getSkill(skill);
    if (sk != null) {
        sk.getEffect(level).applyTo(cm.getPlayer());
    }
    
}


/**
 * 读取数据
 * @returns {string}
 */
function getData(name) {
    let data = cm.getPlayer().getData(name);
    if(data){
        return JSON.parse(data)
    }
    return false;
}

/**
 * 保存数据
 */
function setData(name,value){;
    cm.getPlayer().saveData(name, JSON.stringify(value));
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
            const converted = (number / item.divisor).toFixed(decimalDigits);
            // 去除末尾的0和多余的小数点（例如1.00万 → 1万，1.20亿 → 1.2亿）
            const formatted = parseFloat(converted).toString();
            return formatted + item.unit;
        }
    }

    // 3. 小于万的数字，直接返回（也可根据需求保留小数位）
    return number.toString();
}