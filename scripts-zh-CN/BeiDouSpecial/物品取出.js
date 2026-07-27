
var status;

var index = 4; //分类
var getItemsData = null;

function start(){
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	
    if (mode < 0) {
        cm.dispose();
    } else {
       if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if(!cm.getItemQuantity(2430161)){
            cm.sendOk("月卡特权专享功能！");
            cm.dispose();
            return;
        }

        if(status == 0){

            var text = "";
            text += "#L890##fUI/Basic.img/CheckBox/0# #k保管物品#l\t\t\t";
            text += "#L891##fUI/Basic.img/CheckBox/1# #b取出物品#l\t\t\t";
            // text += "#L892##fUI/Basic.img/CheckBox/0# #k背包整理#l";
            text += "\r\n\r\n\r\n"
            
            text += "\t"
            for(let i=0; i < 44; i++){
                text +="#fMap/MapHelper/minimap/match#";
            }

            text += "\r\n#b";
         

            text += `#L4##fUI/Basic.img/CheckBox/${setI(4)}# ${setB(4)}卷轴#l\t\t`;
            text += `#L10##fUI/Basic.img/CheckBox/${setI(10)}# ${setB(10)}卡片#l\t\t`;
            text += `#L7##fUI/Basic.img/CheckBox/${setI(7)}# ${setB(7)}矿石#l\t\t`;
            text += `#L6##fUI/Basic.img/CheckBox/${setI(6)}# ${setB(6)}材料#l\r\n`;
            text += `#L11##fUI/Basic.img/CheckBox/${setI(11)}# ${setB(11)}制造品#l\t`;
            text += `#L12##fUI/Basic.img/CheckBox/${setI(12)}# ${setB(12)}技能书#l`;

            text += "\r\n\r\n"
            
            text += "\t"
            for(let i=0; i < 44; i++){
                text +="#fMap/MapHelper/minimap/match#";
            }
            
            text += "\r\n";

            getItemsData = getItem(index);

            if(getItemsData.items.length > 0){
                for(let i=0; i < getItemsData.items.length; i++){
                    let item = getItemsData.items[i];
                    text += `#b#L${item[0]}# #i${item[0]}:# #t${item[0]}:# × ${item[1]}#l\r\n`;
                }
            }else{
                text += "\r\n\t#r选中分类没有可取出的物品！"
            }
            
            text += "　\r\n";
            cm.sendSimple(text);

            

           


        } else if (status == 1){

            if(selection > 800 && selection < 900){
                //进入菜单
                cm.dispose();
                
                if(selection === 890)cm.openNpc(9010000, "物品保管");
                if(selection === 891)cm.openNpc(9010000, "物品取出");
                if(selection === 892)cm.openNpc(9010000, "背包整理");
            
            } else if(selection < 800){
                index = selection;
                status = -1;
                action(1, 0, 1);
                return;
            
            } else {

                let give = [];
                for(let i=0; i < getItemsData.items.length; i++){
                    let item = getItemsData.items[i];
                    if(item[0] === selection){
                        if(item[1] > 9999){
                            give = Math.floor(item[1] / 9999);
                            for (var ii = 0; ii < give; ii++) {
                                if(cm.canHold(item[0] , 9999)){
                                    cm.gainItem(item[0], 9999);
                                    gainItem(item[0],-9999);
                                } else {
                                    break
                                }
                            }

                        } else {
                            if(cm.canHold(item[0] , item[1])){
                                cm.gainItem(item[0], item[1]);
                                gainItem(item[0],-item[1]);
                                
                            }
                        }
                        getItemsData = getItem(index);
                        break;
                    }
                }
                
                status = -1;
                action(1, 0, 1);

            }
			
		} else {
            cm.dispose();
        }
    }
} 

function setB(i){
    return index === i ? "#b" : "#k";
}

function setI(i){
    return index === i ? "1" : "0";
}


/**
 * 调整指定物品的数量（支持增减，数量≤0则删除）
 * @param {Number} targetKey - 要调整的目标数字（如2430100）
 * @param {Number} change - 数量变化值（-1表示减1，1表示加1）
 * @returns {Array} 处理后的新数组（不修改原数组）
 */
