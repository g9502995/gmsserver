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
 * @npc: Wonky
 * @map: 200080101 - Orbis - The Unknown Tower
 * @func: Orbis PQ
 */
const GameConfig = Java.type('org.gms.config.GameConfig');
var status = 0;
var em = null;
const max = GameConfig.getServerInt("party_quest_day_limit");
var complete = 0;
var gold = 500;
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
		

        if (cm.getMapId() !== 920010000) {
            if (status == 0) {
                em = cm.getEventManager("女神之塔");
                if (em == null) {
                    cm.sendOk("天空之城组队任务遇到了一个错误。");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }

                complete = cm.getPlayer().getDayData(em.getName() + "今日完成次数") * 1;
				var text = "#e#b<组队任务：女神之塔>\r\n#k#n";
                    text += em.getProperty("party") +"\r\n"
                    text += "\r\n你想要组建或加入一个团队来解决#b女神之塔#k的谜题吗？让你的#b队伍领袖#k与我交谈或者自己组建一个队伍。#b\r\n"
                    text += "\r\n"
                    text += `#L0#我想参加组队任务（#r${complete}#b / ${max}）#l\r\n`;
                    text += "\r\n";
                    text += "#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + "组队搜索。\r\n"
                    text += "#L2#我想了解更多细节。\r\n"
                    text += "#L3#我想要女神的宝物。\r\n"
				 
                
				cm.sendSimple(text);
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("只有当你加入一个队伍时，才能参加派对任务。");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("你的队长必须与我交谈才能开始这个组队任务。");
                        cm.dispose();
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
								cm.sendOk("你目前无法开始这个组队任务，因为你的队伍可能不符合人数要求，有些队员可能不符合尝试条件，或者他们不在这张地图上。如果你找不到队员，可以尝试使用组队搜索功能。");
							}
						}

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("你的组队搜索状态现在是：#b" + (psState ? "enabled" : "disabled") + "#k。想要改变状态时随时找我。");
                    cm.dispose();
                } else if (selection == 2) {
					var text = "#e#b<女神之塔组队任务>#k#n\r\n我们的女神已经失踪了一段时间，有传言说她最后一次被看到是在女神之塔内。此外，我们的圣地已经被精灵们的压倒性力量夺取，这些生物最近一直在奥比斯的边缘徘徊。他们的领袖，皮克西爸爸，目前掌握着王位，可能知道她的下落，因此我们迫切需要找到一支由勇敢的英雄组成的队伍，冲进去夺回我们的圣地并拯救她。如果你的团队能够包含每个职业（战士，魔法师，弓箭手，飞侠和海盗），你们将得到我的祝福来帮助你们战斗。你们会帮助我们吗？";
					
                    cm.sendOk(text);
                    cm.dispose();
                } else if(selection == 3) {
                    cm.sendSimple("我这里有女神的一些宝物，你需要吗？\r\n\r\n#b#L0#我想要#t1082232:#。\r\n");
                }
            } else if (status == 2) {
                if (selection == 0) {

                    if (!cm.haveItem(4001158 ,10)) {
                        cm.sendOk("需要你收集10个 #t4001158#，只要解救雅典娜女神就可以获得！");
                    } else if (cm.getPlayer().haveItemWithId(1082232,true)) {
                        cm.sendOk("你已拥有#t1082232:#！");
                    } else if (!cm.canHold(1082232)){
                        cm.sendOk("背包空间不足！")
                    } else {
                        cm.gainItem(1082232, 1);
                        cm.gainItem(4001158, -10);
                        cm.sendOk("领取成功！");
                    }
                }
				cm.dispose();
            }
        } else {
            if (status == 0) {
				var text = "物理攻击落白云，#r收集20个云片丢到珠子上#k 可召唤帮佣！\r\n\r\n";
				
				text += `#b#L33#花${gold}抵用券直接给我吧！#l\r\n`
				
                cm.sendSimple(text);
            } else if (status == 1) {

                if(selection === 33){
                    if (!cm.canHold(4001063, 20)){
                        cm.sendNext("背包空间不足！")
                    } else if( gold > cm.getPlayer().getCash(1) ){
                        cm.sendNext("抵用券不足！");
                    } else {
                        cm.getPlayer().gainCash(-gold,true);
                        cm.getPlayer().saveLog("女神之塔" , 1,-gold);
                        cm.gainItem(4001063, 20);
                        cm.sendNext("你真懒啊，给你，拿好，去召唤帮佣吧！只能放 20 个哦！");
                    }
                } else if(selection === 1){
					cm.warp(920011200);
				}
				cm.dispose();
                
            }
        }
    }
}
