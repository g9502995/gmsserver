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

/*
 * @Author: Moogra
 */


var status;
var em;
var eim;
var isComplete = false;
function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }   

        em = cm.getEventManager("闹钟");

        eim = cm.getEventInstance();

        if(status == 0){
            if(cm.getPlayer().getMapId() === 220080001){
                if(cm.getEventInstance().isEventCleared()){
                    //完成了
                    cm.sendNext("你们团队厉害呀，居然胜利了~！");
                    cm.getPlayer().saveDayData("今日挑战闹钟" , 1, true);
                    isComplete = true;
                }else{
                    //没有完成，是要离开
                    cm.sendYesNo("你要离开此地图吗？");
                }
            }else{
                cm.sendNext("....");
                cm.dispose();
            }
        }else if (status === 1){

            if(isComplete){

                const reward = eim.getObjectProperty("reward");
                const copy = eim.getEm().getName();
                const ch = cm.getPlayer();
                const player = ch.getAbstractPlayerInteraction();
                const party = eim.getPlayers();
                const count = party.size() * 2
                if(reward.leader && player.isLeader()){
                    if(player.canHold(reward.leader)){
                        player.gainItem(reward.leader);
                        ch.saveLog(copy,0,reward.leader,1);
                    }else{
                        ch.message("背包已经满了！");
                    }
                }

                if(reward.exp)ch.gainExp(reward.exp);
                if(reward.meso)ch.gainMeso(reward.meso);
                if(reward.coin){
                    if(player.canHold(reward.coin)){
                        player.gainItem(reward.coin);
                    }else{
                        ch.message("背包已经满了！")
                    }
                }
                if(reward.cert){
                    if(player.canHold(reward.cert,count)){
                        player.gainItem(reward.cert,count);
                    }else{
                        ch.message("背包已经满了！")
                    }
                }

                if(reward.item){
                    reward.item.forEach(v => {
                        if(player.canHold(v[0],v[1])){
                            player.gainItem(v[0],v[1]);
                        }else{
                            ch.message("背包已经满了！")
                        }
                    })
                }

                var cache = copy + "今日完成次数"
                ch.saveDayData(cache, (ch.getDayData(cache) * 1) + 1);

                var cache = copy + "总完成次数"
                ch.saveData(cache , (ch.getData(cache) * 1) + 1);

                ch.serverMessage(`完成了【${copy}】组队任务！`);
            }

            cm.warp(220080000);
            cm.dispose();
        }

    }
}


