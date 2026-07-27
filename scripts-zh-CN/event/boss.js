const Point = Java.type('java.awt.Point');
const LifeFactory = Java.type('org.gms.server.life.LifeFactory');
const Server = Java.type('org.gms.net.server.Server');
var setPos = [[-626, -604], [735, -600]];
var rndPos = setPos[Math.floor(Math.random() * setPos.length)];
var boss = [
	// bossid   地图ID     延时N分钟刷新 	探测器是否通知	 坐标
	{id : 2220000, name : '红蜗牛王\t\t', level : 20, map : 104000400, spawn : 30, notice:1, xy : new Point(279, -496) },
	{id : 3220000, name : '树妖王\t\t\t', level : 35, map : 101030404, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 800) + 400), 1280) },
	{id : 3220001, name : '大宇\t\t\t\t', level : 38, map : 260010201, spawn : 30, notice:1, xy : new Point(645,275) },
	
	//壳子，杀死后召唤  实际BOSS在4220000
	{id : 4220001, name : '歇尔夫\t\t\t', level : 45, map : 230020100, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 2300) - 1500), 520) },
	
	
	// {id : 5220002, name : '浮士德\t\t\t', level : 50, map : 100040105, spawn : 30, notice:1, xy : new Point(456, 278) },
	{id : 5220002, name : '浮士德\t\t\t', level : 50, map : 100040106, spawn : 30, notice:1, xy : new Point(456, 278) },
	
	{id : 5220004, name : '巨型蜈蚣\t\t', level : 50, map : 251010102, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 100) + 600), 50) },
	//{id : 9400610, map : 677000003, spawn : 180, xy : new Point(Math.floor((Math.random() * 100) + 400), 0) },
	//{id : 9400609, map : 677000005, spawn : 180, xy : new Point(Math.floor((Math.random() * 100) + 300), 80) },
	//{id : 9400613, map : 677000009, spawn : 180, xy : new Point(Math.floor((Math.random() * 100) + 300), -841) },
	//{id : 9400633, map : 677000012, spawn : 180, xy : new Point(842, 0) },
	//{id : 9400612, map : 677000001, spawn : 180, xy : new Point(461, 61) },
	//{id : 9400611, map : 677000007, spawn : 180, xy : new Point(Math.floor((Math.random() * 100) + 100), 50) },
	
	//壳子，杀死后召唤  实际BOSS在5220000
	{id : 5220001, name : '巨居蟹\t\t\t', level : 55, map : 110040000, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 2400) - 1600), 140) },
	

	//此怪物一定时间内会自己死亡，复活时播报公告，可能与某任务夜晚模式有关
	//改为地图刷新，不播报了
	//{id : 5090000, name : '谢尔德', level : 56, map : 103000105, spawn : 60, notice : 1, xy : new Point(1552,181)},
	//{id : 5090000, name : '谢尔德', level : 56, map : 103000202, spawn : 60, notice : 1, xy : new Point(194,185)},
	

	// {id : 5220003, name : '提莫\t\t\t\t', level : 59, map : 220050000, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 1400) - 1000), 1030) },
	{id : 5220003, name : '提莫\t\t\t\t', level : 59, map : 220050100, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 770) - 770), 1030) },
	// {id : 5220003, name : '提莫\t\t\t\t', level : 59, map : 220050200, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 1400) - 700), 1030) },
	{id : 6130101, name : '蘑菇王\t\t\t', level : 60, map : 100000005, spawn : 60, notice : 1, xy : new Point(-649,204)},
	{id : 6300005, name : '僵尸蘑菇王\t', level : 65, map : 105070002, spawn : 60, notice : 1, xy : new Point(458,395)},
	
	{id : 6220001, name : '朱诺\t\t\t\t', level : 65, map : 221040301, spawn : 30, notice:1, xy : new Point(-4224, 776) },
	{id : 6220000, name : '多尔\t\t\t\t', level : 65, map : 107000300, spawn : 30, notice:1, xy : new Point(90, 119) },
	
	//此怪物一定时间内会自己死亡，复活时播报公告，可能与某任务夜晚模式有关
	{id : 6090002, name : '青竹武士\t\t', level : 68, map : 800020120, spawn : 180, notice:0, xy : new Point(Math.floor((Math.random() * 100) + 600), 50) },
	
	
	{id : 7220001, name : '九尾狐\t\t\t', level : 70, map : 222010310, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 1300) - 800), 33) },
	{id : 7220000, name : '肯德熊\t\t\t', level : 71, map : 250010304, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 700) - 800), 390) },
	
	//此怪物一定时间内会自己死亡，复活时播报公告，可能与某任务夜晚模式有关
	//改为地图刷新，不播报了
	//{id : 6090000, name : '黑山老妖', level : 74, map : 211041100, spawn : 60, notice : 1, xy : new Point(1377,-32)},
	//{id : 6090000, name : '黑山老妖', level : 74, map : 211041200, spawn : 60, notice : 1, xy : new Point(950,21)},
	//{id : 6090000, name : '黑山老妖', level : 74, map : 211041300, spawn : 60, notice : 1, xy : new Point(1266,-23)},
	//{id : 6090000, name : '黑山老妖', level : 74, map : 211041400, spawn : 60, notice : 1, xy : new Point(1002,14)},
	//{id : 7090000, name : '自动警备系统', level : 75, map : 261020401, spawn : 60, notice : 1, xy : new Point(70,155)},
	

	{id : 7220002, name : '妖怪禅师\t\t', level : 77, map : 250010504, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 1300) - 500), 540) },
	
	//此怪物一定时间内会自己死亡，复活时播报公告，可能与某任务夜晚模式有关
	//改为地图刷新，不播报了
	// {id : 8090000, name : '迪特和罗伊', level : 80, map : 261010102, spawn : 40, notice : 1, xy : new Point(460,210)},
	
	
	{id : 8130100, name : '蝙蝠怪\t\t\t', level : 80, map : 105090900, spawn : 60, notice : 1, xy : new Point(113,83)},
	
	{id : 8220000, name : '艾利杰\t\t\t', level : 83, map : 200010300, spawn : 30, notice:1, xy : new Point(208, 83) },
	{id : 8220002, name : '吉米拉\t\t\t', level : 85, map : 261030000, spawn : 30, notice:1, xy : new Point(Math.floor((Math.random() * 900) - 900), 180) },
	

	{id : 8220009, name : '小吃店\t\t\t', level : 85, map : 105090310, spawn : 180, notice:1, xy : new Point(rndPos[0], rndPos[1]) },
	{id : 9400205, name : '蓝蘑菇王\t\t', level : 90, map : 800010100, spawn : 180, notice:1, xy : new Point(450,73)},
	

	{id : 8220001, name : '驮狼雪人\t\t', level : 90, map : 211040101, spawn : 30, notice : 1, xy : new Point(356,262)},
	
	{id : 9400120, name : '老板\t\t\t\t', level : 95, map : 801030000, spawn : 180, notice:1, xy : new Point(1273,306)},
	{id : 9400122, name : '男老板\t\t\t', level : 95, map : 801040004, spawn : 30, notice:1, xy : new Point(511,147)},
	{id : 9400122, name : '男老板\t\t\t', level : 95, map : 801040100, spawn : 30, notice:1, xy : new Point(409,149)},
	{id : 8180001, name : '天鹰\t\t\t\t', level : 105, map : 240020101, spawn : 360, notice : 1, xy : new Point(0,432)},
	{id : 9400014, name : '天球\t\t\t\t', level : 115, map : 800020130, spawn : 60, notice:1, xy : new Point(1366,203)},
	
	{id : 8180000, name : '火焰龙\t\t\t', level : 105, map : 240020401, spawn : 60, notice : 1, xy : new Point(-7,444)},
	{id : 8180000, name : '火焰龙\t\t\t', level : 105, map : 240020402, spawn : 60, notice : 1, xy : new Point(-7,444)},
	
	{id : 8510000, name : '皮亚奴斯\t\t', level : 110, map : 230040420, spawn : 1440, notice : 1, xy : new Point(568,133)},
	{id : 8520000, name : '皮亚奴斯\t\t', level : 110, map : 230040420, spawn : 1440, notice : 1, xy : new Point(-459,133)},
	
	{id : 8220003, name : '大海兽\t\t\t', level : 120, map : 240040401, spawn : 180, notice:1, xy : new Point(Math.floor((Math.random() * 600) - 300), 1125) },
	
	{id : 8220004, name : '多多\t\t\t\t', level : 121, map : 270010500, spawn : 60, notice:1, xy : new Point(155,-913)},

	{id : 9400121, name : '女老板\t\t\t', level : 130, map : 801040003, spawn : 180, notice:1, xy : new Point(-37,151)},
	
	{id : 8220005, name : '玄冰独角兽\t', level : 131, map : 270020500, spawn : 60, notice : 1, xy : new Point(66,-921)},
	{id : 8220006, name : '雷卡\t\t\t\t', level : 141, map : 270030500, spawn : 60, notice : 1, xy : new Point(-20,-584)},
	
];

