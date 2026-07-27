
var status;

function start(){
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	
    if (mode < 0) {
        cm.dispose();
    } else {
       if (mode == 1) {
            status++;
        } else {
            status--;
        }  

        
      
        if(status == 0){

           

            var text = "";
            text += "#L890##fUI/Basic.img/CheckBox/0# #k保管物品#l\t\t\t";
            text += "#L891##fUI/Basic.img/CheckBox/0# #k取出物品#l\t\t\t";
            text += "#L892##fUI/Basic.img/CheckBox/1# #b背包整理#l";
            text += "\r\n\r\n\r\n"
            
            text += "\t"
            for(let i=0; i < 44; i++){
                text +="#fMap/MapHelper/minimap/match#";
            }


            text += "\r\n\r\n"
            text += "\t#k请问你要整理哪一栏背包呢？\r\n\r\n#b"

            text += "#L901#装备#l\t\t";
            text += "#L902#消耗#l\t\t";
            text += "#L903#设置#l\t\t";
            text += "#L904#其他#l\t\t";
            text += "#L905#特殊#l";

            text += "\r\n\r\n\r\n#L910##r整理以上所有#l\r\n";


            text += "　\r\n"

            cm.sendSimple(text);
          

           

        } else if (status == 1) {

            if(selection  === -1){
                
                cm.dispose();
                cm.openNpc(9900001,"9900001")

            } else if(selection > 800 && selection < 900){
                //进入菜单
                cm.dispose();
                
                if(selection === 890)cm.openNpc(9010000, "物品保管");
                if(selection === 891)cm.openNpc(9010000, "物品取出");
                if(selection === 892)cm.openNpc(9010000, "背包整理");
            
            }else if(selection >= 900 && selection < 910){

                // 整理单一栏

                const index = selection - 900;

                cm.getPlayer().sortInventory(index);
                cm.sendNext("整理成功！\r\n\r\n");
                
                status = -1;

            } else if (selection === 910) {
                //整理全部
                cm.getPlayer().sortAllInventory();
                cm.sendNext("所有背包栏整理完成！\r\n\r\n");
                 status = -1;

            } else {

                cm.dispose();
            }

            
			
		} else {
            cm.dispose();
        }
    }
} 

function setB(i){
    return index === i ? "#b" : "#k";
}

function setI(i){
    return index === i ? "1" : "0";
}
