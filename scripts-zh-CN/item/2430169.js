
//万佛归一破 技能册
function start()  {

	// 本道具ID
	const id = im.getNpcObjectId();

	if(!id){
		im.dropMessage(1,"读取配置信息错误");
		im.dispose();
		return;
	}

	if(!im.haveItem(id)){
		//强开
		im.dispose();
		return;
	}

	// 本道具要处理的技能
	const skillId = 1220010;

	const ch = im.getPlayer();

	if(ch.getSkillLevel(skillId) > 0){
		im.dropMessage(1, "已习得本技能");
	} else if (30 > ch.getSkillLevel(1211002)){
		im.dropMessage(1, "需 属性攻击 技能等级达到30");
	} else {

		const playerSkillMaster = ch.getMasterLevel(skillId); 	//角色技能限制等级

		im.teachSkill(skillId, 1, playerSkillMaster, -1);
		im.dropMessage(1,"学习成功！");
		ch.serverMessage("使用了", id, "掌握了新技能！");
		im.gainItem(id,-1,false,false,false);

	}
	im.dispose();

	
}

