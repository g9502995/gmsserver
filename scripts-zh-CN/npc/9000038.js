/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

/**
 * @author: Ronan
 * @npc: Agent Kitty
 * @map: 970030000 - Hidden Street - Exclusive Training Center
 * @func: Boss Rush PQ Reward Announcer
 */

var status;

var levels = ["#m970030001#", "#m970030002#", "#m970030003#", "#m970030004#", "#m970030005#", "最终关卡"];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            var sendStr = "欢迎参与 #b首领速通组队任务#k！ 根据队伍在首领狩猎中的推进进度给予玩家相应奖励\r\n#b只有通过休息点内的传送门离开，才能领取奖励。\r\n#k挑战更强大的首领时，队伍需要持续战斗，直至抵达下一个休息点，或是击败最终首领。\r\n\r\n查看有可能获得的奖励:\r\n\r\n#b";
            for (var i = 0; i < 6; i++) {
                sendStr += "#L" + i + "#查看《" + levels[i] + "》奖励#l\r\n";
            }

            cm.sendSimple(sendStr);
        } else if (status == 1) {
			
			var em = cm.getEventManager("首领挑战");
			var cfg = em.getProperty("cfg");
			cfg = JSON.parse(cfg);
            var sendStr = "#b" + levels[selection] + " #k将随机抽取以下一样物品发放:\r\n\r\n";
            for (var i = 0; i < cfg[selection].itemSet.length; i++) {
                sendStr += "  #i" + cfg[selection].itemSet[i] + ":#  #t" + cfg[selection].itemSet[i] + "#";
                if (cfg[selection].itemQty[i] > 1) {
                    sendStr += " (" + cfg[selection].itemQty[i] + ")";
                }
                sendStr += "\r\n";
            }

            cm.sendPrev(sendStr);
        } else if (status == 2) {
            cm.dispose();
        }
    }
}