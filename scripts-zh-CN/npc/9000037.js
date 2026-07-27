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
 * @npc: Agent Meow
 * @map: 970030000 - Hidden Street - Exclusive Training Center
 * @func: Boss Rush PQ
 */

var status = 0;
var state;
var em = null;
var itemId = 4001007; //离开副本使用的证书
var cache = "";
var max = 1;

// 购买次数使用的货币和数量
const buyItem = 4000601;
const buyCount = 3;

function onRestingSpot() {
    return cm.getMapId() >= 970030001 && cm.getMapId() <= 970030010;
}

function isFinalBossDone() {
    return cm.getMapId() >= 970032700 && cm.getMapId() < 970032800 && cm.getMap().getMonsters().isEmpty();
}

function detectTeamLobby(team) {
    var midLevel = 0;

    for (var i = 0; i < team.size(); i++) {
        var player = team.get(i);
        midLevel += player.getLevel();
    }
    midLevel = Math.floor(midLevel / team.size());

    var lobby;  // teams low level can be allocated at higher leveled lobbys
    if (midLevel <= 20) {
        lobby = 0;
    } else if (midLevel <= 40) {
        lobby = 1;
    } else if (midLevel <= 60) {
        lobby = 2;
    } else if (midLevel <= 80) {
        lobby = 3;
    } else if (midLevel <= 90) {
        lobby = 4;
    } else if (midLevel <= 100) {
        lobby = 5;
    } else if (midLevel <= 110) {
        lobby = 6;
    } else {
        lobby = 7;
    }

    return lobby;
}

