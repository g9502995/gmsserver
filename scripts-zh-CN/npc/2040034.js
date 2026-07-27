/**
 * @author: Eric
 * @author: Ronan
 * @npc: Red Sign
 * @map: 101st Floor Eos Tower (221024500)
 * @func: Ludi PQ
 */
const GameConfig = Java.type('org.gms.config.GameConfig');
var status = 0;
var em = null;
var complete = 0;
const max = GameConfig.getServerInt("party_quest_day_limit");
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
            em = cm.getEventManager("玩具塔");


            if (em == null) {
                cm.sendOk("时空裂缝组队副本遇到了一个错误。");
                cm.dispose();
                return;
            } else if (cm.isUsingOldPqNpcStyle()) {
                action(1, 0, 0);
                return;
            }

            complete = cm.getPlayer().getDayData(em.getName() + "今日完成次数") * 1;

			var text = "#e#b<组队任务：时空裂缝>\r\n#k#n";
				text += em.getProperty("party") + "\r\n";
				text += "\r\n由于上方有极其危险的生物，你无法再往上走。你想要和队友合作完成任务吗？如果是，请让你的#b队长#k和我交谈。#b\r\n"
				text += "\r\n"
                text += `#L0#我想参加组队任务（#r${complete}#b / ${max}）#l\r\n`;
                text += "\r\n";
				text += "#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + "组队搜索。\r\n"
				text += "#L2#我想了解更多详情。";
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("只有当你加入一个队伍时，你才能参加组队任务。");
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
            } else {
                cm.sendOk("#e#b<组队任务：时空裂缝>#k#n\r\n#b#m220000000#!#k出现了时空裂缝！我们迫切需要勇敢的冒险家来击败入侵的怪物。请和一些可靠的盟友组队，拯救#m220000000#! 你必须通过击败怪物和解决谜题来通过各个阶段，最终击败#r#o9300012##k。");
                cm.dispose();
            }
        } 
    }
}