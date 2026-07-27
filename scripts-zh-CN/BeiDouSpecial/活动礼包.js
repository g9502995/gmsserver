
var status;
var data;
var gift = [
	
	{
        id : 1,
		name : "成长礼包",
		money : 168,
        dayCount : 1,
        open : 0,
		item : [
			[4033007,3],
			[2340000,3],
			[2049100,3],
			[2022530,1],
			[2430100,99],
			[2430101,99],
		],
	},
    {
        id : 2,
        name : "锻造礼包",
        money : 398,
        dayCount : 2,
        open : 0,
        item : [
            [4033008,3],
            [4033002,10],
            [4033001,1],
            [4000606,1],
            [2430100,666],
            [2430101,666],
        ],
    },
    {
        id : 3,
        name : "特惠礼包",
        money : 298,
        dayCount : 3,
        open : 0,
        item : [
            [2430190,30],
            [4033009,5],
            [2450000,2],
            [4033001,1],
            [2430100,666],
            [2430101,666],
        ],
    }

];

var limit = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode <= 0){
        cm.dispose();
        return;
    }
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    const ch = cm.getPlayer();

    const rmb = ch.getUserData("赞助币",true) * 1;
	
    if (status === 0) {
    	var text = `\r\n\t不定期新增礼包，已有赞助币：#r${rmb}#k\r\n\r\n`;

        list = gift.filter(v=> v.open === 1);

        if(list.length > 0){
        	list.forEach(v=>{
        	   	text += `#b#L${v.id}#我想兑换${v.name} #r（${v.money}）#l\r\n`;
        	})
        } else {
            text += "\t#r#e管理员未设置，请等待后续活动通知！#n\r\n\r\n";
        }

        text +="#b#L99#返回#l\r\n";


        cm.sendSimple(text);

    } else if (status === 1) {

        if(selection === 99){
            cm.dispose();
            cm.openNpc(9010000, "赞助中心");
            return;
        }
        

        data = gift.find(v=>v.id === selection);

        if(data && data.name){

            limit = ch.getUserDayData(`活动礼包${data.name}兑换次数`) * 1;
            

            var text = `\r\n\t兑换 #r${data.name} #k 需赞助币：#r${data.money} #k`

            if(data.dayCount){
                text += `今日限购： ${limit} / ${data.dayCount}`;
            }

            text += "\r\n\t包含物品：\r\n\r\n";

            data.item.forEach( v =>{
                text += `\t\t#i${v[0]}:# #t${v[0]}:# × ${v[1]}\r\n`;
            })

            text += "\r\n#b"

            text += `#L1# 是的，我要${data.name}！#n #l\r\n`;

            text += "#L2# 我再看看！#l\r\n";

            cm.sendSimple(text);
            

        }else{
            status =-1;
        }

    } else if (status == 2){



        if(selection == 1){

            var itemId = [];
            var itemCount = [];
            data.item.forEach(v => {
                const [id,count] = v;
                itemId.push(id);
                itemCount.push(count);
            })

            if(!data){
                cm.sendNext("异常！");
            } else if(limit >= data.dayCount){
                cm.sendNext("今日限购次数已达到！");
            } else if(data.money > rmb){
                cm.sendNext("赞助币不足！")
            } else if(!cm.canHoldAll(itemId , itemCount)){
                cm.sendOk(`背包空间不足`);
            } else {
                data.item.forEach(v=>{
                    const [id,count] = v;
                    cm.gainItem(id, count);
                    ch.saveLog("活动礼包",id,count);
                })
                cm.sendNext("兑换成功！");
                ch.saveUserData("赞助币" , -data.money, true);
                ch.message(`失去赞助币 (-${data.money})`);
                ch.saveUserDayData(`活动礼包${data.name}兑换次数`,1,true);
            }

            
            status = -1;
        }else{
            status = -1;
            action(1, 0, 0);
        }
    
		
		
    
    } else {
        cm.dispose();
    }
}


