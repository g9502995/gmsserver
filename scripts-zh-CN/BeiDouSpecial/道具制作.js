loadScript('./common.js');
var status;
var data = null;
var child = null;
var storage = null;
var money = 0;
var make = null;
var roleExp = 0;
var isCard = 0;
var dropData = getDropGemData();
var itemWarp = 5040000;  //传送道具
var cfg = [
	{
		id : 4011007,
		name: "月石",
		text : "\t",
		money : 500000,
		number : [1,2,5,10],
		item: [
		  {id: 4011000,item : [{id : 4010000, count :10, money : 300}],text : "\t"},
		  {id: 4011001,item : [{id : 4010001, count :10, money : 300}],text : "\t"},
		  {id: 4011002,item : [{id : 4010002, count :10, money : 300}]},
		  {id: 4011003,item : [{id : 4010003, count :10, money : 500}]},
		  {id: 4011004,item : [{id : 4010004, count :10, money : 500}],text : "\t\t"},
		  {id: 4011005,item : [{id : 4010005, count :10, money : 500}]},
		  {id: 4011006,item : [{id : 4010006, count :10, money : 800}],text : "\t"}
		]
	},
	
	{
		id : 2430100,
		name : "点券",
		text : "\t\t",
		number : [1,5,10],
		item : [
			{id : 4001126 , count : 100}
		],
	},
	{
		id : 4033000,
		name : "生命水",
		number : [1,2,3,5,"exp","auto"],
		exp : 500000,
		item : [],
	},

	{id : 4005004, name : "黑暗水晶", number : [1,2,5,10], money : 1000000,item : [{id : 4004004, count : 10}]},

	{
		id : 4021009,
		name : "星石",
		text : "\t",
		money : 500000,
		number : [1,2,5,10],
		item: [
		  {id: 4021000,item : [{id : 4020000, count :10, money : 500}],text : "\t"},
		  {id: 4021001,item : [{id : 4020001, count :10, money : 500}],text : "\t"},
		  {id: 4021002,item : [{id : 4020002, count :10, money : 500}]},
		  {id: 4021003,item : [{id : 4020003, count :10, money : 500}],text : "\t"},
		  {id: 4021004,item : [{id : 4020004, count :10, money : 500}],text : "\t"},
		  {id: 4021005,item : [{id : 4020005, count :10, money : 500}],text : "\t"},
		  {id: 4021006,item : [{id : 4020006, count :10, money : 500}],text : "\t\t"},
		  {id: 4021007,item : [{id : 4020007, count :10, money : 1000}],text : "\t\t"},
		  {id: 4021008,item : [{id : 4020008, count :10, money : 3000}],text : "\t"},
		]
	},

	{
		id : 3996011,
		name : "弹药补充器",
		text : "",
		number : [1],
		item : [],
		money : 100000,
		expire : 3 * (24 * 60 * 60 * 1000),
		isCard : 1,
		only : 1,
	}

	// {id : 4005000, name : "力量水晶", number : [1,5],  money : 5000, item : [{id : 4004000, count : 10}] },
	// {id : 4005001, name : "智慧水晶", money : 5000,number : [1,5], item : [{id : 4004001, count : 10}]},
	// {id : 4005002, name : "敏捷水晶", number : [1,5], money : 5000,item : [{id : 4004002, count : 10}]},
	// {id : 4005003, name : "幸运水晶", number : [1,5], money : 5000,item : [{id : 4004003, count : 10}]},
	
];
var index = 0;
function start() {
    status = -1;
    isCard = cm.getItemQuantity(2430161);
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
	
		if (status === 0) {
			
			var text = "你打算制作什么呢？\r\n\r\n#b"
			for(let i=0;i < cfg.length;i++){
				text += `#L${i}# #t${cfg[i].id}:# #l${cfg[i].text || ''}\t`;
				if((i+1) % 4 == 0){
					text += "\r\n"
				}
				
			}

			text += "#L9999# 必成卷 #l\t"
			text += "#L9998# 宝石 #l\t\t"
			
			text += "\r\n　\r\n"
			
			cm.sendSimple(text);
			
		} else if (status === 1) {

			if(selection === 9999){
				cm.dispose();
				cm.openNpc(9010000,"必成卷轴");
				return;
			}

			if(selection === 9998){
				cm.dispose();
				cm.openNpc(9010000,"宝石制作");
				return;
			}

			index = selection;
			
			data = cfg[selection];

			if(!data || !data.id){
				status = -1;
				//异常情况，没有得到数据，目前发现点击二级再点结束就会出现，先在这里拦截吧，没时间检查了
				action(1, 0, 0);
				return;
			}
			
			money = cm.getMeso();
			
			var text =`\t我将为你制作 #r#i${data.id}:# #t${data.id}:#`
			if(data.expire){
				text += ` - 限时${fTime(data.expire)}`;
			}
			text += `（已有 ${getItemQuantity(data.id)}）`
			
			text += `#k\r\n\r\n`;

			text += "\t需求材料：\r\n\r\n"
			
			
			for(let i=0; i < data.item.length;i++){
				if(data.item[i].item){
					text += `\t\t#b#L${i}# ${data.item[i].count || ''} #t${data.item[i].id}:# ${data.item[i].text || ''}\t`;
					text += `#r（已有 ${getItemQuantity(data.item[i].id)}）#l`; 
					if((i+1) == data.item.length){
						text += "\r\n";
					}
				}else{
					text += `\t\t ${data.item[i].count || ''} #t${data.item[i].id}:# ${data.item[i].text || ''}\t`;
					text += `#r（已有 ${getItemQuantity(data.item[i].id)}）` 
				}
				text+="\r\n#k"
				
			}
			
			// text += "\r\n"
			
			if(data.money){
				if(data.item.length > 1)text += "\t\t";
				text += `\t\t${formatUnit(data.money)} 金币 #r（已有 ${formatUnit(money)}）#k\r\n`;
			}
			
			if(data.exp){
				if(data.item.length > 1)text += "\t\t";
				text += `\t\t${formatUnit(data.exp)} 经验值 #r（已有${formatUnit(cm.getPlayer().getExp())}）#k\r\n`;
			}

			
			
			text += "\r\n#b";
			for(let i=0; i<data.number.length; i++){
				if(data.number[i] === "auto"){
					text += `#L900000#我想开启自动制作#t${data.id}##l\r\n`;
					
				} else if (data.number[i] === "exp"){

					const needExp = 500000;
					const makeCount = Math.trunc(cm.getPlayer().getExp() / needExp);
					if(makeCount > 5){
						text += `#L${makeCount + 900000}#我想制作${makeCount}个#t${data.id}:##l\r\n`;
					}
				} else {
					text += `#L${data.number[i] + 900000}#我想制作${data.number[i]}个#t${data.id}:##l\r\n`;
				}
			}

			text += "#L99#返回#l"
			
			cm.sendSimple(text);
			
			
		} else if(status ===  2){

			if(selection === 99){
				status = -1;
				action(1,0,0);
				return;
			}
			
			if(selection < 900){
				
				child = data.item[selection];
				var text = `制作 #r#i${child.id}# #t${child.id}##k 需要以下材料\r\n\r\n\r\n`;
				
				if(child.item){

					child.item.forEach((v,i)=>{
						const drop = getDropById(v.id , dropData)
						if(drop.length > 0){
							text += `#b#L${v.id}#${v.count} #t${v.id}:#`;
						} else {
							text += `#k\t ${v.count} #t${v.id}:#`;
						}
						
						text += `#r（已有 ${getItemQuantity(v.id)}）#k`
						if(drop.length > 0){
							text += "#l";
						}
						text += "\r\n"; 
						if(v.money){
							text += `\r\n\t ${formatUnit(v.money)} 金币 #r（已有 ${formatUnit(money)}）`
						}
					})

				}
				
				
				text += "\r\n\r\n#b";
				text += `#L901#我想制作1个#t${child.id}##l\r\n`;
				text += `#L902#我想制作2个#t${child.id}##l\r\n`;
				text += `#L905#我想制作5个#t${child.id}##l\r\n`;
				text += `#L910#我想制作10个#t${child.id}##l\r\n`;
				text += "#L999#返回#l\r\n";
				
				cm.sendSimple(text);
				
			}else if (selection >= 1){

				if(selection == 900000){
					// 开启自动制作历练水
					if(isCard){
						const autoId = 3996000;
						var text = `请收好 #i${autoId}:# #t${autoId}:# \r\n\r\n接下来经验值足够时自动制作历练水，不需要时丢弃即可！\r\n`;
						if(!cm.haveItem(autoId) && cm.canHold(autoId)){
							cm.gainItem(autoId,1,false,false,1 * (24 * 60 * 60 * 1000));
							cm.getPlayer().serverMessage('获得',autoId,'开启了自动制作历练水功能！');
						}
					} else {
						text = "只有月卡特权才能开启自动制作！"
					}
					

					cm.sendOk(text);
					cm.dispose();
					return;
				}

				
				//制作第一级
				var count = selection - 900000;
				
				if(data.money && (data.money * count) > cm.getMeso()){
					cm.sendNext("金币不足！");
				} else if(data.exp && (data.exp * count) > cm.getPlayer().getExp()){
					cm.sendNext("角色经验值不足！");
				} else if(data.isCard && !isCard){
					cm.sendNext("只有月卡特权才能制作！")
				} else if(data.only && cm.getItemQuantity(data.id)){
					cm.sendNext(`你已拥有 #t${data.id}#`);
				}else{
					let itemText;
					for(let i=0; i < data.item.length; i++){
						let v = data.item[i];
						if((v.count || 1) * count > getItemQuantity(v.id)){
							itemText = `#t${v.id}#数量不足！`;
							break;
						}
					}
					if(itemText){
						cm.sendNext(itemText)
						
					}else{
						if(cm.canHold(data.id,count)){
							
							if(data.money){
								cm.gainMeso(-(data.money * count));
								cm.getPlayer().saveLog("道具制作",0,-(data.money * count));
							}
							if(data.exp)cm.getPlayer().loseExp(data.exp * count,false,false);
							for(let i=0; i < data.item.length; i++){
								gainItem(data.item[i].id,-((data.item[i].count || 1) * count));

								cm.getPlayer().saveLog("道具制作",data.item[i].id,-((data.item[i].count || 1) * count));
							}
							cm.gainItem(data.id, count,false,true,data.expire || -1);
							cm.getPlayer().saveLog("道具制作",data.id,count);
							cm.sendNext("制作成功！");
							cm.getPlayer().serverMessage(`成功制作${count}个`,data.id)
							
							cm.getPlayer().saveDayData("今日道具制作", 1, true);
							

						}else{
							cm.sendOk("背包空间不足！");
							cm.dispose();
							return;
						}
					}
				}
				
				status = -1;
				
			}
			
			
			
			
		} else if (status == 3){
			
			//制作第二级
			
			if(selection == 999){
				status = 0;
				action(1, 0, index);
				return;

			} else if (selection >= 1 && selection <= 100000){
				
				var count = selection - 900;
				
				
				let itemText;
				for(let i=0; i < child.item.length; i++){
					let v = child.item[i];
					if((v.count || 1) * count > getItemQuantity(v.id)){
						itemText = `#t${v.id}#数量不足！`;
						break;
					}
					if(v.money && (v.money * count) > cm.getMeso()){
						itemText = "金币不足";
						break;
					}
				}
				if(itemText){
					cm.sendNext(itemText)
				}else{
					if(cm.canHold(child.id,count)){
						
						for(let i=0; i < child.item.length; i++){
							let v = child.item[i];
							gainItem(v.id,-((v.count || 1) * count));
							cm.getPlayer().saveLog("道具制作",v.id,-((v.count || 1) * count));

							if(v.money){
								cm.gainMeso(-(v.money * count));
								cm.getPlayer().saveLog("道具制作",0,-(v.money * count));
							}
						}

						cm.gainItem(child.id,count);
						cm.getPlayer().saveLog("道具制作",child.id,count);
						// cm.sendNext("制作成功！");
						cm.getPlayer().serverMessage("成功制作" + count + "个",child.id);
						cm.getPlayer().saveDayData("今日道具制作" , 1, true);
						status = 0;
						action(1, 0, index);
						return;
						
					}else{
						cm.sendOk("背包空间不足！");
					}
				}
				
				
				status = -1;
			} else {

				var text = `#t${selection}# 掉落怪物如下，打算传送过去吗？\r\n`;
				var drop = getDropById(selection , dropData);

				drop.forEach(v=>{
					const mapId = v.map[Math.floor(Math.random() * v.map.length)];
					text +=`#b#L${mapId}# ${alignText(v.level,3,"left")} ${alignText(v.name,9)}  #r(消耗#t${itemWarp}#)#l\r\n`;
				})

				cm.sendSimple(text);
			}

		} else if (status === 4){

			if(!cm.getItemQuantity(itemWarp)){
				cm.sendNext(`#t${itemWarp}#不足!`);
			} else {
				cm.warp(selection);
				cm.gainItem(itemWarp , -1);
			}
			cm.dispose();
		
		} else {
			cm.dispose();
		}
	}
}

