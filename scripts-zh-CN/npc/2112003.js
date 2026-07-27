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
 * @npc: Juliet
 * @map: Magatia - Alcadno - Hidden Room (261000021)
 * @func: Magatia PQ (Alcadno)
 */

var status = 0;
var em = null;
const gold = 500;
const max = 1;
var cache;
// 购买次数使用的货币和数量
const buyItem = 4000601;
const buyCount = 3;
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

        em = cm.getEventManager("朱丽叶");
        if (em == null) {
            cm.sendOk("玛加提亚组队任务（阿尔卡德诺）遇到了一个错误。");
            cm.dispose();
            return;
        }

        const mapId = cm.getMapId()

        if (![261000021, 910002000].includes(mapId)) {
            if (status == 0) {
                var text = "你打算做什么呢？\r\n";

                cm.message("地图ID" + cm.getMapId())
                if(mapId === 926110000){
                    text = "用你的手翻一翻柜子上摆放的书籍，有可能发现过关的关键！\r\n"
                } else if (mapId === 926110100){
                    text = "收集液体灌入到我旁边的瓶子中，要在液体漏出前灌满，3个瓶子都要灌满才能召唤出传送门\r\n"
                } else if (mapId === 926110300){
                    text = "这4个门你随便选择一个，进入后跳到楼上进入BOSS关卡！\r\n"
                } else if (mapId === 926110400){
                    text = "你真的很棒，快从门口进去吧，我的朱丽叶就在那里！\r\n"
                }


                text += "\r\n#b"

                if([926110000].includes(cm.getMapId())){
                    text += `#L1#我想使用${gold}抵用券直接过关#l\r\n`
                } 

                text += "#L2#我想离开！#l\r\n";


                cm.sendSimple(text);
            } else if (status == 1) {

                if(selection === 1){
                    if(gold > cm.getCash(2)){
                        cm.sendNext("抵用券不足！")
                    } else {
                        var eim = cm.getEventInstance()
                        cm.getPlayer().gainCash(2,-gold);
                        cm.sendNext("好吧，传送门已打开，快去进入下一关吧！");
                        eim.showClearEffect();
                        eim.giveEventPlayersStageReward(1);
                        eim.setIntProperty("statusStg1", 1);

                        cm.getMap().getReactorByName("d00").hitReactor(cm.getClient());


                    }
                } else {
                    cm.warp(926110700, 0);
                }

                cm.dispose();
            }
        } else {
            if (status == 0) {
                if (cm.isUsingOldPqNpcStyle()) {
                    action(1, 0, 0);
                    return;
                }
                cache = em.getName() + "今日进入次数"
                var complete = cm.getPlayer().getDayData(cache) * 1;
                var buyNum = cm.getPlayer().getDayData(em.getName() + "购买次数") * 1;
                var maxNum = max;
                if(buyNum){
                    maxNum++;
                }
                var text = "#e#b<组队任务：罗密欧与朱丽叶>\r\n"
                text += "#k#n" + em.getProperty("party") + "\r\n\r\n"
                text += "我的心爱的罗密欧被绑架了！虽然他是泽尼玛斯的人，但我不能坐视不理，看着他因为这场愚蠢的冲突而受苦。我需要你和你的同事们帮助我救他！拜托，帮帮我们！！请让你的#b队伍领袖#k和我交谈。#b\r\n"
                text += `#L0#我想参加组队任务（#r${complete}#b / ${maxNum}）#l\r\n`;
                text += "\r\n";
                if(complete === 1 && maxNum === 1){
                    text += `#L3#我想用${buyCount}个#t${buyItem}:#再进入一次#l\r\n`
                }
                text += "#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索。\r\n"
                text += "#L2#我想了解更多细节。";
                cm.sendSimple(text)
            } else if (status == 1) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("只有当你加入一个队伍时，你才能参加派对任务。");
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
                                var num = player.getDayData(cache) * 1;
                                var buyNum = player.getDayData(em.getName() + "购买次数") * 1
                                var maxNum = max;
                                if(buyNum){
                                    maxNum++;
                                }
                                if(num >= maxNum){
                                    cm.message(`${ch.getName()}参与次数过多！`);
                                    pass.push(ch.getName());
                                }
                            }
                        }
                        if(pass.length > 0){
                            
                            cm.sendOk(`队员中 #b${pass.join(",")}#k 今日次数过多，不能参与！`);
                        } else {
                            var eli = em.getEligibleParty(cm.getParty());
                            if (eli.size() > 0) {
                                if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                    cm.sendOk("另一个队伍已经进入了该频道的#r组队任务#k。请尝试其他频道，或者等待当前队伍完成。");
                                }
                            } else {
                                cm.sendOk("你目前无法开始这个组队任务，因为你的队伍可能不符合人数要求，有些队员可能不符合参与条件，或者他们不在这张地图上。如果你找不到队员，可以尝试使用组队搜索功能。");
                            }
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("你的组队搜索状态现在是：#b" + (psState ? "enabled" : "disabled") + "#k。想要改变状态时随时找我。");
                    cm.dispose();
                } else if (selection == 3){
                    var text = `你确定要使用${buyCount}个#i${buyItem}:# #r#t${buyItem}:##k 兑换1次进入权限吗？\r\n\r\n`
                        text +="#b"
                        text += "#L1#是的，我要再进入1次\r\n";
                        text += "#L2#我再考虑考虑\r\n";

                    cm.sendSimple(text)
                } else {
                    cm.sendOk("不久前，一位名叫尤利特的科学家因为他对阿尔卡德诺和泽诺米斯的合成炼金术的研究而被这个城镇放逐。由于这种组合所带来的巨大力量，根据法律是禁止研究的。然而，他无视了这项法律，同时进行了这两项研究。结果，他被流放了。\r\n他现在在报复，已经带走了我心爱的人，下一个目标是我，因为我们是玛加提亚的重要人物，是这两个社会的继承者。但我不害怕。我们必须不惜一切代价把他救回来！");
                    cm.dispose();
                }
            } else if (status == 2){
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
            }
        }
    }
}