                                      
//随身拍卖
var id = 2023010;
var status = -1;

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {

	if (mode <= 0) {
        im.dispose();
    } else {
	    if (mode === 1) {
	        status++;
	    } else {
	        status--;
	    }

	    const count = im.getItemQuantity(id);

	    if(!im.getPlayer().isGM() && im.getPlayer().getLevel() < 8){
	    	if(count > 0)im.gainItem(id);
	    	im.message("等级低于8级无法使用！");
	    	im.dispose();
	    	return;
	    }
	

		if (status === 0) {

			let map = im.getPlayer().getMap();
			let Limit= map.getFieldLimit();
			let isTown = map.isTown();
			let mapId = im.getPlayer().getMapId();


			
			if(im.getPlayer().isGM()){
				im.message("地图ID：" + mapId + " 地图受限编码：" + Limit + " isTown:" + isTown);
				im.message('位置：' + im.getPlayer().getPosition().x + ':' + im.getPlayer().getPosition().y)
				im.message("ID：" + im.getScriptName())
			}
			im.dispose();

			if([
				65600,  //被关小黑屋
				140024, 
				124,  	 //坐船或坐车中
				500472,  //在竞技场地图
				74494,   //答题(打开NPC界面时答对题奖励点券或抵用券会被踢下线)
				271100,  //巨魔蝙蝠
				10588, //妖僧
				8440, //闹钟
				335992,  //暗黑龙王
				2433148, //暗黑龙王本体
			].includes(Limit) && !im.getPlayer().isGM()){
				im.dropMessage(1,"在这个地图做不了");
				if(count > 0)im.gainItem(id,1,false,false);
			}else{
				im.openNpc(9900001,"9900001")
			}


			
			// if( [0,8264,8428].includes(Limit) || [980010000].includes(mapId)){
				//im.dispose();
				//im.openNpc(9010000,"9900001")
			// }else{
				// im.sendOk("副本地图召唤NPC失败，本卡每触发一次消耗1个，不要频繁再按了，换个图试试吧！")
				// im.dispose();
			// }
			
			
		} else {
			im.dispose();
		}
	}
	
}
