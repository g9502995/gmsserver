// loadScript('./common.js');
var status = -1;
const id = 2430175;
// const sk = getSkills(1)

const cfg = [
    //战士
    {id : 2431000, job : 1},  //生命恢复    16/30
    {id : 2431003, job : 1},  //圣甲术     20/40
    {id : 2431004, job : 1},  //强力攻击    20/40
    {id : 2431005, job : 1},  //群体攻击        20/40

    // 魔法师
    {id : 2432110, job : 2},  //魔力恢复    20/30
    {id : 2432112, job : 2},  //魔法盾         20/30
    {id : 2432113, job : 2},  //魔法铠甲    20/60
    {id : 2432114, job : 2},  //魔法弹         20/40
    {id : 2432115, job : 2},  //魔法连击    20/40

    //弓箭手
    {id : 2433110, job : 3},  //精准箭         16/30
    {id : 2433111, job : 3},  //强力箭         20/40
    {id : 2433112, job : 3},  //远程箭         8/13
    {id : 2433113, job : 3},  //集中术         20/40
    {id : 2433114, job : 3},  //断魂箭     20/40
    {id : 2433115, job : 3},  //二连射         20/40

    //飞侠
    {id : 2434110, job : 4},  //集中术         20/40
    {id : 2434111, job : 4},  //远程暗器    8/13
    {id : 2434112, job : 4},  //诅咒术         20/40
    {id : 2434113, job : 4},  //二连击         20/40
    {id : 2434114, job : 4},  //双飞斩         20/40

    //海盗
    {id : 2435010, job : 5},
    {id : 2435011, job : 5},
    {id : 2435012, job : 5},
    {id : 2435013, job : 5},
    
];

// 1转自选技能书

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

		var text = "\r\n\t请选择你需要的能手册！\r\n"


        let job = parseInt(im.getJobId() / 100);

        sk = cfg.filter(v=> v.job === job);

        if(sk.length > 0){

    		text += "\r\n#b"
        	sk.forEach((v,i) => {
        		text += `#L${v.id}##i${v.id}:# #t${v.id}:# #l`
        		if((i+1) % 1 === 0){ 
        			text += "\r\n"
        		}
        	})

        	text += "　\r\n"

        	im.sendSimple(text);
        } else {
            im.dropMessage(1,"请转职后再打开！");
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
    			im.getPlayer().serverMessage("打开自选能手册(1转)获得" , selection);
    		} else {
    			im.sendNext("背包空间不足");
    			
    		}
    		im.dispose();
    	}
    	

	
	} else {
		im.dispose();
	}

	
}
