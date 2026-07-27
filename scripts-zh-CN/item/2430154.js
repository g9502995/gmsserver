
//圣神水
var id = 2430154;
var status = -1;
var gp = 1;
var guild;
var num = 0;
function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    if(!im.haveItem(id)){
		//强开
		im.dispose();
		return;
	}

    num = im.getItemQuantity(id);

    if(num > 1000) num = 1000;

    guild = im.getPlayer().getGuildId();

    if(!guild){
    	im.message("未加入家族不可使用");
		im.dispose();
		return;
    }

	if (status === 0) {

		if(num > 1){
			var text = `\r\n你有${im.getItemQuantity(id)}个，打算使用几个？\r\n\r\n#b`;
			text += `#L${num}#使用${num}个\r\n`;
			text += "#L1#使用1个\r\n";
			im.sendSimple(text);
		}else{
			if(num == 1)open()
			im.dispose();
		}
		
	} else if (status == 1){
		if(selection > 0 && num >= selection)open(selection);
		im.dispose();
	} else {
		im.dispose();
	}
	
}


function open(num = 1) {
	var ch = im.getPlayer();
	ch.serverMessage(`使用了${num}个`,id,`为家族增加了GP点！`)
	ch.saveLog(id,-num);
	ch.saveLog(id,4,gp * num);
	im.getGuild().gainGP(gp * num);
	im.gainItem(id,-num,false,false);
	extValue(`${guild}_GP` , gp * num);
}



/**
 * 存储角色扩展字段
 * @Desc   无
 * @Author Ming
 * @Date   2025-12-22
 * @param  {[type]}   name  存储名字
 * @param  {[type]}   num   增加多少
 * @param  {Bool}     msg   提示消息
 * @return {[type]}
 */
function extValue(name,num,msg){
	var number = im.getPlayer().getData(name) * 1;
	number = number + (num * 1);
	im.getPlayer().saveData(name, number.toString());
	if(msg)im.message(msg);
}

