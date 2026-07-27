/*
  NPC Name:     The Forgotten Temple Manager
  Map(s):     Deep in the Shrine - Twilight of the gods
  Description:    Pink Bean
 */

var status;
var eim;

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

        if(eim === null){
          cm.warp(270050000)
          cm.dispose();
        }else{
          if (status == 0) {
              if (!eim.isEventCleared()) {
                  cm.sendYesNo("你现在想出去吗？");
              } else {
                  cm.sendYesNo("你们团队厉害呀，你现在要出去吗？");
              }
          } else if (status == 1) {

              if (!eim.isEventCleared()) {
                  cm.warp(270050000, 0);
              } else {
                  //完成了
                  if (eim.giveEventReward(cm.getPlayer(), 1)) {


                      const reward = eim.getObjectProperty("reward");
                      const copy = eim.getEm().getName();
                      const party = eim.getPlayers();
                      const count = party.size() * 2;

                      var ch = cm.getPlayer();

                      const player = ch.getAbstractPlayerInteraction();

                      if (reward.leader && eim.isEventLeader(ch)) {
                          if (player.canHold(reward.leader)) {
                              player.gainItem(reward.leader);
                              ch.saveLog(copy, 0, reward.leader, 1);
                          } else {
                              ch.message("背包已经满了！");
                          }
                      }

                      if (reward.exp) ch.gainExp(reward.exp);
                      if (reward.meso) ch.gainMeso(reward.meso);
                      if (reward.coin) {
                          if (player.canHold(reward.coin)) {
                              player.gainItem(reward.coin);
                          } else {
                              ch.message("背包已经满了！")
                          }
                      }
                      if (reward.cert) {
                          if (player.canHold(reward.cert, count)) {
                              player.gainItem(reward.cert, count);
                          } else {
                              ch.message("背包已经满了！")
                          }
                      }

                      if (reward.item) {
                          reward.item.forEach(v => {
                              if (player.canHold(v[0], v[1])) {
                                  player.gainItem(v[0], v[1]);
                              } else {
                                  ch.message("背包已经满了！")
                              }
                          })
                      }

                      var cache = copy + "今日完成次数"
                      ch.saveDayData(cache, (ch.getDayData(cache) * 1) + 1);

                      var cache = copy + "总完成次数"
                      ch.saveData(cache, (ch.getData(cache) * 1) + 1);

                      ch.serverMessage(`完成了【${copy}】组队任务！`);

                      cm.warp(270050000);

                  } else {
                      cm.sendOk("如果你的装备、使用、设置和其他物品栏中没有空位，你将无法获得实例奖励。");
                  }
              }

              cm.dispose();

          } else {

              cm.dispose();

          }
        }

        
    }
}