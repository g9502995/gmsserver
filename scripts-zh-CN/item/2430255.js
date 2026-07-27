
//小恶魔，随机降低某人人气
var id = 2430255;
var status;
const Server = Java.type('org.gms.net.server.Server');
const gold = 300;
function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {

	if(mode <= 0){
		im.dispose();
		return;
	}

    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    const count = im.getItemQuantity(id);

    if(!count){
		//强开
		im.dispose();
		return;
	}

	if (status === 0) {
		
		var text = `你的这张 #r#t${id}# #k 使用成功后可获得${gold}抵用券，但也会随机对在线玩家降低人气度，也可能是你。你要现在使用吗？\r\n`;

		text += "\r\n#b";

		if(count > 1){
			text += `#L${count}# 使用${count}张#l\r\n`;
		}

		text += "#L1# 使用1张#l\r\n";

		im.sendSimple(text);

		
	} else if (status == 1){

		const ch = im.getPlayer();

		var world = Server.getInstance().getWorld(ch.getWorld())
		let players = world.getPlayerStorage().getAllCharacters(); 

		for (var i = 0; i < selection; i++) {
			const randomIndex = Math.floor(Math.random() * players.length);
			const targetPlayer = players[randomIndex];
			if(targetPlayer&& targetPlayer.getId()){
				targetPlayer.gainFame(-1);
			}
		}

		im.gainItem(id,-selection);
		ch.serverMessage(`使用了${selection}张`,id,'某人的人气被降低了！');
		ch.saveDayData("今日使用恶魔卡", selection , true);
		ch.gainCash(gold * selection,true);
		im.sendNext(`使用成功，你获得了 ${gold * selection}抵用券！`)

		


		im.dispose();
		
		

	} else {
		im.dispose();
	}
	
}


function isEmptyString(str) {
  // 先确保输入是字符串类型，避免传入非字符串值导致误判
  return typeof str === 'string' && str === '';
}