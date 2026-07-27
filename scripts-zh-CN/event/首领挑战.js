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
 * @event: Boss Rush PQ
 */

var isPq = true;
var minPlayers = 1, maxPlayers = 6;
var minLevel = 30, maxLevel = 255;
var entryMap = 970030100;
var exitMap = 970030000;
var recruitMap = [970030000,910002000];
var clearMap = 970030000;

var minMapId = 970030001;
var maxMapId = 970042711;

var eventTime = 30;     //5 minutes

const maxLobbies = 7;

var cfg = [
	{
		itemSet : [1122004, 1012078, 1432008, 1432009, 1032040, 1032009, 1102166, 2070001, 2040002, 2040310, 2040400, 2040600, 2040825, 2040902, 2010000, 2010001, 2010002, 2010003, 2010004, 2020001, 2020002, 2020003, 2022020, 2022022, 4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007, 4003000],
		itemQty : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 2, 2, 2, 2, 2, 2, 2, 2, 2]
	},
	{
		itemSet : [1122003, 1012077, 1012079, 1432014, 1032059, 1032002, 1102191, 2330002, 2040001, 2040311, 2040401, 2040601, 2040824, 2040901, 2010000, 2010001, 2010002, 2010003, 2010004, 2020001, 2020002, 2020003, 2022020, 2022022, 4020000, 4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008, 4003000],
		itemQty : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
	},
	{
		itemSet : [1122002, 1022088, 1012076, 1402029, 1032041, 1032044, 1102167, 2070011, 2040026, 2040030, 2040302, 2040412, 2040702, 2040818, 2002028, 2020009, 2020010, 2020011, 2022004, 2022005, 2022025, 2022027, 2022048, 4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007, 4003000],
		itemQty : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 20, 20, 20, 20, 20, 20, 20, 20, 5, 5, 5, 5, 5, 5, 5, 5, 5]
	},
	{
		itemSet : [1122001, 1122006, 1022103, 1442065, 1032042, 1032021, 1102168, 2070005, 2040025, 2040029, 2040301, 2040413, 2040701, 2040817, 2002028, 2020009, 2020010, 2020011, 2022004, 2022005, 2022025, 2022027, 2022048, 4020000, 4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008, 4003000],
		itemQty : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 45, 45, 45, 45, 45, 45, 45, 45, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]
	},
	{
		itemSet : [3010063, 1122018, 1122005, 1022088, 1402013, 1032030, 1032070, 1102046, 2330004, 2041013, 2041016, 2041019, 2041022, 2049100, 2049003, 2020012, 2020013, 2020014, 2020015, 2022029, 2022045, 2022068, 2022069, 2022180, 4004000, 4004001, 4004002, 4004003, 4004004, 4003000],
		itemQty : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 15, 15, 15, 15, 15, 15, 15, 2, 8, 8, 8, 8, 8, 12]
	},
	{
		itemSet : [3010061, 1122018, 1122005, 1022088, 1402013, 1032030, 1032070, 1102046, 2330004, 2041013, 2041016, 2041019, 2041022, 2049100, 2049003, 2020012, 2020013, 2020014, 2020015, 2022029, 2022045, 2022068, 2022069, 2022180, 4004000, 4004001, 4004002, 4004003, 4004004, 4003000],
		itemQty : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 25, 25, 25, 25, 25, 25, 25, 25, 4, 12, 12, 12, 12, 12, 25]
	}
]

function init() {
    setEventRequirements();
}

function getMaxLobbies() {
    return maxLobbies;
}

function setEventRequirements() {
    var reqStr = "";

    reqStr += "\r\n   组队人数: ";
    if (maxPlayers - minPlayers >= 1) {
        reqStr += minPlayers + " ~ " + maxPlayers;
    } else {
        reqStr += minPlayers;
    }

    reqStr += "\r\n   等级要求: ";
    if (maxLevel - minLevel >= 1) {
        reqStr += minLevel + " ~ " + maxLevel;
    } else {
        reqStr += minLevel;
    }

    reqStr += "\r\n   时间限制: ";
    reqStr += eventTime + " 分钟";
	
	em.setProperty("cfg", JSON.stringify(cfg));
    em.setProperty("party", reqStr);
}

//用于 “配置事件专属内容” 的函数
//如给参与玩家添加事件专属增益 eim.applyBuffToAllPlayers(buffId, duration)（例如 “BossRush 挑战中，全员伤害提升 20%”）
//如禁止使用非事件专属道具 eim.setForbiddenItems([itemId1, itemId2])（例如 “副本内禁止使用复活药水，仅允许使用事件专用复活币”）
//如启用事件特有的战斗规则 eim.enableMechanic("noHeal")（例如 “该事件中无法恢复生命值，考验极限输出”）
//如在事件地图中生成专属 NPC 或物体 eim.spawnExclusiveNPC(npcId, x, y)（例如 “BossRush 中的补给 NPC，仅在该事件中出现”）
function setEventExclusives(eim) {
	var itemSet = [4001007];
    eim.setExclusiveItems(itemSet);
}

