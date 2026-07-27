/*
	抽奖[作废了]
*/
/* NPC Base
	Map Name (Map ID)
	Extra NPC info.
 */

var status;
var ticketId = 5220000;
var mapName = ["射手村", "魔法森林", "勇士部落", "废弃都市", "林中之城", "蘑菇神社", "昭和温泉（男性专用）", "昭和温泉（女性专用）", "玩具城", "新叶城", "冰封雪域", "诺特勒斯号"];
var curMapName = "";
var price = 1000;
function start() {
    curMapName = mapName[(cm.getNpc() != 9100117 && cm.getNpc() != 9100109) ? (cm.getNpc() - 9100100) : cm.getNpc() == 9100109 ? 9 : 11];
    status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
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
		
		return; //作废拦截
		
        if (status == 0) {

        	var text = "请到自由市场参与百宝箱！";
        	cm.sendOk(text);
        	cm.dispose();
        	return;
			
			var text = `\r\n\t欢迎来到 ${curMapName} 扭蛋机。\r\n\t在这里可以随机抽取一些宝物，但你需有#t${ticketId}#！\r\n\r\n`;
			text += "#L1##e抽奖〔1〕次#l\t";
			text += "#L10#抽奖〔10〕次#l\t";
			text += "#L20#抽奖〔20〕次#l#n\r\n\r\n\r\n";
			text += `#L60##r快速购买#t${ticketId}#`
			cm.sendSimple(text);
		
		} else if(status == 1){
			
			if(selection < 50){
			
				let count = selection;
				
				let items = [];
				
				for(let i=0; i < count; i++){
					items.push(1302000);
					items.push(3010001);
					items.push(2290000 + i);
					items.push(4000000 + i);
				}
				
				if(cm.haveItem(ticketId,count)){
					if (cm.canHoldAll(items)) { 
						cm.gainItem(ticketId, -count);
						for(let i=0; i < count; i++){
							cm.doGachapon();
						}
						
						
						var name = "百宝箱抽奖次数"
						var OkNum = cm.getCharacterExtendValue(name) * 1;
						cm.saveOrUpdateCharacterExtendValue(name, (OkNum + count).toString());
						
						cm.sendNext("已成功抽奖" + count + "次！");
						
					} else {
						cm.sendNext(`请确保你的#r装备、消耗、设置#k和#r其他#k物品栏中至少有${count}个空位。`);
					}
				}else{
					cm.sendNext(`你的 #t${ticketId}# 数量不足！可以到商城购买哦！`);
					
				}
				
				
				
				
				status = -1;
				
				
			}else if(selection == 60){
				
				//购买几个
				var text = `\r\n\t#r#t${ticketId}# #k单价为：${price}，你打算购买多少呢？\r\n\r\n`;
				text += `\t#r你的点券余额：${cm.getPlayer().getCashShop().getCash(1)}\r\n`
				text += `\t你的抵用券余额：${cm.getPlayer().getCashShop().getCash(2)}\r\n\r\n`;
				var lv = [1,10,50,100,];
				for (let i=0; i < lv.length; i++){
					text +=`#L${lv[i]}##b花${price * lv[i]}买${lv[i]}个#l\r\n\r\n`;
				}
				cm.sendSimple(text)
				
			}
			
			
			
			
		} else if(status == 2){
			const result = calculatePayment(
				cm.getPlayer().getCashShop().getCash(2),
				cm.getPlayer().getCashShop().getCash(1),
				price,
				selection
			);
			
			if(result.isEnough){
				if(cm.canHold(ticketId , selection)){
					
					let text = "购买成功！本次使用\r\n";
					
					if(result.bindGoldPay){
						cm.getPlayer().getCashShop().gainCash(2, -result.bindGoldPay);
						cm.message(`失去${result.bindGoldPay}抵用券！`);
						text += "#r抵用券支付" + result.bindGoldPay + "。\r\n";
					}
					
					if(result.goldPay){
						cm.getPlayer().getCashShop().gainCash(1, -result.goldPay);
						cm.message(`失去${result.goldPay}点券券！`);
						text += "点券支付" + result.goldPay + "。\r\n";
					}
					
					cm.gainItem(ticketId,selection);
					
					cm.sendNext(text);
					status = -1;
					
					
				}else{
					cm.sendOk("背包空间不够！");
					cm.dispose();
				}
			}else{
				cm.sendOk("你的余额不够买这么多！");
				cm.dispose();
			}
			
			
		}
        
        
    }
}


/**
 * 组合支付计算（优先绑金，再用元宝）
 * @param {number} bindGold - 可用绑金
 * @param {number} gold - 可用元宝
 * @param {number} price - 商品单价
 * @param {number} quantity - 购买数量
 * @returns {object} 支付详情（包含是否足够支付、绑金支付额、元宝支付额）
 */
function calculatePayment(bindGold, gold, price, quantity) {
  // 计算商品总金额
  const total = price * quantity;
  
  // 优先使用绑金支付
  let bindPay = Math.min(bindGold, total); // 绑金最多支付总金额或自身全部
  let remaining = total - bindPay; // 剩余需支付金额
  
  // 剩余部分用元宝支付
  let goldPay = Math.min(gold, remaining);
  
  // 判断是否足够支付
  const isEnough = (bindPay + goldPay) === total;
  
  return {
    isEnough: isEnough,       // 是否能完成支付
    bindGoldPay: bindPay,     // 绑金支付金额
    goldPay: goldPay,         // 元宝支付金额
    total: total              // 商品总金额
  };
}

