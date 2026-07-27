/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 -- Odin JavaScript --------------------------------------------------------------------------------
 Shuri the Tour Guide - Orbis (200000000)
 -- By ---------------------------------------------------------------------------------------------
 Information & Xterminator
 -- Version Info -----------------------------------------------------------------------------------
 1.0 - First Version
 ---------------------------------------------------------------------------------------------------
 **/

var pay = 2000;
var ticket = 4031134;
var msg;
var check;

var status = 0;

function start() {
    cm.sendSimple("你听说过那个可以欣赏到壮观海景的海滩吗，它叫做 #b#m110000000##k，离 #m" + cm.getPlayer().getMapId() + "# 有一点距离。我可以带你去那里，只需要 #b" + pay + " 冒险币#k，或者如果你带了 #b#t" + ticket + "##k，那就可以免费进去。\r\n\r\n#L0##b我付 " + pay + " 冒险币.#k#l\r\n#L1##b我有 #t" + ticket + "##k#l\r\n#L2##b#t" + ticket + "# 是什么？#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.sendNext("你一定有一些事情要处理。你一定因为旅行和打猎而感到疲倦。去休息一下，如果你改变主意了，再来找我谈谈吧。");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 1) {
            if (selection == 0 || selection == 1) {
                check = selection;
                if (selection == 0) {
                    msg = "你想支付 #b" + pay + " 金币#k 前往 #m110000000# #k吗?";
                } else if (selection == 1) {
                    msg = "所以你有 #b#t" + ticket + "##k吗? 有了他，你随时都前往 #m110000000# 。";
                }
                cm.sendYesNo(msg + " 好的！不过要注意，你在那附近可能会遇到一些怪物，所以千万别掉以轻心哦。那么，你现在要前往 #m110000000# 吗?");
            } else if (selection == 2) {
                cm.sendNext("你一定对#b#t" + ticket + "##k很好奇。是的，我能理解。#t" + ticket + "#是一种物品，只要你拥有它，就可以免费前往#m110000000#。这是一种非常稀有的物品，我们甚至不得不购买，但不幸的是，我在几个星期前的一个长周末丢失了我的。");
                status = 3;
            }
        } else if (status == 2) {
            if (check == 0) {
                if (cm.getMeso() < pay) {
                    cm.sendOk("我觉得你缺少冒险币。你知道，有很多方法可以赚钱，比如……卖掉你的盔甲……打败怪物……做任务……你知道我在说什么。");
                    cm.dispose();
                } else {
                    cm.gainMeso(-pay);
                    access = true;
                }
            } else if (check == 1) {
                if (!cm.haveItem(ticket)) {
                    cm.sendOk("嗯，#b#t" + ticket + "##k到底在哪里呢？你确定你有它们吗？请再检查一遍。");
                    cm.dispose();
                } else {
                    access = true;
                }
            }
            if (access) {
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
                cm.dispose();
            }
        } else if (status == 3) {
            cm.sendNext("你一定对#b#t" + ticket + "##k很好奇。是的，我能理解。#t" + ticket + "#是一种物品，只要你拥有它，就可以免费前往#m110000000#。这是一种非常稀有的物品，我们甚至不得不购买，但不幸的是，我在几个星期前的一个长周末丢失了我的。");
        } else if (status == 4) {
            cm.sendPrev("我没带着它就回来了，少了它的感觉真的糟透了。真希望有人捡到了它，把它放在了安全的地方。总之这就是我的经历啦，说不定呢，你之后可能会捡到它，让它派上好用场。要是你有什么问题，尽管问就好。");
        } else if (status == 5) {
            cm.dispose();
        }

    }
}