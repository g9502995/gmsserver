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

var status;
var gold = 500;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        var eim = cm.getEventInstance();

        if (status == 0) {
            if (!cm.isEventLeader()) {
                cm.sendNext("请让你们的队长和我交谈，以便得到进入下一阶段的进一步指示。");
                cm.dispose();
                return;
            }

            
            if (eim.getIntProperty("statusStg1") == 1) {
                cm.sendNext("穿过这条隧道进行Boss战。");
                cm.dispose();
            } else {
                if (cm.haveItem(4032118, 15)) {
                    cm.gainItem(4032118, -15);

                    eim.setIntProperty("statusStg1", 1);
                    eim.showClearEffect();
                    eim.giveEventPlayersStageReward(1);

                    cm.sendNext("你得到了这些信件，太棒了！现在，你可以通过这条隧道前往MV所在的房间。做好准备！");
                    cm.dispose();
                } else {

                    var text = "\t请把 #r15封秘密信#k 交给我。"
                    text += "\r\n\r\b#b"
                    text += `#L1#我给${gold}抵用券，让我过去吧！#l\r\n`;
                    cm.sendSimple(text)

                }
            }

            
        } else {
            const ch = cm.getPlayer();
            if(gold > ch.getCash(1)){
                cm.sendNext("开什么玩笑，看看你的抵用券够不够");
            } else {
                eim.setIntProperty("statusStg1", 1);
                eim.showClearEffect();
                eim.giveEventPlayersStageReward(1);
                cm.sendNext("你得到了这些信件，太棒了！现在，你可以通过这条隧道前往MV所在的房间。做好准备！");
               
            }

            cm.dispose();
        }
    }
}