
//金锄头
var id = 2430157;
var status = -1;
var mapId = null;
var mapData;
var boss = [
	5220002,5220004,6220000,5220001,2220000,8220009,3220000,9400205,6130101,8220001
];
var lotteryPool = {

	normal : {

		probability : 50,
		items : [
		
			//卷轴
			[2040914,1],[2040919,1],[2040915,1],[2040025,1],[2040029,1],
			[2040014,1],[2040015,1],[2040301,1],[2040302,1],[2040308,1],
			[2040317,1],[2040318,1],[2040321,1],[2048010,1],[2048011,1],
			[2048012,1],[2048013,1],[2043001,1],[2043002,1],[2043101,1],
			[2043102,1],[2044101,1],[2044102,1],[2043201,1],[2043202,1],
			[2043301,1],[2043302,1],[2043701,1],[2043702,1],[2043801,1],
			[2043802,1],[2044001,1],[2044002,1],[2044101,1],[2044102,1],
			[2044201,1],[2044202,1],[2044301,1],[2044302,1],[2044401,1],
			[2044402,1],[2044501,1],[2044502,1],[2044601,1],[2044602,1],
			[2044701,1],[2044702,1],[2044801,1],[2044802,1],[2044901,1],
			[2044902,1],[2040804,1],[2040805,1],[2040817,1],[2040501,1],
			[2040502,1],[2040504,1],[2040505,1],[2040513,1],[2040514,1],
			[2040516,1],[2040517,1],[2040532,1],[2040533,1],

			[4004000,5],[4004001,5],[4004002,5],[4004003,5],[4004004,5],
			[4010000,5],[4010001,5],[4010002,5],[4010003,5],[4010004,5],[4010005,5],[4010006,5],[4010007,5],
			[4020000,5],[4020001,5],[4020002,5],[4020003,5],[4020004,5],[4020005,5],[4020006,5],[4020007,5],[4020008,5],

			[2430121,1], //1万经验
			[2430110,1], //1万金币袋
			[2000002,50], //白药
			[2000006,50], //蓝
		],
	},

	rare : {
		probability : 38,
		items : [
			[2300000,5], 			//鱼饵
			[2022000,50], 			//矿泉水
			[2022003,50],   		//烤鳗鱼
			[2022038,50],   		//油瓜各+1500
			[2022039,50],   		//食人花蜂蜜各+1000
			[2430155,1],[2430156,1],  //人气卡
			[2430110,10],  			  //10万金币
			[2430100,1],[2430101,1],  //点券抵用
		]
	},

	legend : {
		probability : 12,
		items : [
			[2049100,1],  //混沌
			[4033008,1],  //幸运
			[2430040,1],  //红蓝瓶
			[2022062,1],  //攻防+20BUFF
			[2430111,1],  //100万金币

		],
	}

};
const LifeFactory = Java.type('org.gms.server.life.LifeFactory');
function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    if(!im.haveItem(id)){
		//强开
		im.dispose();
		return;
	}

	const ch = im.getPlayer();
  
    mapId = ch.getData('藏宝图') * 1;


    if(ch.isGM()){

    	let map = ch.getMap();
		let Limit= map.getFieldLimit();
		let isTown = map.isTown();
		let mapId = ch.getMapId();
		
		im.message("地图ID：" + mapId + " 地图受限编码：" + Limit + " isTown:" + isTown);
		im.message('位置：' + ch.getPosition().x + ':' + ch.getPosition().y)
		im.message("ID：" + im.getScriptName())
	}

	if (status === 0) {


		if(im.getItemQuantity(2430164)){
			if(mapId && ch.getMapId() == mapId){

				if(Math.floor(Math.random() * 100 + 1)  <= 60){
					let give = drawLottery();
					if(give.probability <= 90){
						
						var text = '通过藏宝图找到了'
						if(give.count>1){
							text += `${give.count}个`; 
						}
						
						ch.serverMessage(text,give.id);
					}
					if(im.canHold(give.id,give.count)){
						im.gainItem(give.id,give.count);
						ch.saveLog(id,give.id,give.count);
					}else{
						im.message("背包满了！");
					}

					ch.saveData('藏宝图','');
					im.gainItem(2430164,-1,true,false);
					ch.saveLog(id,2430164,-1);

					var text = `你挖到了${give.count}个 #r#t${give.id}:#`
					if(openBoss(mapId)){
						im.sendNext(text);
					}else{
						im.sendNext(text);
						im.dispose();
					}
				}else{
					im.dropMessage(1,"似乎宝藏就在眼前，再挖一次试试");
					im.dispose();
				}
			}else{
				im.dropMessage(1,"到处都是荒草，似乎没有发现宝藏");
				im.dispose();
			}

			if(Math.floor(Math.random() * 100 + 1)  <= 30){
				im.message(`金锄头已损坏！`);
				im.gainItem(id,-1,true,false);
				ch.saveLog(id,-1);
			}
		}else{
			im.dropMessage(1,"你没有藏宝图！");
			im.dispose();
		}
	
	} else if (status == 1){

		im.sendOk("还有高手？居然是BOSS，来吧，让我们杀了它");
		im.dispose();
		
	} else {
		im.dispose();
	}
	
}


function openBoss(mapId){
	mapData = im.getClient().getChannelServer().getMapFactory().getMap(mapId);
	if(Math.floor(Math.random() * 100 + 1)  <= 10){
		const randomIndex = Math.floor(Math.random() * boss.length);
		const bossId = boss[randomIndex];
		const bossData = LifeFactory.getMonster(bossId);
		const player = im.getPlayer();
		const cid = player.getClient().getChannelServer().getId();
		mapData.spawnMonsterOnGroundBelow(bossData, player.getPosition());
		player.serverMessage(`在 频道${cid} 的 ${mapData.getMapName()} 挖宝时意外发现了首领【${bossData.getName()}】`);
		return true;
	}
	return false;
	
}


/**
 * 通用概率抽取函数（核心）
 * @param {Array} list - 待抽取的列表（含probability字段）
 * @returns {Object} 抽中的项
 */
function randomByProbability(list) {
  const total = list.reduce((sum, item) => sum + item.probability, 0);
  let random = Math.random() * total;
  for (const item of list) {
    random -= item.probability;
    if (random <= 0) {
      return item;
    }
  }
  return list[list.length - 1];
}

/**
 * 抽奖主函数
 * @returns {Object} 最终抽中的物品（含大类信息）
 */
function drawLottery() {
  const categoryList = Object.values(lotteryPool).map(category => ({
    ...category
  }));
  const selectedCategory = randomByProbability(categoryList);
 
  const randomIndex = Math.floor(Math.random() * selectedCategory.items.length);
  const selectedItem = selectedCategory.items[randomIndex];
  return {
    id : selectedItem[0],    //抽中物品ID
    count: selectedItem[1], // 物品名称
    probability: selectedCategory.probability, // 大类概率
  };
}