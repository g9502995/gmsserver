
loadScript('./common.js');
const beginTime = 6000;   //N秒检查是否在活动时间
const startTime = "21:10";     //刷出BOSS时间
const endTime = "23:30";       //清除BOSS时间
const msgTime = 5 * 60 * 1000;   //5分钟
const city = [
    {
        name : "射手村",
        map : 100000000, 
        pos : [ 
            [5587, 454],
            [3555, 394],
            [-170,274]
        ],
        mob : 9400589,
        minMob : 9400706,
    },
    {
        name : "魔法森林",
        map : 101000000,
        pos : [
            [-768,288],
            [634,345],
            [634,-1321]
        ],
        mob : 9400589,
        minMob : 9400706,
    },
    {
        name : "勇士部落",
        map : 102000000,
        pos : [
            [2452,1935],
            [591,1875],
            [926,584]
        ],
        mob : 9400589,
        minMob : 9400706,
    },
    {
        name : "废弃都市",
        map : 103000000,
        pos : [
            [233,156],
            [-1934,156],
            [1164,-1067]
        ],
        mob : 9400589,
        minMob : 9400706,
    }
];
var boss = null;
const inMsg = "频道1主城出现王级首领,各位冒险者赶快赶走他吧";
const outMsg = "频道1主城王级首领已被驱赶,小伙伴们又可以愉快的一起玩耍了";
const exitMsg = "频道1主城王级首领已经离开了！"
function init() {
    if(em.getChannelServer().getId() === 1) {
        scheduleNew();
    }
}

function scheduleNew(){
    
    em.schedule("activity", beginTime);
    em.schedule("message" , msgTime);

    removeBoss();
}


// 活动处理，召唤或撤退BOSS
function activity() {

    const date = new Date(); 
    const day = date.getDay(); // 星期几（0=周日，6=周六）
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    if(isOpenTime(startTime , endTime)){
        // 活动开启了
        if(!boss){


            // 开启前放置重复加载，先把所有BOSS清理掉
            removeBoss();


            boss = getRandomData(city);
            var map = em.getChannelServer().getMapFactory().getMap(boss.map);
            var bossExists = map.getMonsterById(boss.mob);
            if(!bossExists){
                var pos = getRandomData(boss.pos);
                map.spawnMonsterOnGroundBelow(boss.mob, pos[0], pos[1]); 
            }

            // 召唤BOSS，播报设置公告
            sendMsg(inMsg,1,60);
            em.getWorldServer().setServerMessage(inMsg);
        } else {
        
            var map = em.getChannelServer().getMapFactory().getMap(boss.map);
            var bossExists = map.getMonsterById(boss.mob);
            if(!bossExists){
                // 活动期间BOSS被击杀了
                if(!boss.isKill){
                    boss.isKill = true;

                    sendMsg(outMsg,1,60);

                    // BOSS被击杀停止滚动，活动提前结束了
                    if(em.getWorldServer().getServerMessage() === inMsg){
                        em.getWorldServer().setServerMessage("");
                    }
                }
            }
        }

    } else {
        // 活动结束
        if(boss){

            removeBoss()
            boss = null;

            //发送停止公告
            sendMsg(exitMsg,0,60);

            //停止滚动播报
            if(em.getWorldServer().getServerMessage() === inMsg){
                em.getWorldServer().setServerMessage("");
            }
        }

    }

    em.schedule("activity", beginTime); 
}


// 杀死所有主城BOSS，不会掉落物品，代替撤退
function removeBoss(){
    city.forEach(v=>{
        if(v.map){
            var map = em.getChannelServer().getMapFactory().getMap(v.map);
            if(map){
                if(map.getMonsterById(v.mob) && v.mob){
                    map.killMonster(v.mob);
                    if(v.minMob){
                        // 处理被召唤处理的小怪
                        map.killMonster(v.minMob);
                    }
                }
            }
        }
    }) 
}


// 活动期间播报BOSS存活中
function message(){
    const date = new Date(); 
    const day = date.getDay(); // 星期几（0=周日，6=周六）
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if(isOpenTime(startTime , endTime)){
        if(boss){
            // 刷出来了，存活，播报公告
            var map = em.getChannelServer().getMapFactory().getMap(boss.map);
            var bossExists = map.getMonsterById(boss.mob);
            if(bossExists){
                sendMsg(inMsg,1,60);
            } 
        }
    } 
    em.schedule("message" , msgTime);
    
}

/**
 * 发送广播
 * @Desc   无
 * @Author Ming
 * @Date   2026-07-23
 * @param  {[type]}   value
 * @param  {Number}   center
 * @param  {Number}   delay
 * @return {[type]}
 */
function sendMsg(value ,center = 1, delay = 10){
    const time = delay * 1000
    var players = em.getChannelServer().getPlayerStorage().getAllCharacters();
    for(let i=0;i < players.length; i++){
        var message = `[系统] ${value}`;
        players[i].startMapEffect(value ,center ? 5120011 : 5120007,time);
        players[i].yellowMessage(message);
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


function cancelSchedule() {}

// ---------- FILLER FUNCTIONS ----------

function dispose() {}

function setup(eim, leaderid) {}

function monsterValue(eim, mobid) {return 0;}

function disbandParty(eim, player) {}

function playerDisconnected(eim, player) {}

function playerEntry(eim, player) {}

function monsterKilled(mob, eim) {}

function scheduledTimeout(eim) {}

function afterSetup(eim) {}

function changedLeader(eim, leader) {}

function playerExit(eim, player) {}

function leftParty(eim, player) {}

function clearPQ(eim) {}

function allMonstersDead(eim) {}

function playerUnregistered(eim, player) {}

