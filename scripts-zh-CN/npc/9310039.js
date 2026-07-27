
const QuestID = 8534; //限制任务ID，我取消了
var status;
var em = null;
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

        em = cm.getEventManager("妖僧");

        complete = cm.getPlayer().getDayData(em.getName() + "今日进入次数") * 1;

        if(status == 0){
            let msg = `#e#b<组队任务> ${em.getName()}#n\r\n#k${em.getProperty("party")}\r\n\r\n`;
                msg += `组队完成任务怎么样？在这里你会遇到一些困难的问题，如果没有出色的团队合作，你是无法完成的。如果你想尝试，请作为#b队长#k来找我谈谈。#b\r\n`;
                msg += `#L0#我想参加组队任务。（#r${complete}#b / ${max}）#l\r\n`;
                msg += `#L1#我想${(cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启")}组队搜索。#l\r\n`;
                msg += `#L2#我想了解更多细节。#l`;
            cm.sendSimple(msg);
        }else if (status == 1){

            if(selection === 0){
                if (cm.getParty() == null) {
                    cm.sendNext("只有当你加入一个队伍时，你才能参加组队任务。");
                } else if (!cm.isLeader()) {
                    cm.sendNext("必须由你的队长与我交谈才能开始这个组队任务。")
                } else {

                    var party = cm.getParty().getMembers();
                    var pass = [];
                    for (var i = 0; i < party.size(); i++) {
                        let ch = party.get(i);
                        let player = ch.getPlayer();
                        if(player){
                            var num = player.getDayData(em.getName() + "今日进入次数") * 1;
                            if(num >= max){
                                cm.message(`${ch.getName()}参与次数过多！`);
                                pass.push(ch.getName());
                            }
                        }
                    }
                    if(pass.length > 0){
                        
                        cm.sendOk(`队员中 #b${pass.join(",")}#k 今日进入次数过多，不能参与！`);
                        
                    }else{
                        let eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {//开始事件
                                cm.sendNext("另一个队伍已经进入了该频道的#r组队任务#k。请尝试其他频道，或者等待当前队伍完成。");
                            }
                        } else {
                            cm.sendNext("你目前无法开始这个组队任务，因为你的队伍可能不符合人数要求，有些队员可能不符合参与条件，或者他们不在这张地图上。如果你找不到队员，可以尝试使用组队搜索功能。\r\n");
                        }
                    }
                }
                

                cm.dispose();


            }else if (selection === 1){
                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                cm.sendNext("你的组队搜索状态现在是：#b" + (psState ? "启用" : "禁用") + "#k。想要改变状态时随时找我谈谈。");
                status = -1;
            }else if (selection === 2){
                cm.sendNext(`#e#b<组队任务> 少林密室#k#n\r\n带领你的队员到#e#b#m702060000##n#k进行调查并解决问题的源头。`);
                status = -1;
            }else {
                cm.dispose();
            }

        }else{
            cm.dispose();
        }

    }
}
