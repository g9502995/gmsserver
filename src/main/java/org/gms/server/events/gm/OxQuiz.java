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
package org.gms.server.events.gm;
import org.gms.config.GameConfig;
import org.gms.client.Character;
import org.gms.provider.Data; // 必须导入Data类
import org.gms.provider.DataProvider;
import org.gms.provider.DataProviderFactory;
import org.gms.provider.DataTool;
import org.gms.provider.wz.WZFiles;
import org.gms.server.TimerManager;
import org.gms.server.maps.MapleMap;
import org.gms.util.PacketCreator;
import org.gms.util.Randomizer;

import java.util.ArrayList;
import java.util.List;

/**
 * @author FloppyDisk
 */
public final class OxQuiz {
    private int round = 1;
    private int question = 1;
    private MapleMap map = null;
    private static final DataProvider stringData = DataProviderFactory.getDataProvider(WZFiles.ETC);
	private int exp = 0;
	private int money = 0;
	private int money1 = 0;
	private int money2 = 0;
    public OxQuiz(MapleMap map) {
        this.map = map;
        this.round = Randomizer.nextInt(9) + 1;
        this.question = 1;
		this.exp = GameConfig.getServerInt("event_xo_exp");
		this.money = GameConfig.getServerInt("event_xo_money");
		this.money1 = GameConfig.getServerInt("event_xo_money1");
		this.money2 = GameConfig.getServerInt("event_xo_money2");
    }
	
	// 数组索引对应round（1-9），元素格式：[连续最大值, 随机起始值, 最终最大值]
    // 示例：组1规则 [29, 100, 124] → 1-29连续递增，超过29则从100-124随机
    private static final int[][] QUIZ_RULES = {
        {0, 0, 0},       // 索引0（无意义，round从1开始）
        {29, 100, 120},  // round 1：1-29连续，之后100-124随机
        {17, 100, 124},  // round 2：可根据实际情况修改
        {23, 100, 183},  // round 3：可根据实际情况修改
        {12, 100, 112},  // round 4：可根据实际情况修改
        {26, 100, 129},  // round 5：可根据实际情况修改
        {16, 100, 115},  // round 6：可根据实际情况修改
        {16, 100, 166},  // round 7：可根据实际情况修改
        {12, 100, 115},  // round 8：可根据实际情况修改
        {44, 100, 185}   // round 9：可根据实际情况修改
    };

    private boolean isCorrectAnswer(Character chr, int answer) {
        double x = chr.getPosition().getX();
        double y = chr.getPosition().getY();
        if ((x > -234 && y > -26 && answer == 0) || (x < -234 && y > -26 && answer == 1)) {
            return true;
        }
        return false;
    }

    public void sendQuestion() {
		
        map.broadcastMessage(PacketCreator.showOXQuiz(round, question, true));
        TimerManager.getInstance().schedule(() -> {
            map.broadcastMessage(PacketCreator.showOXQuiz(round, question, false));
            List<Character> chars = new ArrayList<>(map.getCharacters());

            for (Character chr : chars) {
                if (chr != null){
					if(chr.isGM()){
						chr.message("组：" + round + " 问题：" + question);
					}
                    if (!isCorrectAnswer(chr, getOXAnswer(round, question))) {
                        //chr.changeMap(chr.getMap().getReturnMap());
						//chr.message(5,"回答错误!");
						chr.sendPacket(PacketCreator.playSound("5th_Maple/Loose"));
						
						chr.saveDayData("今日答题错误", 1, true);
						
                    } else {
						
						//chr.dropMessage(6,"回答正确！");
						
						if(exp > 0){
							chr.gainExp(exp, true,false,true);
						}
						
						if(money > 0){
							chr.gainMeso(money);
							chr.saveLog("答题",0,money);
						}
						
						if(money1 > 0){
							chr.gainCash(money1);
							chr.saveLog("答题",1,money1);
							chr.serverMessage("答题正确获得了点券" + money1 + "点");
						}
						
						if(money2 > 0){
							chr.gainCash(2,money2);
							chr.saveLog("答题",2,money2);
						}
						
						chr.saveDayData("今日答题正确", 1, true);
						
						chr.sendPacket(PacketCreator.playSound("5th_Maple/prize"));
                    }
                }
            }
			
			generateNextQuestionId(round, question);
			
            //if (map.getCharacters().size() <= 0 ) {
			if(!map.isOxQuiz()){
                map.broadcastMessage(PacketCreator.serverNotice(6, "活动已结束"));
                map.getPortal("join00").setPortalStatus(true);
                map.setOx(null);
				//map.setOxQuiz(false);
                //prizes here
                return;
            }
			TimerManager.getInstance().schedule(() -> {
				sendQuestion();	
			},6000);
            
        }, 30000); // Time to answer = 30 seconds ( Ox Quiz packet shows a 30 second timer.
    }

    private static int getOXAnswer(int imgdir, int id) {
        return DataTool.getInt(stringData.getData("OXQuiz.img").getChildByPath("" + imgdir + "").getChildByPath("" + id + "").getChildByPath("a"));
    }
	
	
	/**
     * 根据固定规则生成下一个问题编号
     * @param round 当前题库组（1-9）
     * @param question 当前问题编号
     * @return 下一个问题编号
     */
    public void generateNextQuestionId(int round, int question) {
       
        // 获取当前组的规则：
        int[] rule = QUIZ_RULES[round];
        int continuousMax = rule[0];  // 连续递增的最大值（如29）
        int randomStart = rule[1];   // 随机区间起始值（如100）
        int finalMax = rule[2];      // 最终最大值（如124）

		if (continuousMax > question || (question >= randomStart && finalMax > question)) {
            this.question += 1;
		} else if (question == continuousMax){
			this.question = randomStart;
		} else {
            this.round = Randomizer.nextInt(9) + 1;
			this.question = 1;
        }
    }
	
	
}
