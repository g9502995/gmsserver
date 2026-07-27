//生命之水
var id = 4033000;
var exp = 500000;
var status;
var PacketCreator = Java.type('org.gms.util.PacketCreator');
function start(){
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
			var text = `我需要你的历练经验值来制作灵丹妙药延续我的青春！\r\n你需要 #r #t${id}# #k 吗？#r${exp}经验值#k 就能制作一瓶！\r\n`;
			
			text += "\r\n#b";
			text += `#L1#${exp} 经验 制作1瓶 #t${id}##l\r\n`;
			text += `#L5#${5 * exp} 经验 制作5瓶 #t${id}##l\r\n`;
			text += `#L10#${10 * exp} 经验 制作10瓶 #t${id}##l\r\n`;
			
            cm.sendSimple(text)
		} else if (status == 1){
			
			let roleExp = cm.getPlayer().getExp();
			
			if(roleExp > selection * exp){
				if(cm.canHold(id,selection)){
					cm.getPlayer().loseExp(selection * exp,false,false)
					cm.getPlayer().sendPacket(PacketCreator.showInfo("Effect/BasicEff.img/IncEXP"))
					cm.sendNext("制作成功！");
					cm.gainItem(id,selection);
				}else{
					cm.sendOk("背包空间不足！");
					cm.dispose();
				}
				
			}else{
				cm.sendNext(`你的经验值总共${roleExp}，请你看清你自己！`)
			}
			status = -1;
			
        
        } else {
            cm.dispose();
        }
    }
} 