function setEventRewards(eim) {
    eim.setEventRewards(6, cfg[5].itemSet, cfg[5].itemQty);
    eim.setEventRewards(5, cfg[4].itemSet, cfg[4].itemQty);
    eim.setEventRewards(4, cfg[3].itemSet, cfg[3].itemQty);
    eim.setEventRewards(3, cfg[2].itemSet, cfg[2].itemQty);
    eim.setEventRewards(2, cfg[1].itemSet, cfg[1].itemQty);
    eim.setEventRewards(1, cfg[0].itemSet, cfg[0].itemQty);
}


function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
    var eligible = [];
    var hasLeader = false;

    if (party.size() > 0) {
        var partyList = party.toArray();

        for (var i = 0; i < party.size(); i++) {
            var ch = partyList[i];

            if (recruitMap.includes( ch.getMapId() ) && ch.getLevel() >= minLevel && ch.getLevel() <= maxLevel) {
                if (ch.isLeader()) {
                    hasLeader = true;
                }
                eligible.push(ch);
            }
        }
    }

    if (!(hasLeader && eligible.length >= minPlayers && eligible.length <= maxPlayers)) {
        eligible = [];
    }
    return Java.to(eligible, Java.type('org.gms.net.server.world.PartyCharacter[]'));
}

function setup(level, lobbyid) {
    var eim = em.newInstance("BossRush" + lobbyid);
    eim.setProperty("level", level);
    eim.setProperty("lobby", lobbyid);

    eim.startEventTimer(eventTime * 60000);
    setEventRewards(eim);
    setEventExclusives(eim);
    return eim;
}

function afterSetup(eim) {
	eim.dropAllExclusiveItems();
}


function playerEntry(eim, player) {
	
	// 获取事件入口地图实例（由基础入口地图标识与事件属性中的 “大厅编号” 拼接而成）
    var map = eim.getMapInstance(entryMap + eim.getIntProperty("lobby"));
	
	// 将玩家传送至该地图的 0 号传送点
    player.changeMap(map, map.getPortal(0));  
    
    const copy = eim.getEm().getName();
    const api = player.getAbstractPlayerInteraction();
    var cache = copy + "今日进入次数"
    player.saveDayData(cache, (player.getDayData(cache) * 1) + 1);
}

function scheduledTimeout(eim) {
    end(eim);
}

function playerUnregistered(eim, player) {}

// 处理 “玩家退出事件” 的标准流程（被调用）
function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, 0);
	
}

//处理 “玩家离开事件” 的场景
function playerLeft(eim, player) {
    if (!eim.isEventCleared()) {
        playerExit(eim, player);
    }
}

//处理 “玩家切换地图” 时的事件校验
function changedMap(eim, player, mapid) {
    if (mapid < minMapId || mapid > maxMapId) {
        if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
            eim.unregisterPlayer(player);
            end(eim);
        } else {
            eim.unregisterPlayer(player);
        }
    }
}

//处理 “队伍更换队长” 时的场景
function changedLeader(eim, leader) {
    var mapid = leader.getMapId();
    if (!eim.isEventCleared() && (mapid < minMapId || mapid > maxMapId)) {
        end(eim);
    }
}

//处理 “玩家死亡” 场景
function playerDead(eim, player) {}

// 玩家在死亡弹窗中点击 “确定” 后的处理
function playerRevive(eim, player) {
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
        eim.unregisterPlayer(player);
        end(eim);
    } else {
        eim.unregisterPlayer(player);
    }
}

//处理 “玩家断开连接” 的场景
function playerDisconnected(eim, player) {
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
		
		// 若玩家断开连接后，当前事件团队人数不足（满足最小人数要求）
        end(eim);
    } else {
        playerExit(eim, player);
    }
}

//处理 “玩家主动离开队伍” 的场景
function leftParty(eim, player) {
    if (eim.isEventTeamLackingNow(false, minPlayers, player)) {
        end(eim);
    } else {
        playerLeft(eim, player);
    }
}

//处理 “队伍解散” 场景
function disbandParty(eim) {
    if (!eim.isEventCleared()) {
        end(eim);
    }
}

function monsterValue(eim, mobId) {
    return 1;
}

function end(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
	
    eim.dispose();
}

//处理 “组队任务（Party Quest，简称 PQ）完成” 的场景
function clearPQ(eim) {
    eim.stopEventTimer();
    eim.setEventCleared();      // 此后事件仅在所有玩家离开 changedMap 函数定义的范围时才算彻底结束
}

//用于给玩家发放 “随机事件奖励”
function giveRandomEventReward(eim, player) {
    eim.giveEventReward(player);
}

//处理 “怪物被击杀” 场景
function monsterKilled(mob, eim) {}

//处理 “当前场景所有怪物被击杀” 场景
function allMonstersDead(eim) {}


//用于 “取消已计划任务” 的函数
function cancelSchedule() {}


//用于 “释放事件资源” 的函数
function dispose(eim) {}
