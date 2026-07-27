/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
               Matthias Butz <matze@odinms.de>
               Jan Christian Meyer <vimes@odinms.de>

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
 -- Odin JavaScript --------------------------------------------------------------------------------
 Alcaster - El Nath Market (211000100)
 -- By ---------------------------------------------------------------------------------------------
 Unknown & Information & xQuasar
 -- Version Info -----------------------------------------------------------------------------------
 1.3 - Fixed up completely [xQuasar]
 1.2 - Add a missing text part [Information]
 1.1 - Recoded to official [Information]
 1.0 - First Version by Unknown
 ---------------------------------------------------------------------------------------------------
 **/

var selected;
var amount;
var totalcost;
var item = [2050003, 2050004, 4006000, 4006001];
var cost = [300, 400, 5000, 5000];
var msg = ["可解除封印和诅咒状态", "可解除所有状态", "，蕴含魔法之力，可用于高品质技能", "，蕴含召唤之力，可用于高品质技能"];
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (!cm.isQuestCompleted(3035)) {
        cm.sendNext("如果你决定帮助我，那么作为回报，我会让这件物品可以出售。");
        cm.dispose();
        return;
    }
    if (mode == 0 && status == 2) {
        cm.sendNext("我明白了。知道我这里有很多不同的物品。随便看看吧。我只卖这些物品给你，所以不会以任何方式欺骗你。");
        cm.dispose();
        return;
    }
    if (mode < 1) {
        cm.dispose();
        return;
    }

    status++;
    if (status == 0) {
        var selStr = "";
        for (var i = 0; i < item.length; i++) {
            selStr += "\r\n#L" + i + "# #b#t" + item[i] + "# (价格: " + cost[i] + " 金币)#k#l";
        }
        cm.sendSimple("多亏了你，#b#t4031056##k已经被安全封印。当然，作为代价，我耗费了过去大约800年中积累的一半能量……不过现在我终于可以安心离世了。哦，对了……你是不是在寻找稀有物品？为了感谢你的辛勤付出，我愿意把我拥有的一些物品出售给你，而且只有你可以购买。请选择你想要的物品吧！" + selStr);
    } else if (status == 1) {
        selected = selection;
        cm.sendGetNumber("你真的需要#b#t" + item[selected] + "##k吗？这是一个" + msg[selected] + "的物品。也许不太容易获得，但我会以优惠的价格卖给你。每个需要 #b" + cost[selected] + " 金币#k。你想购买多少个？", 0, 1, 100);
    } else if (status == 2) {
        amount = selection;
        totalcost = cost[selected] * amount;
        if (amount == 0) {
            cm.sendOk("如果你不打算购买任何东西，那我也没有什么可以卖给你的。");
            cm.dispose();
        }
        cm.sendYesNo("你确定要购买 #r" + amount + " 个 #t" + item[selected] + "##k 吗？每个 #t" + item[selected] + "# 的价格是 " + cost[selected] + " 金币，总共需要支付 #r" + totalcost + " 金币#k。");
    } else if (status == 3) {
        if (cm.getMeso() < totalcost || !cm.canHold(item[selected])) {
            cm.sendNext("你确定你有足够的金币吗？请检查你的杂项栏或使用栏是否已满，或者确认你至少拥有 #r" + totalcost + "#k 金币。");
            cm.dispose();
        }
        cm.sendNext("谢谢你。如果你将来还需要物品，记得再来找我。虽然我年纪大了，但制作魔法物品对我来说依然不成问题。");
        cm.gainMeso(-totalcost);
        cm.gainItem(item[selected], amount);
        cm.dispose();
    }
}