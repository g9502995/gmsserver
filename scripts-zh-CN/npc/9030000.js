// Ming

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (!cm.hasMerchant() && cm.hasMerchantItems()) {
            cm.showFredrick();
            
        } else {
            if (cm.hasMerchant()) {
				var tan = cm.getClient().getWorldServer().getHiredMerchant(cm.getPlayer().getId());
				
				var text = "你雇佣的商店已开设"
				text += `\r\n摊位在 #r频道${tan.getChannel()} 自由市场〈#r#e${tan.getMapId() - 910000000}#n〉#k`;
                cm.sendOk(text);
                
            } else {
                cm.sendOk("你没有任何物品或金币可以取回。");
            }
        }
        cm.dispose();
    }else{
        cm.dispose();
    }
}