/**
 * @author: Ronan
 * @npc: Chamberlain Eak
 * @map: Orbis - Tower of Goddess
 * @func: Orbis PQ
 */

var status = 0;
var em = null;
var gold = 500;
function isStatueComplete(eim) {
    for (var i = 1; i <= 6; i++) {
		
		//if(!eim.getProperty("statusStg" + i))return false
        if (cm.getMap().getReactorByName("scar" + i).getState() < 1) {
            return false;
        }
    }
    return true;
}
function clearStage(stage, eim) {
    eim.setProperty("statusStg" + stage, "1");
    eim.showClearEffect(true);
}

function start() {
    status = -1;
    action(1, 0, 0);
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
		

        const ch = cm.getPlayer();
		

        if (ch.getMapId() == 920011200) { //exit
            cm.warp(910002000,2);
            cm.dispose();
            return;
        }
        if (!cm.isEventLeader()) {
            if (ch.getMapId() == 920010000) {
                cm.warp(920010000, 2);
                cm.dispose();
                return;
            }

            // cm.sendOk("我只想和你们的领导谈话！");
            // cm.dispose();
            // return;
        }

        var eim = cm.getEventInstance();
		
		
		if(status === 1){
			
			if(selection === 4){
				cm.warp(920011200);
				cm.dispose();
				return false;
			}
			
            
			//抵用券过关
			if(ch.getCashShop().getCash(2) >= gold){
				ch.gainCash(2,-gold);
                ch.saveLog("女神塔副本",cm.getNpc(),2,-gold);
				
			}else{
				cm.sendOk("点抵用券不足");
				cm.dispose();
				return;
			}
        
			
			
			if(ch.getMapId() == 920010700){
				//向上
				cm.getMap().getReactorByName("stone6").forceHitReactor(1);
				eim.giveEventPlayersExp(5000);
				clearStage(6, eim);
				cm.sendOk("干得好，打开箱子里取出雕像碎片！");
			}
			
			if(ch.getMapId() == 920010500){
				//封印
				cm.getMap().getReactorByName("stone4").forceHitReactor(1);
				eim.giveEventPlayersExp(5000);
				clearStage(4, eim);
				cm.sendOk("#b地图顶部出现了一个宝箱，#k去拿取里面的雕像碎片吧！");
			}
			if(ch.getMapId() == 920010600){
				//大厅
				cm.removeAll(4001052);
				cm.gainItem(4001048, 1); //fifth piece
				eim.giveEventPlayersExp(5000);
				clearStage(5, eim);
				eim.setIntProperty("statusStg5", 1);
				
			}
			
			if(ch.getMapId() == 920010400){
				//休息室
				cm.getMap().getReactorByName("stone3").forceHitReactor(1);
				eim.giveEventPlayersExp(5000);
				clearStage(3, eim);
				eim.setProperty("statusStg3", "2");
				cm.sendOk("哦，这音乐... 它和环境非常搭配。做得好，一个箱子出现在场地上。从中取出雕像的一部分！");
			}

            if(ch.getMapId() == 920010300){
                // 仓库
                if(!cm.canHold(4001045)){
                    ch.message("背包已经满了！");
                } else {
                    cm.gainItem(4001045);
                    cm.sendNext("恭喜过关，直接去下一关吧！");
                    eim.giveEventPlayersExp(3500);
                    eim.setProperty("statusStg2", "1");
                    eim.showClearEffect(true);
                }
                
            }

            if(ch.getMapId() == 920010200){
                //步道
                if(!cm.canHold(4001044)){
                    ch.message("背包已满！");
                } else {
                    cm.removeAll(4001050);
                    cm.gainItem(4001044, 1); //first piece
                    eim.giveEventPlayersExp(5000);
                    clearStage(1, eim);
                    cm.sendNext("恭喜过关，直接去下一关吧！");
                }
                 
            }
			
			
			
			cm.dispose();
			return;
		}
	
        switch (cm.getPlayer().getMapId()) {
            case 920010000:
                if (eim.getIntProperty("statusStg0") != 1) {
                    eim.warpEventTeamToMapSpawnPoint(920010000, 2);
                    eim.giveEventPlayersExp(5000);
                    clearStage(0, eim);

                    cm.sendNext("请救救雅典娜女神，她被波波皮希困在封印中，他是我们塔楼的恐怖存在！他把雅典娜女神雕像的所有部分都弄丢了，我们必须把它们全部找回来！哦，请原谅我，我是塔楼的管家伊克，是雅典娜女神仆人。");
                } else {
                    cm.warp(920010000, 2);
                }
                cm.dispose();
                break;
            case 920010100:
                if (isStatueComplete(eim)) {
                    if (eim.getIntProperty("statusStg7") == -1) {
                        eim.warpEventTeam(920010800);
                    } else if (eim.getIntProperty("statusStg8") == -1) {
                        cm.sendOk("哦！你带来了#t4001055#！请把它放在雕像中间的台阶上，让雅典娜女神涅瓦重生！");
                    } else {
                        cm.sendOk("谢谢你救了雅典娜女神！请和她交谈…");
                    }
					cm.dispose();
                } else {
					
					if(cm.getPlayer().isGM()){
						cm.gainItem(4001044,1)
						cm.gainItem(4001045,1)
						cm.gainItem(4001046,1)
						cm.gainItem(4001047,1)
						cm.gainItem(4001048,1)
						cm.gainItem(4001049,1)
					}
                    cm.sendSimple("请拯救雅典娜女神！收集她雕像的六块碎片，然后放到女神石像合适的台阶上！\r\n\r\n#L4##b太难了，我要放弃！");
                }
				
                break;
            case 920010200: //walkway
                if (!cm.haveItem(4001050, 30)) {
                    var text = "收集这个阶段怪物身上的30个雕像碎片，然后请把它们带给我，这样我就可以把它们拼在一起！\r\n\r\n";
                    text += "#b"
                    text += `#L33#花${gold}抵用券直接给我吧！#l\r\n`;
                    cm.sendSimple(text);
                } else {
                    cm.sendOk("你已经找到了它们！这里是第一块雕像碎片。");
                    cm.removeAll(4001050);
                    cm.gainItem(4001044, 1); //first piece
                    eim.giveEventPlayersExp(5000);
                    clearStage(1, eim);
                    cm.dispose();
                }
				
                break;
            case 920010300: //storage
                if (eim.getIntProperty("statusStg2") != 1) {
                    if (cm.getMap().countMonsters() == 0 && cm.getMap().countItems() == 0) {
                        if (cm.canHold(4001045)) {
                            cm.sendOk("哦，我找到了第二块雕像碎片。拿去吧。");
                            cm.gainItem(4001045, 1);
                            eim.giveEventPlayersExp(5000);
                            clearStage(2, eim);
                            eim.setProperty("statusStg2", "1");
                            cm.dispose();
                        } else {
                            cm.sendOk("我已经找到了第二块雕像碎片。在你的背包中腾出一个空位来拿它。");
                            cm.dispose();
                        }
                    } else {
                        var text = "在这个房间里找到隐藏的第二块雕像碎片。";

                        text +="\r\n\r\n #b"
                        text += `#L33#花${gold}直接给我吧！#l\r\n`;
                        cm.sendSimple(text)
                    }
                } else {
                    cm.sendOk("干得好。去找其他雕像碎片。");
                    cm.dispose();
                }
				
                break;
            case 920010400: //lobby
                if (eim.getIntProperty("statusStg3") == -1) {
					var text = "请找到本周的LP，并将其放在音乐播放器上。\r\n\r\n#v4001056# 星期日\r\n#v4001057# 星期一\r\n#v4001058# 星期二\r\n#v4001059# 星期三\r\n#v4001060# 星期四\r\n#v4001061# 星期五\r\n#v4001062# 星期六\r\n\r\n";
					
					if(gold >0){
						text += `#L0##b花${gold}抵用券直接召唤箱子！#k#l`;
					}
					cm.sendSimple(text);
				} else if (eim.getIntProperty("statusStg3") == 0) {
                    cm.getMap().getReactorByName("stone3").forceHitReactor(1);
                    cm.sendOk("哦，这音乐... 它和环境非常搭配。做得好，一个箱子出现在场地上。从中取出雕像的一部分！");
                    eim.giveEventPlayersExp(5000);
                    clearStage(3, eim);
                    eim.setProperty("statusStg3", "2");
					cm.dispose();
                } else {
                    cm.sendOk("非常感谢你！击破旁边的箱子获得碎片吧！");
					cm.dispose();
                }
				
                break;
            case 920010500: //sealed
                if (eim.getIntProperty("statusStg4") == -1) {
                    var total = 3;
                    for (var i = 0; i < 2; i++) {
                        var rnd = Math.round(Math.random() * total);
                        total -= rnd;

                        eim.setProperty("stage4_" + i, rnd);
                    }
                    eim.setProperty("stage4_2", "" + total);

                    eim.setProperty("statusStg4", "0");
                }
                if (eim.getIntProperty("statusStg4") == 0) {
                    var players = Array();
                    var total = 0;
                    for (var i = 0; i < 3; i++) {
                        var z = cm.getMap().getNumPlayersInArea(i);
                        players.push(z);
                        total += z;
                    }
                    if (total != 3) {
						var text = "平台有3个正确位置，需要站在上面找我验证正确答案。\r\n\r\n";
						if(gold >0){
							text += `#L0##b花${gold}抵用券直接召唤箱子！#k#l`;
						}
						cm.sendSimple(text);
                        
                    } else {
                        var num_correct = 0;
                        for (var i = 0; i < 3; i++) {
                            if (eim.getProperty("stage4_" + i) === ("" + players[i])) {
                                num_correct++;
                            }
                        }
                        if (num_correct == 3) {
                            cm.sendOk("你找到了正确的组合！地图顶部出现了一个宝箱，去拿取里面的雕像碎片吧！");
                            cm.getMap().getReactorByName("stone4").forceHitReactor(1);
                            eim.giveEventPlayersExp(5000);
                            clearStage(4, eim);
							cm.dispose();
                        } else {
                            eim.showWrongEffect();
                            if (num_correct > 0) {
                                cm.sendOk("一个平台上有正确数量的玩家。");
                            } else {
                                cm.sendOk("所有的平台上都有错误的玩家数量。");
                            }
							cm.dispose();
                        }
                    }
                } else {
                    cm.sendOk("干得好！地图顶部出现了一个宝箱，去拿取里面的雕像碎片吧！，");
					cm.dispose();
                }
                
                break;
            case 920010600: //lounge
                if (eim.getIntProperty("statusStg5") == -1) {
                    if (!cm.haveItem(4001052, 40)) {
						
						var text = "在这个阶段从怪物身上收集40个雕像碎片，然后请把它们带给我，这样我就可以把它们拼在一起！\r\n\r\n"
						if(gold >0){
							text += `#L0##b花${gold}抵用券直接通过！#k#l`;
						}
						cm.sendSimple(text);
					} else {
                        cm.sendOk("你已经找到了它们！这里是第五块雕像碎片。");
                        cm.removeAll(4001052);
                        cm.gainItem(4001048, 1); //fifth piece
                        eim.giveEventPlayersExp(5000);
                        clearStage(5, eim);
                        eim.setIntProperty("statusStg5", 1);
						cm.dispose();
                    }
                } else {
                    cm.sendOk("你已经找到了所有的东西。去搜索塔的其他房间吧。");
					cm.dispose()
                }
                break;
            case 920010700: //on the way up
                if (eim.getIntProperty("statusStg6") == -1) {
                    var rnd1 = Math.floor(Math.random() * 5);

                    var rnd2 = Math.floor(Math.random() * 5);
                    while (rnd2 == rnd1) {
                        rnd2 = Math.floor(Math.random() * 5);
                    }

                    if (rnd1 > rnd2) {
                        rnd1 = rnd1 ^ rnd2;
                        rnd2 = rnd1 ^ rnd2;
                        rnd1 = rnd1 ^ rnd2;
                    }

                    var comb = "";
                    for (var i = 0; i < rnd1; i++) {
                        comb += "0";
                    }
                    comb += "1";
                    for (var i = rnd1 + 1; i < rnd2; i++) {
                        comb += "0";
                    }
                    comb += "1";
                    for (var i = rnd2 + 1; i < 5; i++) {
                        comb += "0";
                    }

                    eim.setProperty("stage6_c", "" + comb);

                    eim.setProperty("statusStg6", "0");
                }

                var comb = eim.getProperty("stage6_c");

                if (eim.getIntProperty("statusStg6") == 0) {
					
					
                    var react = "";
                    var total = 0;
                    for (var i = 1; i <= 5; i++) {
                        if (cm.getMap().getReactorByName("" + i).getState() > 0) {
                            react += "1";
                            total += 1;
                        } else {
                            react += "0";
                        }
                    }

                    if (total != 2) {
						var text = "地图顶部需要精确地推动两个杠杆。\r\n站在上面的正确的台阶按#b↑#k可以传送到上一层台阶，让队友上去将杠杆摆正，应该是其中有一个开关是开启（向下），开启后找我验证答案是否正确\r\n";
						if(gold >0){
							text += `#L0##b花${gold}抵用券直接召唤箱子！#k#l`;
						}
						cm.sendSimple(text);
                    } else {
                        var num_correct = 0;
                        var psh_correct = 0;
                        for (var i = 0; i < 5; i++) {
                            if (react.charCodeAt(i) == comb.charCodeAt(i)) {
                                num_correct++;
                                if (react.charAt(i) == '1') {
                                    psh_correct++;
                                }
                            }
                        }
						
						
                        if (num_correct == 5) {
                            cm.sendOk("你找到了正确的组合！快去打开箱子取出雕像碎片！");
                            cm.getMap().getReactorByName("stone6").forceHitReactor(1);
                            eim.giveEventPlayersExp(5000);
                            clearStage(6, eim);
							cm.dispose();
                        } else {
							
							var text = "";
							if(gold >0){
								text += `#L0##b花${gold}抵用券直接通过！#k#l`;
							}
							
                            eim.showWrongEffect();
                            if (psh_correct >= 1) {
                                cm.sendSimple("其中一个推动的杠杆是正确的。\r\n\r\n" + text);
                            } else {
                                cm.sendSimple("两个推杆都是错误的。\r\n\r\n" + text);
                            }
                        }
                    }
                } else {
                    cm.sendOk("干得漂亮！去看看其他的部分吧。");
					cm.dispose();
                }
                break;
            case 920010800:
                cm.sendNext("请找到一种方法来打败波波精灵！一旦你通过种植种子找到了黑暗食人花，你就找到了波波精灵！打败它，拿到种子种植后获得生命草来拯救雅典娜女神！！");
                cm.dispose();
				break;
            case 920010900:
                if (eim.getProperty("statusStg8") == "1") {
                    cm.sendNext("这是塔的监狱。你可能会在这里找到一些好东西，只要确保尽快解决前面的谜题。");
				} else {
                    cm.sendNext("在那里你找不到任何雕像碎片。爬上梯子返回中心塔，然后到其他地方去搜索。一旦你救了雅典娜女神，你可以回到这里拿下面的好东西。");
				}
				cm.dispose();
                break;
            case 920011000:
                if (cm.getMap().countMonsters() > 0) {
                    cm.sendNext("这是塔楼的隐藏房间。在清除了这个房间上的所有怪物之后，与我交谈以获得进入宝藏房间的权限，留下中央塔楼的通道。");
				} else {
                    cm.warp(920011100, "st00");
                }
				cm.dispose();
                break;
        }
        
    }
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}