
//新手卷轴礼包

var status = -1;

let id = 2430027;

//1战士  2法师 3弓箭手  4飞侠 5海盗
let data = [
	{id : 2043001, count : 10, expires : 1, job : 1},
	{id : 2043201, count : 10, expires : 1, job : 1},
	{id : 2043301, count : 10, expires : 1, job : 4},
	{id : 2043701, count : 10, expires : 1, job : 2},
	{id : 2043801, count : 10, expires : 1, job : 2},
	{id : 2044001, count : 10, expires : 1, job : 1},
	{id : 2044101, count : 10, expires : 1, job : 1},
	{id : 2044201, count : 10, expires : 1, job : 1},
	{id : 2044301, count : 10, expires : 1, job : 1},
	{id : 2044401, count : 10, expires : 1, job : 1},
	{id : 2044501, count : 10, expires : 1, job : 3},
	{id : 2044601, count : 10, expires : 1, job : 3},
	{id : 2044701, count : 10, expires : 1, job : 4},
	{id : 2044801, count : 10, expires : 1, job : 5},
	{id : 2044901, count : 10, expires : 1, job : 5}
];

let newData = [];

function start() 
{
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
		let text = `尊敬的冒险者：请选一项适合你的卷轴，祝你一臂之力！\r\n\r\n#b`;
		for (let i = 0; i < newData.length; i++) {
			let v = newData[i];
			text += `#L${i}# #i${v.id}:# #t${v.id}:# × ${v.count}#l\r\n`;
		}
		text += "　\r\n"
		im.sendSimple(text);
	} else if (status === 1) {
		
		let item = newData[selection];
	
		if(!item || !item.id || !im.canHold(item.id,item.count) ){
			im.sendOk(`背包空间可能不足`);
			
		}else{
			im.gainItem(item.id, item.count,false,true);
			im.getPlayer().saveLog("打开礼包",id,item.id,item.count);
			im.gainItem(id, -1);
			im.getPlayer().saveLog("打开礼包",id,-1);
			im.getPlayer().serverMessage("打开了新人礼包获得",item.id);
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
			array.push(data[i]);
		}
	}
	return array;
}