//读取某物品数量
function getItemQuantity(id) {
	var count = cm.getItemQuantity(id);
	if(isCard){
 		//月卡需要到存储仓库找
 		if(!storage){
            var data = cm.getPlayer().getData("保管物品");
            if(data){
                storage = JSON.parse(data); 
            }
        }
        if(storage){
	        storage.forEach(v=>{
	            if(v[0] == id){
	                count += v[1];
	            }
	        })
	    }
 		
    }
    return count;
}

//扣除某物品，若背包中不足，扣除仓库中的
function gainItem(id,number) {
	var count = cm.getItemQuantity(id);
	
	if(count >= Math.abs(number)){
		cm.gainItem(id,number);
	}else{

		if(isCard){

			var need = Math.abs(number) - count;

			if(count > 0)cm.gainItem(id,-count);
			
			if(need > 0)storage = gainStorageItem(id,-need);
			
		}
	}
}

/**
 * 调整指定物品的数量（支持增减，数量≤0则删除）
 * @param {Number} targetKey - 要调整的目标数字（如2430100）
 * @param {Number} change - 数量变化值（-1表示减1，1表示加1）
 * @returns {Array} 处理后的新数组（不修改原数组）
 */
function gainStorageItem(targetKey, change) {
    const sourceData = storage;
    const newData = sourceData.map(item => [...item]);
    const targetIndex = newData.findIndex(([key]) => key === targetKey);
    if (targetIndex === -1) return newData;
    const targetItem = newData[targetIndex];
    const newCount = targetItem[1] + change;
    if (newCount > 0) {
        targetItem[1] = newCount;
    } else {
        newData.splice(targetIndex, 1);
    }
    cm.getPlayer().saveData("保管物品",JSON.stringify(newData));
    return newData;
}

function fTime(value){
	let cash = value / 1000;
	if(cash > 86400) return (cash / 86400) + "天";
	return (cash / 60 / 60) + "小时";
}



function getDropById(dropDataid, dropData) {
	var item = [];
    for (const v of dropData) {
        if (v.drop.includes(dropDataid)) {
            item.push(v);
        }
    }
    return item;
}