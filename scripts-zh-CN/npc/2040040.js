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
@	NPC = Green Balloon
@	Map = Hidden-Street <Stage 5>
@	NPC MapId = 922010500
@	Function = LPQ - 5th Stage
@
 */

var status = 0;
var curMap, stage;
var gold = 500;


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
            cm.sendNext("快点，去下一个阶段，传送门已经打开了！");
			cm.dispose();
        } else {
            if (eim.isEventLeader(cm.getPlayer())) {
                var state = eim.getIntProperty("statusStg" + stage);
				var text = "嗨。欢迎来到 #b第 " + stage + " 关#k。每个人都必须合作。这里有6个传送门。一个被#b无法战胜的怪物#k守卫着，一个非常高。我希望你和你的队伍分别进入每一个，并打破里面的箱子。带回掉落物品——应该有24个。";
                if(gold){
					text += `\r\n#L1##b花${gold}抵用券直接开门！#k#l`;
				}
				if(status === 0){
				
					if (cm.haveItem(4001022, 24)) {
						cm.sendOk("干得好！你已经收集了所有24个#b#t4001022#。#k");
						cm.gainItem(4001022, -24);

						eim.setProperty("statusStg" + stage, 1);
						clearStage(stage, eim, curMap);
						cm.dispose();
					} else {
						
						cm.sendSimple(text);
					}
				}else{
					
					if(gold){
						if(cm.getPlayer().getCashShop().getCash(2) >= gold){
							cm.getPlayer().gainCash(2,-gold);
                            cm.getPlayer().saveLog("玩具城副本",cm.getNpc(),2,-gold);
							eim.setProperty("statusStg" + stage, 1);
							clearStage(stage, eim, curMap);
						}else{
							cm.sendOk("抵用券不足");
						}
					}
					
					cm.dispose();
					
					
				}
            } else {
                cm.sendOk("请告诉你的#b队伍领袖#k来找我谈话。");
				cm.dispose();
            }
        }

        
    }
}