
var status;

var index = 4; //分类
var getItemsData = null;
const maxBox = 52;
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

        
        const orderBox = cm.getPlayer().getSlots(4);
        const consumeBox = cm.getPlayer().getSlots(2);
        

        if(status == 0){

            if(orderBox < maxBox){
                cm.sendNext(`其他栏背包上限至少为 #b${maxBox}格#k，你当前上限为 #r${orderBox}格#k，请到商城左下角增加其他栏背包上限！`);
        
            } else if(consumeBox < maxBox){
                cm.sendNext(`其他栏背包上限至少为 #b${maxBox}格#k，你当前上限为 #r${consumeBox}格#k，请到商城左下角增加其他栏背包上限！`);
          
            } else if (!cm.getItemQuantity(2430161)){
                cm.sendNext("月卡特权专享功能！");
             
            } else {

                var text = "";
                text += "#L890##fUI/Basic.img/CheckBox/1# #b保管物品#l\t\t\t";
                text += "#L891##fUI/Basic.img/CheckBox/0# #k取出物品#l\t\t\t";
                // text += "#L892##fUI/Basic.img/CheckBox/0# #k背包整理#l";
                text += "\r\n\r\n\r\n"
                
                text += "\t"
                for(let i=0; i < 44; i++){
                    text +="#fMap/MapHelper/minimap/match#";
                }

                text += "\r\n\r\n#b"
             

                text += "#L904#保管卷轴#l\t\t";
                text += "#L910#保管卡片#l\t\t";
                text += "#L907#保管宝石#l\t";
                text += "#L906#保管材料#l\r\n";
                text += "#L911#保管制造品#l\t";
                text += "#L912#保管技能书#l\r\n\r\n\r\n";

                text += "#L3##r保管以上所有#l\r\n";


                text += "　\r\n"

                cm.sendSimple(text);
            }
            

           

        } else if (status == 1) {

            if(selection  === -1){
                
                cm.dispose();
                cm.openNpc(9900001,"9900001")

            } else if(selection > 800 && selection < 900){
                //进入菜单
                cm.dispose();
                
                if(selection === 890)cm.openNpc(9010000, "物品保管");
                if(selection === 891)cm.openNpc(9010000, "物品取出");
                if(selection === 892){
                    cm.getPlayer().sortAllInventory();
                    // cm.openNpc(9010000, "背包整理");
                    cm.sendOk("整理完成！");
                }
            
            }else if(selection > 900 && selection < 990){

                var text = "\r\n";

                var add = [];
                var type = 1;
                if([904,910,912].includes(selection))type = 2;
                if(selection == 905)type = 3;
                if([906,907,911].includes(selection))type = 4;

                let item = cm.getInventory(type);

                for(let i=1; i <= 96; i++){
                    let v = item.getItem(i);
                    if(v && v.getItemId() && v.getExpiration() < 0){
                        add.push([ v.getItemId() , v.getQuantity()  ]);
                    }
                }

                var text ="";
                if(add.length > 0){
                    add = getIndex(selection - 900,add);
                    add.forEach(v => {
                        text += `#i${v[0]}#`;
                        cm.gainItem(v[0],-v[1]);
                        cm.getPlayer().saveLog("物品保管",v[0],-v[1]);
                    })
                    saveItem(add);
                }

                if(text){
                    cm.getPlayer().sortAllInventory();
                    cm.sendNext("保管成功！\r\n\r\n" + text);
                }else{
                    cm.sendNext("你背包没有什么可保管的！");
                }
                
                status = -1;

            }else if (selection == 3){

                //一键保管卷轴材料宝石制造品技能
                var add = [];

                var item = cm.getInventory(2);
                for(let i=1; i <= 96; i++){
                    let v = item.getItem(i);
                    if(v && v.getItemId() && v.getExpiration() < 0){
                        add.push([ v.getItemId() , v.getQuantity()  ]);
                    }
                }

                item = cm.getInventory(4);
                for(let i=1; i <= 96; i++){
                    let v = item.getItem(i);
                    if(v && v.getItemId() && v.getExpiration() < 0){
                        add.push([ v.getItemId() , v.getQuantity()  ]);
                    }
                }

                var text = ""
                if(add.length > 0){
                    var addIndex = [4,10,7,6,11,12];
                    for (var i = 0; i < addIndex.length; i++) {
                        saveAdd = getIndex(addIndex[i],add);
                        saveAdd.forEach(v => {
                            text += `#i${v[0]}#`;
                            cm.gainItem(v[0],-v[1] , true,false);
                            cm.getPlayer().saveLog("物品保管",v[0],-v[1]);
                        })
                        saveItem(saveAdd);
                    } 
                }
                if(text){

                    cm.getPlayer().sortAllInventory();
                    cm.sendNext("保管成功！\r\n\r\n" + text);
                }else{
                    cm.sendNext("你背包没有什么可保管的！");
                }

                status = -1;


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
 * 保存物品到仓库
 * @Desc   无
 * @Author Ming
 * @Date   2026-01-03
 * @param  {[type]}   [[id,count] , [id,count] , [id,count]]
 * @return {[type]}
 */
function saveItem(addData) {

  var baseData = getItem().items;
  const dataMap = new Map();
  baseData.forEach(([key, count]) => {
    dataMap.set(key, count);
  });

  addData.forEach(([key, count]) => {
    // 如果已存在则计数+1，不存在则设为1
    dataMap.set(key, (dataMap.get(key) || 0) + count);
  });

  const result = [];
  dataMap.forEach((count, key) => {
    result.push([key, count]);
  });

  cm.getPlayer().saveData("保管物品",JSON.stringify(result))
  return result;

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
            if( row[0] >= 4000000 && row[0] <= 4000558)array.push(row);

            // 枫叶
            if(row[0] >= 4001126 && row[0] <= 4001126)array.push(row);

            //魔法粉
            // if(row[0] >= 4007000 && row[0] <= 4007007)array.push(row);

            // 螺丝钉，羽毛等
            if(row[0] >= 4003000 && row[0] <= 4003999)array.push(row);

            //五目石
            if(row[0] >= 4030000 && row[0] <= 4030099)array.push(row);

            //棋盘
            // if(row[0] >= 4080000 && row[0] <= 4080100)array.push(row);

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


