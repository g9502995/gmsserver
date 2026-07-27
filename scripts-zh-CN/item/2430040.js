
//红蓝瓶

var status = -1;

let id = 2430040;
var hpmptotalName = "红蓝瓶增加值总数";
var hpmpCountName = "红蓝瓶使用次数";
var HpMptotal = 0;
var HpMpCount = 0;
function start() {
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

	const count = im.getItemQuantity(id)

	if(count > 100) count = 100;

	const ch = im.getPlayer();
	
	HpMptotal = ch.getData(hpmptotalName) * 1;
	HpMpCount = ch.getData(hpmpCountName) * 1;

	if (status === 0) {
		
		let text = `\t你背包现有 #i${id}# #r#t${id}# × ${im.getItemQuantity(id)} #k\r\n\t使用后可随机提升HP和MP上限，需要使用吗？\r\n\r\n#b`;
		text += `\t#r已提升红上限：${HpMptotal}\r\n`;
		text += `\t#r已提升蓝上限：${HpMptotal}\r\n\r\n#b`;
		
		if(count > 1){
			text += `#L${count}#使用${count}个#l\r\n`
			text += "#L1#使用1个#l\r\n";
		}else{
			text += "#L1#是的，直接使用#l";
		}
		
		im.sendSimple(text);
		
		
	} else if (status === 1) {
		
		if(selection == 1){

			let add = open(im);
			if( isNumber(add)){
				im.message("MP和HP上限提升了" + add +"点！")
			}else{
				im.sendNext(add);
			}
			im.dispose();
			
		}else{
			let total = 0;

			for(let i=0; i <= count; i++){
				if(im.haveItem(id)){
					let add = open(im);
					if(isNumber(add)){
						total += add;
					}else{
						im.sendNext(add)
						im.dispose();
						return;
					}
				}
			}
			im.message("MP和HP上限提升了" + total +"点！")
			im.dispose();
			
		}
	
	
	} else {
		im.dispose();
	}
	
}


function open(im){
	const maxAttr = 30000;
	
	const role = im.getPlayer();
	const hp = role.getMaxHp() * 1;
	const mp = role.getMaxMp() * 1;
	const add = getRandomInRange(3,9) * 1;
	const HpMptotal = role.getData(hpmptotalName) * 1;
	const HpMpCount = role.getData(hpmpCountName) * 1;
	
	const newMP = mp + add;
	const newHP = hp + add;

	const lastMP = newMP >= maxAttr ? maxAttr : newMP;
	const lastHP = newHP >= maxAttr ? maxAttr : newHP;
	
	if(lastMP >= maxAttr && lastHP >= maxAttr){
		return "上限了，巅峰了，不能再加了，#b最高不能超过" + maxAttr + "点。";
	}

	
	role.updateMaxMp(lastMP);
	role.updateMaxHp(lastHP);
	im.gainItem(id,-1,false,false,false);
	role.saveLog(id,-1);
	role.saveData(hpmptotalName, (add + HpMptotal).toString());
	role.saveData(hpmpCountName, (1 + HpMpCount).toString());
	role.serverMessage("使用了",id,"MP和HP上限都提升了" + add + "点！");
	
	return add
	
	
}

function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

// 随机生成一个数字
function getRandomInRange(min = 3 , max = 9) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


