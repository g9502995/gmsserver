function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {

	if (mode <= 0) {
		cm.dispose();
	} else {
		if (mode == 1) {
			status++;
		} else {
			status--;
		}


		if (status == 0) {

			var text = "你好，我的朋友！我在收集宝物，你有没有？\r\n";

			text += "\r\n#b";
			text += "#L1#怪物卡片收集#l\r\n";
			// text += "#L3#能手册收集#l\r\n";
			// text += "#L4#能手册兑换#l\r\n";
			text += "#L2#装备收集#l\r\n";
			text += "#L5#勋章收集#l\r\n";

			if(cm.getPlayer().getLevel() >= 120){
				// text += "#L6#4转技能补齐#l\r\n";
			}

			cm.sendSimple(text);

		} else if (status == 1) {

			cm.dispose();
			if(selection === 1)cm.openNpc(9310208,"卡片收集");
			if(selection === 2)cm.openNpc(9310208,"装备收集");
			if(selection === 3)cm.openNpc(9310208,"技能收集");
			if(selection === 4)cm.openNpc(9310208,"技能兑换");
			if(selection === 5)cm.openNpc(9310208,"勋章收集");
			if(selection === 6){

				if (cm.getJobId() == 412) {
                    if (cm.getPlayer().getSkillLevel(4121008) == 0) {
                        cm.teachSkill(4121008, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(4121004) == 0) {
                        cm.teachSkill(4121004, 0, 10, -1);
                    }

                    if (cm.getPlayer().getSkillLevel(4121003) == 0) {
                        cm.teachSkill(4121003, 0, 10, -1);
                    }

                    if (cm.getPlayer().getSkillLevel(4121007) == 0) {
                        cm.teachSkill(4121007, 0, 10, -1);
                    }

                    
                } else if (cm.getJobId() == 422) {
                    if (cm.getPlayer().getSkillLevel(4221004) == 0) {
                        cm.teachSkill(4221004, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(4221001) == 0) {
                        cm.teachSkill(4221001, 0, 10, -1);
                    }

                    if (cm.getPlayer().getSkillLevel(4221003) == 0) {
                        cm.teachSkill(4221003, 0, 10, -1);
                    }

                    if (cm.getPlayer().getSkillLevel(4221006) == 0) {
                        cm.teachSkill(4221006, 0, 10, -1);
                    }

                    
                } else  if (cm.getJobId() == 312) {
                    if (cm.getPlayer().getSkillLevel(3121008) == 0) {
                        cm.teachSkill(3121008, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(3121006) == 0) {
                        cm.teachSkill(3121006, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(3121004) == 0) {
                        cm.teachSkill(3121004, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(3121002) == 0) {
                        cm.teachSkill(3121002, 0, 10, -1);
                    }
                } else if (cm.getJobId() == 322) {
                    
                    if (cm.getPlayer().getSkillLevel(3221007) == 0) {
                        cm.teachSkill(3221007, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(3221005) == 0) {
                        cm.teachSkill(3221005, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(3221001) == 0) {
                        cm.teachSkill(3221001, 0, 10, -1);
                    }

                    if (cm.getPlayer().getSkillLevel(3221003) == 0) {
                        cm.teachSkill(3221003, 0, 10, -1);
                    }

                    
                } else if (cm.getJobId() == 212) {
                    if (cm.getPlayer().getSkillLevel(2121007) == 0) {
                        cm.teachSkill(2121007, 0, 10, -1);
                    }

                    if (cm.getPlayer().getSkillLevel(2121005) == 0) {
                        cm.teachSkill(2121005, 0, 10, -1);
                    }

                    if (cm.getPlayer().getSkillLevel(2121005) == 0) {
                        cm.teachSkill(2121005, 0, 10, -1);
                    }

                    if (cm.getPlayer().getSkillLevel(2121003) == 0) {
                        cm.teachSkill(2121003, 0, 10, -1); // 火凤球
                    }

                    if (cm.getPlayer().getSkillLevel(2121004) == 0) {
                        cm.teachSkill(2121004, 0, 10, -1); // 终极无限
                    }

                    
                // 冰雷
                } else if (cm.getJobId() == 222) {
                    if (cm.getPlayer().getSkillLevel(2221007) == 0) {
                        cm.teachSkill(2221007, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(2221005) == 0) {
                        cm.teachSkill(2221005, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(2221003) == 0) {
                        cm.teachSkill(2221003, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(2221004) == 0) {
                        cm.teachSkill(2221004, 0, 10, -1);
                    }
                    

                // 主教    
                } else if (cm.getJobId() == 232) {
                    if (cm.getPlayer().getSkillLevel(2321008) < 1) {
                        cm.teachSkill(2321008, 0, 10, -1);
                    }
                    if (cm.getPlayer().getSkillLevel(2321006) < 1) {
                        cm.teachSkill(2321006, 0, 10, -1);
                    } 

                    if (cm.getPlayer().getSkillLevel(2321003) < 1) {
                        cm.teachSkill(2321003, 0, 10, -1);
                    } 

                    if (cm.getPlayer().getSkillLevel(2321004) < 1) {
                        cm.teachSkill(2321004, 0, 10, -1);
                    } 

                    if (cm.getPlayer().getSkillLevel(2321007) < 1) {
                        cm.teachSkill(2321007, 0, 10, -1);
                    } 

                // 英雄
                } else if (cm.getJobId() == 112) {

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

                cm.sendNext("OK")
                cm.dispose();

			}

		} else {
			cm.dispose();
		}
	}
}