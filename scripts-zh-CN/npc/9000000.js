
/*      Author:                 Xterminator, Moogra
	NPC Name: 		Paul
	Map(s): 		Maple Road: Southperry (60000)
	Description: 	        Event Assistant
*/
var status = 0;

function start() {
    cm.sendNext("嘿，如果你不忙的话……那我能和你一起玩吗？我听说这附近有人聚集起来参加一个#r活动#k，但我不想一个人去……嗯，你想和我一起去看看吗？");
}
var em;
function action(mode, type, selection) {
    if (mode <= 0) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 1) {
            em = cm.getEventManager("通用计时器");
            var text = "哦？是什么样的活动？嗯，那个是……\r\n#b"
                text += "#L0# 是什么样的活动？#l\r\n"
                text += "#L1# 给我解释一下活动游戏吧。#l\r\n"
                // text += "#L2# 好的，让我们开始吧！#l\r\n";
                if(em.getProperty('openOX') == "1"){
                    text += "#L3# 参与OX问答！#l\r\n";
                }
            cm.sendSimple(text);
        } else if (status == 2) {

            if (selection == 0) {
                cm.sendNext("这个月，冒险岛全球版正在庆祝其三周年！GM们将在整个活动期间举行惊喜GM活动，所以保持警惕，并确保参加至少一个活动以赢取丰厚奖品！");
                cm.dispose();
            } else if (selection == 1) {
                cm.sendSimple("这个活动有很多游戏。在玩游戏之前了解如何玩游戏会对你有很大帮助。选择你想了解更多的游戏！#b\r\n#L0# 欧拉欧拉#l\r\n#L1# 冒险岛体能测试#l\r\n#L2# 雪球#l\r\n#L3# 椰子收获#l\r\n#L4# OX问答#l\r\n#L5# 寻宝#l#k");
            } else if (selection == 2) {
                cm.sendNext("还没有活动开始！");
                cm.dispose();
            } else if (selection == 3){
                //进入答题活动
                if(em.getChannelServer().getId() == 1){
                    if(em.getProperty('openOX') == "1"){
                        var oxMap = em.getChannelServer().getMapFactory().getMap(109020001);
                        if(!oxMap.isOxQuiz()){
                            oxMap.startEvent(cm.getPlayer());
                        }
                        cm.getPlayer().saveLocation("EVENT");
                        cm.warp(109020001,0);
                        
                    }else{
                        cm.sendOk("未在活动时间");
                    }
                }else{
                    cm.sendOk("只能在频道1进入");
                }
                cm.dispose();
            }
        } else if (status == 3) {

            if (selection == 0) {
                cm.sendNext("#b[Ola Ola]#k 是一个游戏，参与者需要爬梯子到达顶部。通过选择正确的传送门，爬上去并移动到下一个级别。\r\n\r\n游戏包括三个级别，时间限制为 #b6 分钟#k。在 [Ola Ola] 中，你 #b无法跳跃、传送、加速，或使用药水或物品提高速度#k。还有一些欺诈性的传送门会把你带到奇怪的地方，所以请注意。");
            } else if (selection == 1) {
                cm.sendNext("#b[冒险岛体能测试]是一个类似于耐心之森的障碍赛跑#k。你可以通过克服各种障碍，在规定时间内到达最终目的地来赢得比赛。\r\n游戏包括四个关卡，时间限制为#b15分钟#k。在[冒险岛体能测试]期间，你将无法使用传送或加速技能。");
            } else if (selection == 2) {
                cm.sendNext("#b[雪球]#k 由两个队伍组成，枫叶队和故事队，两个队伍在有限的时间内争夺看哪个队伍将雪球滚得更远更大。如果比赛在规定时间内无法决定胜负，那么滚得更远的队伍获胜。\r\n要滚动雪球，按下#bCtrl#k进行攻击。所有远程攻击和技能攻击在这里都不起作用，#b只有近距离攻击才有效#k。\r\n如果角色触碰到雪球，他/她将被送回起点。攻击起点前面的雪人，以阻止对方队伍将雪球滚向前方。这是一个精心策划的战略，因为队伍将决定是攻击雪球还是雪人。");
            } else if (selection == 3) {
                cm.sendNext("“#b[椰子收获]#k 由两个队伍组成，枫叶队和故事队，两个队伍将争夺看谁能收集到最多的椰子。时间限制为#b5分钟#k。如果比赛以平局结束，将额外奖励2分钟以确定胜者。如果由于某种原因比分保持平局，比赛将以平局结束。\r\n所有远程攻击和技能攻击在这里都不起作用，#b只有近距离攻击才有效#k。如果你没有近距离攻击的武器，你可以通过活动地图内的NPC购买。无论角色的等级、武器或技能如何，所有造成的伤害都是相同的。\r\n注意地图内的障碍和陷阱。如果角色在游戏中死亡，将被淘汰出局。最后一击椰子掉落之前的玩家获胜。只有掉落在地面上的椰子才计数，这意味着没有掉落的树上的椰子，或者偶尔爆炸的椰子都不计数。地图底部的贝壳中有一个隐藏的传送门，所以明智地使用它！”");
            } else if (selection == 4) {
                cm.sendNext("#b[OX Quiz]#k 是冒险岛中通过X和O来展示智慧的游戏。一旦你加入游戏，按下 #bM#k 打开小地图，看看X和O的位置。一共会有 #r10个问题#k，回答所有问题正确的角色将赢得游戏。\r\n问题给出后，使用梯子进入可能包含正确答案的区域，无论是X还是O。如果角色没有选择答案或者在时间限制内仍然挂在梯子上，角色将被淘汰。在屏幕上的 [CORRECT] 消失之前，请保持你的位置。为了防止任何形式的作弊，OX Quiz期间所有聊天功能将被关闭。");
            } else if (selection == 5) {
                cm.sendNext("#b[寻宝]#k 是一个游戏，你的目标是在地图上的 #rin 10分钟#k 内找到隐藏的 #b宝藏卷轴#k。地图上隐藏着许多神秘的宝箱，一旦打开它们，会有许多物品从宝箱中出现。你的任务是从这些物品中挑选出宝藏卷轴。\r\n宝箱可以用 #b普通攻击#k 打开，一旦你拥有了宝藏卷轴，你可以通过负责交易物品的NPC将其交换成《秘密卷轴》。交易NPC可以在寻宝地图上找到，但你也可以通过立石镇的 #bVikin#k 进行交易。\r\n\r\n这个游戏中有许多隐藏的传送门和隐藏的传送点。要使用它们，只需在特定位置按下 #b上箭头#k，你就会被传送到另一个地方。试着跳来跳去，也许你会碰到隐藏的楼梯或绳索。还会有一个能带你到隐藏地点的宝箱，以及一个只能通过隐藏传送门找到的隐藏宝箱，所以试着四处寻找。\r\n\r\n在寻宝游戏中，所有攻击技能都将被 #r禁用#k，请使用普通攻击打开宝箱。");
            }
             cm.dispose();
        }
    }
}