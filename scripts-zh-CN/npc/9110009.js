var id = 5220000;
var price = 1000;
var status;
var PacketCreator = Java.type('org.gms.util.PacketCreator');
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance()

// 抽奖池数据结构：分层概率设计
const lotteryPool = {
	// 第一大类：普通装备（总概率90%）
	normal: {
		probability: 90, // 大类总概率
		items: [
			{ id: 1402014, name: '温度计', probability: 50 },
			{ id: 1472054, name: '信玄', probability: 50 },
			{ id: 1442018, name: '冻冻鱼', probability: 50 },
			{ id: 1302063, name: '燃烧的火焰刀', probability: 50 },
			{ id: 1302106, name: '燃烧的冰焰刀', probability: 50 },

			{ id: 1022058, name: '狸猫', probability: 50 },
			{ id: 1022060, name: '狐猴', probability: 50 },

			{ id: 1032027, name: '黑水晶耳环', probability: 50 },

			{ id: 1122001, name: '绿色蝶形领结', probability: 50 },
			{ id: 1122002, name: '黄色蝶形领结', probability: 50 },
			{ id: 1122003, name: '粉红蝶形领结', probability: 50 },
			{ id: 1122004, name: '黑色蝶形领结', probability: 50 },
			{ id: 1122005, name: '绿色蝶形领结', probability: 50 },
			{ id: 1122006, name: '蓝色蝶形领结', probability: 50 },


			{ id: 1012011, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012012, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012013, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012014, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012015, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012016, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012017, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012018, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012019, name: '圣诞鹿的鼻子', probability: 50 },
			{ id: 1012020, name: '圣诞鹿的鼻子', probability: 50 },

			{ id: 1432015, name: '红色滑雪板', probability: 50 },
			{ id: 1432016, name: '橙色滑雪板', probability: 50 },
			{ id: 1432017, name: '绿色滑雪板', probability: 50 },
			{ id: 1432018, name: '蓝色滑雪板', probability: 50 },
			{ id: 1442046, name: '超级滑雪板', probability: 40 },


			{ id: 1082175, name: '马绍尔手套(赤)', probability: 50 },
			{ id: 1082176, name: '马绍尔手套(青)', probability: 50 },
			{ id: 1082177, name: '马绍尔手套(紫)', probability: 50 },
			{ id: 1082178, name: '马绍尔手套(桃)', probability: 50 },
			{ id: 1082179, name: '马绍尔手套(黄)', probability: 50 },

			{ id: 1102000, name: '绿色冒险披风', probability: 50 },
			{ id: 1102001, name: '蓝色冒险披风', probability: 50 },
			{ id: 1102002, name: '红色冒险披风', probability: 50 },
			{ id: 1102003, name: '白色冒险披风', probability: 50 },
			{ id: 1102004, name: '黑色冒险披风', probability: 50 },

			{ id: 1102041, name: '浪人披风(粉)', probability: 40 },
			{ id: 1102042, name: '浪人披风(紫)', probability: 40 },
			{ id: 1102084, name: '粉色盖亚披风', probability: 50 },
			{ id: 1102085, name: '黄色盖亚披风', probability: 50 },
			{ id: 1102086, name: '紫色盖亚披风', probability: 50 },
			{ id: 1102087, name: '绿色盖亚披风', probability: 50 },

			{ id: 1102021, name: '蓝斗士披风', probability: 50 },
			{ id: 1102022, name: '红斗士披风', probability: 50 },
			{ id: 1102023, name: '白斗士披风', probability: 50 },
			{ id: 1102024, name: '黑斗士披风', probability: 50 },

			{ id: 1102079, name: '破旧的红色披风', probability: 50 },
			{ id: 1102080, name: '破旧的红色披风', probability: 50 },
			{ id: 1102081, name: '破旧的红色披风', probability: 50 },
			{ id: 1102082, name: '破旧的红色披风', probability: 50 },
			{ id: 1102083, name: '破旧的红色披风', probability: 50 },


			//海盗头巾
			{ id: 1002391, name: '海盗头巾(绿)', probability: 50 },
			{ id: 1002392, name: '海盗头巾(红)', probability: 50 },
			{ id: 1002393, name: '海盗头巾(粉)', probability: 50 },
			{ id: 1002394, name: '海盗头巾(灰)', probability: 50 },
			{ id: 1002395, name: '海盗头巾(紫)', probability: 50 },

			{ id: 1082145, name: '工地手套(黄)', probability: 50 },
			{ id: 1082146, name: '工地手套(红)', probability: 50 },
			{ id: 1082147, name: '工地手套(蓝)', probability: 50 },
			{ id: 1082148, name: '工地手套(紫)', probability: 50 },
			{ id: 1082149, name: '工地手套(褐)', probability: 50 },
			{ id: 1082150, name: '工地手套(灰)', probability: 50 },

			//冲浪板
			{ id: 1442026, name: '红色冲浪板', probability: 50 },
			{ id: 1442027, name: '绿色冲浪板', probability: 50 },
			{ id: 1442028, name: '蓝色冲浪板', probability: 50 },
			{ id: 1442029, name: '紫色冲浪板', probability: 50 },
			{ id: 1442065, name: '蓝色冲浪板', probability: 50 },
			{ id: 1442066, name: '红色冲浪板', probability: 50 },

			//雨伞
			{ id: 1302016, name: '黄雨伞', probability: 50 },
			{ id: 1302017, name: '蓝雨伞', probability: 50 },
			{ id: 1302025, name: '红雨伞', probability: 50 },
			{ id: 1302026, name: '黑雨伞', probability: 50 },
			{ id: 1302027, name: '绿雨伞', probability: 50 },
			{ id: 1302028, name: '紫雨伞', probability: 50 },
			{ id: 1302029, name: '褐雨伞', probability: 50 },


			//枫叶武器
			{ id: 1442024, name: '枫叶矛', probability: 30 },
			{ id: 1302030, name: '枫叶剑', probability: 30 },
			{ id: 1332025, name: '枫叶刃', probability: 30 },
			{ id: 1382012, name: '枫叶仗', probability: 30 },
			{ id: 1412011, name: '枫叶斧', probability: 30 },
			{ id: 1422014, name: '枫叶锤', probability: 30 },
			{ id: 1432012, name: '枫叶枪', probability: 30 },
			{ id: 1452022, name: '枫叶弓', probability: 30 },
			{ id: 1462019, name: '枫叶弩', probability: 30 },
			{ id: 1082252, name: '枫叶手套', probability: 30 },
			{ id: 1472032, name: '枫叶拳', probability: 30 },
			{ id: 1492020, name: '枫叶手枪', probability: 30 },
			{ id: 1482020, name: '枫叶指节', probability: 30 },
			{ id: 1092030, name: '枫叶盾', probability: 30 },
			{ id: 1302067, name: '枫叶庆典旗', probability: 30 },


			{ id: 1051017, name: '红色桑拿服', probability: 50 },
			{ id: 1050018, name: '蓝色桑拿服', probability: 50 },
			{ id: 1372017, name: '领路灯', probability: 50 },
			{ id: 1302049, name: '光线鞭子', probability: 50 },
			{ id: 1302021, name: '橡皮榔头', probability: 50 },
			{ id: 1302022, name: '竹刀', probability: 50 },
			{ id: 1302024, name: '废报纸卷', probability: 50 },
			{ id: 1302080, name: '七彩霓虹灯泡', probability: 50 },
			{ id: 1312002, name: '镰刀', probability: 50 },
			{ id: 1312012, name: '乾坤圈', probability: 50 },
			{ id: 1312013, name: '判官笔', probability: 50 },
			{ id: 1312014, name: '阎王笔', probability: 50 },
			{ id: 1402029, name: '鬼刺狼牙棒', probability: 50 },
			{ id: 1322009, name: '马桶吸', probability: 50 },
			{ id: 1322027, name: '米伽勒的平底锅', probability: 50 },
			{ id: 1322051, name: '七夕', probability: 50 },
			{ id: 1422036, name: '玩具匠人的锤子', probability: 50 },

			{ id: 1092049, name: '热情剑盾', probability: 50 },
			{ id: 1092050, name: '冷艳剑盾', probability: 50 },
			{ id: 1092029, name: '电磁光盾', probability: 50 },

			{ id: 1092021, name: '光子盾', probability: 50 },
			{ id: 1092022, name: '调色板盾牌', probability: 50 },
			{ id: 1092008, name: '锅盖', probability: 50 },
			{ id: 1332020, name: '太极扇', probability: 50 },
			{ id: 1332021, name: '乌龙茶', probability: 50 },

			{ id: 1382015, name: '毒蘑菇', probability: 50 },
			{ id: 1402044, name: '南瓜灯笼', probability: 50 },
			{ id: 1432046, name: '圣诞树手杖', probability: 50 },
			{ id: 1432009, name: '木精灵枪', probability: 50 },
			{ id: 1002857, name: '安全帽', probability: 50 },
			{ id: 1002699, name: '南瓜帽子', probability: 50 },
			{ id: 1002419, name: '枫叶帽', probability: 50 },


			{ id: 1332053, name: '野外烧烤串', probability: 50 },
			{ id: 1452025, name: '蓝色梅杜斯', probability: 50 },
			// { id: 1472084, name: '蝙蝠怪的卡帝斯拳套', probability: 50 },
			// { id: 1482032, name: '蝙蝠怪的吸血鬼之爪', probability: 50 },

			{ id: 1402013, name: '白日剑', probability: 50 },
			{ id: 1332054, name: '闪电飞刀', probability: 50 },
			{ id: 1382016, name: '香菇', probability: 50 },

			{ id: 1372035, name: '火灵珠短杖', probability: 50 },
			{ id: 1372036, name: '毒灵珠短杖', probability: 50 },
			{ id: 1372037, name: '冰灵珠短杖', probability: 50 },
			{ id: 1372038, name: '雷灵珠短杖', probability: 50 },


			//卷轴
			{ id: 2040914, name: '盾牌攻击卷轴60%', probability: 50 },
			{ id: 2040919, name: '盾牌魔力卷轴60%', probability: 50 },
			{ id: 2040915, name: '盾牌攻击卷轴10%', probability: 50 },
			{ id: 2040025, name: '头盔智力卷轴60%', probability: 50 },
			{ id: 2040029, name: '头盔敏捷卷轴60%', probability: 50 },
			{ id: 2040014, name: '头盔命中率诅咒卷轴70%', probability: 50 },
			{ id: 2040015, name: '头盔命中率诅咒卷轴30%', probability: 50 },

			{ id: 2040301, name: '耳环智力卷轴60%', probability: 50 },
			{ id: 2040302, name: '耳环智力卷轴10%', probability: 50 },
			{ id: 2040308, name: '耳环防御力诅咒卷轴70%', probability: 50 },

			{ id: 2040317, name: '耳环敏捷卷轴60%', probability: 50 },
			{ id: 2040318, name: '耳环敏捷卷轴10%', probability: 50 },
			{ id: 2040321, name: '耳环装饰运气卷轴60%', probability: 50 },

			{ id: 2048010, name: '宠物力量卷轴', probability: 50 },
			{ id: 2048011, name: '宠物智力卷轴', probability: 50 },
			{ id: 2048012, name: '宠物敏捷卷轴', probability: 50 },
			{ id: 2048013, name: '宠物幸运卷轴', probability: 50 },

			{ id: 2043001, name: '单手剑攻击卷轴60%', probability: 50 },
			{ id: 2043002, name: '单手剑攻击卷轴10%', probability: 50 },

			{ id: 2043101, name: '单手斧攻击卷轴60', probability: 50 },
			{ id: 2043102, name: '单手斧攻击卷轴10%', probability: 50 },

			{ id: 2044101, name: '双手斧攻击卷轴60%', probability: 50 },
			{ id: 2044102, name: '双手斧攻击卷轴10%', probability: 50 },

			{ id: 2043201, name: '单手钝器攻击卷轴60%', probability: 50 },
			{ id: 2043202, name: '单手钝器攻击卷轴10%', probability: 50 },

			{ id: 2043301, name: '短剑攻击卷轴60%', probability: 50 },
			{ id: 2043302, name: '短剑攻击卷轴10%', probability: 50 },

			{ id: 2043701, name: '短杖魔力卷轴60%', probability: 50 },
			{ id: 2043702, name: '短杖魔力卷轴10%', probability: 50 },

			{ id: 2043801, name: '长杖魔力卷轴60%', probability: 50 },
			{ id: 2043802, name: '长杖魔力卷轴10%', probability: 50 },

			{ id: 2044001, name: '双手剑攻击卷轴60%', probability: 50 },
			{ id: 2044002, name: '双手剑攻击卷轴10%', probability: 50 },

			{ id: 2044101, name: '双手斧攻击卷轴60%', probability: 50 },
			{ id: 2044102, name: '双手斧攻击卷轴10%', probability: 50 },

			{ id: 2044201, name: '双手钝器攻击卷轴60%', probability: 50 },
			{ id: 2044202, name: '双手钝器攻击卷轴10%', probability: 50 },

			{ id: 2044301, name: '枪攻击卷轴60%', probability: 50 },
			{ id: 2044302, name: '枪攻击卷轴10%', probability: 50 },

			{ id: 2044401, name: '矛攻击卷轴60%', probability: 50 },
			{ id: 2044402, name: '矛攻击卷轴10%', probability: 50 },

			{ id: 2044501, name: '弓攻击卷轴60%', probability: 50 },
			{ id: 2044502, name: '弓攻击卷轴10%', probability: 50 },

			{ id: 2044601, name: '弩攻击卷轴60%', probability: 50 },
			{ id: 2044602, name: '弩攻击卷轴10%', probability: 50 },

			{ id: 2044701, name: '拳套攻击卷轴60%', probability: 50 },
			{ id: 2044702, name: '拳套攻击卷轴10%', probability: 50 },

			{ id: 2044801, name: '拳甲攻击卷轴60%', probability: 50 },
			{ id: 2044802, name: '拳甲攻击卷轴10%', probability: 50 },

			{ id: 2044901, name: '短枪攻击卷轴60%', probability: 50 },
			{ id: 2044902, name: '短枪攻击卷轴10%', probability: 50 },

			{ id: 2040804, name: '手套攻击卷轴60%', probability: 50 },
			{ id: 2040805, name: '手套攻击卷轴10%', probability: 50 },
			{ id: 2040817, name: '手套魔力卷轴60%', probability: 50 },

			{ id: 2040501, name: '全身铠甲敏捷卷轴60%', probability: 50 },
			{ id: 2040502, name: '全身铠甲敏捷卷轴10%', probability: 50 },
			{ id: 2040504, name: '全身铠甲防御卷轴60%', probability: 50 },
			{ id: 2040505, name: '全身铠甲防御卷轴10%', probability: 50 },
			{ id: 2040513, name: '全身铠甲智力卷轴60%', probability: 50 },
			{ id: 2040514, name: '全身铠甲智力卷轴10%', probability: 50 },
			{ id: 2040516, name: '全身铠甲运气卷轴60%', probability: 50 },
			{ id: 2040517, name: '全身铠甲运气卷轴10%', probability: 50 },

			{ id: 2040532, name: '全身盔甲力量卷轴60%', probability: 50 },
			{ id: 2040534, name: '全身盔甲力量卷轴10%', probability: 50 },

		]
	},
	// 第二大类：稀有卷轴（总概率8%）
	rare: {
		probability: 8,
		items: [

			// { id: 1112742, name: '紫金枫叶戒指', probability: 15 },
			// { id: 1032141, name: '英雄的耳环', probability: 20 },
			// { id: 1122058, name: '休彼德蔓的混沌项链', probability: 20 },
			{ id: 1012070, name: '草莓雪糕', probability: 30 },
			{ id: 1012071, name: '巧克力雪糕', probability: 10 },
			{ id: 1012072, name: '甜瓜雪糕', probability: 30 },
			{ id: 1012073, name: '西瓜雪糕', probability: 30 },

			{ id: 5150038, name: '超级明星美发卡', probability: 20 },
			{ id: 5510000, name: '原地复活术', probability: 20 },
			{ id: 2070011, name: '枫叶镖', probability: 15 },
			{ id: 2070016, name: '水晶飞镖', probability: 5 },
			{ id: 2070007, name: '月牙镖', probability: 8 },
			{ id: 2070006, name: '齿轮镖', probability: 8 },
			{ id: 2070005, name: '金钱镖', probability: 10 },
			{ id: 2330004, name: '高爆弹', probability : 10},
			{ id: 2330005, name: '穿甲弹', probability : 5},
			// { id: 2060004, count : 500, name: '钻石箭矢', probability : 20},
			// { id: 2061003, count : 500, name: '冰晶弩矢', probability : 20},
			{ id: 2049100, name: '混沌卷轴60%', probability: 25 },
			{ id: 2340000, name: '祝福卷轴', probability: 10 },
			{ id: 2450000, name: '幸运的狩猎', probability : 30},


		]
	},
	// 第三大类：传奇物品（总概率2%）
	legend: {
		probability: 2,
		items: [

			{ id: 1003424, name: '黄金三叶草帽子', probability: 50 },
			{ id: 1102361, name: '黄金三叶草背包', probability: 50 },
			{ id: 1042234, name: '黄金三叶草T恤', probability: 50 },
			{ id: 1082415, name: '黄金三叶草手套', probability: 50 },
			{ id: 1062150, name: '黄金三叶草裤子', probability: 50 },
			{ id: 1072639, name: '黄金三叶草鞋', probability: 50 },
			{ id: 1122041, name: '封印的冒险之心', probability: 40 },
			{ id: 1122042, name: '封印的冒险之心', probability: 40 },
			{ id: 1122043, name: '封印的冒险之心', probability: 40 },
			{ id: 1122044, name: '封印的冒险之心', probability: 40 },
			{ id: 1122045, name: '封印的冒险之心', probability: 40 },
			{ id: 1012321, name: '新冰晶脸饰', probability: 25 },
			{ id: 1012328, name: '冰晶脸饰', probability: 40 },
			{ id: 1022160, name: '瑞贝卡的古典眼镜', probability: 20 },
			{ id: 1022197, name: '进化太阳镜', probability: 30 },
			{ id: 1022161, name: '瑞贝卡的碎眼镜', probability: 40 },
			{ id: 1102604, name: '蒼穹之翼', probability: 15 },
			// { id: 1402037, name: '龙背刃', probability: 10 },
			{ id: 1003843, name: '奇怪的狐狸面具', probability: 20 },
			{ id: 1012170, name: '恐怖鬼娃的伤口', probability: 20 },
			
			{ id: 1112952, name: '希拉的愤怒', probability: 25 },
			{ id: 1112951, name: '麦格纳斯的愤怒', probability: 25 },
			// { id: 1113039, name: '妖精女皇戒指', probability: 5 },
			// { id: 1113067, name: '巨匠全能戒指', probability: 5 },
			// { id: 1113091, name: '飞奔戒指', probability: 5 },
			// { id: 1113164, name: '赏金猎人戒指', probability: 5 },
			// { id: 1113306, name: '巨大恐惧', probability : 5}, 195级
			// { id: 1113302, name: '敦凯尔的愤怒戒指', probability : 1},
			{ id: 1005980, name: '无尽辉耀骑士头盔', probability: 1 },
			{ id: 1005981, name: '无尽辉耀魔法师帽', probability: 1 },
			{ id: 1005982, name: '无尽辉耀弓箭手帽', probability: 1 },
			{ id: 1005983, name: '无尽辉耀飞侠头巾', probability: 1 },
			{ id: 1005984, name: '无尽辉耀海盗帽', probability: 1 },

			{ id: 1102775, name: '无尽辉耀骑士披风', probability: 1 },
			{ id: 1102794, name: '无尽辉耀魔法师披风', probability: 1 },
			{ id: 1102795, name: '无尽辉耀弓箭手披风', probability: 1 },
			{ id: 1102796, name: '无尽辉耀飞侠披风', probability: 1 },
			{ id: 1102797, name: '无尽辉耀海盗披风', probability: 1 },

			{ id: 1042433, name: '无尽辉耀骑士盔甲', probability: 1 },
			{ id: 1042434, name: '无尽辉耀魔法师长袍', probability: 1 },
			{ id: 1042435, name: '无尽辉耀弓箭手斗篷', probability: 1 },
			{ id: 1042436, name: '无尽辉耀飞侠衬衫', probability: 1 },
			{ id: 1042437, name: '无尽辉耀海盗大衣', probability: 1 },

			{ id: 1082636, name: '无尽辉耀骑士手套', probability: 1 },
			{ id: 1082637, name: '无尽辉耀法师手套', probability: 1 },
			{ id: 1082638, name: '无尽辉耀弓箭手手套', probability: 1 },
			{ id: 1082639, name: '无尽辉耀飞侠手套', probability: 1 },
			{ id: 1082640, name: '无尽辉耀海盗手套', probability: 1 },

			{ id: 1062285, name: '无尽辉耀骑士裤', probability: 1 },
			{ id: 1062286, name: '无尽辉耀魔法师裤', probability: 1 },
			{ id: 1062287, name: '无尽辉耀弓箭手裤', probability: 1 },
			{ id: 1062288, name: '无尽辉耀飞侠裤', probability: 1 },
			{ id: 1062289, name: '无尽辉耀海盗裤', probability: 1 },

			{ id: 1073030, name: '无尽辉耀骑士鞋', probability: 1 },
			{ id: 1073032, name: '无尽辉耀法师鞋', probability: 1 },
			{ id: 1073033, name: '无尽辉耀弓箭手鞋', probability: 1 },
			{ id: 1073034, name: '无尽辉耀飞侠鞋', probability: 1 },
			{ id: 1073035, name: '无尽辉耀海盗鞋', probability: 1 },

			

		]
	}
};


