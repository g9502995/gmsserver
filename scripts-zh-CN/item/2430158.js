
//骑兽技能
var id = 2430158;
var status = -1;

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

    if(!im.haveItem(id)){
		//强开
		im.dispose();
		return;
	}

	if (status === 0) {
		
		var ch = im.getPlayer();
		
		if(ch.getSkillLevel(1004)){
			im.message("已掌握技能，无需重复学习！");
		}else{
			
			im.message("你学会了骑兽技能");
			ch.serverMessage("学会了骑兽技能！",id);
			im.gainItem(id,-1);
			ch.saveLog(id,-1);
			im.teachSkill(1004, 1, 1, -1);
			
		}

		im.dispose();
	
	} else {
		im.dispose();
	}
	
}

