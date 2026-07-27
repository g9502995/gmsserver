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

/**
 * @author: Ronan
 * @npc: 海盗船任务NPC 久翁
 * @map: 251010404 - Over the Pirate Ship
 * @func: Pirate PQ
 */
const GameConfig = Java.type('org.gms.config.GameConfig');
var status = 0;
var em = null;

//领取帽子配置，等级按高低区分
var cfg = [
	{id : 1002571, count : 5, have : 0},
	{id : 1002572, count : 10, have : 1002571},
	{id : 1002573, count : 25, have : 1002572},
	{id : 1002574, count : 45, have : 1002573}
];
var complete = 0;
const max = GameConfig.getServerInt("party_quest_day_limit");

function start() {
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
            em = cm.getEventManager("海盗船");
            if (em == null) {
                cm.sendOk("海盗组队任务遇到了一个错误。");
                cm.dispose();
                return;
            } else if (cm.isUsingOldPqNpcStyle()) {
                action(1, 0, 0);
                return;
            }
			complete = cm.getPlayer().getDayData(em.getName() + "今日完成次数") * 1;
			var text = "#e#b<组队任务：海盗船>\r\n#k#n"
			text += em.getProperty("party") + "\r\n";
			text += "\r\n救命啊！我的儿子被绑在可怕的#r海盗领主#k手中。我需要你的帮助... 你能组建或加入一个队伍来救他吗？请让你的#b队伍领袖#k与我交谈或者组建一个队伍。#b\r\n"
            text += "\r\n"
            text += `#L0#我想参加组队任务（#r${complete}#b / ${max}）#l\r\n`;
            text += "\r\n";
			text += "#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "禁用" : "启用") + "组队搜索。\r\n";
			text += "#L2#我想了解更多详情。\r\n";
			text += "#L3#我想领取海盗王帽子。\r\n";
			
			
			cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("只有当你加入一个队伍时，你才能参加派对任务。");
                    cm.dispose();
                } else if (!cm.isLeader()) {
                    cm.sendOk("你的队长必须与我交谈才能开始这个组队任务。");
                    cm.dispose();
                } else {
					
					let party = cm.getParty().getMembers();
					var pass = [];
					for (var i = 0; i < party.size(); i++) {
						let ch = party.get(i);
						var num = ch.getPlayer().getDayData(em.getName() + "今日完成次数") * 1;
						if(num >= max){
							cm.message(`${ch.getName()}参与次数过多！`);
							pass.push(ch.getName());
						}
						
					}
					if(pass.length > 0){
						
						cm.sendOk(`队员中 #b${pass.join(",")}#k 今日次数过多，不能参与！`);
						
					}else{
						var eli = em.getEligibleParty(cm.getParty());
						if (eli.size() > 0) {
							if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
								cm.sendOk("另一个队伍已经进入了该频道的#r组队任务#k。请尝试其他频道，或者等待当前队伍完成。");
							}
						} else {
							cm.sendOk("你目前无法开始这个组队任务，因为你的队伍可能不符合人数要求，有些队员可能不符合尝试条件，或者他们不在这张地图上。如果你找不到队员，可以尝试使用组队搜索功能。");
						}
					}

                    cm.dispose();
                }
            } else if (selection == 1) {
                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                cm.sendOk("你的组队搜索状态现在是：#b" + (psState ? "enabled" : "disabled") + "#k。想要改变状态时随时找我。");
                cm.dispose();
			} else if (selection == 3) {
				
				var text = "完成任务 #r达到一定次数 #k就能换领不同等级的海盗王帽子，\r\n你要领取什么等级的帽子？\r\n\r\n";
				
				for (let i=0 ; i< cfg.length ; i++){
					text += `#L${i}##b我要领取${50+((i+1)*10)}级#t${cfg[i].id}:#！\r\n`;
				}
				
				cm.sendSimple(text);
			
            } else {
                cm.sendOk("#e#b<组队任务：海盗船>#k#n\r\n在这个组队任务中，你的任务是逐步穿过船舱，与途中的所有海盗和坏蛋战斗。当你到达#r海盗领主#k时，根据之前阶段打开的宝箱数量，boss会变得更加强大，所以要保持警惕。如果打开了这些宝箱，将会给你的船员带来许多额外的奖励，值得一试！祝你好运。");
                cm.dispose();
            }
        } else if (status === 2){
			
			var item = cfg[selection];
			const okNum = cm.getPlayer().getData(em.getName() + "总完成次数") * 1;
			if(item.count > okNum){
				cm.sendOk(`领取#r#t${item.id}:##k必须累计完成〔${item.count}〕次任务。\r\n\r\n你当前已完成〔${okNum}〕次，还需加油！`);
			}else{
				if(item.have && !cm.haveItemWithId(item.have,true)){
					cm.sendOk(`要领取 #r#t${item.id}:# #k你必须已经拥有 #r#t${item.have}:# #k低级的帽子！`);
				}else{
					
					let haveLv;
					for(let i=0; i<cfg.length;i++){
						if(i > selection){
							if(cm.haveItemWithId(cfg[i].id,true)){
								haveLv = cfg[i];
								break;
							}
						}
					}
					if(haveLv){
						cm.sendOk(`你已经拥有比 #r#t${item.id}:# #k高级的 #r#t${haveLv.id}:# #k了，不用再领低级的了！`);
					}else if(cm.haveItemWithId(item.id,true)){
						cm.sendOk(`你不是已经拥有 #r#t${item.id}:# #k了吗？`);
					}else if(cm.canHold(item.id,1)){
						cm.gainItem(item.id,1)
						if(item.have)cm.gainItem(item.have,-1);
						cm.getPlayer().serverMessage('领取了', item.id, '战力大增！');
						cm.sendOk(`好的，请收好这件#i${item.id}:##t${item.id}:#`)
					}else{
						cm.sendOk("背包空间不足！");
					}
				}
			}
			
			
			cm.dispose();
		}
    }
}
