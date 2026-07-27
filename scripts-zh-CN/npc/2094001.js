//海盗奖励NPC 无恙

var status = -1;
const PacketCreator = Java.type('org.gms.util.PacketCreator');
var eim = null;

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

        if (cm.getMapId() == 925100500) {
            if (status == 0) {
                if (cm.isEventLeader()) {
                    cm.sendOk("多亏了你们的努力，我得救了！谢谢，伙计们！");
                } else {
                    cm.sendOk("多亏了你们的努力，我得救了！谢谢你们！在我给你们奖励之前，让你们的队长先和我说话...");
                    cm.dispose();
                }
            } else {

                var eim = cm.getPlayer().getEventInstance();

                if(eim){

                    const reward = eim.getObjectProperty("reward");
                    const copy = eim.getEm().getName();
                    
                    const party = eim.getPlayers();
                    const count = party.size() * 2;

                    for (var i = 0; i < party.size(); i++) {

                        let ch = party.get(i);
                        const player = ch.getAbstractPlayerInteraction();
                        
                        if(reward.leader && player.isLeader()){
                            if(player.canHold(reward.leader)){
                                player.gainItem(reward.leader);
                                ch.saveLog(copy,0,reward.leader,1);
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

                        if(reward.item){
                            reward.item.forEach(v => {
                                if(player.canHold(v[0],v[1])){
                                    player.gainItem(v[0],v[1]);
                                }else{
                                    ch.message("背包已经满了！")
                                }
                            })
                        }

                        var cache = copy + "今日完成次数"
                        ch.saveDayData(cache, (ch.getDayData(cache) * 1) + 1);

                        var cache = copy + "总完成次数"
                        ch.saveData(cache , (ch.getData(cache) * 1) + 1);

                        ch.serverMessage(`完成了【${copy}】组队任务！`);
                    }

                    eim.clearPQ();
                    

                }
                

               

                cm.dispose();
            }
        } else {
            if (status == 0) {
                cm.sendSimple("\t感谢你我的恩人，你需要我帮你做什么？\r\n\r\n#b#L0#带我离开这里。");
            } else if (status == 1) {
                if (selection == 0) {

                    cm.warp(910002000, 2);

                } else {

                    var give = getEquipResult();
                    if (!give.send) {
                        cm.sendOk("你已经有最高好的帽子了")
                    } else {

                        if (cm.haveItem(4001158, 20)) {
                            if (cm.canHold(give.send, 1)) {
                                cm.gainItem(4001158, -20);
                                cm.gainItem(give.send, 1);
                                if (give.recycle) {
                                    cm.gainItem(give.recycle, -1);
                                }
                                cm.sendOk("好，谢谢你对我的帮助！\r\n这件#t" + give.give + "#送你！\r\n\r\n如你有更多的#t4001158#再来找我换更好的帽子！");
                            } else {
                                cm.sendOk("背包不足。");
                            }
                        } else {
                            cm.sendOk("你需要20个#t4001158#来获得下一个帽子。");
                        }
                    }
                }

                cm.dispose();
            }
        }

    }
}



var equipIds = [1002571, 1002572, 1002573, 1002574]; // 装备ID列表（从低到高）

function getEquipResult() {
    // 1. 遍历装备列表，检查用户拥有的装备
    const ownedEquips = [];
    for (const id of equipIds) {
        if (cm.haveItem(id, 1)) { // 调用已有方法判断是否拥有该装备
            ownedEquips.push(id);
        }
    }

    // 2. 没有任何装备
    if (ownedEquips.length === 0) return { send: equipIds[0], recycle: null, ints: 1 };


    // 3. 找到用户拥有的最高级装备（在列表中索引最大的）
    const maxIndex = Math.max(...ownedEquips.map(id => equipIds.indexOf(id)));
    const highestOwned = equipIds[maxIndex];

    // 4. 拥有最高级装备（第4个）
    if (maxIndex === equipIds.length - 1) return { send: null, recycle: null, ints: maxIndex };


    // 5. 拥有非最高级装备，返回下一级并回收当前最高级
    return { send: equipIds[maxIndex + 1], recycle: highestOwned };
}
