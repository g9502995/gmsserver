
//小恶魔，降低某人人气
var id = 2430155;
var status = -1;
const Server = Java.type('org.gms.net.server.Server');
var ch;
var num = 0;
function start() 
{
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {

	if(mode < 1){
		im.dispose();
		return;
	}
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

	if (status === 0) {
		
		var text = "我可以降低某位玩家的人气度\r\n";

		text += "请输入他的名字吧！\r\n";

		text += "　"
		im.sendGetText(text);

		
	} else if (status == 1){

		if( isEmptyString( im.getText() ) ){
			im.sendOk("你至少得输入个相关字符");
			status = -1;	
		}else{

			var world = Server.getInstance().getWorld(im.getPlayer().getWorld())
			let players = world.getPlayerStorage().getAllCharacters(); 
			for(let i=0;i < players.length; i++){
				let v = players[i];
				if(v.getName() == im.getText() || v.getName().includes(im.getText())){
					ch = v;
					break;
				}
			}

			if(ch){
				im.sendYesNo(`你输入的是 #r${ch.getName()}（${ch.getLevel()}级）#k 吗？`);
			}else{
				im.sendNext("没有找到人，请保证在线或名字输入正确！");
				status = -1;	
			}
		}
			
		
		
	} else if (status == 2){
		num = im.getItemQuantity(id);
		if(num > 100) num = 100;
		
		if (num > 1) {
			var text = `有${im.getItemQuantity(id)}张#t${id}#，你打算使用几张？\r\n\r\n#b`;
			text += `#L${num}#使用全部！#l\r\n`;
			text += "#L1#使用1张！#l\r\n";
			im.sendSimple(text);

		}else{
			if(num == 1){
				open(1);
				im.sendOk("施法成功！对方人气被降低了！");
			}
			im.dispose();
		}
		

	} else if (status == 3){
		if(selection > 0 && num >= selection){
			open(selection);
			im.sendOk("施法成功！对方人气被降低了！");
		}
		im.dispose();
	} else {
		im.dispose();
	}
	
}


function open(number = 1) {
	const player = im.getPlayer();
	ch.gainFame(-number);
	im.gainItem(id,-number);
	player.saveLog(id,-number);
	player.serverMessage(`对某人使用了${number}张`,id,'某人的人气被降低了！');
	player.saveDayData("今日使用恶魔卡", number , true);
}

function isEmptyString(str) {
  // 先确保输入是字符串类型，避免传入非字符串值导致误判
  return typeof str === 'string' && str === '';
}