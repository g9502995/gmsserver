
/*
        @Author Ronan

        1061009 - Door of Dimension
	Enter 3rd job event
*/

function jobString(niche) {
    if (niche == 1) {
        return "warrior";
    } else if (niche == 2) {
        return "magician";
    } else if (niche == 3) {
        return "bowman";
    } else if (niche == 4) {
        return "thief";
    } else if (niche == 5) {
        return "pirate";
    }

    return "beginner";
}

function canEnterDimensionMap(mapid, jobid) {
    if (mapid == 105070001 && (jobid >= 110 && jobid <= 130)) {
        return true;
    } else if (mapid == 105040305 && (jobid >= 310 && jobid <= 320)) {
        return true;
    } else if (mapid == 100040106 && (jobid >= 210 && jobid <= 230)) {
        return true;
    } else if (mapid == 107000402 && (jobid >= 410 && jobid <= 420)) {
        return true;
    } else if (mapid == 105070200 && (jobid >= 510 && jobid <= 520)) {
        return true;
    }

    return false;
}

function start() {
    if (canEnterDimensionMap(cm.getMapId(), cm.getJob().getId()) && cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
        var js = jobString(cm.getPlayer().getJob().getJobNiche());

        var em = cm.getEventManager("3rdJob_" + js);
        if (em == null) {
            cm.sendOk("抱歉，但是三转职业升级（" + js + "）已关闭。");
        } else {
            if (!em.startInstance(cm.getPlayer())) {
                cm.sendOk("有其他人已经在挑战克隆体了。请等待直到该区域被清空。");
            }

            cm.dispose();
            return;
        }
    }else{
		cm.sendOk("你不符合进入异界之门的条件！")
	}

    cm.dispose();
}