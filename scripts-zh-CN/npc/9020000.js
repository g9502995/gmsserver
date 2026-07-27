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
 * @npc: Lakelis
 * @map: 103000000 - Kerning City
 * @func: Kerning PQ
 */
const GameConfig = Java.type('org.gms.config.GameConfig');
var status = 0;
var state;
var em = null;
const max = GameConfig.getServerInt("party_quest_day_limit");
var complete = 0; //今日完成次数
function start() {
    status = -1;
    state = (cm.getMapId() >= 103000800 && cm.getMapId() <= 103000805) ? 1 : 0;
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
            if (state == 1) {
                cm.sendYesNo("你希望放弃这个区域吗？");
            } else {
                em = cm.getEventManager("废弃都市");
                if (em == null) {
                    cm.sendOk("废弃都市组队任务遇到了一个错误。");
                    cm.dispose();
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                complete = cm.getPlayer().getDayData(em.getName() + "今日完成次数") * 1;
				
				var text = "#e#b<组队任务：第一次同行>\r\n#k#n"
				text += em.getProperty("party") + "\r\n";
				text += "\r\n";
				text += "你和你的队伍成员一起完成任务怎么样？在这里你会遇到障碍和问题，如果没有出色的团队合作，你是无法完成的。如果你想尝试，请你作为#b队伍领袖#k来找我谈谈。\r\n#b";
				
                text += "\r\n"
				text += `#L0#我想参加组队任务（#r${complete}#b / ${max}）#l\r\n`;
                text += "\r\n";
				// text += "#L3#我想快速完成组队任务#l\r\n"
                text += "#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索#l\r\n";
				text += "#L2#我想了解更多细节#l\r\n";
				
                cm.sendSimple(text);
            }
        } else if (status == 1) {
            if (state == 1) {
                cm.warp(103000000);
                cm.dispose();
            } else {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("只有当你加入一个队伍时，你才能参加派对任务。");
                    } else if (!cm.isLeader()) {
                        cm.sendOk("你的队长必须与我交谈才能开始这个组队任务。");
                    } else {
						
						let party = cm.getParty().getMembers();
						var pass = [];
						for (var i = 0; i < party.size(); i++) {
							let ch = party.get(i);
							let player = ch.getPlayer();
							if(player){
								var num = player.getDayData(em.getName() + "今日完成次数") * 1;
								if(num >= max){
									cm.message(`${ch.getName()}参与次数过多！`);
									pass.push(ch.getName());
								}
							}
						}
						if(pass.length > 0){
							
							cm.sendOk(`队员中 #b${pass.join(",")}#k 今日次数过多，不能参与！`);
							
						}else{
							var eli = em.getEligibleParty(cm.getParty());
							if (eli.size() > 0) {
								if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
									cm.sendOk("另一个队伍已经进入了该频道的#r组队任务#k。请尝试其他频道，或者等待当前队伍完成。");
								}
							} else {
								cm.sendOk("你目前无法开始这个组队任务，因为你的队伍可能不符合人数要求，有些队员可能不符合参与条件，或者他们不在这张地图上。如果你找不到队员，可以尝试使用组队搜索功能。");
							}
						}
                    }
					cm.dispose();
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("你的组队搜索状态现在是：#b" + (psState ? "启用" : "禁用") + "#k。想要改变状态时随时找我谈谈。");
					cm.dispose();


                } else if (selection == 3){

                    var text = "\r\n\t我可以让你快速完成组队任务并获得通关奖励\r\n\t需你#r拥有#t2430161##k和支付#r抵用券1500#k\r\n\r\n";

                    text += "#b#L1#好的，我要快速完成1次#l";

                    cm.sendSimple(text);

				
                } else {
                    cm.sendOk("#e#b<组队任务：第一次同行>#k#n\r\n在完成这个组队任务的子目标时，你的队伍必须通过许多障碍和谜题。与你的团队协调合作，以便进一步前进，击败最终BOSS，并收集掉落物品以获得奖励和额外阶段的机会。");
					cm.dispose();
				}
            }

        } else if (status == 2){
			

            cm.sendNext("ok");
            status = -1;
        
		} else {
			cm.dispose();
		}
    }
}
