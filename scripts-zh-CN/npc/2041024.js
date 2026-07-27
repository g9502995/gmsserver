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

var status;
var complete = 0;
var max = 3;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        var em = cm.getEventManager("闹钟");
        complete = cm.getCharacterExtendValue(em.getName() + "今日进入次数",true) * 1;
        if(status === 0){
            var text = "#e#b<组队任务：#o8500001#>\r\n#k#n";
                text += em.getProperty("party") + "\r\n";
                text += "\r\n你想要组建或加入一个队伍来挑战#b#o8500002##k吗？让你的#b队伍领袖#k和我交谈或者自己组建一个队伍。#b\r\n"
                text += "\r\n"
                text += `#L0#我想参加组队任务（#r${complete}#b / ${max}）#l\r\n`;
                text += "\r\n";
                text += "#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + "组队搜索。\r\n"
                text += "#L2#我想了解更多细节。\r\n"
            cm.sendSimple(text);
        }else if(status === 1){
            if(selection === 0){
                // 进入战斗

                if (cm.getParty() == null) {
                    cm.sendOk("只有当你加入一个队伍时，才能参加派对任务。");
                } else {
                    
                    var party = cm.getParty().getMembers();
                    var pass = [];
                    for (var i = 0; i < party.size(); i++) {
                        let ch = party.get(i);
                        let player = ch.getPlayer();
                        if(player){
                            var api = player.getAbstractPlayerInteraction();
                            var num = api.getCharacterExtendValue(em.getName() + "今日进入次数",true) * 1;
                            if(num >= max){
                                cm.message(`${ch.getName()}参与次数过多！`);
                                pass.push(ch.getName());
                            }
                        }
                    }
                    if(pass.length > 0){
                        
                        cm.sendOk(`队员中 #b${pass.join(",")}#k 今日进入次数过多，不能参与！`);
                        
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

                }

                cm.dispose();

            }else if (selection === 1){
                //关闭搜索
                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                cm.sendOk("你的组队搜索状态现在是：#b" + (psState ? "启用" : "禁用") + "#k。想要改变状态时随时找我谈谈。");
                cm.dispose();
            }else if (selection === 2){
                //了解更多
                cm.sendNext("#r#o8500001# #k是一位非常强大的BOSS，它携带了大量的物品，只要你和你的团队把它杀死就可以获得它的宝物。但你需要使用 #b时空裂缝碎片#k 修复裂缝后它才会出现！");
                status = -1;
            }else{
                cm.dispose();
            }
        }else{
            cm.dispose()
        }
    
    }
}