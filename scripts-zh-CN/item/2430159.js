
//匠人之魂
var id = 2430159;
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
		if(ch.getSkillLevel(1003)){
			im.dropMessage(1,"你已掌握此技能！");
		}else{
			im.teachSkill(1003, 1, 1, -1);
			im.dropMessage(1,"学习成功！");
			im.gainItem(id,-1);
			ch.saveLog(id,-1);
			ch.serverMessage("学会了",id);
		}
		im.dispose();
	} else {
		im.dispose();
	}
	
}


