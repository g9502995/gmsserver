var arena;
var status = 0;
var gold = 5;
var apqpoints = 0;
function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("嘿，我在竞技场的战斗中没看到你！你在这里做什么？");
        cm.dispose();
        return;
    }

    if(arena.getAriantRewardTier(cm.getPlayer()) > 0){
        cm.sendOk("先去找我的妻子#b#p2101016##k交谈！");
        cm.dispose();
        return;
    }

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

            apqpoints = cm.getPlayer().getAriantPoints();

            var text = "\t你好，我能为你做些什么？\r\n"
            text += "\t你的战斗竞技场分数：#r" + apqpoints + "#k 点\r\n";
            text += "#b"
            text += "#L0#我想用竞技积分兑换#t3010018:##l\r\n";
            text += "#L2#我想用竞技积分兑换#t2430100:##l\r\n";
            text += "#L3#我想用点券购买#t3010018:##l\r\n";
            text += "#L1#我想了解更多关于战斗竞技场点数的相关信息#l\r\n";

            cm.sendSimple(text);

        } else if (status == 1) {
            if (selection == 0) {
                
                if (apqpoints >= gold) {
                    cm.getPlayer().gainAriantPoints(-gold);
                    cm.gainItem(3010018, 1);
                    cm.sendOk("好的，我们做了一次很愉快的交易，请收好你的奖品！");
                
                } else {
                    cm.sendOk(`想要#t3010018:#需要${gold}点竞技点数！`);
                }

                cm.dispose();
            } else if (selection == 1) {
                cm.sendOk("主要目标是让玩家在战斗竞技场中积累点数，以便兑换最高奖品：#b#t3010018:##k。在战斗中积累点数，当时机成熟时与我交谈以获取奖品。在每场战斗中，玩家有机会根据最终拥有的珠宝数量来获得积分。但要小心！如果你的积分与其他玩家的差距#r过大#k的话，那一切都将化为乌有，你只能获得微薄的#r1点#k。");
                cm.dispose();
            }else if (selection == 2){
                var text = "1比1兑换#t2430100:#，你打算兑换多少？\r\n\r\n#b";
                text += "#L1#兑换1个#l\r\n";
                text += "#L5#兑换5个#l\r\n";
                text += "#L10#兑换10个#l\r\n";
                cm.sendSimple(text);
            }else if (selection == 3){
                var text = "年轻人，有点耐心吗，有点勇士完成1场就能换啦！\r\n如果你真的需要，那你需要花费1000点券!\r\n\r\n#b";
                text += "#L999#我没有耐心，直接买吧！\r\n";
                cm.sendSimple(text);
            }

        } else if (status == 2){

            if(selection === 999){
                if(1000 > cm.getPlayer().getCashShop().getCash(1)){
                    cm.sendOk("点券不足");
                }else if(cm.getItemQuantity(3010018)){
                    cm.sendOk("你已经有#t3010018#了");
                }else if(!cm.canHold(3010018)){
                    cm.sendOk("背包空间不足！");
                }else {
                    cm.gainItem(3010018,1);
                    cm.getPlayer().getCashShop().gainCash(1,-1000);
                    cm.message(`失去点券 (-1000)`);
                    cm.sendOk("好的，请你收好！");
                }
            }else if(selection > apqpoints){
                cm.sendOk(`想要#t2430100:#需要${selection}点竞技点数！`);
            }else{
                if(cm.canHold(2430100,selection)){
                    cm.gainItem(2430100,selection);
                    cm.getPlayer().gainAriantPoints(-selection);
                    cm.sendOk("好的，我们做了一次很愉快的交易，请收好你的奖品！");
                }else{
                    cm.sendOk("背包空间不足！");
                }
            }

            cm.dispose();

        } else{
            cm.dispose();
        }
    }
}
