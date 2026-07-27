
var status;
const Server = Java.type('org.gms.net.server.Server');
var world;
var players;
var player;
var mapid;
var msgText = "被检测到使用作弊程序，已被巡查机器人逮捕！"
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
	
	
    
    if (status === 0) {

    	world = Server.getInstance().getWorld(cm.getClient().getWorld())
		
        //本频道
        players = cm.getClient().getChannelServer().getPlayerStorage().getAllCharacters(); 

        //本区
        players = cm.getPlayer().getWorldServer().getPlayerStorage().getAllCharacters(); 
		var text = "你打算查看哪些玩家？\r\n\r\n#b";

		text += "#L1#仅查看本图在线玩家#l\r\n";
		text += "#L2#查看本频道所有在线玩家#l\r\n";
    	
		
        cm.sendSimple(text);

    } else if (status == 1){


    	//找本地图的玩家
    	if(selection == 1){
    		
    		var text=  '';
    		mapid = cm.getMapId();

    		for(let i=0;i < players.length; i++){
				let ch = players[i];

				if( mapid == ch.getMapId() && ch.getId() !== cm.getPlayer().getId()){
					text += `#L${i}#${ch.getName()}（${ch.getLevel()}级）#m${ch.getMapId()}#在线${formatMinutes(ch.getCurrentOnlineTime() / 60)}#l\r\n`;
				}
			}

			if(text){
				cm.sendSimple("#b" + text);
			}else{
				cm.sendNext("没有其他人");
				status = -1;
			}

    	}

    	if(selection == 2){
    		var text = ''

			for(let i=0;i < players.length; i++){
				let ch = players[i];
				if(ch.getId() !== cm.getPlayer().getId()){
					text += `#L${i}#${ch.getName()} ${ch.getLevel()} ${ch.getClient().getChannelServer().getId()}#m${ch.getMapId()}#在线${formatMinutes(ch.getCurrentOnlineTime() / 60)}#l\r\n`;
				}
			}
			if(text){
				text = "以下是本频道在线玩家：\r\n\r\n#b" + text;
				cm.sendSimple(text);
			}else{
				cm.sendNext("没有其他人");
				status = -1;
			}

    	}

    } else if(status == 2){

    	player = players[selection];

    	var text = `你打算对 ${player.getName()} 做些什么？\r\n\r\n#b`;

        text += "#L5#给他发送验证码#l\r\n";
    	text += "#L0#过去找他#l\r\n";
    	text += "#L4#把他弄过来#l\r\n";
    	text += "#L1#封了他#l\r\n";
    	text += "#L3#将他关起来#l\r\n";
    	text += "#L2#将他放出来#l\r\n";
    	


    	cm.sendSimple(text);

    }else if (status == 3){

    	if(selection == 0)cm.warp(player.getMapId());
    	if(selection == 1)player.autoBan(msgText);
    	if(selection == 2){
    		player.removeJailExpirationTime();
    		player.changeMap(910000000);
    		player.getAbstractPlayerInteraction().npcTalk(9010000,"你已被释放！现在自由了！");
    		
    		cm.sendOk("OK，他被释放了！");
    		cm.dispose();
    	}
    	if(selection == 3){

    		var text = "你打算关他多久？\r\n\r\n"

    		text += "请填入分钟数(60为1小时  1440为1天)！"
    		
    		cm.sendGetText(text);
    		
    	}

    	if(selection == 4)player.changeMap(cm.getPlayer().getMapId());
        if(selection == 5){

            player.saveData("验证码",JSON.stringify([formatTime(), 0, 0]));
            player.getAbstractPlayerInteraction().openNpc(9010000,"验证码");
            cm.sendOk("发送成功");
            cm.dispose();
        }

    } else if(status == 4){

    	let input = cm.getText();

    	if(!isNaN(input) && String(parseFloat(input)) === input){
    		
    		if(player.getMapId() !== 300000012){

	    		//记录他之前所在地图
				player.saveLocation("JAIL");

				//移动到小黑屋
				player.changeMap(300000012);

				//管理员对话通知
				player.getAbstractPlayerInteraction().npcTalk(9010000,"你" + msgText)
				
				//设置时间
				player.addJailExpirationTime(cm.getText() * 60 * 1000);
				cm.sendOk("OK，已将他关进牢房！");

				cm.serverMessage(`【${player.getName()}】${msgText}`);
			}else{
				cm.sendOk("他正在牢房中！");
			}
    	}

    	cm.dispose();


    
    } else {
        cm.dispose();
    }
}




/**
 * 分钟数格式化为“N小时 N分钟”
 * @param {number} totalMinutes - 总分钟数（非负整数）
 * @returns {string} 格式化后的字符串
 */
function formatMinutes(totalMinutes) {
    // 校验输入：转为非负整数（避免负数、小数问题）
    const minutes = Math.max(0, Math.floor(Number(totalMinutes) || 0));
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    // 拼接结果（按场景优化显示）
    const parts = [];
    if (hours > 0) parts.push(`${hours}小时`);
    if (remainingMinutes > 0 || hours === 0) parts.push(`${remainingMinutes}分钟`);
    
    return parts.join('');
}



function formatTime(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零：01-12
  const day = String(date.getDate()).padStart(2, '0'); // 补零：01-31
  const hours = String(date.getHours()).padStart(2, '0'); // 补零：00-23
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 补零：00-59
  const seconds = String(date.getSeconds()).padStart(2, '0'); // 补零：00-59

  // 替换格式字符串中的占位符
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}