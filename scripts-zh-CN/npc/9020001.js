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

/**
 * @author: Stereo, Moogra, Ronan
 * @npc: Cloto
 * @map: 1st Accompaniment - KPQ
 * @func: Kerning PQ
 */
const PacketCreator = Java.type('org.gms.util.PacketCreator');
var stage1Questions = Array(
    "收集与#b战士#n首次转职所需最低等级相同数量的#b证书#n。",
	"收集与#b弓箭手#n首次转职所需最低等级相同数量的#b证书#n。",
	"收集与#b飞侠#n首次转职所需最低等级相同数量的#b证书#n。",
    "收集与#b魔法师#n首次转职所需最低等级相同数量的#b证书#n。",
    "收集与#b每次升级获得属性点相同数量的#b证书#n。",
);
var stage1Answers = Array(10,10,10,8,5);

const Rectangle = Java.type('java.awt.Rectangle');
var stage2Rects = Array(new Rectangle(-755, -132, 4, 218), new Rectangle(-721, -340, 4, 166), new Rectangle(-586, -326, 4, 150), new Rectangle(-483, -181, 4, 222));
var stage3Rects = Array(new Rectangle(608, -180, 140, 50), new Rectangle(791, -117, 140, 45),
    new Rectangle(958, -180, 140, 50), new Rectangle(876, -238, 140, 45),
    new Rectangle(702, -238, 140, 45));
var stage4Rects = Array(new Rectangle(910, -236, 35, 5), new Rectangle(877, -184, 35, 5),
    new Rectangle(946, -184, 35, 5), new Rectangle(845, -132, 35, 5),
    new Rectangle(910, -132, 35, 5), new Rectangle(981, -132, 35, 5));

var stage2Combos = Array(Array(0, 1, 1, 1), Array(1, 0, 1, 1), Array(1, 1, 0, 1), Array(1, 1, 1, 0));
var stage3Combos = Array(Array(0, 0, 1, 1, 1), Array(0, 1, 0, 1, 1), Array(0, 1, 1, 0, 1),
    Array(0, 1, 1, 1, 0), Array(1, 0, 0, 1, 1), Array(1, 0, 1, 0, 1),
    Array(1, 0, 1, 1, 0), Array(1, 1, 0, 0, 1), Array(1, 1, 0, 1, 0),
    Array(1, 1, 1, 0, 0));
var stage4Combos = Array(
	Array(0, 0, 0, 1, 1, 1), Array(0, 0, 1, 0, 1, 1), Array(0, 0, 1, 1, 0, 1),
    Array(0, 0, 1, 1, 1, 0), Array(0, 1, 0, 0, 1, 1), Array(0, 1, 0, 1, 0, 1),
    Array(0, 1, 0, 1, 1, 0), Array(0, 1, 1, 0, 0, 1), Array(0, 1, 1, 0, 1, 0),
    Array(0, 1, 1, 1, 0, 0), Array(1, 0, 0, 0, 1, 1), Array(1, 0, 0, 1, 0, 1),
    Array(1, 0, 0, 1, 1, 0), Array(1, 0, 1, 0, 0, 1), Array(1, 0, 1, 0, 1, 0),
    Array(1, 0, 1, 1, 0, 0), Array(1, 1, 0, 0, 0, 1), Array(1, 1, 0, 0, 1, 0),
    Array(1, 1, 0, 1, 0, 0), Array(1, 1, 1, 0, 0, 0)
);

function clearStage(stage, eim, curMap) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);

    eim.linkToNextStage(stage, "kpq", curMap);  //opens the portal to the next map
}

function rectangleStages(eim, property, areaCombos, areaRects) {
    var c = eim.getProperty(property);
    if (c == null) {
        c = Math.floor(Math.random() * areaCombos.length);
        eim.setProperty(property, c.toString());
    } else {
        c = parseInt(c);
    }

    // get player placement
    var players = eim.getPlayers();
    var playerPlacement = [0, 0, 0, 0, 0, 0];

    for (var i = 0; i < eim.getPlayerCount(); i++) {
        for (var j = 0; j < areaRects.length; j++) {
            if (areaRects[j].contains(players.get(i).getPosition())) {
                playerPlacement[j] += 1;
                break;
            }
        }
    }

    var curCombo = areaCombos[c];
    var accept = true;
    for (var j = 0; j < curCombo.length; j++) {
        if (curCombo[j] != playerPlacement[j]) {
            accept = false;
            break;
        }
    }

    return accept;
}

var status = 0;
var gold = 500;


