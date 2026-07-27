var status = 0;
var ItemInformationProvider = Java.type('org.gms.server.ItemInformationProvider');
var ii = ItemInformationProvider.getInstance()
var add;
var item;
var total = 0;
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode < 0) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}

		if (status == 0) {
			
			var text = ""
			text += "#L990##fUI/Basic.img/CheckBox/0# #k兑换商城#l\t\t\t" 
			text += "#L991##fUI/Basic.img/CheckBox/0# #k杂货商店#l\t\t\t" 
			text += "#L992##fUI/Basic.img/CheckBox/1# #b快速出售#l\r\n"
			text += "#L993##fUI/Basic.img/CheckBox/0# #k双倍购买#l\t\t\t" 
			text += "\r\n\r\n\r\n"
			
			text += "\t"
			for(let i=0; i < 44; i++){
				text +="#fMap/MapHelper/minimap/match#";
			}
			
			text += "\r\n\r\n\t#k你要出售背包中的什么物品？\r\n#b";
			
			text += "#L11#快速出售制造品#l\r\n";
			text += "#L6#快速出售材料物品#l\r\n";
			text += "#L2#快速出售装备#l\r\n";
			text += "#L12#快速出售弹药飞镖#l\r\n";

			
			text += "\r\n"
			
			text += "　\r\n"
			
			cm.sendSimple(text);
			
		
		} else if (status == 1){

			if(selection > 900){
				//进入菜单
				cm.dispose();
				
				if(selection === 990)cm.openNpc(9010000, "兑换商城");
				if(selection === 991)cm.openShopNPC(1011100);
				if(selection === 992)cm.openNpc(9010000, "快速出售");
				if(selection === 993)cm.openNpc(9010000, "双倍购买");
				
			}else{
				var text = "请谨慎操作，出售后无法找回，即将准备出售以下物资！\r\n\r\n";
				total = 0;
				add = [];
				var box = 4;
				if(selection == 12)box = 2;
				if(selection < 4) box = 1;
				item = cm.getInventory(box);
				for (var i = 1; i <= 96; i++) {
					let v = item.getItem(i);
					if( v && v.getItemId()){
						const price =  ii.getWholePrice(v.getItemId());
						var isAdd = 1;
						if(v.getExpiration() > 0) isAdd = 0;
						if(price < 2) isAdd = 0;
						if(box ==  1){
							if(v.getLevel() > 0) isAdd = 0;
							if(v.getOwner()) isAdd = 0;
							if(v.getItemLevel() > 1) isAdd = 0;
							if(v.getItemExp() > 0) isAdd = 0;
							if(v.getCustomUpgradeCount() > 0) isAdd = 0;
						}

						if(isAdd){

							var isOk = isOkType(selection,v.getItemId())
							if(selection === 2 && !isOk){
								isOk = isOkType(1,v.getItemId())

								if(!isOk){
									isOk = isOkType(3,v.getItemId())
								}
							}
							if( isOk ){
								let obj = {
									index : i , 
									item : v,
									id : v.getItemId(),
									count : v.getQuantity(),
									price : price,
								};
								obj.money = obj.count * obj.price;
								total = total + obj.money;
								add.push(obj);
								text += `#i${obj.id}#`
							}


							
		                }
					}
					
				}
				if(total > 0){
					text += "\r\n\r\n预计获得金币：" + total;
				}else{
					text ="没有可出售的物品\r\n";
				}

				text += "\r\n\r\n#b"
				text += "#L1#好的，帮我出售吧#l\r\n"
				text += "#L2#开启自动出售#l\r\n";
				cm.sendSimple(text);
			}

		} else if (status == 2){

			if(selection === 1){

				if(total > 0){
					for (var i = 0; i < add.length; i++) {
						let v = add[i];
		            	if(v.price > 1){
		            		cm.gainItem(v.id , -v.count);
		            		cm.getPlayer().saveLog("快速出售",v.id,-v.count);
		            	}
					}

					cm.gainMeso(total);
					cm.getPlayer().saveLog("快捷出售",0, total);
					cm.getPlayer().serverMessage("快捷出售获得" + formatUnit(total,0) + "金币");
				}

				cm.sendOk("出售成功");
				cm.dispose();
			} else {
				const autoId = 3996010;
				if(!cm.getItemQuantity(2430161)){
					cm.sendNext("月卡特权用户可开启！");
				} else if(cm.haveItem(autoId)){
					cm.sendNext("OK，接下来当你装备栏不足5时系统为你自动装备栏物品")
				} else if(cm.canHold(autoId)){
					cm.gainItem(autoId,1,false,false,7 * (24 * 60 * 60 * 1000));
					cm.getPlayer().serverMessage('获得',autoId,'开启了自动出售装备功能！');
					cm.sendNext("OK，接下来当你装备栏不足5时系统为你自动装备栏物品");
					
				} else {
					cm.sendNext("背包空间不足！");
				}
				cm.dispose();
			}




		} else {
			cm.dispose();
		}
	}
}






