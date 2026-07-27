
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
    var mapId = cm.getPlayer().getMapId();
    if (mapId == 103000890) {
        
		cm.warp(910002000,2);
		cm.dispose();
        
    } else {
        if (status == 0) {
            var outText = "一旦离开地图，若想重新尝试，你就得重启整个任务。你确定还要离开这张地图吗?" + mapId;
            //if (mapId == 103000805) {
                outText = "你准备好离开这张地图了吗?";
            //}
            cm.sendYesNo(outText);
        } else if (mode == 1) {
			
            cm.warp(103000890, "st00"); // Warp player
            cm.dispose();
        }
    }
}
