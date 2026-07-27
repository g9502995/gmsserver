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
//@Author Moogra, Ronan
//Fixed grammar, javascript syntax

var status = 0;
var money1 = 5000; //获得凭证的点券价格
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

        if(status == 0){
            var text = "\t你想要进去和 #r暗黑龙王#k 战斗吗？\r\n\r\n"
                text += "#b#L1#是的，让我进去吧！#l\r\n";
                if(!(isTransformed(cm.getPlayer()) || cm.haveItem(4001086))){
                    text += "#L2#我想成为敢死队荣誉队员#l\r\n";
                }
            cm.sendSimple(text);
        }else if (status == 1){
            if (selection == 1) {

                const ExpeditionType = Java.type('org.gms.server.expeditions.ExpeditionType');
                const exped = ExpeditionType.HORNTAIL; //暗黑龙王副本等级配置

                if (exped.getMinLevel() > cm.getLevel() ) {
                    cm.sendOk(`至少等级达到${exped.getMinLevel()}级才能进入。`);
                    cm.dispose();
                } else if (!(isTransformed(cm.getPlayer()) || cm.haveItem(4001086))) {
                    cm.sendOk("这是强大的霍恩尾巴龙的洞穴，拥有#t4001086#或龙族才能进入！");
                    status = -1;
                } else {
                    cm.warp(240050000, 0);
                    cm.dispose();
                }
                

            } else if (selection == 2){
                cm.sendYesNo("我可以帮你快速成为敢死队名誉队员，但你需支付" + money1 + "点券，你需要吗？");
            } else{
                cm.dispose();
            }
        }else if(status == 2){
            if(money1 > cm.getPlayer().getCash()){
                cm.sendNext("点券余额不足！");
                cm.dispose();
            }else if(!cm.canHold(4001086)){
                cm.sendNext("背包空间不足！");
                cm.dispose();
            }else{
                cm.gainItem(4001086);
                cm.gainCash(-money1);
                cm.sendNext("好的， #r #t4001086# #k拿好了！");
                status = -1;
            }
        }else{
            cm.dispose();
        }
    }
    
}



function isTransformed(ch) {
    const BuffStat = Java.type('org.gms.client.BuffStat');
    return ch.getBuffSource(BuffStat.MORPH) == 2210003;
}