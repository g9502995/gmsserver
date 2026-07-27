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
@	Author : Moogra
@	NPC = Aqua Balloon
@	Map = Hidden-Street <Stage 6>
@	NPC MapId = 922010600
@	Function = LPQ - 6th Stage
*/

var gold = 500;

var status = 0;

function start() {
	status = -1;
	
	const GameConfig = Java.type('org.gms.config.GameConfig');
	gold = GameConfig.getServerInt("use_enable_party_gold") || gold;
	
	action(1, 0, 0);
	
    
    
}

function action(mode, type, selection){
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
		
		if(status == 0){
			let text = "欢迎来到第6关，只要站在标有正确数字的箱子按↑就可以传送到上一层，站错就会返回原地，加油吧！";
			if(gold){
				text += `\r\n\r\n#L1##b花${gold}点券直接去下一关！`
			}
			cm.sendSimple(text);
		}else if(status == 1){
			
			if(gold){
				if(cm.getPlayer().getCashShop().getCash(2) >= gold){
					
					var eim = cm.getPlayer().getEventInstance();
					if (eim.isEventLeader(cm.getPlayer())) {
			            //队长进入
			            var party = eim.getPlayers();
			            for (var i = 0; i < party.size(); i++) {
			                party.get(i).changeMap(922010700);
			            }
			            
			        }else{
						cm.warp(922010700);
					}
					cm.getPlayer().gainCash(2,-gold);
                    cm.getPlayer().saveLog("玩具城副本",cm.getNpc(),2,-gold);

					//let str = "按照这个路线走：133 221 333 123 111"
					
					//cm.message(str);
					//cm.sendOk("请你记好，我只说一次哦！\r\n\r\n#b" + str);
				}else{
					cm.sendOk("抵用券不足");
				}
			}
			
			
			cm.dispose();
		}
		
		
	}
}