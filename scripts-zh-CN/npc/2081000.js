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
var temp;
var cost = 30000;
var item1 = 4031511;
var item2 = 4031512;
var status = 0;
var index = 0;
function start() {
    var text = `...我可以帮你吗？\r\n#L0##b购买魔法种子#k#l\r\n`
    // text += `#L1##b我想要#t${item1}#和#t${item2}##k#l`;
    cm.sendSimple(text);
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 3)) {
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("请仔细考虑。一旦你做出了决定，请告诉我。");
        cm.dispose();
        return;
    }
    status++;
    if (status == 1) {
        if (selection == 0) {
            index = 0;
            cm.sendSimple("你好像不是本地人。我能帮你吗？\r\n#L0##b我想要一些#t4031346#。#k#l");
        } else {
            index = 1;
            cm.sendYesNo("需要你拿 #r#t4031348:##k 来换！确定要换吗？");
        }
    } else if (status == 2) {
        if(index == 1){
            if(cm.haveItem(4031348)){
                if(cm.canHoldAll([item1,item2])){
                    cm.gainItem(item1);
                    cm.gainItem(item2);
                    cm.gainItem(4031348,-1);
                    cm.sendOk("请你拿好，祝你游戏愉快！");
                }else{
                    cm.sendOk("背包空间不足！");
                }
            }else{
                cm.sendOk("你没有#t4031348#");

            }
            cm.dispose();
        }else{
            cm.sendGetNumber("#b#t4031346##k这是件珍贵物品，我不能就这样白白送给你\r\n我以每件 #b30,000 金币#k 的价格卖给你，你愿意购买吗？那你想要多少个？\r\n　\r\n", 1, 1, 99);
        }
        
    } else if (status == 3) {
        if (selection < 1) {
            cm.sendOk("我不能卖给你。");
            cm.dispose();
        } else {
            temp = selection;
            cost = cost * selection;
            cm.sendYesNo("购买 #b" + temp + " 个 #t4031346##k 将花费你 #b" + cost + " 金币#k。你确定要购买吗？");
        }
    } else if (status == 4) {

        if(temp > 0){
            if (cost > cm.getMeso() || !cm.canHold(4031346)) {
                cm.sendOk("请检查并查看您是否有足够的金币来进行购买。另外，我建议您检查杂项物品栏，看看是否有足够的空间来进行购买。");
            } else {
                cm.sendOk("好，请你拿好咯！");
                cm.gainItem(4031346, temp);
                cm.gainMeso(-cost);
            }
        }
        cm.dispose();
    }
}