var buy = [
	[1000, 1],
	[10000, 11],
	[50000, 60],
	[100000, 150]
];

var index = 1; //抽奖仓库使用
var getItemsData = null;
var giveItem = null;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	//cm.message(mode + ":" + type + ":" + selection)
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}

	const ch = cm.getPlayer();

	if (status == 0) {
		var text = `\r\n\t抽取双色球可获得宝物哦！#d已有 #t${id}:# × #c${id}#\r\n\r\n`
	
		text += "#L1##r抽〔1〕次#l\t\t\t";
		text += "#L10#抽〔10〕次#l\t\t\t";
		text += "#L50#抽〔50〕次#l\r\n\r\n\r\n";
		text += `#L100##b购买#t${id}:##l\r\n`
		text += `#L101#我的抽奖仓库#l\r\n`;
		text += `#L103#积分兑换#l\r\n`; 
		text += `#L104#极品回收#l\r\n`;
		text += `#L102#查看奖品#l\r\n`;
		cm.sendSimple(text);

	} else if (status == 1) {

		if (selection >= 1 && selection < 100) {

			let count = selection;

			//直接到抽奖仓库的新版
			if (cm.haveItem(id, count)) {

				cm.gainItem(id, -count);
				ch.saveLog("快乐百宝箱",cm.getNpc(),id,-count);

				var text = "恭喜你抽中：\r\n\r\n";

				var ids = [];
				for (let i = 0; i < count; i++) {
					let item = drawLottery();
					ids.push({id : item.id , count : item.count || 1});
					text += `\t#i${item.id}:# #t${item.id}:#\r\n`;
					if (item.categoryProb < 50) {
						var message = "在快乐百宝箱抽中";
						if(item.count > 1){
							message += item.count;
						}
						ch.serverMessage(message, item.id , "真幸运！");
					}
				}

				var giveItems = saveItem(ids);

				if(ch.getData("百宝箱抽奖次数") * 1 > 0){
					if(ch.getData("百宝箱积分") === ""){
						ch.saveData("百宝箱积分" , count);
					}
				}

				ch.saveData("百宝箱积分" , count , true);
				ch.saveData("百宝箱抽奖次数", count, true);
				cm.sendNext(text);
				ch.saveDayData("今日百宝箱抽奖", count, true);
				
				

			} else {
				cm.sendNext(` #t${id}# 数量不足！`);
			}
			status = -1;


		} else if (selection == 100) {
			//购买几个
			var text = `\r\n\t你已有${cm.getItemQuantity(id)}个#r#i${id}##k还打算买多少？\r\n\r\n`;
			text += `\t#r点券余额：${formatUnit(ch.getCashShop().getCash(1))}\t`
			text += "\r\n\r\n";


			for (let i = 0; i < buy.length; i++) {
				text += `#L${i}##b花${formatUnit(buy[i][0])}点券买${buy[i][1]}个`;
				if (i > 0) {
					text += `（单价${formatUnit(buy[i][0] / buy[i][1],0)}）`
				}
				text += "#l";
				text += "\r\n";
			}
			cm.sendSimple(text)


		} else if (selection == 101) {

			getItemsData = getItem(index);

			var text = `\r\n\t\t\t\t\t\t#e#r抽奖仓库（共存放${getItemsData.total}种物品）#n#k\r\n\r\n`
			text += "\t"
			for (let i = 0; i < 44; i++) {
				text += "#fMap/MapHelper/minimap/match#";
			}

			text += `#L901##fUI/Basic.img/CheckBox/${setI(1)}# ${setB(1)}武器#l `;
			text += `#L902##fUI/Basic.img/CheckBox/${setI(2)}# ${setB(2)}防具#l `;
			text += `#L903##fUI/Basic.img/CheckBox/${setI(3)}# ${setB(3)}饰品#l `;
			text += `#L904##fUI/Basic.img/CheckBox/${setI(4)}# ${setB(4)}卷轴#l `;
			text += `#L905##fUI/Basic.img/CheckBox/${setI(5)}# ${setB(5)}其他#l `;

			text += "\r\n\r\n"

			text += "\t"
			for (let i = 0; i < 44; i++) {
				text += "#fMap/MapHelper/minimap/match#";
			}

			text += "\r\n";

			if (getItemsData.items.length > 0) {
				for (let i = 0; i < getItemsData.items.length; i++) {
					let item = getItemsData.items[i];
					text += `#L${item[0]}# #i${item[0]}:# #t${item[0]}:# × ${item[1]}#l\r\n`;
				}
			} else {
				text += "\r\n\t#r选中分类没有可取出的物品！"
			}

			text += "　\r\n";
			cm.sendSimple(text);



		} else if (selection == 102) {
			var text = "\r\n";


			var reward = [
				...lotteryPool.legend.items,
				...lotteryPool.rare.items,
				...lotteryPool.normal.items
			];
			for (let i = 0; i < reward.length; i++) {
				text += `#i${reward[i].id}:#`;
				if ((i + 1) % 6 == 0) {
					//text += '\r\n'
				}
			}

			cm.sendOk(text);

		} else if (selection == 103){

			cm.dispose();
			cm.openNpc(9010000,"抽奖积分");

		} else if (selection == 104){

			cm.dispose();
			cm.openNpc(9010000, "极品回收");

		} else {
			cm.dispose();
		}


	} else if (status == 2) {

		if( selection === -1){
			status = -1;
			action(1, 0, 0);
		} else if (selection > 900 && selection < 1000000) {
			index = selection - 900;
			status = 0;
			action(1, 0, 101);

		} else if (selection >= 1000000) {

			giveItem = getItemsData.items.filter(item => item[0] == selection)[0];
			if (giveItem) {

				var text = `你已有${giveItem[1]}个，打算取出多少？\r\n　\r\n`;

				cm.sendGetNumber(text,giveItem[1],1,giveItem[1]);

				
			} else {
				cm.sendOk("未找到物品！");
				status = -1;
			}
			

		} else {

			var buyData = buy[selection];
			if (buyData[0] > ch.getCashShop().getCash(1)) {
				cm.sendOk("点券不足");
				status = -1;
			} else {
				if (cm.canHold(id, buyData[1])) {

					cm.gainItem(id, buyData[1]);
					ch.saveLog("快乐百宝箱",cm.getNpc(),id,buyData[1]);
					ch.gainCash(-buyData[0]);
					ch.saveLog("快乐百宝箱",cm.getNpc(),1,-buyData[0]);
					cm.sendOk("购买成功！");
					status = -1;

				} else {
					cm.sendOk("背包空间不足！");
					cm.dispose();
				}
			}
		}

	} else if (status == 3){

		if(giveItem){

			if(giveItem[1] >= selection && selection > 0 && isStrictNumber(selection)){

				var isOk = 0;
				var isBox = 0;
				for (var i = 0; i < selection; i++) {
					if(cm.canHold(giveItem[0])){

						// 圣诞鼻子属性不随机
						if(giveItem[0] >= 1012011 && giveItem[0] <= 1012020){
							//cm.gainItem(giveItem[0],1, false, true, false);
						}else{
							//cm.gainItem(giveItem[0],1, true, true, false);
						}

						cm.gainItem(giveItem[0],1,false,true,false);
						
						isOk++;
					}else{
						isBox = 1;
						break;
					}
				}
				if(isOk > 0){
					gainItem(giveItem[0], -isOk);
					ch.saveLog("快乐百宝箱",cm.getNpc(),giveItem[0],isOk);
				}
				
				getItemsData = getItem(index);

				if(isBox){
					cm.sendOk("背包空间不足！");
				}else{
					status = 0;
					action(1, 0, 101);
					return;
				}
			}else{
				cm.sendOk("没有那么多！");
			}
		}

		cm.dispose();

	} else {
		cm.dispose();
	}
	
}

