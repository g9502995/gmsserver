
//卡珊德拉
var status = -1;
var cost = 500;

function start()  {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }
    
    var money1 = cm.getPlayer().getCashShop().getCash(1);

    var mapId  = cm.getPlayer().getMapId();

    if (status === 0) {
        

        var text = `\r\n\t我或许能帮你做些事情，但需支付#r${cost}点券#k\r\n`
        text += `\t你的点券余额：${money1}\r\n`;
        

        text += "\r\n#b"
        
        if(mapId === 990000410){
            
            text += "#L100#帮我传送到第1个顶端#l\r\n"
            text += "#L101#帮我传送到第2个顶端#l\r\n"
            text += "#L102#帮我传送到第3个顶端#l\r\n"

        }else if(mapId == 990000440){
            text += "#L200#帮我传送到第1个顶端#l\r\n"
            text += "#L201#帮我传送到第2个顶端#l\r\n"
            text += "#L202#帮我传送到第3个顶端#l\r\n"
            text += "#L203#帮我传送到第4个顶端#l\r\n"

        }else if(mapId == 990000620){
            text += "#L400#帮我传送到到上面#l\r\n";

        }else if(mapId == 990000611){
            text += "#L500#帮我传送到到上面#l\r\n";

        }else if(mapId == 990000641){
            text += "#L600#帮我传送到到上面#l\r\n";

        }else if(mapId == 990000631){
            text += "#L800#帮我传送到到上面#l\r\n";

        
        }else if(mapId == 990000501){
            text += "#L40010294#我想要过期的食物#l\r\n"

        }else if(mapId == 990000502){
            text += "#L40010304#我想要700年青蛇酒#l\r\n"

        }else if(mapId == 990000500){
            text += "#L40010304#我想要700年青蛇酒#l\r\n"
            text += "#L40010294#我想要过期的食物#l\r\n"
        
        }else if(mapId == 990000630){
            text += "#L40010358#我想要恶魔标识#l\r\n";
        
        }else if(mapId == 990000430){
            text += "#L40010371#我想要生锈的钥匙#l\r\n";
        }else if(mapId == 990000800){
            text += "#L199#直接打开门#l\r\n";


        }else if(mapId == 926100301){
            //罗密欧-实验室通道1
            text += "#L110#帮我传送到出口#l\r\n";

        }else if(mapId == 926100302){
            //罗密欧-实验室通道2
            text += "#L111#帮我传送到出口#l\r\n";

        }else if(mapId == 926100303){
            //罗密欧-实验室通道3
            text += "#L112#帮我传送到出口#l\r\n";

        }else if(mapId == 926100304){
            //罗密欧-实验室通道4
            text += "#L113#帮我传送到出口#l\r\n";

        }else if(mapId == 926110301){
            //朱丽叶-实验室通道1
            text += "#L121#帮我传送到出口#l\r\n";

        }else if(mapId == 926110302){
            //朱丽叶-实验室通道2
            text += "#L122#帮我传送到出口#l\r\n";

        }else if(mapId == 926110303){
            //朱丽叶-实验室通道3
            text += "#L123#帮我传送到出口#l\r\n";

        }else if(mapId == 926110304){
            //朱丽叶-实验室通道4
            text += "#L124#帮我传送到出口#l\r\n";

        }else{

            text += "\r\n";
            text += "#r\t水晶球在此地区无法发挥她的作用！\r\n"
            text += "　\r\n";
            cm.sendOk(text);
            cm.dispose();
            return;

        }
        

        if(cm.getPlayer().isGM()){
            text += `\r\n\r\n#r当前地图编号：${mapId}\r\n`;
        }

        cm.sendSimple(text)

        
        
    
    } else if (status == 1){

        if(cost > money1){
            cm.sendOk("点券不足，不能启动水晶球！")
        }else{
            if(selection == 100)cm.warp(990000410,"gm00");
            if(selection == 101)cm.warp(990000410,"gm01");
            if(selection == 102)cm.warp(990000410,"gm02");
            if(selection == 110)cm.warp(926100301,"success");
            if(selection == 111)cm.warp(926100302,"success");
            if(selection == 112)cm.warp(926100303,"success");
            if(selection == 113)cm.warp(926100304,"success");
            if(selection == 121)cm.warp(926110301,"success");
            if(selection == 122)cm.warp(926110302,"success");
            if(selection == 123)cm.warp(926110303,"success");
            if(selection == 124)cm.warp(926110304,"success");
            if(selection == 200)cm.warp(990000440,"gm00");
            if(selection == 201)cm.warp(990000440,"gm01");
            if(selection == 202)cm.warp(990000440,"gm02");
            if(selection == 203)cm.warp(990000440,"gm03");
            if(selection == 400)cm.warp(990000620,"gm00");
            if(selection == 500)cm.warp(990000611,"gm00");
            if(selection == 600)cm.warp(990000641,"gm00");
            if(selection == 800)cm.warp(990000631,"gm00");
            
            if(selection > 1000000){
                var item = selection.toString();
                var id = item.slice(0,-1) * 1;
                var count = item.slice(-1) * 1;

                if(cm.canHold(id,count)){
                    cm.gainItem(id,count)
                }else{
                    cm.sendOk("背包不足");
                    cm.dispose();
                    return;
                }
                
            }
            if(selection == 199){
                var eim = cm.getPlayer().getEventInstance();
                cm.getPlayer().getMap().getReactorByName("kinggate").forceHitReactor(1)
                ecm.showClearEffect(false, mapId);
            }

            cm.getPlayer().gainCash(-cost);
            cm.getPlayer().saveLog(cm.getNpc(),1,-cost);

        }
        cm.dispose();

    } else {
        cm.dispose();
    }
    
}

