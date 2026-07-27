

/**
 * 暗黑龙王副本的第一迷宫入口
 */

function enter(pi) {

    //我改了，否则单人无法完成，但是必须强大
    if (!pi.haveItem(4001087)) {
        pi.getPlayer().dropMessage(6, "背包中持有【第一个迷宫的水晶钥匙】时可进入下一地图！");
        return false;
    }
    pi.playPortalSound();
    pi.warp(240050101, 0);
    return true;




    
    // 旧版处理方法是，第一把钥匙必须留守一位成员来捡钥匙，不能拿走第一把钥匙
    if (pi.getMap().countPlayers() == 1) {
        pi.getPlayer().dropMessage(6, "当前地图仅剩你一人，请等待其他玩家携带钥匙进入。");
        return false;
    } else {
        if (pi.haveItem(4001087)) {
            pi.getPlayer().dropMessage(6, "背包中持有【第一个迷宫的水晶钥匙】时无法进入下一地图！");
            return false;
        }
        pi.playPortalSound();
        pi.warp(240050101, 0);
        return true;
    }
}