function setB(i) {
	return index === i ? "#b" : "#k";
}

function setI(i) {
	return index === i ? "1" : "0";
}

/**
 * 保存物品到抽奖仓库
 * @Desc   无
 * @Author Ming
 * @Date   2026-01-03
 * @param  {[type]}   [{id,count} , {id,count} , ...]
 * @return {[type]}
 */
function saveItem(addData) {

	var baseData = getItem().items;
	const dataMap = new Map();
	baseData.forEach(([key, count]) => {
		dataMap.set(key, count);
	});

	addData.forEach(data => {
		dataMap.set(data.id, (dataMap.get(data.id) || 0) + data.count);
	});

	const result = [];
	dataMap.forEach((count, key) => {
		result.push([key, count]);
	});

	cm.getPlayer().saveData("抽奖仓库", JSON.stringify(result));
	return result;

}

/**
 * 调整指定物品的数量（支持增减，数量≤0则删除）
 * @param {Number} targetKey - 要调整的目标数字（如2430100）
 * @param {Number} change - 数量变化值（-1表示减1，1表示加1）
 * @returns {Array} 处理后的新数组（不修改原数组）
 */
function gainItem(targetKey, change) {
	const sourceData = getItem().items;
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
	cm.getPlayer().saveData("抽奖仓库", JSON.stringify(newData));
	return newData;
}

