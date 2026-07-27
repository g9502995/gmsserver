//法老宝石盒

var status;


function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode <= 0){
		im.dispose();
		
	} else {
		if (mode === 1) {
	        status++;
	    } else {
	        status--;
	    }

	    const id = im.getNpcObjectId();
	    const count = im.getItemQuantity(id);
	    const ch = im.getPlayer()
	    if(!count){
			//强开
			im.dispose();
			return;
		}

		if (status === 0) {

			if(count > 1) {
				var text = `你有${count}个，打算打开多少？\r\n\r\n#b`
				
				if(count > 1) {
					text += `#L${count}#全部打开#l\r\n`
				}

				text += `#L1#打开1个#l\r\n`;

				text += "\r\n";

				im.sendSimple(text);

			} else {
				// 使用1个
				var data = open(1);
				const v = data[0];
				if(v && v.id){
					if(im.canHold(v.id,v.count)){

						ch.gainItem(v.id,v.count);
						ch.gainItem(id,-1);
						ch.serverMessage(`打开【法老的宝石盒】获得了${v.count}个`, v.id);
						ch.dropMessage(1,`获得${v.count}个${v.name}`);

					}else {
						ch.dropMessage(1,"背包空间不足！");
					}
				} else {
					ch.dropMessage(1,"什么也没有");
				}
				im.dispose();


			}

		} else if (status === 1){
			// 使用多个
			if(selection > count){
				im.dropMessage(1,"没有那么多物品");
			} else {
				
				var itemId = [], itemCount = [];
				var text = "本次打开获得物品：\r\n\r\n";
				var data = open(selection);

				data.forEach(v=>{
					
					itemId.push(v.id)
					itemCount.push(v.count)
					text += `#i${v.id}:# #t${v.id}:# × ${v.count}\r\n\r\n`;
				})

				if(im.canHoldAll(itemId,itemCount)){

					data.forEach(v=>{
						ch.gainItem(v.id,v.count);
						ch.serverMessage(`打开${selection}个【法老的宝石盒】获得了${v.count}个`, v.id);
					})
					ch.gainItem(id,-selection);
					im.sendNext(text);

				} else {
					im.dropMessage(1,"背包空间不足！");
				}

			}
			
			im.dispose();
		}


	}
}

function open(index) {
	const item = [4008001,4008002,4008003,4008004];
	const name = ["力量宝石碎片", "敏捷宝石碎片", "智慧宝石碎片", "运气宝石碎片"];

	var data = [];
	for (var i = 0; i < index; i++) {
		const randomIndex = Math.floor(Math.random() * item.length);
		data.push({
			id : item[randomIndex], 
			name : name[randomIndex],
			count : getRandomInt(1,3)
		});
	}



	var stat = {};
    data.forEach(item => {
        // 如果该id不存在，初始化为0
        if (!stat[item.id]) {
            stat[item.id] = {
            	id : item.id,
                name: item.name,
                count: 0
            };
        }
        // 累加数量
        stat[item.id].count += item.count;
    });

	return Object.values(stat);

}


/**
 * 获取 [min, max] 之间随机整数（包含两端）
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns number
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
