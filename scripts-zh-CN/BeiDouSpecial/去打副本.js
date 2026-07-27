/* ==================
 脚本类型: 万能传送   
 脚本作者：汉堡  
 联系方式：北斗项目组
 =====================
 */
//------------------------------------------------------------------------
var map = [	
	[100000200, "迎月花山丘(10~255) 找 #r#e达尔丽#n#k"],
	
	[889100000, "保护雪人(21~50)"],
	[970030000,"首领挑战(不限)"],
	[261000011, "罗密欧与朱丽叶"]
];

		
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}


function action(mode, type, selection) {
    if (mode == -1) {
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

       if(status === 0){
		   var text = "你打算去哪里？ \r\n\r\n";
		   for (let i=0; i < map.length;i++){
			   text+=`#L${i}##b${map[i][1]}#l\r\n\r\n`;
		   }
		   
		   cm.sendSimple(text);
	   }else{
			cm.getPlayer().saveLocationOnWarp();
			
			var level = cm.getPlayer().getLevel() * 1;
			if( map[selection][0] == "889100000" ){
				cm.message("等级：" + level)
				cm.warp(level <= 30 ? 889100000 : level > 40 ? 889100020 : 889100010);
			}else{
				cm.warp(map[selection][0]);
			}
	   }
    }
}