// 读取抽奖仓库数据，结果  [ [id,数量] , [id,数量]  ]  
function getItem(index) {
	var data = cm.getPlayer().getData("抽奖仓库");
	var back = [];
	var total = 0;
	if (data) {
		back = JSON.parse(data);
		total = back.length;
	}
	if (index && back.length > 0) {
		back = getIndex(index, back);
	}
	return {
		total: total,
		items: back
	}
}


function isStrictNumber(value) {
  // typeof 判断类型为 number，!isNaN 排除 NaN 情况
  return typeof value === 'number' && !isNaN(value);
}

// 按数据获得分类 传入data  [ [id,count] ]
function getIndex(index, data) {
	var array = [];
	for (let i = 0; i < data.length; i++) {
		let row = data[i];
		if (index == 1) { //武器
			if (row[0] >= 1300000 && row[0] <= 1709999) array.push(row);

		} else if (index == 2) { // 防具

			if (row[0] >= 1000000 && row[0] <= 1009999) {
				array.push(row); //帽子
			} else if (row[0] >= 1100000 && row[0] <= 1109999) {
				array.push(row); //披风
			} else if (row[0] >= 1040000 && row[0] <= 1059999) {
				array.push(row); //上衣和套服
			} else if (row[0] >= 1080000 && row[0] <= 1089999) {
				array.push(row); //手套
			} else if (row[0] >= 1060000 && row[0] <= 1069999) {
				array.push(row); //裤子
			} else if (row[0] >= 1090000 && row[0] <= 1099999) {
				array.push(row); //盾牌
			} else if (row[0] >= 1070000 && row[0] <= 1079999) {
				array.push(row); //鞋子
			} else if (row[0] >= 1132000 && row[0] <= 1132999) {
				array.push(row); //腰带
			}



		} else if (index == 3) { // 饰品

			if (row[0] >= 1112000 && row[0] <= 1119999) {
				array.push(row); //戒指
			} else if (row[0] >= 1030000 && row[0] <= 1039999) {
				array.push(row); //耳环
			} else if (row[0] >= 1122000 && row[0] <= 1122999){
				array.push(row); //吊坠
			} else if (row[0] >= 1942000 && row[0] <= 1949999) {
				array.push(row); //吊坠
			} else if (row[0] >= 1010000 && row[0] <= 1019999) {
				array.push(row); //脸饰
			} else if (row[0] >= 1020000 && row[0] <= 1029999) {
				array.push(row); //眼饰
			}

		} else if (index == 4) { //卷轴
			if (row[0] >= 2040000 && row[0] <= 2049999) array.push(row);
			if (row[0] == 2340000)array.push(row); 
		} else if (index == 5) { // 其他

			//药品，镖，座椅 //现金道具等
			if ((row[0] >= 2050000 && row[0] < 2079999) || 
				(row[0] >= 2330000 && row[0] <= 2339999) || 
				row[0] === 2450000 ||
				row[0] >= 3010000) array.push(row);

		} else {
			array.push(row)
		}
	}
	return array;

}


