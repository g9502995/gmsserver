
var status;

var data = [
  {
  	"id" : 1,
	"name": "金  银  岛",
	"children": [
	  {
	  	"id" : 11,
		"name": "明  珠  港",
		"give" : [
			{id : 2430130, count : 6},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100},
			
		],
		"data": [
		  {"id": 2380000,"name": "蜗牛卡片",  "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380001,"name": "蓝蜗牛卡片",  "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380004,"name": "红蜗牛卡片",  "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380006,"name": "猪猪卡片",  "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380007,"name": "花蘑菇卡片",  "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382030,"name": "红螃蟹卡片",  "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383001,"name": "乌龟卡片",  "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383009,"name": "青螃蟹卡片",  "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388000,"name": "红蜗牛王卡片", "give" : [ { id : 2430100 , count : 50 } ]},
		  {"id": 2388003,"name": "冰海螺蟹卡片",  "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 12,
		"name": "射  手  村",
		"give" : [
			{id : 2430130, count : 5},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2380002,"name": "蘑菇仔卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380009,"name": "漂漂猪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381002,"name": "蓝蘑菇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382053,"name": "铁甲猪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383030,"name": "石头人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388006,"name": "蘑菇王卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 13,
		"name": "魔法森林",
		"give" : [
			{id : 2430130, count : 6},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2380003,"name": "木妖卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380005,"name": "绿水灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380008,"name": "黑木妖卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380011,"name": "绿蘑菇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382018,"name": "风独眼兽卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382029,"name": "猴子卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382040,"name": "僵尸猴卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383029,"name": "巫婆卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388002,"name": "浮士德卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 14,
		"name": "废弃都市",
		"give" : [
			{id : 2430130, count : 6},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2380010,"name": "三眼章鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2380012,"name": "蓝水灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381003,"name": "蝙蝠卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381006,"name": "青蛇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382002,"name": "鳄鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382019,"name": "小幽灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383008,"name": "大幽灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383019,"name": "黑鳄鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383048,"name": "谢尔德卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388001,"name": "绿水灵王卡片", "give" : [ { id : 2430100 , count : 50 } ]},
		  {"id": 2388007,"name": "多尔卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 15,
		"name": "勇士部落",
		"give" : [
			{id : 2430130, count : 6},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2381000,"name": "斧木妖卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381001,"name": "古木妖卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381008,"name": "黑斧木妖卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381014,"name": "木面怪人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381018,"name": "石面怪人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381022,"name": "野猪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382003,"name": "火野猪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382021,"name": "幼魔精灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382063,"name": "骷髅犬卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382065,"name": "土龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382069,"name": "钢甲猪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383005,"name": "木乃伊犬卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383036,"name": "骷髅士兵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383044,"name": "赤龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384003,"name": "骷髅士官卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384029,"name": "骷髅指挥官卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388025,"name": "树妖王卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 16,
		"name": "林中之城",
		"give" : [
			{id : 2430130, count : 7},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2381007,"name": "刺蘑菇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381016,"name": "僵尸蘑菇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381024,"name": "火独眼兽卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382039,"name": "冰独眼兽卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383012,"name": "青龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383039,"name": "黑石头人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383043,"name": "混种石头人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384001,"name": "怪猫卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384006,"name": "冰龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384015,"name": "黑恐龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384020,"name": "月牙牛魔王卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384036,"name": "长枪牛魔王卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388008,"name": "僵尸蘑菇王卡片", "give" : [ { id : 2430100 , count : 50 } ]},
		  {"id": 2388026,"name": "蝙蝠怪卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 17,
		"name": "艾琳森林",
		"give" : [
			{id : 2430130, count : 5},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2382076,"name": "苔藓蜗牛卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383056,"name": "苔藓木妖卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383057,"name": "苔藓蘑菇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383058,"name": "原始野猪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383059,"name": "石头虫卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388039,"name": "剧毒石头人卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  }
	]
  },
  {
    "id" : 2,
	"name": "海外旅游",
	"children": [
	  {
	    "id" : 21,
		"name": "尼哈沙漠",
		"give" : [
			{id : 2430130, count : 8},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2381004,"name": "母沙沙兔卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381005,"name": "公沙沙兔卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381010,"name": "仙人掌宝宝卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381015,"name": "沙漠蛇先生卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381019,"name": "耳罩壁虎卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381020,"name": "沙漠土拨鼠卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381023,"name": "仙人掌妈妈卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381025,"name": "围巾壁虎卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381028,"name": "仙人掌爸爸卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381030,"name": "丁满卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381031,"name": "沙漠毒蝎卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381036,"name": "秃鹫先生卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382008,"name": "沙漠矮人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382009,"name": "魔方卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382010,"name": "红色沙漠矮人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382024,"name": "黑妖苗苗卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382036,"name": "黑妖苗苗兄弟卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382046,"name": "沙漠巨人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382057,"name": "螺母卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383007,"name": "蓝变异螺母卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383016,"name": "红变异螺母卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383028,"name": "洛伊德卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383042,"name": "氯化洛伊德卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384011,"name": "哈闷卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384018,"name": "赛一特卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384031,"name": "哈闷气球卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384034,"name": "D.洛伊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385008,"name": "变态哈闷卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388029,"name": "大宇卡片", "give" : [ { id : 2430100 , count : 50 } ]},
		  {"id": 2388032,"name": "吉米拉卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 22,
		"name": "武陵桃园",
		"give" : [
			{id : 2430130, count : 7},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2382045,"name": "松松卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382051,"name": "豪猪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382060,"name": "灰豪猪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382070,"name": "青花蛇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382071,"name": "红花蛇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383006,"name": "坛子卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383010,"name": "山参坛子卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383015,"name": "训练用稻草娃娃卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383018,"name": "训练用木娃娃卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383025,"name": "桔梗精卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383027,"name": "老山参精卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383032,"name": "秘籍卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383035,"name": "棕熊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383041,"name": "天鹿卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383047,"name": "柔道猫熊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383049,"name": "仙人玩偶卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384002,"name": "猿公卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384008,"name": "鳄鳄卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384013,"name": "妙仙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384017,"name": "克鲁卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384025,"name": "凯丁卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388010,"name": "肯德熊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388011,"name": "老海盗卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388013,"name": "妖怪绅士卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 23,
		"name": "童  话  村",
		"give" : [
			{id : 2430130, count : 5},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2382068,"name": "月妙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383014,"name": "小虎卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383024,"name": "虎精卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383034,"name": "三尾狐卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383046,"name": "小鬼怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384021,"name": "黄色鬼怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384022,"name": "蓝色鬼怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384023,"name": "绿色鬼怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384039,"name": "书生鬼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388009,"name": "九尾狐卡片", "give" : [ { id : 2430101 , count : 50 } ]}
		]
	  }
	]
  },
  {
    "id" : 3,
	"name": "神  秘  岛",
	"children": [
	  {
	    "id" : 31,
		"name": "冰下世界",
		"give" : [
			{id : 2430130, count : 7},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2381009,"name": "海胆卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381013,"name": "小海马卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381017,"name": "独角小丑鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381021,"name": "大海马卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381026,"name": "蓝泡泡翻车鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381029,"name": "花花青鲇鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381035,"name": "大龙虾卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382007,"name": "胖球鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382027,"name": "潜水企鹅卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382035,"name": "小海豹卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382043,"name": "蓝刺豚卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382044,"name": "紫刺豚卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382056,"name": "小海狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382059,"name": "小海象卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385013,"name": "刺鳍鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386000,"name": "骨骸鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386003,"name": "乌贼怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386007,"name": "致命乌贼怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386012,"name": "鲨鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386014,"name": "尖鼻鲨鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388020,"name": "皮亚奴斯卡片", "give" : [ { id : 2430100 , count : 50 } ]},
		  {"id": 2388030,"name": "歇尔夫卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 32,
		"name": "玩  具  城",
		"give" : [
			{id : 2430130, count : 7},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2381011,"name": "绿蜘蛛卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381027,"name": "红蜘蛛卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381034,"name": "玩具棕熊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382000,"name": "飞行雀卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382001,"name": "打鼓兔子卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382004,"name": "玩具粉熊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382005,"name": "玩具白鼠卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382015,"name": "玩具鸭卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382016,"name": "玩具黑鼠卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382017,"name": "计时啾啾卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382022,"name": "吹泡泡双鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382025,"name": "玩具熊猫卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382026,"name": "直升机卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382028,"name": "水老鼠卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382031,"name": "玩具战机卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382032,"name": "小恶魔卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382033,"name": "吹泡泡鱼皇卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382034,"name": "运输机卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382037,"name": "空军雀卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382038,"name": "木马骑兵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382041,"name": "闹钟啾啾卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382048,"name": "女机器人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382049,"name": "恶魔之父卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382054,"name": "黄积木怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382062,"name": "男机器人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382066,"name": "青积木怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383002,"name": "恶魔之母卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383004,"name": "战甲吹泡泡鱼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384000,"name": "黄小丑卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384004,"name": "恶灵附身的娃娃卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384012,"name": "红小丑卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384014,"name": "大恶灵附身的娃娃卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384019,"name": "大立钟卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384032,"name": "时之鬼兵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385000,"name": "高级大立钟卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385003,"name": "时之鬼将卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385010,"name": "蓝帽海贼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385012,"name": "死灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385015,"name": "绿帽海贼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385020,"name": "死灵王卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386002,"name": "大海贼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386004,"name": "时之鬼爵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386009,"name": "大海贼王卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386010,"name": "时之鬼王卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387000,"name": "时间门神卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387001,"name": "黑甲凶灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388004,"name": "阿丽莎乐卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388005,"name": "提莫卡片", "give" : [ { id : 2430100 , count : 50 } ]},
		  {"id": 2388022,"name": "帕普拉图斯卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 33,
		"name": "天空之城",
		"give" : [
			{id : 2430130, count : 7},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2381012,"name": "小石球卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381032,"name": "石球卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381033,"name": "蝴蝶精卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381037,"name": "冰石球卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2381038,"name": "火石球卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382011,"name": "幼红独角狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382012,"name": "幼黄独角狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382013,"name": "幼蓝独角狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382020,"name": "星光精灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382052,"name": "食人花卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382064,"name": "月光精灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383003,"name": "黑食人花卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383020,"name": "日光精灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383021,"name": "红独角狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383022,"name": "黄独角狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383023,"name": "蓝独角狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384005,"name": "黑色小飞狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384030,"name": "黑色飞狮卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388015,"name": "艾利杰卡片", "give" : [ { id : 2430100 , count : 50 } ]},
		  {"id": 2388017,"name": "蝙蝠魔卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 34,
		"name": "冰封雪域",
		"give" : [
			{id : 2430130, count : 7},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2382006,"name": "小白雪鬼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382014,"name": "小黑雪鬼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382023,"name": "小企鹅王卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382047,"name": "独眼蝙蝠卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382058,"name": "小猎犬卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383013,"name": "小白雪人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383017,"name": "火精灵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383031,"name": "野狼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383033,"name": "小黑雪人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383037,"name": "僵尸卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383038,"name": "矿山僵尸卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383040,"name": "白狼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383045,"name": "企鹅王卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384007,"name": "黑企鹅王卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384009,"name": "白雪人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384010,"name": "黑山老妖卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384016,"name": "黑雪人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384026,"name": "猎犬卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384035,"name": "狼人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384037,"name": "雪山魔女卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385004,"name": "企鹅王与白雪人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385006,"name": "白狼人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385009,"name": "企鹅王与黑雪人卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385021,"name": "火焰猎犬卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388016,"name": "驮狼雪人卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 35,
		"name": "地球本部",
		"give" : [
			{id : 2430130, count : 5},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2382042,"name": "白外星人卫兵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382050,"name": "外星章鱼枪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382055,"name": "白外星人队长卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382061,"name": "外星章鱼坦克卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382067,"name": "白外星人长官卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2382072,"name": "强化的螺母卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383000,"name": "外星章鱼激光棒卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383011,"name": "白外星人司令卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2383026,"name": "外星章鱼闪电棒卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385023,"name": "迪特和罗伊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388031,"name": "朱诺卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  }
	]
  },
  {
  	"id" : 4,
	"name": "神木神殿",
	"children": [
	  {
	    "id" : 41,
		"name": "神  木  村",
		"give" : [
			{id : 2430130, count : 10},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2384024,"name": "莱西卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384027,"name": "橡木甲虫卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384028,"name": "侏儒怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2384033,"name": "黑暗莱西卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385001,"name": "金属甲虫卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385002,"name": "邪恶侏儒怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385005,"name": "变种侏儒怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385007,"name": "哈维卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385011,"name": "血腥哈维卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385014,"name": "邪恶绵羊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385016,"name": "暗黑半人马卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385017,"name": "火焰半人马卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385018,"name": "寒冰半人马卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385019,"name": "恶魔绵羊卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2385022,"name": "蓝海龟龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386001,"name": "红海龟龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386005,"name": "犀牛龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386006,"name": "犀牛龙怪卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386008,"name": "红飞龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386011,"name": "邪恶短刃蜥蜴卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386013,"name": "蓝飞龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386015,"name": "黑飞龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386016,"name": "邪恶双刀蜥蜴卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386017,"name": "洞穴小蜥蜴卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387002,"name": "骷髅龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387003,"name": "老骷髅龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387004,"name": "泥人妖卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388018,"name": "火焰龙卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388019,"name": "天鹰卡片", "give" : [ { id : 2430100 , count : 50 } ]},
		  {"id": 2388033,"name": "大海兽卡片", "give" : [ { id : 2430100 , count : 50 } ]}
		]
	  },
	  {
	    "id" : 42,
		"name": "时间神殿",
		"give" : [
			{id : 2430130, count : 10},
			{id : 2430100, count : 50},
			{id : 2430101, count : 100}
		],
		"data": [
		  {"id": 2385025,"name": "时间之眼卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386021,"name": "追忆的祭司卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386022,"name": "追忆的神官卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386023,"name": "追忆的守护兵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2386024,"name": "追忆的守护队长卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387006,"name": "后悔的祭司卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387007,"name": "后悔的神官卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387008,"name": "后悔的守护兵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387009,"name": "后悔的守护队长卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387010,"name": "忘却的祭司卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387011,"name": "忘却的神官卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387012,"name": "忘却的守护兵卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2387013,"name": "忘却的守护队长卡片", "give" : [ { id : 2430101 , count : 50 } ]},
		  {"id": 2388040,"name": "多多卡片","give" : [{id : 2430101, count : 50 } ]},
		  {"id": 2388042,"name": "雷卡卡片","give" : [{id : 2430101, count : 50 } ]},
		]
	  }
	]
  }
];

var type1 = 1;
var type2 = 11;
var cardsData = [];
var thatCard = {};
var thatAll = {};
var giveCache = [];
var giveAddress = [];
function start() {
	cardsData = getCardsData();
	giveAddress = getData(`区域全卡奖励`) || [];
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
	
	
	
    if (status === 0) {
		
		
		cm.sendSimple(menuIndex(type1,type2));
        
    } else if (status === 1) {
		
		//点击1级分类
		if(selection < 10){
			type1 = selection;
			
		// 点击2级分类
		}else if(selection> 10 && selection < 2000000){
			type2 = selection;
			
		// 点击单项卡片
		}else if (selection > 2000000 && selection < 3000000){
			thatCard = giveCard(selection);
			let text = `\t集齐 #r5个#t${selection}:# #k可领取以下奖励\r\n\r\n`;
			for(let i=0; i < thatCard.give.length;i++){
				text += `\t#i${thatCard.give[i].id}:# #t${thatCard.give[i].id}:# × ${thatCard.give[i].count}\r\n`;
			}
			cm.sendSimple(`${text}\r\n#L1##b我已集齐，现在领取！#l`);
			return;
			
		// 点击集齐奖励
		}else if( selection > 3000000 ){
			
			if(!thatAll.give){
				cm.sendNext("此类暂无设置奖励");
				status = -1;
			}else{
				let text = `\t集齐本区域卡片可领取以下奖励！\r\n\r\n`;
				for(let i=0; i < thatAll.give.length;i++){
					text += `\t#i${thatAll.give[i].id}:# #t${thatAll.give[i].id}:# × ${thatAll.give[i].count}\r\n`;
				}
				cm.sendSimple(`${text}\r\n#L2##b我已集齐，现在领取！#l\r\n`);
			}
			return;
		}
		
		cm.sendSimple(menuIndex(type1,type2));
		status = 0
		
	} else if(status ===  2){
		
		if(selection == 1){
			
			if(thatCard.count >= 5){
				
				const itemId = thatCard.give.map(item => item.id);
				const itemCount = thatCard.give.map(item => item.count);
				if(itemId.length > 0 && !cm.canHoldAll(itemId , itemCount)){
					cm.sendNext("背包空间不足！");
				}else{
				
					let name = `区域${thatAll.id}单卡奖励`;
					giveCache[thatAll.id] = getData(name) || [];
					if(giveCache[thatAll.id].includes(thatCard.index)){
						cm.sendNext("已领取过啦");
					}else{
						
						for(let i=0; i < thatCard.give.length; i++){
							cm.gainItem(thatCard.give[i].id,thatCard.give[i].count);
							cm.getPlayer().saveLog("卡片收集",thatCard.give[i].id,thatCard.give[i].count);
						}
						
						giveCache[thatAll.id].push(thatCard.index);
						setData(name,giveCache[thatAll.id]);
						cm.sendNext("领取成功");
						cm.getPlayer().serverMessage(`领取了【收集${thatCard.name}】奖励！`)
					}
				}
			}else{
				cm.sendNext("收集数量不足，领取失败！");
			}
			
			
		}else if (selection == 2){
			if(!thatAll.isok){
				cm.sendNext("领取失败，卡片没有集齐！")
			}else{
				
				if(giveAddress.includes(thatAll.id)){
					cm.sendNext("你已领取过该奖励了！");
				}else{
					const itemId = thatAll.give.map(item => item.id);
					const itemCount = thatAll.give.map(item => item.count);
					if(itemId.length > 0 && !cm.canHoldAll(itemId , itemCount)){
						cm.sendNext("背包空间不足！");
					}else{
						for(let i=0; i < thatAll.give.length; i++){
							cm.gainItem(thatAll.give[i].id,thatAll.give[i].count);
							cm.getPlayer().saveLog("卡片收集",thatAll.give[i].id,thatAll.give[i].count);
						}
						
						giveAddress.push(thatAll.id);
						setData(`区域全卡奖励`,giveAddress);
						cm.sendNext("领取成功");
						cm.getPlayer().serverMessage(`领取了【集齐${thatAll.name}区域卡片】获得了超级大奖！`)
					}
				}
			}
		}
		
		status = -1;
    
    } else {
        cm.dispose();
    }
}


function menuIndex(){
	
	var text = '\r\n';
	
	text += `\t#r怪物掉落的卡片，使用后就可以在我这领取奖励！#k\r\n`;
	
	//一条心线
	text += "\r\n"
	for(let i=0; i < 46; i++){
		text +="#fMap/MapHelper/minimap/match#";
	}
	text += "\r\n"
	
	var children = [];
	for(let i=0; i< data.length; i++){
		text += `#L${data[i].id}##fUI/Basic.img/CheckBox/${duigou(type1,data[i].id)}# ${yanse(type1,data[i].id)}${data[i].name}#l\t\t`;
		
		if ((i + 1) % 3 === 0) {
			text += "\r\n";
		}
		
		if(data[i].id === type1){
			children = data[i].children;
		}
		
	}
	
	//一条心线
	text += "\r\n\r\n"
	for(let i=0; i < 46; i++){
		text +="#fMap/MapHelper/minimap/match#";
	}
	text += "\r\n"
	
	let cards = [];
	for(let i=0; i < children.length; i++){
		
		
		if(i === 0){
			if(type2.toString()[0] !== type1.toString()[0]){
				type2 = children[i].id
			}
		}
		
		text += `#L${children[i].id}##fUI/Basic.img/CheckBox/${duigou(type2,children[i].id)}# ${yanse(type2,children[i].id)}${children[i].name}#l\t\t`;
		
		if ((i + 1) % 3 === 0) {
			text += "\r\n";
		}
		
		if(children[i].id === type2){
			cards = children[i];
		}
		
	}
	
	//一条心线
	text += "\r\n\r\n"
	for(let i=0; i < 46; i++){
		text +="#fMap/MapHelper/minimap/match#";
	}
	text += "\r\n"
	
	
	giveCache[cards.id] = getData(`区域${cards.id}单卡奖励`) || [];
	
	
	
	cards.total = 0; //已完成个数
	cards.isok = 0;  //是否全部完成
	for(let i=0; i < cards.data.length; i++){
		
		cards.data[i].count = 0;
		
		for(let ii=0; ii < cardsData.length ; ii++){
			if(cardsData[ii].id === cards.data[i].id){
				cards.data[i].count = cardsData[ii].count;
				break;
			}
		}
		
		if(cards.data[i].count >= 5){
			cards.total = cards.total + 1;
		}
		
		if(!giveCache[cards.id].includes(i)){
			text += `#L${cards.data[i].id}##b〔已有 #r${cards.data[i].count}#b 〕#t${cards.data[i].id}# × 5 #l\r\n`
		}
		
	}
	
	//是否全部完成
	if(cards.total === cards.data.length){
		cards.isok = 1;
	}
	
	if(!giveAddress.includes(cards.id)){
		text += `\r\n#L99999${cards.id}##fUI/UIWindow.img/Quest/icon9/0# #r#e领取区域全部集齐大奖！ #k#n#l\r\n`;
	}
	text += "\r\n\r\n"
	
	for(let i=0; i < cards.data.length; i++){
		if(giveCache[cards.id].includes(i)){
			text += `\t  #k〔已领取 〕#t${cards.data[i].id}# × 5 \r\n`
		}
	}
	
	thatAll = cards;
	return text;
}

function duigou(index,i){
	if(i === index){
		return "1"
	}
	return "0"
}

function yanse(index,i){
	if(i === index){
		return "#b"
	}
	return "#k"
}

//获得玩家拥有的所有卡片
function getCardsData(){
	var cardset = cm.getPlayer().getMonsterBook().getCardSet();

	var cards = [];
	for (var iterator = cardset.iterator(); iterator.hasNext();) {
		
		var ce = iterator.next();

		cards.push({
			id : ce.getKey(),
			count : ce.getValue()
		})
	
	}
	
	return cards;
}

//获得一项卡片数据
function giveCard(id){
	let back = {};
	for (let i = 0; i < thatAll.data.length; i++){
		if(thatAll.data[i].id === id){
			back = thatAll.data[i];
			back.index = i;
			break;
		}
	}
	return back;
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

