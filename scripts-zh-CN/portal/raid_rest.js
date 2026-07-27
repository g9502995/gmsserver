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

/*
BossRushPQ - Rest Spot portal
@author Ronan
*/

function enter(pi) {
	
	if(!pi.haveItem(4001007,1)){
		pi.message("没有离开凭证，要离开去找喵喵索取凭证！");
		return false;
	}
	
	//跳关传送点处理
	var eim = pi.getEventInstance();
    var evLevel = ((pi.getMapId() - 1) % 5) + 1;
	//var evLevel = eim.getProperty('level') * 1;
	
	
    if (pi.getPlayer().getEventInstance().isEventLeader(pi.getPlayer()) && pi.getPlayer().getEventInstance().getPlayerCount() > 1) {
        pi.message("作为队长，你必须在队友全部离开或移交队长权限后才能退出副本。");
        return false;
    }

    if (pi.getPlayer().getEventInstance().giveEventReward(pi.getPlayer(), evLevel)) {
        pi.playPortalSound();
        pi.warp(970030000);
		setMaxLevel(pi,evLevel);
		pi.getPlayer().serverMessage("领取了【首领挑战】战胜第"+evLevel+"轮BOSS奖励，退出了挑战！");
        return true;
    } else {
        pi.message("背包空间不足，请确保装备、消耗、设置、其它 栏均有至少1个空格。");
        return false;
    }
}

// 记录角色最大挑战关卡
function setMaxLevel(pi,evLevel){
	var name = "首领挑战任务今日最高关卡"
	var OkNum = pi.getPlayer().getDayData(name) * 1;
	if(evLevel > OkNum){
		pi.getPlayer().saveDayData(name, evLevel.toString());
	}
}

