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

/*
 * Author: kevintjuh93
 *
*/
function start(ms) {
	
	var mapId = ms.getPlayer().getMapId();
	
    if ( mapId == 110000000 || (mapId >= 100000000 && mapId < 105040300) ) {
        ms.explorerQuest(29005, "新手冒险家");//Beginner Explorer
    } else if ( mapId >= 105040300 && mapId <= 105090900) {
        ms.explorerQuest(29014, "林中之城探险家");//Sleepywood Explorer
    } else if (mapId >= 200000000 && mapId <= 211041800) {
        ms.explorerQuest(29006, "冰峰雪域山脉探险家");//El Nath Mts. Explorer
    } else if (mapId >= 220000000 && mapId <= 222020000) {
        ms.explorerQuest(29007, "时间静止之湖探险家");//Ludus Lake Explorer
    } else if (mapId >= 230000000 && mapId <= 230040401) {
        ms.explorerQuest(29008, "海底探险家");//Undersea Explorer
    } else if (mapId >= 250000000 && mapId <= 251010500) {
        ms.explorerQuest(29009, "武陵探险家");//Mu Lung Explorer
    } else if (mapId >= 260000000 && mapId <= 261030000) {
        ms.explorerQuest(29010, "尼哈沙漠探险家");//Nihal Desert Explorer
    } else if (mapId >= 240000000 && mapId <= 240050000) {
        ms.explorerQuest(29011, "米纳尔森林探险家");//Minar Forest Explorer
    }
    if (mapId == 104000000) {
        ms.mapEffect("maplemap/enter/104000000");
    }
	
	
	var em = ms.getClient().getEventManager("boss");
	var boss = em.getProperty("boss") 
	var mapData = JSON.parse(boss).filter(item => item.map == mapId);
	if(mapData){
		for(let i=0;i < mapData.length; i++){
			var nextTime = em.getProperty(`resetTime${mapId}${mapData[i].id}`);
			if(nextTime){
				if(ms.getItemQuantity(5340100)){
					if( !em.getChannelServer().getMapFactory().getMap(mapId).getMonsterById(mapData[i].id) ){
						ms.message(`[探测器] 本图首领复活时间【${formatTime(nextTime,"HH:mm:ss")}】`)
					}
				}
			}
		}
	}
	
}


function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  // 解析时间为 Date 对象（兼容字符串/Date对象）
  const date = typeof time === 'string' 
    ? new Date(time.replace(/-/g, '/')) // 兼容 IE 解析 "2025-12-08" 格式
    : new Date(time);

  // 补零函数：确保单个数字（如 8 → 08，1 → 01）
  const pad = (num) => num.toString().padStart(2, '0');

  // 提取时间各部分
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // 月份从 0 开始，需 +1
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  // 替换占位符
  return format.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}