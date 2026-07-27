
var status;


/**
 * [config description]
 * @type {
 *       currency : 0：金币; 1：点券; 2：抵用券; 4、信用点;    	
 * }
 */
var config = [
	{ 
		item : 5211048,  
		count : 1, 
		max : 30, 
		card : 20, 
		price : 300, 
		currency : "抵用券",
		expire : 60 * 60 * 1000, 
	},
	{ 
		item : 5360042, 
		count : 1, 
		max : 5, 
		card : 2, 
		price : 1500, 
		currency : "抵用券",
		expire : 60 * 60 * 1000, 
	},
	{ 
		item : 5360042, 
		count : 1, 
		max : 5, 
		card : 2, 
		price : 500, 
		currency : "点券",
		expire : 60 * 60 * 1000, 
	},
	{ 
		item : 5360042, 
		name: "双倍爆率卡1小时", 
		count : 1, 
		max : 5, 
		card : 2, 
		price : 1500, 
		currency : "点券",
		expire : 60 * 60 * 1000, 
	},

];

var cfg;
var index;

function start() {
	getMaxCfg(config);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

	if(mode <= 0){
		cm.dispose()
	} else {
		if (mode === 1) {
	        status++;
	    } else {
	        status--;
	    }

	    const ch = cm.getPlayer();
		
	    if (status === 0) {

	    	var text = ""
				text += "#L990##fUI/Basic.img/CheckBox/0# #k兑换商城#l\t\t\t" 
				text += "#L991##fUI/Basic.img/CheckBox/0# #k杂货商店#l\t\t\t" 
				text += "#L992##fUI/Basic.img/CheckBox/0# #k快速出售#l\r\n"
				text += "#L993##fUI/Basic.img/CheckBox/1# #b双倍购买#l\t\t\t" 
				text += "\r\n\r\n"
				
				text += "\t"
				for(let i=0; i < 44; i++){
					text +="#fMap/MapHelper/minimap/match#";
				}
				
				text += "\r\n";

				text += `\r\n\t#k点\t券 ：#r${ch.getCash(1)}#k\r\n\t抵用券 ：#r${ch.getCash(2)}#k\r\n\r\n`;
				text += `\t购买项目：\r\n#b`;

				for (let i = 0; i < config.length; i++) {
					let v = config[i];
					text += `\t#L${i}# ${v.price}${v.currency} #t${v.item}:#（${fTime(v.expire)}）已购：#r${cm.getPlayer().getUserWeekData(`每周限购项目${i}已购次数`) * 1} / #b${v.max}#l\r\n`;
				}
				text += "\r\n\r\n\t#k购买说明：\r\n" 
				text += "\t\t◇ 效果限时过期自动取消\r\n"
				text += "\t\t◇ 因操作不当删除效果不可补发\r\n" 
				text += "\t\t◇ 月卡特权可增加购买次数上限#k\r\n"
				text += "\t\t◇ #r周一重置限购次数#k\r\n"


	        cm.sendSimple(text);

	    } else if (status === 1) {

	    	if(selection > 900){
				//进入菜单
				cm.dispose();
				
				if(selection === 990)cm.openNpc(9010000, "兑换商城");
				if(selection === 991)cm.openShopNPC(1011100);
				if(selection === 992)cm.openNpc(9010000, "快速出售");
				if(selection === 993)cm.openNpc(9010000, "双倍购买");
				
			}else{

				index = selection;
	    
		        cfg = config[index];

		        var text = `\r\n\t你打算购买几小时 #i${cfg.item}:# #r#t${cfg.item}:#\r\n\r\n`;

		        text += "#b"

		        for (var i = 1; i < 5; i++) {
		        	text += `#L${i}# 我想购买 ${i}小时#l\r\n`;
		        	if(i === 1){
		        		text += "\r\n"
		        	}
		        }

		        text += "#L99# 返回#l\r\n"

		        text += "　\r\n"

		        cm.sendSimple(text);
			
				
			}

		} else if (status === 2){

			if(selection === 99){
				status = -1;
				action(1,0,0)
				return;
			}


			let buy = ch.getUserWeekData(`每周限购项目${index}已购次数`) * 1;

			if(cfg.max && (buy + selection) >= cfg.max){
				cm.sendOk(`本周购买次数不足`);
			}else if(cfg.currency === '抵用券' && cfg.price * selection > ch.getCash(2)){
				cm.sendOk("抵用券不足");
			}else if(cfg.currency === '点券' && cfg.price * selection > ch.getCash(1)){
				cm.sendOk("点券不足");	
			}else if(cm.getItemQuantity(cfg.item) > 0){
				cm.sendOk("已存在双倍效果，请过期后再来")
			}else if(!cm.canHold(cfg.item,cfg.count)){
				cm.sendOk(`背包空间不足`);	
			}else{
			
				// 扣除货币
				if(cfg.currency === '抵用券'){
					ch.gainCash(-cfg.price * selection,true);
					ch.saveLog("双倍购买",2,-cfg.price * selection);
				}

				if(cfg.currency === '点券'){
					ch.gainCash(-cfg.price * selection);
					ch.saveLog("双倍购买",1,-cfg.price * selection);
				}

				if(cfg.currency === '金币'){
					cm.gainMeso(-cfg.price * selection);
					ch.saveLog("双倍购买",0,-cfg.price * selection);
				}

				cm.gainItem(cfg.item, cfg.count,false,true,selection * cfg.expire || -1);
				ch.saveLog("双倍购买",cfg.item,cfg.count);
			
				ch.serverMessage(`购买了${fTime(selection * cfg.expire)}`,cfg.item);

				ch.saveDayData("今日购买双倍" , selection, true);
				
				ch.saveUserWeekData(`每周限购项目${index}已购次数`,selection, true);
				

			}

			cm.dispose();
	    
	    } else {
	        cm.dispose();
	    }
	}

    
}


//根据VIP项目获得限购次数是否有增加
function getMaxCfg(config) {
	let isCard = cm.getPlayer().haveItem(2430161);
	config.forEach(item => {
		if(item.card > 0 && isCard){
			item.max += item.card;
		}
	})
}


function fTime(value){
	let cash = value / 1000;
	if(cash > 86400) return (cash / 86400) + "天";
	return (cash / 60 / 60) + "小时";
}