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
 *@Author:  Moogra
 *@NPC:     4th Job Warrior Advancement NPC
 *@Purpose: Handles 4th job.
 */


// 战士4转NPC
var status;

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

            if (cm.getLevel() < 120 || Math.floor(cm.getJobId() / 100) != 1) {
                cm.sendOk("请不要现在打扰我，我正在集中精力。");
                cm.dispose();
            } else if (!cm.isQuestCompleted(6904)) {
                cm.sendSimple("你还没有通过我的考验。在你通过考验之前，我无法提升你的等级。\r\n\r\n#L999##b请帮我快速完成转职任务#l");
             
            } else if (cm.getJobId() % 100 % 10 != 2) {
                cm.sendYesNo("你在通过我的测试时表现得非常出色。你准备好晋升到第四职业了吗？");
            } else {
                cm.sendOk("剩下的交给时间吧！");
                cm.dispose();
            }
        } else if (status == 1) {
            
            if(selection === 999){
                cm.sendYesNo("走捷径可以跳过任务物品，但你需要支付2000点券，是否继续？");

            } else if (mode >= 1 && cm.getJobId() % 100 % 10 != 2) {

                const InventoryType = Java.type('org.gms.client.inventory.InventoryType');
                if (cm.getPlayer().getInventory(InventoryType.USE).getNumFreeSlot() >= 1) {
                
                    cm.changeJobById(cm.getJobId() + 1);
                    if (cm.getJobId() == 112) {
                        cm.teachSkill(1121001, 0, 10, -1);
                        cm.teachSkill(1120004, 0, 10, -1);
                        cm.teachSkill(1121008, 0, 10, -1);
                    } else if (cm.getJobId() == 122) {
                        cm.teachSkill(1221001, 0, 10, -1);
                        cm.teachSkill(1220005, 0, 10, -1);
                        cm.teachSkill(1221009, 0, 10, -1);
                    } else if (cm.getJobId() == 132) {
                        cm.teachSkill(1321001, 0, 10, -1);
                        cm.teachSkill(1320005, 0, 10, -1);
                        cm.teachSkill(1321007, 0, 10, -1);
                    }
                    cm.getPlayer().serverMessage("完成了第4次转职！");

                //学习其他技能
                    // 英雄
                    if (cm.getJobId() == 112) {

                        if (cm.getPlayer().getSkillLevel(1121010) == 0) {
                            cm.teachSkill(1121010, 0, 10, -1);
                        }
                        if (cm.getPlayer().getSkillLevel(1120005) == 0) {
                            cm.teachSkill(1120005, 0, 10, -1);
                        }
                        if (cm.getPlayer().getSkillLevel(1121002) == 0) {
                            cm.teachSkill(1121002, 0, 10, -1);
                        }

                        if (cm.getPlayer().getSkillLevel(1121006) == 0) {
                            cm.teachSkill(1121006, 0, 10, -1);
                        }

                        cm.gainItem(2430168);

                    // 圣骑士
                    } else if (cm.getJobId() == 122) {
                        if (cm.getPlayer().getSkillLevel(1221002) == 0) {
                            cm.teachSkill(1221002, 0, 10, -1);
                        }

                        if (cm.getPlayer().getSkillLevel(1221011) == 0) {
                            cm.teachSkill(1221011, 0, 10, -1); // 圣域
                        }

                        if (cm.getPlayer().getSkillLevel(1220006) == 0) {
                            cm.teachSkill(1220006, 0, 10, -1); // 寒冰盾
                        }

                        if (cm.getPlayer().getSkillLevel(1220010) == 0) {
                            cm.teachSkill(1220010, 0, 10, -1); // 万佛归一破
                        }
                        
                        if (cm.getPlayer().getSkillLevel(1221003) == 0) {
                            cm.teachSkill(1221003, 0, 10, -1); // 圣灵之剑
                        }

                        if (cm.getPlayer().getSkillLevel(1221004) == 0) {
                            cm.teachSkill(1221004, 0, 10, -1); // 圣灵之锤
                        }

                        if (cm.getPlayer().getSkillLevel(1221007) == 0) {
                            cm.teachSkill(1221007, 0, 10, -1); // 突进
                        }

                        

                    // 黑骑士
                    } else if (cm.getJobId() == 132) {


                        if (cm.getPlayer().getSkillLevel(1321002) == 0) {
                            cm.teachSkill(1321002, 0, 10, -1); // 稳如泰山
                        }
                        if (cm.getPlayer().getSkillLevel(1320008) == 0) {
                            cm.teachSkill(1320008, 0, 10, -1);  //灵魂治愈
                        }
                        if (cm.getPlayer().getSkillLevel(1320009) == 0) {
                            cm.teachSkill(1320009, 0, 10, -1); // 灵魂祝福
                        }

                        if (cm.getPlayer().getSkillLevel(1321003) == 0) {
                            cm.teachSkill(1321003, 0, 10, -1);  //突进
                        }

                        if (cm.getPlayer().getSkillLevel(1320006) == 0) {
                            cm.teachSkill(1320006, 0, 10, -1); // 恶龙附身
                        }

                        

                        
                    }
                } else {
                    cm.sendOk("请确保消耗栏有一个空位！");
                }

                cm.dispose();
            } else {
              
                cm.dispose();
            }

            

        } else if (status == 2) {

            if(cm.isQuestStarted(6904)){
                var ch = cm.getPlayer();
                if(ch.getCash() >= 2000){
                    cm.completeQuest(6904);
                    cm.sendOk("好啊，你真不错啊，什么都懂！");
                    status = -1;
                }else{
                    cm.sendOk("点券不足！");
                    cm.dispose();
                }
            }else{
                cm.sendOk("请先听我讲完故事！");
                cm.dispose();
            }
        }
    }
}