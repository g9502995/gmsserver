loadScript('./common.js');
var status = 0;

const sk1 = getSkills(1)

const sk2 = getSkills(2)

const sk3 = getSkills(3)

const sk4 = getSkills(4)

var skills = [];

// 1、2、3、4转技能书售价
const sale = [200000,200000,500000,1000000];

// 1、2、3、4转神秘技能书ID
const item = [2430171,2430172,2430173,2430174];

var id;
var ismoney = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode <= 0) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}


		if (status === 0) {

			var text = "\r\n\t我正在收集这些能手册，你打算把哪个给我？\r\n\r\n";

			skills = []; 

			sk1.forEach(v=>{
				const count = cm.getItemQuantity(v);
				if(count > 0 ){
					skills.push([v,count]);
				}
			})

			sk2.forEach(v=>{
				const count = cm.getItemQuantity(v);
				if(count > 0 ){
					skills.push([v,count]);
				}
			})

			sk3.forEach(v=>{
				const count = cm.getItemQuantity(v);
				if(count > 0 ){
					skills.push([v,count]);
				}
			})


			sk4.forEach(v=>{
				const count = cm.getItemQuantity(v);
				if(count > 0 ){
					skills.push([v,count]);
				}
			})

			if(skills.length > 0){

				text += "#b"
				skills.forEach(v => {
					const [id , count] = v;
					text += `#L${id}# #i${id}:# #t${id}# （已有：${count}）#l\r\n`;
				})

				text += "　\r\n";
				cm.sendSimple(text);
			} else {
				cm.sendNext("你身上还没有能手册！");
				cm.dispose();
			}


		} else if (status === 1){

			id = selection ;

			var index = getId(id);
			var text = `#i${id}:# #t${id}:# `
			if(selection === 1){
				text += `我可以出${sale[index]}的价格收购，你愿意吗？\r\n`;
				ismoney = 1;
			} else {
				text += `我可以用 #i${item[index]}# #t${item[index]}# 和你换，但你要给我${formatUnit(sale[index])}金币，你愿意吗？\r\n`;
			}

			text += "\r\n#b"
			text += `#L1#好的，我有${cm.getItemQuantity(id)}本都给你吧！\r\n`;
			text += "#L2#我再想想！\r\n";

			cm.sendSimple(text);

		} else if (status === 2){

			if(selection === 1){
				var index = getId(id);
				const count = cm.getItemQuantity(id);
				const ch = cm.getPlayer();
				if(ismoney === 1){

					//要钱
					if(count > 0){
						cm.gainItem(id, -count);
						cm.gainMeso(sale[index] * count);
						ch.saveLog("技能收集",id,-count);
						ch.saveLog("技能收集",0,sale[index] * count);
						ch.serverMessage(`在市场小贩能手册收集换了${count}本`,id);
						cm.sendOk("OK，交易愉快！");
						cm.dispose();
					}
					

				} else {
					//要神秘册
					if(!cm.canHold(item[index],count)){

						cm.sendOk("背包空间不足");
						cm.dispose();
					} else if (sale[index] * count > cm.getMeso()){

						cm.sendOk("金币不足！");
						cm.dispose();

					} else {
						cm.gainItem(id,-count);
						cm.gainItem(item[index],count);
						cm.gainMeso(-sale[index] * count);
						ch.serverMessage(`在市场小贩能手册收集换了${count}本`,item[index]);
						ch.saveLog("技能收集",id,count);
						ch.saveLog("技能收集",0, -sale[index] * count);
						cm.sendOk("OK，交易愉快！");
						cm.dispose();
						
					}
				}


			} else {
				cm.dispose();
			}

			

			
		} else {
			cm.dispose();
		}
	}	
}

function getId(id) {
	if(sk1.includes(id)){
		return 0;
	}
	if(sk2.includes(id)){
		return 1;
	}
	if(sk3.includes(id)){
		return 2;
	}
	if(sk4.includes(id)){
		return 3;
	}

}


