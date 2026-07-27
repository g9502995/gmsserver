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
package org.gms.server.maps;

/**
 * @author AngelSL
 */
public enum FieldLimit {
    JUMP(0x01), 			// 禁止跳跃
    MOVEMENTSKILLS(0x02), 	 // 禁止移动技能
    SUMMON(0x04), 			// 禁止召唤
    DOOR(0x08), 			// 禁止使用门
    CANNOTMIGRATE(0x10),    // 禁止切换频道/使用回城卷轴/进入现金商店
    //NO_NOTES(0x20), 		// 禁止使用VIP岩石
    CANNOTVIPROCK(0x40), 	// 禁止参与小游戏
    CANNOTMINIGAME(0x80), 	// 禁止使用坐骑
    //SPECIFIC_PORTAL_SCROLL_LIMIT(0x100), // 特定传送卷轴限制
    CANNOTUSEMOUNTS(0x200), 		  // 禁止使用坐骑
	
    STAT_CHANGE_ITEM_CONSUME_LIMIT(0x400), // 禁止使用所有能临时 / 永久改变角色属性的消耗品
    //PARTY_BOSS_CHANGE_LIMIT(0x800), // 组队首领变更限制
    CANNOTUSEPOTION(0x1000),    // 禁止使用药水
    //WEDDING_INVITATION_LIMIT(0x2000), // 婚礼邀请函限制
    //CASH_WEATHER_CONSUME_LIMIT(0x4000),  //现金道具（天气类）使用限制
    //NO_PET(0x8000), // 禁止使用宠物
    //ANTI_MACRO_LIMIT(0x10000), // 反宏限制
    CANNOTJUMPDOWN(0x20000),   // 禁止向下跳跃
    
    //......... EVEN MORE LIMITS ............
    //SUMMON_NPC_LIMIT(0x40000),  召唤 NPC 限制
    NO_EXP_DECREASE(0x80000), // 死亡不减少经验
    //NO_DAMAGE_ON_FALLING(0x100000),  //掉落无伤害
    //PARCEL_OPEN_LIMIT(0x200000),  //包裹打开限制
    DROP_LIMIT(0x400000);	// 掉落限制
    //ROCKETBOOSTER_LIMIT(0x800000)     //无法使用 “火箭推进器” 道具 lol we don't even have mechanics <3

    private final long i;

    FieldLimit(long i) {
        this.i = i;
    }

    public long getValue() {
        return i;
    }

    public boolean check(int fieldlimit) {
        return (fieldlimit & i) == i;
    }
}
