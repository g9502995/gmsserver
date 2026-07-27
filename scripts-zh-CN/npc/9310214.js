loadScript('./common.js');
const ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');;
const ii = ItemInformationProvider.getInstance();
const attr = [

	{"name" : "福", "attr" : 1 , "desc" : "增加强化次数"},
	{"name" : "力", "attr" : [1,4], "desc" : "增加力量属性点"},
	{"name" : "敏", "attr" : [1,4], "desc" : "增加敏捷属性点"},
	{"name" : "智", "attr" : [1,4], "desc" : "增加智力属性点"},
	{"name" : "运", "attr" : [1,4], "desc" : "增加运气属性点"},
	{"name" : "血", "attr" : 50, "desc" : "增加血上限"},
	{"name" : "蓝", "attr" : 50, "desc" : "增加蓝上限"},
	{"name" : "防", "attr" : 10, "desc" : "增加物理防御力"},
	{"name" : "抗", "attr" : 10, "desc" : "增加魔法防御力"},
	{"name" : "命", "attr" : 10, "desc" : "增加命中率"},
	{"name" : "迅", "attr" : 5, "desc" : "增加移动速度和跳跃力"},
	{"name" : "攻", "attr" : 1, "desc" : "增加攻击力"},
	{"name" : "魔", "attr" : 2, "desc" : "增加魔法力"},
	{"name" : "龙", "attr" : 1, "desc" : "增加四维属性1，攻击力2，魔法力3"}
]
var item = [[4033009,1],[4033000,20]];

