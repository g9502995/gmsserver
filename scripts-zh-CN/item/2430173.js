loadScript('./common.js');
//3转技能突破数
const id = 2430173;
const money = 500000;
const skills = getSkills(3)
var status = -1;
function start()  {
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

		var text = "\r\n\t打开后可概率获得以下任意一本能手册\r\n";

		if(money)text += `\t因封印解除需支付#r${money}金币#k`

		text +="，要现在打开吗？\r\n\r\n";

		text +="#b#L1#是的，现在就打开！#l\r\n";

		text +=" \r\n\r\n\t"

		skills.forEach((v,i) => {
			text += `#i${v}:#`;
			if ((i + 1) % 9 == 0) {
				text += "\r\n\t";
			}
		})

		im.sendSimple(text);

	} else if (status === 1){

		if(selection == 1){

			if(money > im.getMeso()){
				im.sendNext("金币不足！");
			}else{

				const randomIndex = Math.floor(Math.random() * skills.length);
				const skillId = skills[randomIndex];

				if(!skillId){
					im.sendNext("请再来一次")
				}else if(im.canHold(skillId)){
					im.gainItem(skillId,1);
					if(money)im.gainMeso(-money);
					im.getPlayer().serverMessage("打开【神秘能力册(3转)】获得了", skillId);
					im.gainItem(id,-1,false,false,false);

				}else{
					im.sendNext("背包空间不足！");
				}

			}
		}


		im.dispose();

	} else {
		im.dispose();
	}
	
}