function gainItem(targetKey, change) {
    const sourceData = getItem().items;
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

// 读取仓库数据，结果  [ [id,数量] , [id,数量]  ]  
function getItem(index){
    var data = cm.getPlayer().getData("保管物品");
    var back = [];
    var total = 0;
    if(data){
        back = JSON.parse(data);
        total = back.length;
    }
    if(index && back.length > 0){
        back = getIndex(index,back);
    }
    return {
        total : total,
        items : back
    }
}

// 按数据获得分类 传入data  [ [id,count] ]
function getIndex(index , data){
    var array = [];
    for(let i=0; i < data.length; i++){
        let row = data[i];

        if(index == 1){ //武器
            if(row[0] >= 1300000 && row[0] <= 1709999)array.push(row);
        
        } else if(index == 2){ // 防具

            if(row[0] >= 1000000 && row[0] <= 1009999){
                array.push(row); //帽子
            } else if (row[0] >= 1100000 && row[0] <= 1109999){
                array.push(row);  //披风
            } else if (row[0] >= 1040000 && row[0] <= 1059999){
                array.push(row);  //上衣和套服
            } else if (row[0] >= 1080000 && row[0] <= 1089999){
                array.push(row); //手套
            } else if (row[0] >= 1060000 && row[0] <= 1069999){
                array.push(row); //裤子
            } else if (row[0] >= 1090000 && row[0] <= 1099999){
                array.push(row); //盾牌
            } else if (row[0] >= 1070000 && row[0] <= 1079999){
                array.push(row); //鞋子
            }
        
        } else if(index == 3){ // 饰品

            if(row[0] >= 1112000 && row[0] <= 1119999){

                array.push(row); //戒指
            } else if (row[0] >= 1030000 && row[0] <= 1039999){
                array.push(row); //耳环
            } else if(row[0] >= 1942000 && row[0] <= 1949999){
                array.push(row); //吊坠
            } else if(row[0] >= 1010000 && row[0] <= 1019999){
                array.push(row); //脸饰
            }

        } else if(index == 4){ //卷轴
            if(row[0] >= 2040000 && row[0] <= 2049999)array.push(row); 
            if(row[0] == 2340000)array.push(row); 

        } else if(index == 5){ // 椅子
            if(row[0] >= 3010000 && row[0] <= 3019999)array.push(row);
            
            
        } else if (index == 6){  //材料

            //怪物掉落的材料道具，仅日常和周历任务需求的
            if(row[0] >= 4000000 && row[0] <= 4000558)array.push(row);


            // 枫叶
            if(row[0] >= 4001126 && row[0] <= 4001126)array.push(row);

            //魔法粉
            if(row[0] >= 4007000 && row[0] <= 4007007)array.push(row);

            // 螺丝钉，羽毛等
            if(row[0] >= 4003000 && row[0] <= 4003999)array.push(row);

            //五目石
            if(row[0] >= 4030000 && row[0] <= 4030099)array.push(row);

            //棋盘
            if(row[0] >= 4080000 && row[0] <= 4080100)array.push(row);

            if([
                4001006,
                4032021,
                4032022,
                4032023,
                4032024,
                4032025].includes(row[0]))array.push(row);


        } else if (index == 7){
            //母矿和宝石
            if(row[0] >= 4004000 && row[0] <= 4005004)array.push(row);
            if(row[0] >= 4010000 && row[0] <= 4021999)array.push(row);

        } else if (index == 8){
            if(row[0] >= 4055000 && row[0] <= 4055005)array.push(row);//美发需求道具

        } else if(index == 9){ // 保护道具，死亡不扣经验等
            if(row[0] >= 4140000 && row[0] <= 4149999)array.push(row);

        } else if(index == 10){
            //怪物卡
            if(row[0] >= 2380000 && row[0] <= 2389999)array.push(row);

        } else if (index == 11){
            // 制造品，辅助剂，制作卷轴等
            if(row[0] >= 4130000 && row[0] <= 4139999)array.push(row);

        } else if (index == 12){
            //技能书
            if(row[0] >= 2290000 && row[0] <= 2299999)array.push(row);
            if(row[0] >= 2431000 && row[0] <= 2436000)array.push(row);
        } else {
            array.push(row)
        }
    }
    return array;

}


