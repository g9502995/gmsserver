/*
StudyJS-By HaiLong

BaseFunction:                                                             type |          mode               |  section
0:  sendYesNo(str) -[弹出Yes/No对话框]                                     1   |  是=1,否=0,结束=-1          |     \
1:  sendNext(str)  -[弹出带有下一个的对话框]                               0   |  下一项=1,结束=-1           |     \
2:  sendPrev(str)  -[弹出带有上一个的对话框]                               0   |  上一项=0,结束=-1           |     \
3:  sendOk(str)    -[弹出带有确定的对话框]                                 0   |  确定=1,结束=-1             |     \
4:  sendNextPrev(str)      -[弹出上&下一个的对话框]                        0   |  上一项=0,下一项=1,停止=-1  |     \
5:  sendAcceptDecline(str) -[弹出接受&拒绝的对话框]                        12  |  接受=1,拒绝=0,结束=-1      |     \  
6:  sendSimple(str) -[弹出带有选项(#L索引# xxx #l)的对话框]                4   |  选择=1,结束=0              |  选择的索引       
7:  sendStyle(str,int styles[]) -[弹出选择造型的对话框]                    0   |  确定=1,取消=0,结束=-1      |  选择的索引
8:  sendGetNumber(str,int def, int min, int max) -[弹出输入数字的对话框]   0   |  确定=1,结束=0              |  输入的数字
9:  setGetText(str) -[保存指定的字符串]                                    \   |          \                  |     \
10: sendGetText(str) -[弹出带有输入字符串的对话框]                         0   |  确定=1,结束=0              |     \
11: getText(str) -[返回sendGetText(str)/setGetText(str)寫入的字符串]       \   |          \                  |     \

AllowFunction-could use directly
-gainMeso获取金币(int gain);
 */


var status = -1; 
var text;
//Start
function start(mode, type, selection){
	
	if (CheckStatus(mode)) {
		
	    if (status == 0) {
			
			text = "位于#b魔法密林郊区#k的猴子森林！";
			text += "猴子们受到黑暗力量的影响一个接一个的死去，并且产生变异，对人类进行无差别的攻击！这可能还只是个开始。";
			text += "\r\n\r\n#r你愿意过去帮忙吗？完成之后将获得一定的奖励哦！"
			qm.sendAcceptDecline(text);			
			    
	    } else if (status == 1 ) {
			
			if(qm.getMapId() == 300000012) {
				//坐牢中
				qm.forceStartQuest(); 
				qm.forceCompleteQuest();
				qm.sendOk("还是刑满释放了再做吧！");
				
			} else if(qm.getLevel() < 35) {
				qm.sendOk("大于40级在做吧，你现在做太吃力！");
				
			} else if(qm.getLevel() > 70) {
				
				give();
				qm.forceStartQuest(); 
				qm.forceCompleteQuest();
				
				qm.sendOk("我觉得对你来说简直太小儿科了，直接把奖励给你吧，你不用去了！");
				
			} else {
				if(qm.getMapId() != 100040103)qm.warp(100040103);
				
				qm.sendOk("谢谢您，请帮我消灭200只，但愿这样可以让冒险岛世界的黑暗气息能有效地被遏制一些。");
				
				qm.forceStartQuest(); 
				
			}
			qm.dispose();					
		
		} 
	}else{
		if(mode == 0){
			qm.forceCompleteQuest();
			qm.sendOk("好吧，我先找别人帮忙吧，预测明天那些猴子还会更多，明天有时间再去吧！");
		}
		qm.dispose();
	}
}


function end(mode, type, selection){
	
	if (CheckStatus(mode)){
		
	    if (status == 0) {
			//第一层对话
            qm.sendOk("这么快就消灭了，冒险岛世界有救了！谢谢你~！给你一些奖励请务必收下！");		
			qm.forceCompleteQuest();
			give();
	    } else {
			//最后一层对话完继续循环至此，退出结束
			qm.dispose();
		}
	}
			
}

function give(){
	qm.getPlayer().getCashShop().gainCash(1, 100);
	qm.getPlayer().getCashShop().gainCash(2, 200);
	qm.gainMeso(10000);
	qm.dropMessage(5,"获取点券 (+100)");
	qm.message("获取抵用券 (+200)");
	qm.gainExp(5000);
}

function CheckStatus(mode) {
	
	if (mode == -1) {
		qm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	
	if (status == -1) {
		qm.dispose();
		return false;
	}	
	return true;
}