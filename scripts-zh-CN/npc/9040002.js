/* 
 * This file is part of the OdinMS Maple Story Server
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

/* 
 * @Author Lerk
 * 
 * Shawn, Victoria Road: Excavation Site<Camp> (101030104)
 * 
 * Guild Quest Info
 */

var status;
var selectedOption;

function start() {
    selectedOption = -1;
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
        if (mode == 1 && status == 3) {
            status = 0;
        }
        if (status == 0) {
            var prompt = "\r\n#b#L0# 圣瑞尼亚?#l\r\n#b#L1# #t4001024:#是什么?#l\r\n#b#L2# 家族任务?#l\r\n#b#L3# 没有啦，我现在没事了。#l";
            if (selectedOption == -1) {
                prompt = "我们家族，长久以来一直试图解读古老的珍贵遗迹 ——“翡翠石板”。经过不懈努力，我们发现了一个惊天秘密：远古神秘国度 “圣瑞尼亚”（Sharenian）就沉睡于此。同时我们还查明，传说中神秘的至宝 #t4001024#（传奇首饰）的线索，或许就藏在圣瑞尼亚的遗迹之中。这正是家族开启家族任务（Guild Quest），决心找到 #t4001024# 的原因。" + prompt;
            } else {
                prompt = "你还有其他问题吗?" + prompt;
            }
            cm.sendSimple(prompt);
        } else if (status == 1) {
            selectedOption = selection;
            if (selectedOption == 0) {
                cm.sendNext("莎莲尼亚是过去一个有控制金银岛每个地区的文明。魔像神殿，地牢深处的神殿，以及其他无人知晓建造者的古老建筑都是在莎莲尼亚时期建造的。");
            } else if (selectedOption == 1) {
                cm.sendNext("#t4001024# 是一颗传奇宝石，拥有它的人将获得永恒的青春。讽刺的是，似乎每个拥有 #t4001024# 的人最终都沦为了落魄之人，这或许可以解释夏雷尼安的衰落。");
                status = -1;
            } else if (selectedOption == 2) {
                cm.sendNext("我之前曾经派遣过一些探险者前往夏利安，但他们没有一个回来，这促使我们开始公会任务。我们一直在等待足够强大的公会来应对艰难的挑战，像你们这样的公会。");
            } else if (selectedOption == 3) {
                cm.sendOk("真的吗？如果你还有其他问题要问，随时都可以和我交谈。");
                cm.dispose();
            } else {
                cm.dispose();
            }
        } else if (status == 2) { //should only be available for options 0 and 2
            if (selectedOption == 0) {
                cm.sendNextPrev("莎蕾尼安的最后一位国王是一位名叫莎蕾尼三世的绅士，显然他是一位非常睿智和富有同情心的国王。但有一天，整个王国崩溃了，对此没有任何解释。");
            } else if (selectedOption == 2) {
                cm.sendNextPrev("这个公会任务的最终目标是探索夏雷尼安并找到#t4001024#。这不是一个靠力量解决一切的任务。团队合作在这里更加重要。");
            } else {
                cm.dispose();
            }
        }
    }
}