/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*2512000.js
 *@Author Jvlaple
 * 海盗船副本的箱子
 *Pirate PQ Reactor
 */

function passedGrindMode(map, eim) {
    if (eim.getIntProperty("grindMode") == 0) {
        return true;
    }
    return eim.activatedAllReactorsOnMap(map, 2511000, 2517999);
}

function act() {
    var eim = rm.getPlayer().getEventInstance();
    var now = eim.getIntProperty("openedBoxes");
    var nextNum = now + 1;
    eim.setIntProperty("openedBoxes", nextNum);
	
	
	//弹出金币、可以弹出山参浓缩液等，弹出的配置属于数据库中reactordrops掉落配置
    rm.dropItems(true, 1, 30, 60, 15);
	
	// 判断怪物是否清理完成后展示过关特效
    //var map = rm.getMap();
    //if (map.getMonsters().size() == 0 && passedGrindMode(map, eim)) {
        //eim.showClearEffect(map.getId());
    //}
}