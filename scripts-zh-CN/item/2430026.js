
//新手武器礼包

var status = -1;

let id = 2430026;

//1战士  2法师 3弓箭手  4飞侠 5海盗
let data = [
	{id : 1302133, job : 1},
	{id : 1332099, job : 4},
	{id : 1372058, job : 2},
	{id : 1382080, job : 2},
	{id : 1402072, job : 1},
	{id : 1412046, job : 1},
	{id : 1432061, job : 1},
	{id : 1442103, job : 1},
	{id : 1452085, job : 3},
	{id : 1462075, job : 3},
	{id : 1472100, job : 4},
	{id : 1482046, job : 5},
	{id : 1492048, job : 5},
];

let newData = [];

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
	
	let job = parseInt(im.getJobId() / 100);
	
	newData = getData(job);
	
	if(job === 0){
		im.sendOk("请转职后再打开！");
		im.dispose();
		return false;
	}

	if (status === 0) {
		let text = `冒险者：选一件适合你的武器，祝你一臂之力！\r\n\r\n`;
		for (let i = 0; i < newData.length; i++) {
			let v = newData[i];
			text += `#L${i}# #i${v}:# #r『#t${v}:#』#l\r\n`;
		}
		im.sendSimple(text);
	} else if (status === 1) {
		
		let item = newData[selection];
	
	
		if(!item || !im.canHold(item) ){
			im.sendOk(`背包空间不足`);
			
		}else{
			im.gainItem(item, 1,false,true,false);
			im.gainItem(id, -1);
			im.getPlayer().saveLog("打开礼包",id,item,1);
			im.getPlayer().saveLog("打开礼包",id,-1);
			im.getPlayer().serverMessage("打开了新人礼包获得",item);
			
		}
		
		im.dispose();
	
	} else {
		im.dispose();
	}
	
}


function getData(job){
	let array = [];
	for (var i = 0; i < data.length; i++) {
		if(job === data[i].job){
			array.push(data[i].id);
		}
	}
	return array;
}