function init() {
	scheduleNew();
}

function scheduleNew() {

    setupTask = em.schedule("start", 6 * 1000);
	
	em.setProperty("boss" ,JSON.stringify(boss));
	
}

function cancelSchedule() {
	if (setupTask != null) setupTask.cancel(true);
}

function start() {
	
	for (let i=0; i < boss.length; i++){
		var data = boss[i];
		const map = em.getChannelServer().getMapFactory().getMap(data.map);
		let shouldSpawn = false;
		const resetTime = new Date(Date.now() + (data.spawn * 60 * 1000));
        const resetTimeKey = `resetTime${data.map}${data.id}`;
        const bossExists = map.getMonsterById(data.id);
        const formattedResetTime = formatTime(resetTime);
		if(!bossExists){
			const lastResetTimeStr = em.getProperty(resetTimeKey);
			if(lastResetTimeStr){
				const lastResetTime = new Date(lastResetTimeStr);
				if (!isNaN(lastResetTime.getTime()) && Date.now() > lastResetTime.getTime()) {
                    shouldSpawn = true;
                }

			}else{
				//服务器刚启动，刷BOSS
				shouldSpawn  = true;
			}

			

		}else{
			em.setProperty(resetTimeKey ,formattedResetTime);
			data.reset = formattedResetTime;
		}
		
		if (shouldSpawn) {
			
			//召唤BOSS
			const BossObj = LifeFactory.getMonster(data.id);
			map.spawnMonsterOnGroundBelow(BossObj, data.xy);
			
			//当前地图范围的Boss登场消息
			map.broadcastStringMessage(6, `${BossObj.getName()}已复活！`);
			
			//广播探测器消息
			if(data.notice){
				sendMsg(BossObj.getName(), map.getMapName());
			}

			
			if (formattedResetTime) {
                em.setProperty(resetTimeKey, formattedResetTime);
            }

            data.reset = formattedResetTime;
			
		}
		
	}

	em.setProperty("boss" ,JSON.stringify(boss));

    cancelSchedule();
    
	setupTask = em.schedule("start",  6 * 1000);

}



function dispose() {}
function setup(eim, leaderid) {}
function changedMap(eim, player, mapid){}
function monsterValue(eim, mobid) {return 1;}
function disbandParty(eim, player) {}
function playerDisconnected(eim, player) {}
function playerEntry(eim, player) {}

function monsterKilled(mob, eim , hasKiller) {}


function scheduledTimeout(eim) {}
function afterSetup(eim) {}
function changedLeader(eim, leader) {}
function playerExit(eim, player) {}
function leftParty(eim, player) {}
function clearPQ(eim) {}
function allMonstersDead(eim) {}
function playerUnregistered(eim, player) {}
function sendMsg(bossName, mapname){
	
	const world = Server.getInstance().getWorld(em.getChannelServer().getWorld());
	let players = world.getPlayerStorage().getAllCharacters(); 
	for(let i=0;i < players.length; i++){
		if(!players[i].getCashShop().isOpened()){
			if(players[i].haveItem(5340100)){
				players[i].message(`[探测器] ${bossName} 在频道${em.getChannelServer().getId()} ${mapname} 复活！`);
			}
		}
	}
}




function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = typeof time === 'string' 
    ? new Date(time.replace(/-/g, '/'))
    : new Date(time);
  const pad = (num) => num.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return format.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}