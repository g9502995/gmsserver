
var status;
function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();//点击了取消，停止，结束
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}

    if (status == 0)  {

    	

    	var text = "请问你要查看什么类型的排名\r\n\r\n";

        text += "#b"

        text += "#L1#角色等级排名#l\r\n";
        
        text += "#L2#角色伤害排名#l\r\n";

        text += "#L3#家族荣耀排名#l\r\n";
    	

    	text += "　\r\n"

    	cm.sendSimple(text);
    
    } else if (status == 1){
    	
        if(selection == 1){
            cm.getPlayer().showRank();
            cm.dispose();
        }else if(selection == 2){
            var text = "根据 攻击力(魔法力)和HP上限算获得，并不代表最终实力\r\n\r\n#b";
            var menu = ["战士" , "法师" , "射手", "飞侠", "海盗"];
            for (var i = 0; i < menu.length; i++) {
                text += `#L${i+1}#${menu[i]}#l\t`;
            }
            cm.sendSimple(text);
        }else if (selection == 3){
            cm.displayGuildRanks();
            cm.dispose();
        }


    } else if (status == 2){

        cm.getPlayer().showDamage(selection);
    	cm.dispose();
		
    }else{
		cm.dispose()
	}
		
	
			
}
