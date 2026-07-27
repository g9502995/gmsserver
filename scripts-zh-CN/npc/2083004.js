/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*Mark of the Squad
 *
 *@author Alan (SharpAceX)
 *@author Ronan
 */

var status = 0;
var expedition;
var expedMembers;
var player;
var em;
const ExpeditionType = Java.type('org.gms.server.expeditions.ExpeditionType');
const exped = ExpeditionType.HORNTAIL;
var expedName = "暗黑龙王";
var expedBoss = "强大的暗黑龙王";
var complete = 0;
var max = 3;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    
    if (mode == -1 ||  mode == 0 && selection == -1) {
        cm.dispose();
    } else {
      
        player = cm.getPlayer();
        expedition = cm.getExpedition(exped);
        em = cm.getEventManager("暗黑龙王");

        complete = player.getDayData(em.getName() + "今日进入次数") * 1;


        var list = "\r\n\t你的小伙伴们都到齐了吗？#b\r\n\r\n"
        list += `#L2#开始战斗！#l\r\n\r\n`
        list += "#L1#查看当前远征队成员#l\r\n"
        list += "#L3#解散远征队#l";

        if (status == 0) {
            if (expedition == null) { //Start an expedition
                var text = "#e#b<远征：" + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n"
                text += "\t你想组建一个远征队来挑战 #r" + expedBoss + "#k 吗？\r\n\r\n"
                text +=`#b#L1#创建远征队（#r${complete}#b / ${max}）#l\r\n`;
                text += "#L2#不，我想再等一会儿...#l"
                cm.sendSimple(text);
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {
                    cm.sendOk("你的探险已经在进行中，对于那些仍在战斗中的人，让我们为那些勇敢的灵魂祈祷吧。");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("你已经注册了这次远征。请等待 #r" + expedition.getLeader().getName() + "#k 开始。");
                    cm.dispose();
                } else { //If you aren't in it, you're going to get added
                    cm.sendOk(expedition.addMember(cm.getPlayer()));
                    cm.dispose();
                }
            } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                if (expedition.contains(player)) { //If you're registered, warp you in
                    var eim = em.getInstance(expedName + player.getClient().getChannel());
                    if (eim.getIntProperty("canJoin") == 1) {
                        eim.registerPlayer(player);
                    } else {
                        cm.sendOk("你的远征队已经开始对抗" + expedBoss + "的战斗。让我们为这些勇敢的灵魂祈祷。");
                    }

                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("另一支探险队已经主动挑战了" + expedBoss + "，让我们为这些勇敢的灵魂祈祷吧。");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                expedition = cm.getExpedition(exped);
                if (expedition != null) {
                    cm.sendOk("有人已经主动成为了远征队的领袖。试着加入他们吧！");
                    cm.dispose();
                    return;
                }

                var res = cm.createExpedition(exped);
                if (res == 0) {
                    cm.sendOk("#r" + expedBoss + " 远征#k 已经创建。\r\n\r\n快让你的小伙伴找我谈话加入远征队吧！");
                    status = 0
                } else if (res > 0) {
                    cm.sendOk("抱歉，您已经达到了此次远征的尝试配额！请另选他日再试……");
                    cm.dispose();
                } else {
                    cm.sendOk("在开始远征时发生了意外错误，请稍后重试。");
                    cm.dispose();
                }

                

            } else {
                cm.sendOk("当然，并非每个人都能挑战" + expedBoss + "。");
                cm.dispose();
            }
 
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("无法加载远征。");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("你是探险队中唯一的成员。");
                    cm.dispose();
                    return;
                }
                var text = "以下是你的成员#r（点击名称可将其请离队伍）：\r\n";
                for (var i = 1; i < size; i++) {
                    text += "\r\n#b#L" + i + "#" + i + ". " + expedMembers.get(i).getValue() + "#l\n";
                }
                cm.sendSimple(text);
                status = 6;
            } else if (selection == 2) {
                var min = exped.getMinSize();

                var size = expedition.getMemberList().size();
                if (size < min) {
                    cm.sendOk("你的远征队至少需要有" + min + "名玩家注册。");
                    cm.dispose();
                    return;
                }

                var members = expedition.getActiveMembers();
                var pass = [];
                members.forEach(ch => {
                    var num = ch.getDayData(em.getName() + "今日进入次数") * 1;
                    if(num >= max){
                        ch.message(`${ch.getName()}参与次数过多！`);
                        pass.push(ch.getName());
                    }
                })
                if(pass.length > 0){
                    cm.sendOk(`成员中 #b${pass.join(",")}#k 今日进入次数过多！`);
                    status = 0;
                }else{
                    cm.sendOk("远征队将开始，现在将由护送你前往 #b" + expedBoss + " #k 的所在地。");
                    status = 4;
                }
            } else if (selection == 3) {
                const PacketCreator = Java.type('org.gms.util.PacketCreator');
                player.getMap().broadcastMessage(PacketCreator.serverNotice(6, expedition.getLeader().getName() + "探险结束了。"));
                cm.endExpedition(expedition);
                cm.sendOk("这次探险已经结束。有时候最好的策略就是逃跑。");
                cm.dispose();

            } else {
                cm.dispose();
            }
        } else if (status == 4) {
            
            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if (!em.startInstance(expedition)) {
                cm.sendOk("另一支探险队已经主动挑战了" + expedBoss + "，让我们为这些勇敢的灵魂祈祷吧。");
            }

            cm.dispose();

        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection);
                expedition.ban(banned);
                cm.sendOk("你已经从远征中禁止了 " + banned.getValue() + "。");
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        } else {
            cm.dispose();
        }
    }
}