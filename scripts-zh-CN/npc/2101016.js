var arena;
var status = 0;
var copns;
function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("嘿，我在竞技场的战斗中没看到你！你在这里做什么？");
        cm.dispose();
        return;
    }

    cm.removeAll(2270002)
    cm.removeAll(2100067)

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

        var copns = arena.getAriantScore(cm.getPlayer());

        //根据竞技点数换算比率得到的实际竞技点数（10珠宝=1积分）
        var give = arena.getAriantRewardTier(cm.getPlayer());

        give = Math.floor(copns / 10);

        var items = [4033004, 4000602];
        var count = [give,1];

        if (status == 0) {

            if (copns < 1) {
                cm.sendOk("我最喜欢珠宝了，你有吗？可以换一些奖励哦，想了解更多去找#b#p2101015##k谈谈吧。");
                cm.dispose();
            } else {
                var text = '';
                if(give > 0){

                    if(cm.canHoldAll(items,count)){

                        text ="\r\n\t很好，你完成了比赛，并且带来了我喜欢的#b" + copns + "#k珠宝。\r\n"
                        text +="\t你获得了我的奖励：\r\n\r\n"
                        
                        text += "\t#r" + give + " 战斗竞技场分\r\n"
                        for(let i=0;i < items.length; i++){
                            text += `\t${count[i]} #t${items[i]}:#\r\n`;
                        }
                        text +="\r\n\t#k下次要给我更多的宝石噢！去找#b#p2101015##k谈谈吧。";
                        
                        arena.clearAriantRewardTier(cm.getPlayer());
                        arena.clearAriantScore(cm.getPlayer());
                        
                        cm.getPlayer().gainExp(Math.ceil(920 * cm.getPlayer().getExpRate() * give), true, true);
                        cm.getPlayer().gainAriantPoints(give);
                        cm.message(`竞技点数 (+${give})`);
                        for (var i = 0; i < items.length; i++) {
                            cm.gainItem(items[i] , count[i]);
                        }
                        cm.removeAll(4031868);

                        cm.getPlayer().serverMessage("完成了【阿里安特竞技】获得了竞技点数！");

                        cm.getPlayer().saveDayData("阿里安特竞技场组队任务今日完成次数" , 1);

                    }else{
                        text = "背包空间不足！"
                    }
                }else{
                    text = "你的珠宝太少了，至少10个以上我才能给你奖励哦！";
                }

                cm.sendOk(text);
                cm.dispose();
            }
        } else {

            cm.dispose();
        }
    }
}


