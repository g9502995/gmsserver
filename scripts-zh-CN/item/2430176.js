
var status = -1;
const id = 2430176;
const cfg = [
    //剑士
    {id : 2431104, job : 11},  //快速剑         20/40
    {id : 2431105, job : 11},  //快速斧         20/40
    {id : 2431106, job : 11},  //愤怒之火    20/50
    {id : 2431107, job : 11},  //伤害反击    30/50
    
    //准骑士
    {id : 2431204, job : 12},  //快速剑         20/40
    {id : 2431205, job : 12},  //快速钝器    20/40
    {id : 2431206, job : 12},  //压制术     20/80  
    {id : 2431207, job : 12},  //伤害反击    30/50

    //枪战士
    {id : 2431324, job : 13},  //快速枪         20/40
    {id : 2431325, job : 13},  //快速矛     20/40
    {id : 2431326, job : 13},  //极限防御        20/60
    {id : 2431327, job : 13},  //神圣之火    30/50

    //牧师
    {id : 2432120, job : 23},  //魔力吸收    20/60
    {id : 2432121, job : 23},  //快速移动        20/40
    {id : 2432122, job : 23},  //群体治愈        20/60
    {id : 2432123, job : 23},  //神之保护        20/60
    {id : 2432124, job : 23},  //祝福          20/60
    {id : 2432125, job : 23},  //圣箭术     30/60

    //冰雷
    {id : 2432210, job : 22},  //魔力吸收    20/60
    {id : 2432211, job : 22},  //精神力         20/60
    {id : 2432212, job : 22},  //快速移动        20/40
    {id : 2432213, job : 22},  //缓速术     20/40
    {id : 2432214, job : 22},  //冰冻术         30/60
    {id : 2432215, job : 22},  //雷电术         30/60


    //火毒
    {id : 2432320, job : 21},  //魔力吸收    20/60
    {id : 2432321, job : 21},  //精神力         20/60
    {id : 2432322, job : 21},  //快速移动        20/40
    {id : 2432323, job : 21},  //缓速术     20/40
    {id : 2432324, job : 21},  //火焰箭     20/60
    {id : 2432325, job : 21},  //毒雾术     30/60


    //弓箭手
    {id : 2433121, job : 31},  //终极弓     30/50
    {id : 2433122, job : 31},  //快速箭         20/60
    {id : 2433124, job : 31},  //无形箭         20/40
    {id : 2433125, job : 31},  //爆炸箭         30/60

    //弩箭手
    {id : 2433220, job : 32},  //精准弩
    {id : 2433222, job : 32},  //快速弩
    {id : 2433223, job : 32},  //强弩
    {id : 2433224, job : 32},  //无形箭
    {id : 2433225, job : 32},  //穿透箭

    //刺客 
    {id : 2434121, job : 41},  //强力投掷    30/60
    {id : 2434123, job : 41},  //快速暗器    20/60

    //侠客
    {id : 2434222, job : 42},  //快速短刀    20/60
    {id : 2434225, job : 42},  //回旋斩         30/60

    //海盗 - 拳手
    {id : 2435022, job : 51},
    {id : 2435023, job : 51},
    {id : 2435024, job : 51},
    {id : 2435026, job : 51},

    //海盗 - 火枪手
    {id : 2435121, job : 52},
    {id : 2435122, job : 52},
    {id : 2435123, job : 52},
    {id : 2435124, job : 52},
    {id : 2435126, job : 52},
];

// 2转自选技能书

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
    			im.dropMessage(1,"兑换成功");
    			im.getPlayer().serverMessage("打开自选能手册(2转)获得" , selection);
    		} else {
    			im.sendNext("背包空间不足");
    			
    		}
    		im.dispose();
    	}
    	

	
	} else {
		im.dispose();
	}

	
}
