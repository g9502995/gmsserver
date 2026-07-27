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
@	Author : Raz
@       Author : Ronan
@
@	NPC = Sky-Blue Balloon
@	Map = Hidden-Street <Stage 7>
@	NPC MapId = 922010700
@	Function = LPQ - 7 Stage
@
@	Description: You need a ranged person here. The ranged person must kill the three Ratz, and they'll trigger something. What's next is for you to find out! Get me 3 passes!
*/

var status = 0;
var gold = 500;
var curMap, stage;

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 922010100) / 100) + 1;
	
    status = -1;
    action(1, 0, 0);
	
	
}

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);

    eim.linkToNextStage(stage, "lpq", curMap);  //opens the portal to the next map
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        var eim = cm.getPlayer().getEventInstance();

        if (eim.getProperty(stage.toString() + "stageclear") != null) {
            cm.sendOk("快点，去下一个阶段，传送门已经打开了！");
			cm.dispose();
        } else {
			
            if (eim.isEventLeader(cm.getPlayer())) {
				
				
                var state = eim.getIntProperty("statusStg" + stage);
				var text = "嗨。欢迎来到 #b第 " + stage + " 关#k。需要远程攻击人员，杀死三只老鼠将触发一些东西。接下来就是你自己去发现了！给我3张通行证！\r\n\r\n"
				text += `#L1##b花${gold}抵用券直接开门！#k#l`;
				
				if(status===0){
					
					if (cm.haveItem(4001022, 3)) {
						cm.sendOk("干得好！你已经收集了所有3个#b#t4001022#。#k");
						cm.gainItem(4001022, -3);

						eim.setProperty("statusStg" + stage, 1);
						clearStage(stage, eim, curMap);
						cm.dispose();
					} else {
						cm.sendSimple(text);
					}
					
				}else{
					
					
					if(gold){
						var money = cm.getPlayer().getCashShop().getCash(2);
						if(money >= gold){
							cm.getPlayer().gainCash(2,-gold);
                            cm.getPlayer().saveLog("玩具城副本",cm.getNpc(),2,-gold);
							eim.setProperty("statusStg" + stage, 1);
							clearStage(stage, eim, curMap);
							
						}else{
							cm.sendOk("抵用券不足");
							cm.dispose();
							return;
						}
						
						
					}
					
					cm.dispose();
				}
				
            } else {
                cm.sendNext("请告诉你的#b队长#k来找我谈话。");
				cm.dispose();
            }
        }

        
    }
}

