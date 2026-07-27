loadScript('./common.js');
var items = [
	{ id : 2043003 , name : "单手剑攻击必成卷", item : [ [2043002,10],[2340000,10] ]},
	{ id : 2043103 , name : "单手斧攻击必成卷", item : [ [2043102,10],[2340000,10] ]},
	{ id : 2043203 , name : "单手钝器攻击必成卷", item : [ [2043202,10],[2340000,10] ]},
	{ id : 2043303 , name : "短剑攻击必成卷", item : [ [2043302,10],[2340000,10] ]},
	{ id : 2044003 , name : "双手剑攻击必成卷", item : [ [2044002,10],[2340000,10] ]},
	{ id : 2044103 , name : "双手斧攻击必成卷", item : [ [2044102,10],[2340000,10] ]},
	{ id : 2044203 , name : "双手钝器攻击卷轴", item : [ [2044202,10],[2340000,10] ]},
	{ id : 2044303 , name : "枪攻击必成卷", item : [ [2044302,10],[2340000,10] ]},
	{ id : 2044403 , name : "矛攻击必成卷", item : [ [2044402,10],[2340000,10] ]},

	{ id : 2043703 , name : "短杖魔力必成卷", item : [ [2043702,10],[2340000,10] ]},
	{ id : 2043803 , name : "长杖魔力必成卷", item : [ [2043802,10],[2340000,10] ]},
	
	{ id : 2044503 , name : "弓攻击必成卷", item : [ [2044502,10],[2340000,10] ]},
	{ id : 2044603 , name : "弩攻击必成卷", item : [ [2044602,10],[2340000,10] ]},

	{ id : 2044703 , name : "拳套攻击必成卷", item : [ [2044702,10],[2340000,10] ]},
	
	{ id : 2044818 , name : "拳甲攻击必成卷", item : [ [2044802,10],[2340000,10] ]},
	{ id : 2044918 , name : "短枪攻击必成卷", item : [ [2044902,10],[2340000,10] ]},
];

var money = 500000;   //制作金币
var make = null

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

		const ch = cm.getPlayer();


		if (status === 0) {

			var text = "\r\n请选择要制作的卷轴！\r\n";

			text += "\r\n#b"
			
			items.forEach(v=>{
				text += `#L${v.id}##i${v.id}:# #t${v.id}:##l\r\n`;
			})

			cm.sendSimple(text);
			
			
	    } else if (status === 1 ) {


	    	items.forEach(v => {
	    		if(v.id === selection){
	    			make = v;
	    		}
	    	})

	    	if(make && make.id){

	    		var text = `制作 #i${make.id}# #r#t${make.id}#（已有 ${cm.getItemQuantity(make.id)}）#k 需要你提供：\r\n\r\n\r\n`;

	    		make.item.forEach( v => {
	    			const [id,count] = v;
	    			text += `\t #t${id}:# ×${alignText(count,3)} #r（已有 ${formatUnit(cm.getItemQuantity(id))}）#k\r\n`;
	    		})

	    		text += `\t 金\t币 x ${formatUnit(money,2)} #r（已有 ${formatUnit(cm.getMeso())}）#k \r\n`

	    		text += "\r\n#b"
	    		text += "#L1#制作1个#l\r\n"
	    		text += "#L5#制作5个#l\r\n"
	    		text += "#L999#返回#l\r\n";

	    		cm.sendSimple(text);

	    	} else {
	    		cm.sendNext("读取数据错误，请重试或联系管理员！");
	    		cm.dispose();
	    	}


	    } else if (status === 2){

	    	if(selection === 1){

	    		var meso = money * selection;

	    		if(money > 0 && meso > cm.getMeso()){
	    			cm.sendNext("金币不足！");
	    			cm.dispose();
	    		} else if (!cm.canHold(make.id , selection)){
	    			cm.sendNext("背包空间不足！");
	    			cm.dispose();
	    		} else {
	    			var err;
	    			make.item.forEach(v=>{
	    				const [id , count] = v;
	    				const total = count * selection;

	    				if(!err && total > cm.getItemQuantity(id)){
	    					err = `#i${id}:# #t${id}:# 需求数量不足！`;
	    				}
	    			})

	    			if(err){
	    				cm.sendNext(err);
	    				cm.dispose();
	    			} else {

	    				make.item.forEach(v=>{
	    					const [id , count] = v;
	    					const total = count * selection;
	    					cm.gainItem(id , -total);
	    				})
	    				cm.gainItem(make.id , selection);
	    				cm.gainMeso(-meso);
	    				cm.sendNext("制作成功！");
	    				cm.getPlayer().serverMessage(`成功制作${selection}个` , make.id);
	    				status = -1;

	    			}


	    		}

	    	} else {
	    		cm.dispose();
	    		cm.openNpc(9010000,"道具制作");

	    	}


			
		} else {
			cm.dispose();
		}
	}	
}


