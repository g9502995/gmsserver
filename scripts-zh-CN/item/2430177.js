
var status = -1;
const id = 2430177;
const cfg = [
    //勇士 
    {id : 2431110, job : 11},  //魔力恢复    20/30
    {id : 2431111, job : 11},  //盾防精通    20/30
    {id : 2431112, job : 11},  //集中斗气    30/50
    {id : 2431115, job : 11},  //气绝剑         30/50
    {id : 2431116, job : 11},  //气绝斧         30/50
    {id : 2431118, job : 11},  //虎咆哮     30/50

    // 骑士
    {id : 2431200, job : 12},  //魔力恢复        20/30
    {id : 2431211, job : 12},  //盾防精通    20/30
    // {id : 2431202, job : 12},  //属性攻击     30/30  次技能与4转的万佛归一破有关联不建议改
    {id : 2431223, job : 12},  //烈焰之剑        30/50
    {id : 2431224, job : 12},  //烈焰钝器        30/50
    {id : 2431225, job : 12},  //寒冰之剑        30/50
    {id : 2431226, job : 12},  //寒冰钝器        30/50
    {id : 2431227, job : 12},  //雷电之击：剑  30/50
    {id : 2431228, job : 12},  //雷电之击：钝器30/50

    //龙骑士
    {id : 2431330, job : 13},  //魔法抗性    20/60
    {id : 2431331, job : 13},  //枪连击         30/60
    {id : 2431332, job : 13},  //矛连击         30/60
    {id : 2431333, job : 13},  //无双枪         30/60
    {id : 2431334, job : 13},  //无双矛         30/60
    {id : 2431335, job : 13},  //龙之献祭    30/40
    {id : 2431336, job : 13},  //龙咆哮         30/40
    {id : 2431338, job : 13},  //龙之魂         20/30

    //祭司
    {id : 2432130, job : 23},  //魔法抗性    20/40
    {id : 2432133, job : 23},  //神圣祈祷    30/60
    {id : 2432134, job : 23},  //圣光      30/60
    {id : 2432136, job : 23},  //圣龙召唤    30/60

    //冰雷
    {id : 2432231, job : 22},  //魔力激化    20/40
    {id : 2432232, job : 22},  //冰咆哮         30/60
    {id : 2432233, job : 22},  //落雷枪         30/60
    {id : 2432235, job : 22},  //魔法狂暴    20/40
    {id : 2432236, job : 22},  //冰雷合击    30/60

    //火毒
    {id : 2432330, job : 21},  //火毒抗性
    {id : 2432331, job : 21},  //魔力激化    30/60
    {id : 2432332, job : 21},  //末日烈焰    30/60
    {id : 2432333, job : 21},  //致命毒雾    30/60
    {id : 2432335, job : 21},  //魔法狂暴    20/40
    {id : 2432336, job : 21},  //火毒合击    30/60

    //弓箭手
    {id : 2433132, job : 31},  //替身术         20/80
    {id : 2433133, job : 31},  //烈火箭         30/60
    {id : 2433134, job : 31},  //箭雨      30/60
    {id : 2433136, job : 31},  //箭扫射         30/60

    //弩箭手
    {id : 2433232, job : 32},  //替身术
    {id : 2433233, job : 32},  //寒冰箭
    {id : 2433234, job : 32},  //升龙弩
    {id : 2433236, job : 32},  //箭扫射

    //隐士
    {id : 2434131, job : 41},  //聚财术
    {id : 2434132, job : 41},  //影分身
    {id : 2434133, job : 41},  //影网术
    {id : 2434134, job : 41},  //金钱攻击
    {id : 2434135, job : 41},  //多重飞镖

    //独行客
    {id : 2434230, job : 42},  //强化盾
    {id : 2434232, job : 42},  //落叶斩
    {id : 2434233, job : 42},  //敛财术     20/30
    {id : 2434234, job : 42},  //分身术         30/35

    //斗士
    {id : 2435031, job : 51},
    {id : 2435032, job : 51},
    {id : 2435035, job : 51},
    {id : 2435036, job : 51},

    //大副
    {id : 2435130, job : 52},
    {id : 2435131, job : 52},
    {id : 2435132, job : 52},
    {id : 2435134, job : 52},
    {id : 2435135, job : 52},
];

// 3转自选技能书

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {

    if(mode <= 0){
        im.dispose();
        return;
    }
	
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
	
	if (status === 0) {

		let job = parseInt(im.getJobId() / 10);

        sk = cfg.filter(v=> v.job === job);

        if(sk.length > 0){
            var text = "\r\n\t请选择你需要的能手册！\r\n"

            text += "\r\n#b"
            sk.forEach((v,i) => {
                text += `#L${v.id}# #i${v.id}:# #t${v.id}:# #l`
                if((i+1) % 1 === 0){
                    text += "\r\n"
                } 
            })

            text += "　\r\n"

            im.sendSimple(text);
        } else {
            im.dropMessage("请转职后再打开！");
            im.dispose();
        }

    } else if (status === 1){


    	var text = `\t你确定要 #i${selection}:# #r#t${selection}:##k 吗？\r\n`

    	text += "\r\n#b";
    	text += `#L${selection}#是的，给我吧！\r\n`
    	text += "#L9#我再看看！\r\n";
    	im.sendSimple(text);

    } else if (status === 2) {

    	if(selection === 9){
    		status =-1;
    		action(1,0,0);
    	} else {
    		if(im.canHold(selection)){
    			im.gainItem(id,-1);
    			im.gainItem(selection,1);
    			im.sendNext("给你，请拿好！");
    			im.getPlayer().serverMessage("打开自选能手册(3转)获得" , selection);
    		} else {
    			im.sendNext("背包空间不足");
    			
    		}
    		im.dispose();
    	}
    	

	
	} else {
		im.dispose();
	}

	
}
