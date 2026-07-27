//渔夫

var status = 0;
var inWarp = 0;
function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        inWarp = 0;

        var money1 = cm.getPlayer().getCash(1);
		
        if (status == 0) {
			
			let text = "\r\n\t你要去渔场吗？渔场可以钓到很多美味的大鱼噢！\r\n\t想不想试试呢？\r\n\r\n#b";
			
			text += "#L1#进入钓鱼场#l\r\n";
			text += "#L2#购买钓鱼装备#l\r\n";
			// text += "#L4#帮我维修鱼竿#l\r\n";
			text += "#L3#我有鱼，帮我换成鱼肉！#l\r\n";
			cm.sendSimple(text)
		
		}else if(status == 1){
			
			if(selection == 1){

				cm.sendSimple("\t进入钓鱼场需要支付 10000 金币，是否真的要进入？#b\r\n#L10#是的，我要去钓鱼！#l\r\n#L11#等会再去吧！#l");
				
				
			
			} else if (selection == 2){

				text = "\r\n";
				text += `\t金币余额：${cm.getMeso()}\r\n`;
				text += `\t点券余额：${money1}\r\n\r\n`;
				text += "\t请选择你要购买的项目：\r\n#b";
				text += `#L1#我想购买1个#t3011000:#（200万金币）#l\r\n`;
				text += `#L2#我想购买1个#t5340001:#（5000点券 ）#l\r\n`;
				text += `#L3#我想购买100个#t2300000:#（3000点券）#l\r\n`;
				text += `#L4#我想购买500个#t2300000:#（12000点券）#l#l\r\n`;
				cm.sendSimple(text)
			}  else if (selection == 3){

				cm.dispose();
				cm.openNpc(cm.getNpc() , "鱼肉置换");

			} else if (selection == 4){

				var text = `维修鱼竿#r需要1000点券#k，你确定要维修吗？\r\n\r\n`;

				text += "#b#L20#好的，帮我修吧！#l\r\n";
                cm.sendSimple(text);
			}
			
        
		} else if(status == 2){
			
			
			if(selection == 1){
				if(2000000 > cm.getMeso() ){
					cm.sendNext("金币不足");
				}else if(cm.canHold(3011000)){
					cm.gainItem(3011000,1);
					cm.sendNext("购买成功！");
					cm.gainMeso(-2000000);
					cm.getPlayer().serverMessage(`购买了`,3011000);

				}else{
					cm.sendNext("背包空间不足！");
				}

			} else if (selection == 20) {

				if(!cm.haveItem(5340002)){
	                cm.sendOk("你的坏鱼竿呢？");
	            }else if (1000 > cm.getPlayer().getCashShop().getCash(1)){
	                cm.sendOk("点券不足！");
	            }else if(!cm.canHold(5340001)){
	                cm.sendOk("背包不足！");
	            }else{
	                cm.gainItem(5340001,1);
	                cm.gainItem(5340002,-1,false,false);
	                cm.gainCash(1,-1000);
	                cm.getPlayer().serverMessage("修理了",5340001);
	                cm.sendOk("拿好。你的鱼竿已经修好了！");
	            }
	            cm.dispose();
	            

			} else if (selection === 10) {
				if(10000 > cm.getMeso()){
					cm.sendNext("金币不足");

				}else{
					cm.gainMeso(-10000);
					cm.warp(741000206,0);
					cm.getPlayer().serverMessage("进入了钓鱼场！");
					cm.dispose();
				}

			} else if (selection === 11){

				cm.sendOk("钓鱼是需要时间和耐心的，准备好再去吧！");
				cm.dispose();
				
			} else {
				let buy = [5340001 , 5000,1] //鱼竿
				if (selection == 3)buy = [2300000 , 3000 , 100]; //鱼饵
				if (selection == 4)buy = [2300000 , 12000 , 500];
				
				if (buy[1] > money1){
					cm.sendNext("点券不足" + buy[1]);
				}else if(cm.canHold(buy[0] , buy[2])){
					cm.gainCash(-buy[1])
					cm.gainItem(buy[0],buy[2]);
					cm.sendNext("购买成功！");
					cm.getPlayer().serverMessage(`购买了${buy[2]}个`,buy[0]);
				}else{
					cm.sendNext("背包空间不足！");
				}
					
				
			}
			
			status = -1;
			
		}
    }
}