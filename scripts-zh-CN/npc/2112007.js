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
 * @npc: Investigation Result
 * @func: Gives MagatiaPQ stg1 item
 */

function start() {
    var eim = cm.getEventInstance();
    var book = "stg1_b" + (cm.getNpcObjectId() % 26);

    var res = eim.getIntProperty(book);
    if (res > -1) {
        eim.setIntProperty(book, -1);

        if (res == 0) {  // mesos
            var gold = 200
            cm.getPlayer().gainCash(gold,true);
            cm.getPlayer().showHint(`获得了 ${gold} 抵用券` , 300);
            cm.getPlayer().serverMessage(`在罗密欧与朱丽叶组队任务中寻得 ${gold} 抵用券，真幸运！`);
        } else if (res == 1) {  // exp
            var gold = 100
            cm.getPlayer().gainCash(gold);
            cm.getPlayer().showHint(`获得了 ${gold} 点券！` , 300);
            cm.getPlayer().serverMessage(`在罗密欧与朱丽叶组队任务中寻得 ${gold} 点券，真幸运！`);
        } else if (res == 2) {  // letter
            var letter = 4001131;
            if (!cm.canHold(letter)) {
                cm.sendOk("你收到了一封信，但是你的背包已经满了，所以你把它放了回去。");
                cm.dispose();
                return;
            }

            cm.gainItem(letter, 1);
            cm.sendNext("你找到了一封信，看起来是有意放在这里的。");
        } else if (res == 3) {  // pass
            cm.sendNext("你找到了通往下一阶段的触发器。");

            var eim = cm.getEventInstance();
            eim.showClearEffect();
            eim.giveEventPlayersStageReward(1);
            eim.setIntProperty("statusStg1", 1);

            cm.getMap().getReactorByName("d00").hitReactor(cm.getClient());
        }
    } else {
        cm.message(`这里什么都没有！${formatTime(new Date(),"HH:mm:ss")}`);
    }

    cm.dispose();
}


/**
 * 格式化本地时间
 * @param {Date} date - 要格式化的Date对象（默认当前时间）
 * @param {string} format - 格式字符串（如 'YYYY-MM-DD HH:mm:ss'）
 * @returns {string} 格式化后的时间
 */
function formatTime(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
  let targetDate;
  if (typeof date === 'string') {
    targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      console.error('传入的日期字符串无效:', date);
      return '';
    }
  } else if (date instanceof Date) {
    targetDate = date;
  } else {
    targetDate = new Date();
  }

  // 原有格式化逻辑（变量名从date改为targetDate）
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0'); // 补零：01-12
  const day = String(targetDate.getDate()).padStart(2, '0'); // 补零：01-31
  const hours = String(targetDate.getHours()).padStart(2, '0'); // 补零：00-23
  const minutes = String(targetDate.getMinutes()).padStart(2, '0'); // 补零：00-59
  const seconds = String(targetDate.getSeconds()).padStart(2, '0'); // 补零：00-59

  // 替换格式字符串中的占位符
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}