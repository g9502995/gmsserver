//渔夫

var status = 0;

var data = [
"今天放鱼了，全是大物，密度拉满，随便下竿就有口！",
"今天水位调好了，鱼全溜边，浅滩狂咬，不限竿、不限线！",
"今天不回鱼压价，鱼获全带走，回鱼价直接拉满，多钓多赚！",
"今天优惠，钓费减半，时长多加两小时，夜钓免费加灯！",
"没人限重，青鱼、草鱼随便钓，大物没护，中多大都能拉！",
"刚打氧完，水里溶氧足，鱼开口疯得很，昨天人人爆护！",
"今天人少，整个塘随便选位置，黄金钓位没人抢！",
"不卡线、不挂底，底下石头清理干净，不用频繁换钩线！",
];

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {

    // 进入钓鱼场是传送进来了，
    // 落下来的时候可能触发双击事件默认点击了NPC，此时弹出两次对话框就会把玩家踢下线
    cm.dispose();
    return;

    if (mode <= 0) {
        cm.dispose();
    } else {
        
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
		
        if (status == 0) {

            // 随机下标
            const randomIndex = Math.floor(Math.random() * data.length);
            // 取出随机项
            const randomItem = data[randomIndex];
			
            var text = "\r\n\t昨天渔夫钓到大家伙，鱼竿都拉断了！\r\n\r\n";
            
			
			cm.sendOk(randomItem)
            cm.dispose();
		
        }else{
            cm.dispose();
        }
		
		
    }
}