function start() {
	status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	
   const eim = cm.getEventInstance();

   const reward = eim.getObjectProperty("reward");

   const copy = eim.getEm().getName();

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

		var curMap = cm.getMapId();
		var stage = curMap - 103000800 + 1;
		
		
		//完成处理
		if (eim.getProperty(stage.toString() + "stageclear") != null) {
			if (stage < 5) {
				cm.sendNext("请赶紧前往下一个阶段，传送门已经打开了！");
				cm.dispose();
			} else {
				if (!eim.giveEventReward(cm.getPlayer())) {
					cm.sendNext("请先在你的背包里腾出空间！");
				} else {
					cm.warp(103000805, "st00");
				}
				cm.dispose();
			}
			
		} else if (curMap == 103000800) {   // 第1关
		
			//判断是否为队长
			if (cm.isEventLeader()) {
				var numpasses = eim.getPlayerCount() - 1 || 1;
				if(status === 0){
					//卡片收集判断
					if (cm.hasItem(4001008, numpasses)) {
						cm.sendNext("你已收集满足通关条件！恭喜你通过了这个关卡！我会制作一个传送你到下一个关卡的传送门。到那里有时间限制，所以请赶快。祝你们好运！");
						clearStage(stage, eim, curMap);
						eim.gridClear();
						cm.gainItem(4001008, -numpasses);
						cm.dispose();
					} else {
						var text = "你的通行许可证数量不足。\r\n需求数量是你队伍人数减队长，#b最少需 " + numpasses + " 张通行许可证\r\n#k告诉你的队员收集#r证书#k找我换#r通行许可证。";
						if(gold){
							text += `\r\n#L1##b花${gold}抵用券直接开门！#k#l`;
						}
						cm.sendSimple(text);
					}
				}else{
					
					if(cm.getPlayer().getCashShop().getCash(2) >= gold){
						cm.getPlayer().gainCash(-gold,true);
						cm.getPlayer().saveLog(copy,cm.getNpc(),2,-gold);
						clearStage(stage, eim, curMap);
						eim.gridClear();
					}else{
						cm.sendOk("抵用券不足");
					}
					
					cm.dispose();
				}
			} else {
				var data = eim.gridCheck(cm.getPlayer());

				if (data == 0) {
					cm.sendNext("谢谢你带来了证书。请把我刚刚给你的#b通行许可证#k交给队长。");
					cm.dispose();
					return;
				}

				if (data == -1) {
					data = Math.floor(Math.random() * stage1Questions.length) + 1;   //data will be counted from 1
					eim.gridInsert(cm.getPlayer(), data);
				}
				
				var answer = stage1Answers[data - 1];

				if (cm.itemQuantity(4001007) == answer) {
					cm.sendNext("提交数量为正确答案！请将这张#b通行许可证#k。交给队长。");
					cm.gainItem(4001007, -answer);
					cm.gainItem(4001008, 1);
					eim.gridInsert(cm.getPlayer(), 0);
					cm.dispose();
				} else {
					var question = stage1Questions[eim.gridCheck(cm.getPlayer()) - 1];
					cm.sendNext("背包中的证书数量不是正确答案！\r\n" + question);
					cm.dispose();
				}
				
			}

		} else if (curMap == 103000801) {   // 第2关
			var stgProperty = "stg2Property";
			var stgCombos = stage2Combos;
			var stgAreas = stage2Rects;
			var nextStgId = 103000802;
			
			var text = "欢迎来到 第" + stage + " 关！\r\n在我旁边一会看到4根绳子，有3个与传送门相连。\r\n请3位队员挂上去找正确的绳子（不要挂的太低）\r\n由队长点击我来检查答案是否正确。看快开始找吧！";
			
			if(gold){
				text += `\r\n#L1##b花${gold}抵用券直接开门！#k#l`;
			}
	
			if(status === 0){						
				if (!eim.isEventLeader(cm.getPlayer())) {
					cm.sendOk("跟随你的队长给出的指示来完成这个阶段。");
					cm.dispose();
				} else {
					if (eim.getProperty(stgProperty) == null) {
						var c = Math.floor(Math.random() * stgCombos.length);
						eim.setProperty(stgProperty, c.toString());
					}
					var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);
					if (accept) {
						clearStage(stage, eim, curMap);
						cm.sendNext("请赶紧前往下一个阶段，传送门已经打开了！");
						cm.dispose();
					} else {
						eim.showWrongEffect();
						cm.sendSimple(text);
					}
				}
			}else{
				
				if(cm.getPlayer().getCashShop().getCash(2) >= gold){
					cm.getPlayer().gainCash(-gold,true);
					cm.getPlayer().saveLog(copy,cm.getNpc(),2,-gold);
					clearStage(stage, eim, curMap);
					eim.gridClear();
				}else{
					cm.sendOk("抵用券不足");
				}
				
				cm.dispose();
			}

			
		} else if (curMap == 103000802) {  // 第3关
			var stgProperty = "stg3Property";
			var stgCombos = stage3Combos;
			var stgAreas = stage3Rects;

			var nextStgId = 103000803;
			
			var text = "欢迎来到 第" + stage + " 关！\r\n请看我旁边有猫猫的平台，有3个与传送门相连。\r\n请3位队员站上去找正确的平台（确保站在中间位置）\r\n由队长点击我来检查答案是否正确。看快开始找吧！";
			
			if(gold){
				text += `\r\n#L1##b花${gold}抵用券直接开门！#k#l`;
			}
			
			if(status === 0){	
				if (!eim.isEventLeader(cm.getPlayer())) {
					cm.sendOk("跟随你的队长给出的指示来完成这个阶段。");
					cm.dispose();
				} else {
					if (eim.getProperty(stgProperty) == null) {
						var c = Math.floor(Math.random() * stgCombos.length);
						eim.setProperty(stgProperty, c.toString());
					} 
					var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);
					if (accept) {
						clearStage(stage, eim, curMap);
						cm.sendNext("请赶紧前往下一个阶段，传送门已经打开了！");
						cm.dispose();
					} else {
						eim.showWrongEffect();
						cm.sendSimple(text);
					}
				}
			}else{
				if(gold){
					if(cm.getPlayer().getCashShop().getCash(2) >= gold){
						cm.getPlayer().gainCash(-gold,true);
						cm.getPlayer().saveLog(copy,cm.getNpc(),2,-gold);
						clearStage(stage, eim, curMap);
						eim.gridClear();
					}else{
						cm.sendOk("抵用券不足");
					}
				}
				cm.dispose();
			}

		} else if (curMap == 103000803) {  // 第4关
			var stgProperty = "stg4Property";
			var stgCombos = stage4Combos;
			var stgAreas = stage4Rects;

			var nextStgId = 103000804;
			
			var text = "欢迎来到 第" + stage + " 关！\r\n看我旁边有一些木桶，有3个与传送门相连。\r\n请3位队员站上去找正确的（确保站在中间位置）\r\n由队长点击我来检查答案是否正确。看快开始找吧！";
			
			if(gold){
				text += `\r\n#L1##b花${gold}抵用券直接开门！#k#l`;
			}

			
			if(status === 0){

				if (!eim.isEventLeader(cm.getPlayer())) {
					cm.sendOk("跟随你的队长给出的指示来完成这个阶段。");
					cm.dispose();
				} else {
					if (eim.getProperty(stgProperty) == null) {
						
						var c = Math.floor(Math.random() * stgCombos.length);
						c = 0;
						// 0 是456
						// 3 是345
						// 7 是236
						// 8 是235
						//11 是146
						//17 是125
						//18 是234
						
						eim.setProperty(stgProperty, c.toString());
					} 

					var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);
					

					if (accept) {
						clearStage(stage, eim, curMap);
						eim.gridClear();
						cm.sendNext("请赶紧前往下一个阶段，传送门已经打开了！");
						cm.dispose();
					} else {
						eim.showWrongEffect();
						cm.sendSimple(text);
						
					}
					
				}
			}else{
				
				var money = cm.getPlayer().getCashShop().getCash(2);
				if(money >= gold){
					cm.getPlayer().gainCash(-gold,true);
					cm.getPlayer().saveLog(copy,cm.getNpc(),2,-gold);
					clearStage(stage, eim, curMap);
					eim.gridClear();
					
				}else{
					cm.sendOk("抵用券不足");
				}
				cm.dispose();
				
				
			}

		} else if (curMap == 103000804) {
			
			var text = "欢迎来到 第" + stage + " 关！这是最后一关。\r\n击杀本地图的所有怪物，收集#b10张通行许可证#k，由队长交给我！#r完成后点击我带你们出去#k，这些怪物可能对你来说很熟悉，但它们可能比你想象的要强大，所以请小心！";
			if (eim.isEventLeader(cm.getPlayer())) {
				
				if (cm.haveItem(4001008, 10)) {
					
					if ( !eim.isEventTeamTogether()) {
						cm.sendOk("等待你的队友全部聚齐再来。" );
						cm.dispose();
						return false;
					}
					
					if (!eim.giveEventReward(cm.getPlayer())) {
						cm.sendNext("请先在你的背包里腾出空间！");
					} else {

						
						
						var party = eim.getPlayers();
						if(party){
							var count = party.size() * 2
							for (var i = 0; i < party.size(); i++) {
								const ch = party.get(i);
								const player = ch.getAbstractPlayerInteraction();

								if(reward.leader && player.isLeader()){
									if(player.canHold(reward.leader)){
										player.gainItem(reward.leader);
										ch.saveLog(copy,cm.getNpc(),reward.leader,1);
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

								ch.saveData(copy + "总完成次数" , 1, true);
								ch.saveDayData(copy + "今日完成次数", 1, true);
								ch.serverMessage(`完成了【${copy}】组队任务！`);
							}
						}
						


						cm.gainItem(4001008, -10);
						clearStage(stage, eim, curMap);
						eim.setProperty(stage + "stageclear", "true");
						eim.showClearEffect(true);

						eim.clearPQ();
					}
	
					
				} else {
					cm.sendNext(text);
					
				}
				
				cm.dispose();
				
			} else {
				cm.sendNext("请让队长与我交谈！");
				cm.dispose();
			}

		}
        
    }
}