function isOkType(index,id){

    if(index == 1){ //武器
        if(id >= 1300000 && id <= 1709999)return true;
    
    } else if(index == 2){ // 防具

        if(id >= 1000000 && id <= 1009999){
            return true; //帽子
        } else if (id >= 1100000 && id <= 1109999){
            return true;  //披风
        } else if (id >= 1040000 && id <= 1059999){
            return true;  //上衣和套服
        } else if (id >= 1080000 && id <= 1089999){
            return true; //手套
        } else if (id >= 1060000 && id <= 1069999){
            return true; //裤子
        } else if (id >= 1090000 && id <= 1099999){
            return true; //盾牌
        } else if (id >= 1070000 && id <= 1079999){
            return true; //鞋子
        }
    
    } else if(index == 3){ // 饰品

        if(id >= 1112000 && id <= 1119999){

            return true; //戒指
        } else if (id >= 1030000 && id <= 1039999){
            return true; //耳环
        } else if(id >= 1942000 && id <= 1949999){
            return true; //吊坠
        } else if(id >= 1010000 && id <= 1019999){
            return true; //脸饰
        }

    } else if(index == 4){ //卷轴
        if(id >= 2040000 && id <= 2049999)return true; 


    } else if(index == 5){ // 椅子
        if(id >= 3010000 && id <= 3019999)return true;
        
        
    } else if (index == 6){  //材料

        //怪物掉落的材料道具，仅日常和周历任务需求的
        if( id >= 4000000 && id <= 4000558)return true;

        //魔法粉
        // if(id >= 4007000 && id <= 4007007)return true;

        //任务材料
        // if(id >= 4030000 && id <= 4039999)return true;

        //棋盘
        // if(id >= 4080000 && id <= 4080100)return true;


    } else if (index == 7){
        //母矿和宝石
        if(id >= 4004000 && id <= 4005004)return true;
        if(id >= 4010000 && id <= 4021999)return true;

    } else if (index == 8){
        if(id >= 4055000 && id <= 4055005)return true;//美发需求道具

    } else if(index == 9){ // 保护道具，死亡不扣经验等
        if(id >= 4140000 && id <= 4149999)return true;

    } else if(index == 10){
        //怪物卡
        if(id >= 2380000 && id <= 2389999)return true;

    } else if (index == 11){
        // 制造品，辅助剂，制作卷轴等
        if(id >= 4130000 && id <= 4139999)return true;
    } else if (index == 12){
    	// 飞镖
    	if(id >= 2070000 && id <= 2070999)return true;

    	// 子弹
    	if(id >= 2330000 && id <= 2339999)return true;
    }


    return false;
  

}


/**
 * 格式化数字，超过万/亿时显示对应单位
 * @param {number|string} num - 要格式化的数字（支持数字或数字字符串）
 * @param {number} decimalDigits - 保留的小数位数，默认2位
 * @returns {string} 格式化后的字符串
 */
function formatUnit(num, decimalDigits = 2) {
    // 1. 转换为数字并校验合法性
    const number = Number(num);
    if (isNaN(number)) {
        return '0'; // 非数字返回0
    }

    // 定义单位对应的阈值和除数
    const units = [
        { threshold: 1e8, divisor: 1e8, unit: '亿' }, // 1亿 = 100000000
        { threshold: 1e4, divisor: 1e4, unit: '万' }, // 1万 = 10000
    ];

    // 2. 遍历单位，判断数字所属区间
    for (const item of units) {
        if (Math.abs(number) >= item.threshold) {
            // 计算转换后的值并保留指定小数位
            const converted = Math.floor(number / item.divisor).toFixed(decimalDigits);
            // 去除末尾的0和多余的小数点（例如1.00万 → 1万，1.20亿 → 1.2亿）
            const formatted = converted.toString();
            return formatted + item.unit;
        }
    }

    // 3. 小于万的数字，直接返回（也可根据需求保留小数位）
    return number.toString();
}