
/**
 * @Author Moogra, Ronan  武陵道场下一关卡传送门
 */
function enter(pi) {
    var currwarp = Date.now();

    let ch = pi.getPlayer();

    if (currwarp - ch.getNpcCooldown() < 3000) {
        return false;
    } // this script can be ran twice when passing the dojo portal... strange.
    ch.setNpcCooldown(currwarp);

    var gate = ch.getMap().getReactorByName("door");
	var mapId = ch.getMap().getId();
    if (gate != null) {
        if (gate.getState() == 1 || pi.getMap().countMonsters() == 0) {
            if (Math.floor(ch.getMapId() / 100) % 100 < 38) {
                if (((Math.floor((ch.getMap().getId() + 100) / 100)) % 100) % 6 == 0) {
                    if (Math.floor(ch.getMapId() / 10000) == 92503) {
                        var restMapId = ch.getMap().getId() + 100;

                        for (var i = 0; i < 5; i++) {
                            var chrlist = pi.getMap(mapId - 100 * i).getAllPlayers();

                            var pIter = chrlist.iterator();
                            while (pIter.hasNext()) {
                                var chr = pIter.next();

                                for (var j = i; j >= 0; j--) {
                                    chr.message("你获得了" + chr.addDojoPointsByMap(mapId - 100 * j) + "修炼点数。当前总修炼点数为：" + chr.getDojoPoints() + "。");
                                }

                                chr.changeMap(restMapId, 0);
                            }
                        }
                    } else {

						//过一个关卡，进入休息室
                        ch.message("你获得了" + ch.addDojoPointsByMap(pi.getMapId()) + "修炼点数。当前总修炼点数为：" + ch.getDojoPoints() + "。");
                        pi.playPortalSound();
                        pi.warp(ch.getMap().getId() + 100, 0);
                    }
                } else {
					
					//普通过关
                    ch.message("你获得了" + ch.addDojoPointsByMap(pi.getMapId()) + "修炼点数。当前总修炼点数为：" + ch.getDojoPoints() + "。");
                    pi.playPortalSound();
                    pi.warp(ch.getMap().getId() + 100, 0);
                }

                const result = (mapId + 100).toString().slice(5,7) * 1;
                ch.serverMessage(`挑战武陵道场达到了第${result}楼`);

            } else {
                pi.playPortalSound();
                pi.warp(925020003, 0);
				
				ch.serverMessage(`挑战武陵道场到达顶楼，简直不可思议，真是神一般的存在！`);
				
				
				//通关，2000 * 累计点数 = 实际获得经验？  我当时是888点 获得了1776000
                ch.gainExp(2000 * ch.getDojoPoints(), true, true, true);
            }
            return true;
        } else {
            ch.message("传送门尚未开启。");
            return false;
        }
    } else {
        return false;
    }
}
