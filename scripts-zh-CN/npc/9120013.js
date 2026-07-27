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
//Boss Kitty

var status;
var questions;
var answers;
var correctAnswer;
var questionNum;

function start() {
    status = -1;
    questions = [" 火焰狸猫不会掉落下列哪个物品？",
            " 负责把旅客从废弃都市往返日本的 NPC 是哪一位？",
            " 在蘑菇神社出售的下列物品中，哪个能提升攻击力？",
            "杂兵 **** 不会掉落下列哪个物品？",
            " 下列哪个物品不存在？",
            "昭和村的蔬菜店老板叫什么名字？",
            " 下列哪个物品是存在的？",
            "蘑菇神社最强 BOSS 叫什么名字？",
            " 下列哪个物品的职业或等级说明不匹配？",
            " 蘑菇神社的机器人不卖下列哪种面条？",
            " 下列哪个 NPC不站在昭和电影院门前？"
            ];
    answers = [
        ["狸猫柴火", "坚硬的角", "红砖"],  
        ["佩利", "斯皮内尔", "波利"],
        ["章鱼烧", "炒面", "天妇罗"], 
        ["杂兵A的徽章", "杂兵B的紧身胸衣", "杂兵C的项链"], 
        ["冷冻金枪鱼", "扇子", "苍蝇拍"], 
        ["萨米", "卡米", "宇美"],         
        ["云狐之牙", "幽灵花束", "乌云狐之尾"], 
        ["黑乌鸦", "蓝色蘑菇王", "姬神"], 
        ["竹枪 - 仅限战士使用", "噼啪锤 - 单手剑", "神秘手杖 - 51级装备"],  
        ["蘑菇拉面（猪头骨味）", "蘑菇拉面（盐味）", "蘑菇味增拉面"],  
        ["斯凯", "富良野", "新太"] 
    ];

    correctAnswer = [1, 1, 0, 1, 2, 2, 2, 0, 0, 2, 2];
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
        if (status == 0 && mode == 1) {
            if (cm.isQuestStarted(8012) && !cm.haveItem(4031064)) { //quest in progress
                cm.sendYesNo("你都找到了吗？你打算尝试回答我所有的问题吗？");
            } else { //quest not started or already completed
                cm.sendOk("喵喵喵！");//lol what's this?
                cm.dispose();
            }
        } else if (status == 1 && mode == 1) {
            var hasChicken = true;
            if (!cm.haveItem(2020001, 300)) {
                hasChicken = false;
            }
            if (!hasChicken) {
                cm.sendOk("什么？不行！300！三百。不少。如果你想要更多，就给我，但我至少需要300。我们不是所有人都像你一样又大又饱满…");
                cm.dispose();
            } else {
                cm.gainItem(2020001, -300)
                cm.sendNext("干得好！现在等一下……嘿，看这里！我这里有些食物！自己拿吧。好了，现在是时候问你们一些问题了。我相信你们已经意识到了，但记住，如果你们答错了，一切都结束了。要么全赢，要么全输！");
            }
        } else if (status == 7 && mode == 1) { //2-6 are the questions
            if (selection != correctAnswer.pop()) {
                cm.sendNext("瞄…… 反正人类都会犯错的啦！要是你想再挑战一次的话，就给我带 300 份#t2020001#过来吧。")
                cm.dispose();
            } else {
                cm.sendNext("啧，你居然把所有问题都答对了。虽然我本来就不怎么待见人类，但我最讨厌不守承诺了 —— 所以，说到做到，这颗橙色弹珠拿去吧。")
            }
        } else if (status == 8 && mode == 1) { //gain marble
            cm.gainItem(4031064, 1);
            cm.sendOk("我们的交易已经结束，非常感谢！你可以离开了！");
            cm.dispose();
        } else if (status >= 2 && status <= 6 && mode == 1) {//questions
            var cont = true;
            if (status > 2) {
                if (selection != correctAnswer.pop()) {
                    cm.sendNext("瞄…… 反正人类谁还不犯错呢！要是你想再试一次的话，就给我带 300 份#t2020001#过来吧。")
                    cm.dispose();
                    cont = false;
                }
            }
            if (cont) {
                questionNum = Math.floor(Math.random() * questions.length);
                if (questionNum != (questions.length - 1)) {
                    var temp;
                    temp = questions[questionNum];
                    questions[questionNum] = questions[questions.length - 1];
                    questions[questions.length - 1] = temp;
                    temp = answers[questionNum];
                    answers[questionNum] = answers[questions.length - 1];
                    answers[questions.length - 1] = temp;
                    temp = correctAnswer[questionNum];
                    correctAnswer[questionNum] = correctAnswer[questions.length - 1];
                    correctAnswer[questions.length - 1] = temp;
                }
                var question = questions.pop();
                var answer = answers.pop();
                var prompt = "Question no." + (status - 1) + ": " + question;
                for (var i = 0; i < answer.length; i++) {
                    prompt += "\r\n#b#L" + i + "#" + answer[i] + "#l#k";
                }
                cm.sendSimple(prompt);
            }
        }
    }
}