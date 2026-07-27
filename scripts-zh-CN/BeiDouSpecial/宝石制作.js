loadScript('./common.js');
const compose = getGems();
var data = null;
var item = null;
var index = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {

	if (mode <= 0) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status === 0){

			var text = "我可以把你收集的宝石碎片拼合修复成属性宝石，镶嵌到时装上可以提高装备能力！\r\n\r\n";

			text += "#b";

			compose.forEach(v => {
				text += `#L${v.index}#制作${v.name}#l\r\n`;
			})


			cm.sendSimple(text);

		

		} else if (status === 1){

			
			var text = "\r\n\t你要制作什么成色的宝石？\r\n\r\n";

			text += "#b"

			data = compose.find(v => v.index === selection);
			
			data.item.forEach( v=> {
				text +=`#L${v.id}# #i${v.id}:# #t${v.id}:#\r\n`;
			})

			text += "\r\n#L999#返回#l\r\n"


			cm.sendSimple(text);
				


		} else if (status === 2){

			if(selection === 999){
				status =-1;
				action(1,0,0);
			} else {
				
				item = data.item.find(v=> v.id === selection)

				var text = `\t制作 #i${selection}:# #r#t${selection}:##k 需要材料：\r\n\r\n\r\n`

				item.item.forEach(v=>{
					const [id, count] = v;
					text +=`\t\t#i${id}:# #t${id}:# × ${alignText(formatUnit(count,5))} #r（已有：${formatUnit(cm.getItemQuantity(id))}）#k\r\n`;
				})

				if(item.gold){
					text += `\t\t#i4031138# 金\t币 × ${alignText(formatUnit(item.gold),5)} #r（已有 ${formatUnit(cm.getMeso())}）#k\r\n`;
				}


				text += "\r\n#b";
				text += `#L1#我想制作1个#r（已有 ${cm.getItemQuantity(selection)}）#b#l\r\n`
				text += "#L4#我想制作4个#l\r\n"
				text += "#L9#我想制作9个#l\r\n"
				text += "#L999#返回#l\r\n"

				
				cm.sendSimple(text)
			}
			
			
		} else if (status === 3){

			if(selection === 999){
				status =-1;
				action(1,0,0);
			} else {

				const needGold = item.gold * selection;

				var err;
				item.item.forEach(v => {
					const [id , count] = v;
					const total = selection * count;
					if(total > cm.getItemQuantity(id)){
						err = `所需 #i${id}:# #t${id}:# 不足！`;
					}
				}) 

				if(needGold > cm.getMeso() ){
					cm.sendNext("金币不足");
					cm.dispose();
				} else if (err){
					cm.sendNext(err);
					cm.dispose();
				} else if (!cm.canHold(item.id , selection)){
					cm.sendNext("背包空间不足！")
					cm.dispose();
				} else {

					item.item.forEach(v=>{
						const [id, count] = v;
						const total = selection * count;
						cm.gainItem(id, -total);
					})

					if(needGold){
						cm.gainMeso(-needGold);
					}

					cm.gainItem(item.id , selection);

					cm.getPlayer().serverMessage(`制作了${selection}个`, item.id);
					cm.sendNext("制作成功！");
					status = -1;

				}

				
			}
		
		} else {
			cm.dispose();
		}
	}
}
