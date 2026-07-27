

var cfg = [
	{
		id : 4000606, 
		item : [
			[4001159,2], 
			[4001160,2],
		],
		day : 1
	},
	{
		id : 2430111,
		item : [
			[4001159,2],
			[4001160,2],
			[4000602,1],
		],
		day : 1,
	}

];
var status;

function start() {
	status = -1;
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


		if (status == 0) {

			var text = "请问你要参与哪个任务？\r\n";

            
			text += "\r\n#b";
			text += "#L1#我想带队拯救朱丽叶#l\r\n";
			text += "#L2#我想带队拯救罗密欧#l\r\n";
			text += "#L3#我有珍藏的珠子#l\r\n"
            

			cm.sendSimple(text);

		} else if (status == 1) {

			if(selection === 3){

				var text = "你可以拿我珍藏的珠子找我兑换物品！\r\n\r\n";

				text +="#b"

				cfg.forEach(v=>{
					let give = cm.getPlayer().getDayData("罗密欧与朱丽叶兑换" + v.id) * 1
					text += `#L${v.id}#我想换#i${v.id}:# #t${v.id}:#（${give} / ${v.day}）#l\r\n`;
				})

				text += "\r\n　\r\n"

				cm.sendSimple(text);

			} else {
				cm.dispose()
	            if(selection === 1){
	                cm.openNpc(2112004);
	                
	            } else if(selection === 2){
	                cm.openNpc(2112003);
	            }
			}

		} else if (status === 2){

			var text = `你需要 #i${selection}# #r#t${selection}##k 就需要给我以下物资\r\n\r\n`

			cfg.forEach( v=> {
				if(v.id === selection){
					v.item.forEach( vv => {
						const [id,count] = vv;
						text += `\t\t#i${id}:# #t${id}:# × ${count}（已有 ${cm.getItemQuantity(id)}）\r\n`;
					})
				}
			})

			text += "\r\n#b"

			text += `#L${selection}#我已集齐，给我吧！#l\r\n`;
			text += "#L1#返回#l\r\n"

			cm.sendSimple(text);


		} else if (status === 3){

			if(selection > 1){

				var data = cfg.find(v=> v.id === selection);
				if(data){

					var give = cm.getPlayer().getDayData("罗密欧与朱丽叶兑换" + data.id) * 1;

					var err;
					data.item.forEach(v => {
						const [id,count] = v;
						if(count > cm.getItemQuantity(id)){
							err = `#i${id}不足！`;
						}
					})
					if(err){
						cm.sendNext(err);
						cm.dispose();

					} else if (data.day > 0 && give >= data.day){
						cm.sendNext(`你今天已经兑换${give}次，请明天再来！`);
						cm.dispose();
					} else if (!cm.canHold(data.id) ){
						cm.sendNext("背包空间不足！");
						cm.dispose();
					} else {
						data.item.forEach(v => {
							const [id,count] = v;
							cm.gainItem(id,-count);
						})
						cm.gainItem(data.id);
						cm.sendNext(`给你#i${data.id}# 请拿好！`);
						cm.getPlayer().serverMessage(`在罗密欧与朱丽叶兑换了`,data.id);
						if(data.day > 0){
							cm.getPlayer().saveDayData("罗密欧与朱丽叶兑换" + data.id, 1,true);
						}
						status = -1;
					}
				} else {
					cm.sendNext("未找到配置")
					cm.dispose();
				}


			} else {
				status = 0;
				action(1,0,3)
			}

			
            

		} else {
			cm.dispose();
		}
	}
}