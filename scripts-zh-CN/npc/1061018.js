
var status;
var eim;
var isComplete = false;
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

        eim = cm.getEventInstance();

        if(status == 0){

            if( [
                    105100300, // 蝙蝠怪的本尊
                    105100400 ].includes(cm.getPlayer().getMapId()) ){
                if(eim.getIntProperty("defeatedBoss") === 1){

                    if(eim.isEventLeader(cm.getPlayer())){
                        //完成了
                        cm.sendNext("你们团队厉害呀，居然胜利了~！");
                        cm.getPlayer().saveDayData("今日挑战巨魔蝙蝠", 1, true);
                        isComplete = true;
                    }else{
                        cm.sendNext("你们团队厉害呀，居然胜利了~！请等待队长找我谈话");
                        cm.dispose();
                    }
                    
                }else{
                    //没有完成，是要离开
                    cm.sendYesNo("你要离开此地图吗？");
                }
            }else{
                cm.sendNext("....");
                cm.dispose();
            }
            
            
            
        }else if (status === 1){

            if(isComplete){

                const reward = eim.getObjectProperty("reward");
                const copy = eim.getEm().getName();
                const party = eim.getPlayers();
                const count = party.size() * 2
                for (var i = 0; i < party.size(); i++) {
                    var ch = party.get(i);
                    const player = ch.getAbstractPlayerInteraction();

                    if(reward.leader && eim.isEventLeader(ch)){
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

                eim.warpEventTeam(cm.getMapId() == 105100300 ? 105100301 : 105100401);
                eim.clearPQ();

                
            }else{
                cm.warp(105100100);
            }

           
            cm.dispose();
        } else {
            cm.dispose();
        }





    }
}



