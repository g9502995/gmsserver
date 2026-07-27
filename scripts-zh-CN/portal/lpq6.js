/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
Ludi PQ: 5th stage to 6th stage portal
*/

function enter(pi) {
    var eim = pi.getPlayer().getEventInstance();
    var target = eim.getMapInstance(922010800);
    if (eim.getProperty("7stageclear") != null) {

        if (eim.isEventLeader(pi.getPlayer())) {
            //队长进入
            var party = eim.getPlayers();
            for (var i = 0; i < party.size(); i++) {
                party.get(i).changeMap(target, target.getPortal("st00"));
            }
            pi.playPortalSound();
            return true;
        }else{
            //pi.getPlayer().changeMap(target, targetPortal);
            pi.message("请先让队长进入");
            return false
        }
    } else {
        return false;
    }
}