function enter(pi) {

    var eim = pi.getPlayer().getEventInstance();
    var mapId = '';


    switch (pi.getMapId()) {
        case 930000000:
            mapId = 930000100;
            break;
        case 930000100:
            if (pi.getMap().getMonsters().size() == 0) {
                mapId = 930000200;
            } else {
                pi.playerMessage(5, "请消灭所有怪物。");
                return false;
            }
            break;
        case 930000200:
            //变质的森林 第二关
            if (pi.getMap().getReactorByName("spine") != null && pi.getMap().getReactorByName("spine").getState() < 4) {
                pi.playerMessage(5, "尖刺障碍物阻挡了道路。");
                return false;
            } else {
                mapId = 930000300;
            }
            break;

        default:
            pi.playerMessage(5, "该传送门通往未绑定的路径。");
            return false;
    }


    pi.playPortalSound();
    if (eim.isEventLeader(pi.getPlayer())) {
        //队长进入
        var party = eim.getPlayers();
        for (var i = 0; i < party.size(); i++) {
            party.get(i).changeMap(mapId,0);
        }
    }else{
        pi.warp(mapId, 0);
    }
    return true;
}