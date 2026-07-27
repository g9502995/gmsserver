
//冒险岛勇士 技能册
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

	const skill = [
		1121000,
		1221000,
		1321000,
		2121000,
		2221000,
		2321000,
		3121000,
		3221000,
		4121000,
		4221000,
		5121000,
		5221000,
		21121000,
	];


	const ch = im.getPlayer();


	const skillId = skill.find(num => {
	    const processed = Math.floor(num / 10000);
	    return Math.floor(num / 10000) === ch.getJob().getId();
	});

	if(!skillId){
		im.dropMessage(1,"不满足学习条件！");
	} else if (ch.getSkillLevel(skillId) > 0){
		im.dropMessage(1, "已习得本技能");
	} else {

		const playerSkillMaster = ch.getMasterLevel(skillId); 	//角色技能限制等级

		im.teachSkill(skillId, 1, playerSkillMaster, -1);
		im.dropMessage(1,"学习成功！");
		ch.serverMessage("使用了", id, "掌握了新技能！");
		im.gainItem(id,-1,false,false,false);

	}
	im.dispose();

	
}