/**
 * 组合支付计算（优先绑金，再用元宝）
 * @param {number} bindGold - 可用绑金
 * @param {number} gold - 可用元宝
 * @param {number} price - 商品单价
 * @param {number} quantity - 购买数量
 * @returns {object} 支付详情（包含是否足够支付、绑金支付额、元宝支付额）
 */
function calculatePayment(bindGold, gold, price, quantity) {
	// 计算商品总金额
	const total = price * quantity;

	// 优先使用绑金支付
	let bindPay = Math.min(bindGold, total); // 绑金最多支付总金额或自身全部
	let remaining = total - bindPay; // 剩余需支付金额

	// 剩余部分用元宝支付
	let goldPay = Math.min(gold, remaining);

	// 判断是否足够支付
	const isEnough = (bindPay + goldPay) === total;

	return {
		isEnough: isEnough, // 是否能完成支付
		bindGoldPay: bindPay, // 绑金支付金额
		goldPay: goldPay, // 元宝支付金额
		total: total // 商品总金额
	};
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
	const selectedItem = randomByProbability(selectedCategory.items);
	return {
		id: selectedItem.id, //抽中物品ID
		count : selectedItem.count || 1,
		name: selectedItem.name, // 物品名称
		categoryProb: selectedCategory.probability, // 大类概率
		itemProb: selectedItem.probability, // 物品当前概率
	};
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
	return number.toFixed(decimalDigits) * 1;
}