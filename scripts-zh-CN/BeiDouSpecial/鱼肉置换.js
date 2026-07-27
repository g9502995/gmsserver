

var status = 0;
var id = 4033005;  //鱼肉
const cfg = [

	// 基础价值：鲤鱼（⭐⭐）
	{ id: 4031637, name: "鲤鱼(53cm)", add : 1},
	{ id: 4031638, name: "鲤鱼(60cm)", add : 2 },
	{ id: 4031639, name: "鲤鱼(100cm)", add : 3 },
	{ id: 4031640, name: "鲤鱼(113cm)", add : 4 },
	
	// 中价值：银鱼（⭐⭐⭐）
	{ id: 4031633, name: "银鱼(3.6cm)", add : 5 },
	{ id: 4031634, name: "银鱼(5cm)", add : 6 },
	{ id: 4031635, name: "银鱼(6.5cm)", add : 7 },
	{ id: 4031636, name: "银鱼(10cm)", add : 8 },
	
	// 高价值：鲑鱼（⭐⭐⭐⭐）
	{ id: 4031645, name: "鲑鱼(166cm)", add : 9 },
	{ id: 4031646, name: "鲑鱼(183cm)", add : 10 },
	{ id: 4031647, name: "鲑鱼(227cm)", add : 11 },
	{ id: 4031648, name: "鲑鱼(288cm)", add : 12 },
	
	// 顶级价值：旗鱼（⭐⭐⭐⭐⭐）
	{ id: 4031641, name: "旗鱼(128cm)", add : 13 },
	{ id: 4031642, name: "旗鱼(131cm)", add : 14 },
	{ id: 4031643, name: "旗鱼(140cm)", add : 15 },
	{ id: 4031644, name: "旗鱼(148cm)", add : 16 },
	
];
function start() {
  
   //收鱼
	var text = `\r\n品种大小置换#t${id}#量不等，本次共计置换：`;

	let give = {};
	for(let i=0; i < cfg.length; i++){
		let itemId = cfg[i].id;
		let count = cm.getItemQuantity(itemId);
		if(count){
			for(let n = 0; n < count; n++){
				if( give[itemId] ){
					give[itemId].count += 1;
					give[itemId].add += cfg[i].add
				}else{
					give[itemId] = {
						id : itemId,
						count : 1,
						add : cfg[i].add
					};
				}
			}
		}
	}

	give = Object.values(give); 

	var viewText = "置换详情：\r\n\r\n"

	let addRou = 0;
	give.forEach((item,index) => {
		viewText += `\t#i${item.id}# #t${item.id}# ${item.count} 条，置换 ${item.add} 斤肉！\r\n`;
		addRou += item.add;
	})
	
	if(addRou > 0){
		if(cm.canHold(id,addRou)){
			give.forEach((item,index) => {
				cm.gainItem(item.id , -item.count);
				cm.getPlayer().saveLog(cm.getNpc(),item.id,-item.count);
			})
			cm.gainItem(id,addRou);
			cm.getPlayer().saveLog(cm.getNpc(),id,addRou);
			cm.getPlayer().serverMessage(`钓鱼置换${addRou}斤`,id);
			
			text += `#r${addRou} 斤#k\r\n\r\n`;
			
			if(give.length > 0) text += viewText;
			
			cm.sendNext(text);
		}else{
			cm.sendNext("背包空间不足！")
		}
	}else{
		cm.sendNext("你背包中没有鱼了，赶快去钓鱼吧！");
	}

   cm.dispose();

}