// 按等级配置需支付的金币
var gold = [ 
	{"lv" : 49, "money" : 1000000},
	{"lv" : 79, "money" : 2000000},
	{"lv" : 99, "money" : 3000000},
	{"lv" : 149, "money" : 4000000},
	{"lv" : 200, "money" : 5000000},
];
var money = 0;  //本装备鉴定最后需求支付金币，根据等级和gold配置改变
var equip;
var status;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.dispose();

    } else {

        if (mode === 1) {
	        status++;
	    } else {
	        status--;
	    }


	    if(status === 0){

	    	var text = "我是装备鉴定大师，我可以激发它隐藏的能力！\r\n"

	    	text += "请将需鉴定的装备#r放到装备栏第一格#k";

	    	text += "\r\n\r\n#b";

	    	text += "#L1#已放好，开始鉴定#l\r\n"
	    	text += "#L2#鉴定清除#l\r\n";
	    	text += "#L3#看看都可以鉴定出什么属性？\r\n"
	    	cm.sendSimple(text);

	    } else if (status === 1){
	    	
	    	if(selection === 1) {
	    		//鉴定

	    		equip = cm.getInventory(1).getItem(1);
	    		if(!equip){
	    			cm.sendNext("请将需鉴定的装备#r放到装备栏第一格#k");
	    			cm.dispose();
	    		} else if (ii.isCash(equip.getItemId())) {
	    			cm.sendNext(`#i${equip.getItemId()}# #t${equip.getItemId()}# 时装不能被鉴定！`);
	    			cm.dispose();
	    		} else if (equip.getOwner()){
	    			cm.sendNext(`#i${equip.getItemId()}# #t${equip.getItemId()}# 已被鉴定过了不能重复鉴定！`);
	    			cm.dispose();
	    		} else if (equip.getExpiration() !== -1){
	    			cm.sendNext(`#i${equip.getItemId()}# #t${equip.getItemId()}# 限时装备不能被鉴定`);
	    			cm.dispose();
	    		} else {
	    			const id = equip.getItemId();
	    			const level = ii.getEquipLevelReq(id);

	    			

	    			money = gold.find(item => item.lv > level).money;

					var text = "\r\n\t请你确认鉴定所需材料\r\n"
					
					text += "\r\n\t"
					for(let i=0; i < 43; i++){
						text +="#fMap/MapHelper/minimap/match#";
					}
					
					text += "\r\n";
					
					text += "\r\n\t选择装备：#r #i"+id+"# #t"+id+"# #k"

					text +="\r\n"

					text += "\t鉴定需求：\r\n\r\n";
					
					item.forEach((v,i)=>{
						const [id,count] = v;
						text += `\t\t#i${id}:# #t${id}:# ${alignText(count + "个")} （已有 ${formatUnit(cm.getItemQuantity(id))}）\r\n`;

					})

					text += `\t\t#i4031138# ${alignText(formatUnit(money),5)}（已有 ${formatUnit(cm.getMeso())}）\r\n`;
					

					text += `\r\n\r\n#L1##fUI/UIWindow.img/Quest/icon6/0# #b#e开始鉴定吧#n#l`
							
					text += "　"
					
					cm.sendSimple(text)
	    		}

	    	} else if (selection === 2){
	    		//清理鉴定
	    		equip = cm.getInventory(1).getItem(1);
	    		if(!equip){
	    			cm.sendNext("请将目标装备#r放到装备栏第一格#k");
	    			cm.dispose();
	    		} else if (ii.isCash(equip.getItemId())) {
	    			cm.sendNext(`#i${equip.getItemId()}# #t${equip.getItemId()}# 时装不能被清除鉴定！`);
	    			cm.dispose();
	    		} else if (!equip.getOwner()){
	    			cm.sendNext(`#i${equip.getItemId()}# #t${equip.getItemId()}# 没有被鉴定过不能清除鉴定！`);
	    			cm.dispose();
	    		} else {
	    			const id = equip.getItemId();
	    			const level = ii.getEquipLevelReq(id);

	    			money = gold.find(item => item.lv > level).money;
	    			money = money / 2;

					var text = "\r\n\t请你谨慎操作，清除后无法恢复之前的鉴定属性，确认清除鉴定的所需材料\r\n"
					
					text += "\r\n\t"
					for(let i=0; i < 43; i++){
						text +="#fMap/MapHelper/minimap/match#";
					}
					
					text += "\r\n";
					
					text += "\r\n\t选择装备：#r #i"+id+"# #t"+id+"# #k"

					text +="\r\n"

					text += "\t需求材料：\r\n\r\n";
					text += `\t\t1．金　币 × ${alignText(formatUnit(money),5)}（已有 ${formatUnit(cm.getMeso())}）\r\n`;

					text += `\r\n\r\n#L2##fUI/UIWindow.img/Quest/icon6/0# #b#e取消鉴定吧#n#l`
							
					text += "　"
					
					cm.sendSimple(text)
	    		}


	    	} else if (selection === 3){
	    		// 鉴定说明

	    		var text = "装备鉴定后可以随机产生属性并赋予它能力\r\n下列属性随机出现1~3条\r\n\r\n";

	    		text += "#d";

	    		attr.forEach( v=> {
	    			text += `【${v.name}】${v.desc}`;

	    			if(['力','敏','智','运'].includes(v.name)){
	    				text += `${v.attr[0]} ~ ${v.attr[1]}`;
	    			} else if (v.name !== "龙"){
						text += v.attr;
	    			}


	    			text += "\r\n";
	    		})

	    		text += ""

	    		cm.sendNext(text);
	    		status =-1;
	    	
	    	}

	    } else if (status === 2) {

	    	if( selection === 1) {

	    		var err;
	    		item.forEach(v=>{
	    			const [id, count] = v;
	    			if(count > cm.getItemQuantity(id)){
	    				err = `请你准备${count}个#i${id}:# #t${id}:#`;
	    			}
	    		})

	    		if(money > cm.getMeso()){
	    			cm.sendNext("金币不足 " + money);
	    		} else if (err){
	    			cm.sendNext(err);

	    		} else  {

		    		//开始鉴定

		    		// 随机1~3
		    		const index = getRandomInt(1,3);

		    		// 按随机条数
		    		var getData = [];
		    		for (var i = 0; i < index; i++) {
		    			const randomIndex = Math.floor(Math.random() * attr.length);
						const randomItem = attr[randomIndex];
		    			getData.push(randomItem);
		    		}


		    		// 抽奖最终结果
		    		var setData = [];
		    		getData.forEach(v => {
		    			if(['力','敏','智','运'].includes(v.name)){
	    					setData.push({
	    						attr : getRandomInt(v.attr[0] , v.attr[1]),
	    						name : v.name
	    					})
		    				
		    			} else {
		    				setData.push({
	    						attr : 1,
	    						name : v.name
	    					})
		    			}
		    		})

		    		var text = `\r\n恭喜，本次鉴定出以下${index}个词条\r\n\r\n累计结果为：`;
		    		

		    		var name = '';
		    		text += "#r#e"
		    		setData.forEach( v=> {
		    			name += `${v.attr}${v.name}`;

	    				if(v.name === '力'){
	    					equip.setStr(equip.getStr() * 1 + v.attr);
	    				} else if(v.name === '敏'){
	    					equip.setDex(equip.getDex() * 1 + v.attr);
	    				} else if(v.name === '智'){
	    					equip.setInt(equip.getInt() * 1 + v.attr);
	    				} else if(v.name === '运'){
	    					equip.setLuk(equip.getLuk() * 1 + v.attr);
	    				} else if(v.name === '龙'){
	    					equip.setStr(equip.getStr() * 1 + 1);
	    					equip.setDex(equip.getDex() * 1 + 1);
	    					equip.setInt(equip.getInt() * 1 + 1);
	    					equip.setLuk(equip.getLuk() * 1 + 1);
	    					equip.setWatk(equip.getWatk() * 1 + 2);
	    					equip.setMatk(equip.getMatk() * 1 + 3);
	    				} else if (v.name === '血'){
	    					equip.setHp(equip.getHp() * 1 + 50);
	    				} else if (v.name === '蓝'){
	    					equip.setMp(equip.getMp() * 1 + 50);
	    				} else if (v.name === '防'){
	    					equip.setWdef(equip.getWdef() * 1 + 10);
	    				} else if (v.name === '抗'){
	    					equip.setMdef(equip.getMdef() * 1 + 10);
	    				} else if (v.name === '命'){
	    					equip.setAcc(equip.getAcc() * 1 + 10);
	    				} else if (v.name === '迅'){
	    					equip.setSpeed(equip.getSpeed() * 1 + 5);
	    					equip.setJump(equip.getJump() * 1 + 5);
	    				} else if (v.name === '攻'){
	    					equip.setWatk(equip.getWatk() * 1 + 1);
	    				} else if (v.name === '魔'){
	    					equip.setMatk(equip.getMatk() * 1 + 2);
	    				} else if (v.name === '福'){
	    					equip.setUpgradeSlots(equip.getUpgradeSlots() * 1 + 1);
	    				}

		    		})

		    		equip.setOwner(name);

		    		var copy = equip.copy();
		    		text += name;

		    		
		    		cm.removeAllByInventorySlot(1,1);
					cm.gainEquip(copy);

					cm.getPlayer().serverMessage(`鉴定成功，获得【${name}】` , copy);
					cm.getPlayer().gainMeso(-money);

					item.forEach(v=>{
						const [id,count] = v;
						cm.getPlayer().gainItem(id,-count);
					}) 
					

					cm.sendNext(text)

				} 

	    		
	    		status = -1;
	    	} else if (selection === 2){
	    		if(money > cm.getMeso()){
	    			cm.sendNext("金币不足 " + money);
	    		} else {
	    			const name = equip.getOwner();
	    			const getData = getName(name);
	    			var setData = [];
	    			getData.forEach(v => {
	    				const data = getName(v);
	    				setData.push({
	    					name : v[1],
	    					attr : v[0] * 1
	    				})
	    			})

		    		setData.forEach( v=> {
		    			
	    				if(v.name === '力'){
	    					equip.setStr(equip.getStr() * 1 - v.attr);
	    				} else if(v.name === '敏'){
	    					equip.setDex(equip.getDex() * 1 - v.attr);
	    				} else if(v.name === '智'){
	    					equip.setInt(equip.getInt() * 1 - v.attr);
	    				} else if(v.name === '运'){
	    					equip.setLuk(equip.getLuk() * 1 - v.attr);
	    				} else if(v.name === '龙'){
	    					equip.setStr(equip.getStr() * 1 - 1);
	    					equip.setDex(equip.getDex() * 1 - 1);
	    					equip.setInt(equip.getInt() * 1 - 1);
	    					equip.setLuk(equip.getLuk() * 1 - 1);
	    					equip.setWatk(equip.getWatk() * 1 - 2);
	    					equip.setMatk(equip.getMatk() * 1 - 3);
	    				} else if (v.name === '血'){
	    					equip.setHp(equip.getHp() * 1 - 50);
	    				} else if (v.name === '蓝'){
	    					equip.setMp(equip.getMp() * 1 - 50);
	    				} else if (v.name === '防'){
	    					equip.setWdef(equip.getWdef() * 1 - 10);
	    				} else if (v.name === '抗'){
	    					equip.setMdef(equip.getMdef() * 1 - 10);
	    				} else if (v.name === '命'){
	    					equip.setAcc(equip.getAcc() * 1 - 10);
	    				} else if (v.name === '迅'){
	    					equip.setSpeed(equip.getSpeed() * 1 - 5);
	    					equip.setJump(equip.getJump() * 1 - 5);
	    				} else if (v.name === '攻'){
	    					equip.setWatk(equip.getWatk() * 1 - 1);
	    				} else if (v.name === '魔'){
	    					equip.setMatk(equip.getMatk() * 1 - 2);
	    				} else if (v.name === '福'){
	    					equip.setUpgradeSlots(equip.getUpgradeSlots() * 1 - 1);
	    				}

		    		})

		    		equip.setOwner("");

		    		var copy = equip.copy();

		    		cm.removeAllByInventorySlot(1,1);
					cm.gainEquip(copy);

					cm.getPlayer().gainMeso(-money);


		    		cm.sendNext("清除成功")
	    			

	    			status = -1;


	    		}
	    	}


	    } else if (status === 3){

	    	if(selection === 2 ){
	    		status = 0;
	    		action(1,0,1)
	    	} else {
	    		cm.dispose();
	    	}

	    } else {
	    	cm.dispose();
	    }
    }
}