function start() {
    status = -1;
    state = (cm.getMapId() >= 970030001 && cm.getMapId() <= 970042711) ? (!onRestingSpot() ? (isFinalBossDone() ? 3 : 1) : 2) : 0;
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
            if (state == 3) {
                if (cm.getEventInstance().getProperty("clear") == null) {
                    cm.getEventInstance().clearPQ();
                    cm.getEventInstance().setProperty("clear", "true");
                }

                if (cm.isEventLeader()) {
                    cm.sendYesNo("我震惊了，#b你们居然击败了所有的首领boss#k，恭喜~！\r\n你们是我见过最强的冒险者，是否领取奖品并离开这里？");
                } else {
                    cm.sendOk("在这个副本中#b打败所有的boss#k，恭喜你！现在你将获得与你在这里表现相匹配的奖品，我会将你传送出去。");
                }
            } else if (state == 2) {
                if (cm.isEventLeader()) {
                    if (cm.getPlayer().getEventInstance().isEventTeamTogether()) {
						var text = "是否带领队伍进入下一轮挑战？\r\n如果在下一轮挑战失败将无法获得挑战奖励，#k你也可以#r从传送门离开并获得奖励#k，但说不定下轮的奖励比现在好呢？";
						text += "\r\n\r\n"
                        text += "#L0##b进入下一轮挑战！#l\r\n";
						text += `#L1#领取出门证#l`;
                        cm.sendSimple(text);
                    } else {
                        cm.sendOk("请等待队伍人员聚齐后找我继续下一关。");
                        cm.dispose();

                    }
                } else {
					text = `\t请等待队长找我。\r\n #L1##b我要领取出门凭证到传送门离开！#l`;
					cm.sendSimple(text);

                }
            } else if (state == 1) {
                cm.sendYesNo("快去杀死BOSS清理所有怪物吧！ 你有可能是要放弃离开这里吗？\r\n放弃后将#b不会获得挑战奖励#k，是否继续？");
            } else {
                em = cm.getEventManager("首领挑战");
                if (em == null) {
                    cm.sendOk("遇到了一个错误。");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }
                
				var copy = em.getName()
                var buyNum = cm.getPlayer().getDayData(copy + "购买次数") * 1;
                if(buyNum){
                    max = 2;
                }
                cache = copy + "今日进入次数"
                var complete = cm.getPlayer().getDayData(cache) * 1;
				var text = "#e#b<组队任务：首领挑战>\r\n#k#n"
				text += em.getProperty("party") +"\r\n"
				text += "\r\n你想要和队友合作完成挑战任务，还是勇敢到足以独自完成？让你的#b队长#k与我交谈或者自己创建一个队伍。"
                text += `#b\r\n#L0#我想参加组队任务（#r${complete}#b / ${max}）\r\n`
                if(complete === 1 && max === 1){
                    text += `#L3#我想用${buyCount}个#t${buyItem}:#再进入一次#l\r\n`
                }
                text += "#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + "组队搜索。\r\n"
                text += "#L2#我想了解更多详情。"
                cm.sendSimple(text);
            }
        } else if (status == 1) {
            if (state == 3) {
				
				//通关奖励
                if (!cm.getPlayer().getEventInstance().giveEventReward(cm.getPlayer(), 6)) {
                    cm.sendOk("请提前在你的背包所有标签中安排一个空位。");
                    cm.dispose();
                    return;
                }
				cm.getPlayer().serverMessage("队伍在【首领挑战】击败了最终BOSS领取了通关奖励！")
                cm.warp(910002000,2);
                cm.dispose();
            } else if (state == 2) {
				
				
				
				if(selection === 0){
					//点击NPC后，要进入下一关
                
					//根据地图编号计算处的当前关卡
					var restSpot = ((cm.getMapId() - 1) % 5) + 1;
                    var mapID = 970030100 + cm.getEventInstance().getIntProperty("lobby") + (500 * restSpot);
					
					//重置活动时间
					cm.getPlayer().getEventInstance().restartEventTimer(10 * 60000);

                    //传送地图
					cm.getPlayer().getEventInstance().warpEventTeam(mapID);
					cm.getPlayer().serverMessage("队伍在【首领挑战】全歼第"+ restSpot +"轮BOSS，进入下一关！")
					
					if(cm.haveItem(itemId)){
						cm.removeAll(itemId);
					}
					
					cm.dispose();
				}else{
					if(cm.haveItem(itemId,1)){
						cm.sendOk("你已经有凭证了，无需再领！");
					}else if(!cm.canHold(itemId,1)){
						cm.sendOk("背包空间不足");
					}else{
						cm.sendOk("OK，拿这个凭证就可以出去了。")
						cm.gainItem(itemId,1);
					}
					cm.dispose();
					
				}
				
				
            } else if (state == 1) {
				// 离开
                cm.warp(910002000,2);
                cm.dispose();
            } else {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("加入一个队伍才能参加。");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("我只和队长交谈。");
                        cm.dispose();
                    } else {
						
						let party = cm.getParty().getMembers();
						var pass = [];
						for (var i = 0; i < party.size(); i++) {
							let ch = party.get(i);
							let player = ch.getPlayer();
							if(player){
								var num = player.getDayData(cache) * 1;
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
								var lobby = detectTeamLobby(eli);
                                var isOK = 0;
								for (let i = lobby; i < 8; i++) {
									if (em.startInstance(i, cm.getParty(), cm.getPlayer().getMap(), 1)) {
										isOK = 1
                                        break;
									}
								}
								if (!isOK) {
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

                } else if (selection === 3){
				    
                    var text = `你确定要使用${buyCount}个#i${buyItem}:# #r#t${buyItem}:##k 兑换1次进入权限吗？\r\n\r\n`
                    text +="#b"
                    text += "#L1#是的，我要再进入1次\r\n";
                    text += "#L2#我再考虑考虑\r\n";

                    cm.sendSimple(text)
					
                } else {
                    cm.sendOk("#e#b<组队任务：首领挑战>#k#n\r\n来自世界各地的勇敢冒险者来到这里，测试他们在战斗中的技能和能力，挑战来自冒险岛的更强大的boss。与其他冒险者联手或者独自承担所有的压力并获得所有的荣耀，根据你挑战的关卡，获得相应的奖励，在远征结束时进行分配。\r\n\r\n这个任务还支持#b多个大厅，以匹配不同团队等级的玩家#k：如果你想更快地通过首领挑战，可以与等级较低的玩家组队。");
                    cm.dispose();
                }
            }
		} else if (status === 2){
            if(selection === 1){
                if(buyCount > cm.getItemQuantity(buyItem)){
                    cm.sendNext(`#i${buyItem}#数量不足！`)
                } else {
                    cm.gainItem(buyItem,-buyCount);
                    cm.getPlayer().saveDayData(em.getName() + "购买次数" , 1, true);
                    cm.sendNext("我已为你提高了1次进入次数，快去进入吧！");
                }
            }
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}


