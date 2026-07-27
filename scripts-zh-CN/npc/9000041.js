/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/* NPC: Donation Box (9000041)
	Victoria Road : Henesys
	
	NPC Bazaar:
        * @author Ronan Lana
*/

var options = ["EQUIP", "USE", "SET-UP", "ETC"];
var name;
var status;
var selectedType = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        cm.dispose();
        return;
    }

    if (status == 0) {
        const GameConfig = Java.type('org.gms.config.GameConfig');
        if (!GameConfig.getServerBoolean("use_enable_custom_npc_script")) {
            cm.sendOk("你想做什么？");
            cm.dispose();
            return;
        }

        var selStr = "“你好，我是 #b bazaar NPC#k！把你背包里不需要的任何物品卖给我吧。#r 警告 #b：确保你准备好要出售的物品放在你选中要出售的物品 #r 之后 #b 的栏位里。#k 所有在选中物品 #b 下方 #k 的物品都会被彻底卖掉。”";
        for (var i = 0; i < options.length; i++) {
            selStr += "\r\n#L" + i + "# " + options[i] + "#l";
        }
        cm.sendSimple(selStr);
    } else if (status == 1) {
        selectedType = selection;
        cm.sendGetText("From what item on your #r" + options[selectedType] + "#k inventory do you want to start the transaction?");
    } else if (status == 2) {
        name = cm.getText();
        var res = cm.getPlayer().sellAllItemsFromName(selectedType + 1, name);

        if (res > -1) {
            cm.sendOk("交易完成！你从这个行动中获得了#r" + cm.numberWithCommas(res) + "金币#k。");
        } else {
            cm.sendOk("你的#b'" + name + "'#k物品栏中没有#b" + options[selectedType] + "#k！");
        }

        cm.dispose();
    }
}