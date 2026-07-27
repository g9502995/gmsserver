loadScript('./common.js');

const sk1 = getSkills(1)

const sk2 = getSkills(2)

const sk3 = getSkills(3)

const sk4 = getSkills(4)


//能手册
var status = -1;
const money = 500000;
const odds = 90;

var rate = false; 		//是否使用幸运水
const rateId = 4033008; 	//幸运水道具
const rateNum = 10; 	//使用幸运水增加的成功率
const rateLv = 2;   //使用幸运水最大突破等级
function start()  {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {

	if(mode <= 0){
		im.dispose();
	} else {
	    if (mode === 1) {
	        status++;
	    } else {
	        status--;
	    }


	    // 本道具ID
	    const id = im.getNpcObjectId();

	    //强开
	    if(!id){
	    	im.dispose();
	    	return;
	    }
	    
	    // 本道具要处理的技能
	    const skillId = im.getItem().getSkillId(id);

	    if(!skillId){
	    	im.dispose();
	    	return;
	    }

	    const ch = im.getPlayer();

	    const playerSkillLevel = ch.getSkillLevel(skillId); 	//角色当前技能等级
	    const playerSkillMaster = ch.getMasterLevel(skillId); 	//角色技能限制等级
	    const skill = ch.getSkill(skillId); //技能配置
	    const skillMaster = skill.getMasterLevel(); 	//限制等级
	    const skillMaxLevel = skill.getMaxLevel(); 		//技能最大等级配置

	
		if(ch.isGM()){
			im.message(`技能ID：${skillId} 限制等级：${playerSkillMaster} / ${skillMaxLevel}`);
		}	    

		if (status === 0) {

			if(playerSkillLevel == 0){

				var text = `\r\n\t#r#s${skillId}:# #q${skillId}# 未习得#k \r\n\r\n`;

					text += "\t技能未习得，还不能突破等级上限\r\n\r\n";
					

					text += `#b#L3#帮我换成#t${getId(id)}:##l\r\n`;
					text += "#b#L2#我考虑一下！#l\r\n";
					im.sendSimple(text);

			} else if(playerSkillMaster >= skillMaxLevel){

				var text = `\r\n\t#r#s${skillId}:# #q${skillId}# #k \r\n\r\n`;

					text += `\t技能（${playerSkillLevel}）上限已满！限制等级：${playerSkillMaster} / ${skillMaxLevel}\r\n\r\n`;

					text += `#b#L3#帮我换成#t${getId(id)}:##l\r\n`;
					text += "#b#L2#我考虑一下！#l\r\n";
					im.sendSimple(text);

			} else {

				var text = `\r\n\t#r#s${skillId}:# #q${skillId}#（等级限制 ${playerSkillMaster}）#k \r\n\r\n`;

					text += `\t突破成功可提高等级上限1级，最高可达到 ${skillMaxLevel}级\r\n\r\n`;
					text += "\t突破条件：\r\n\r\n"

					text += `\t\t◇\t 技能等级\t#r${alignText(formatUnit(skillMaster),4)}#k（已达 ${formatUnit(playerSkillLevel,0)}）\r\n`;
					if(money)text += `\t\t◇\t 需求金币\t#r${alignText(formatUnit(money,0),4)}#k（已有 ${formatUnit(im.getMeso(),0)}）\r\n`;
					text += `\t\t◇\t 成功几率\t#r${formatUnit(odds)}％#k`;
					if(rate){
						text += `\t〔${toFullNumber(odds + rateNum)}%〕`;
					}
					text += `\r\n\t\t\t#L5##fUI/Basic.img/CheckBox/${isSelect(rate,true)}# #r使用#t${rateId}:#提高几率（概率突破${formatUnit(rateLv)}级）#l\r\n`;
					
					text += "\r\n\r\n"
					

					text += "#b#L1#好了，开始突破吧#l\r\n";
					text += `#b#L3#不需要了，帮我换成#t${getId(id)}:##l\r\n`;
					text += "#b#L2#我考虑一下！#l\r\n";
					

				im.sendSimple(text);
			}

		} else if (status === 1){

			// 突破技能
			if(selection == 1){

				if(money > im.getMeso() && !ch.isGM()){
					im.dropMessage(1,"金币不足");
				} else if(skillMaster > playerSkillLevel){
					im.dropMessage(1,"技能等级需达到 " + skillMaster);
				} else if (rate && !im.getItemQuantity(rateId)){
					im.dropMessage(1,"幸运药水不足");
				}else{

					var isok = 1;
					var random = getRandomInt(1,100);
					const success = rate ? odds + rateNum : odds;
					if(ch.isGM()){
						im.message("成功率：" + success + " 结果：" + random)
					}
					if(success < random)isok = 0;
					if(money && !ch.isGM())im.gainMeso(-money);
					im.gainItem(id,-1,false,false,false);
					if(rate){
						im.gainItem(rateId,-1);
					}
					if(isok || ch.isGM()){
						var up = 1;
						if(rate){
							var random = getRandomInt(1,100);
							if(5 >= random)up = rateLv;
						}
						if(playerSkillMaster + up > skillMaxLevel) up = 1;
						im.teachSkill(skillId, playerSkillLevel, playerSkillMaster + up, im.getPlayer().getSkillExpiration(skillId));
						ch.serverMessage("使用了", id, "技能上限被提高至 " + (playerSkillMaster + up) + " 级！");
						im.dropMessage(1,`技能上限提高了${up}级`);
					}else{
						im.dropMessage(1,"失败了");
					}
					
				}
				im.dispose();

			} else if(selection === 3){
				// 换成碎片
				var skillItem = getId(id);
				var text = `\r\n你确定要把 #i${id}# #r#t${id}##k 换成 #i${skillItem}# #r#t${skillItem}:##k 吗？\r\n`
				text += "\r\n#b"
				text += `#L10#是的，确定要成#t${skillItem}# #l\r\n`
				im.sendSimple(text)

			} else if(selection === 5){
				
				//是否使用幸运道具的处理
				rate = !rate;
				
				status = -1;
				action(1, 0, 0);

			} else {

				im.dispose();
			}

			

		} else if (status === 2){

			if(selection === 10){
				var skillItem = getId(id);
				if(im.canHold(skillItem)){
					im.gainItem(skillItem);
					im.gainItem(id, -1);
					im.dropMessage(1,"兑换成功！");
				} else {
					im.dropMessage(1,"背包空间不足！");
				}
			} 

			

			im.dispose();

		} else {
			im.dispose();
		}
	}
	
}

function getId(id) {
	if(sk1.includes(id)){
		return 2430195;
	}
	if(sk2.includes(id)){
		return 2430196;
	}
	if(sk3.includes(id)){
		return 2430197;
	}
	if(sk4.includes(id)){
		return 2430198;
	}

}


function isSelect(v,t){
	if(v === t)return 1;
	return 0;
}