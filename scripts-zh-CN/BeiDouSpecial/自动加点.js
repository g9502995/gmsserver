var status;
const menu = [
	{ id: 1, name: '力量' },
	{ id: 2, name: '敏捷' },
	{ id: 3, name: '智力' },
	{ id: 4, name: '运气' }
];
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection)  {
	
	if (mode == -1) {
		cm.dispose();
		return false;
	}
	
	if (mode == 1) {
		status++;
	} else {
		status--;
	}

	const auto = cm.getPlayer().getUpLevelAddAttr();

    if (status == 0) {

    	var text = "";
		text += "\r\n升级后自动将能力值分配到指定属性上，请勾选要加的属性\r\n\r\n";
		
		menu.forEach(({ id, name }) => {
			text += `#L${id}# #fUI/Basic.img/CheckBox/${setI(id, auto)}# #b全加${name}#l\r\n`;
		})

		text += "\r\n\r\n";
		text += "　"
		
		cm.sendSimple(text);
		
		
    } else if (status == 1 ) {
    	var text = "";
    	var save = selection;

    	if(selection === auto){
    		save = 0;
    		text += "已关闭自动分配";
    	} else {
    		text += "已开启自动分配到" + getNameById(selection) + "值";
    	}

    	const ch = cm.getPlayer();

    	ch.setUpLevelAddAttr(save);
    	if(save !== 0){
    		ch.autoAP()
    	}
    	ch.dropMessage(1,text);

    	cm.dispose();
		
	} else {
		cm.dispose();
	}
}	


function setI(i,index){
    return index === i ? "1" : "0";
}


function getNameById(id) {
	var back = '';

	menu.forEach(item => {
		if(item.id === id){
			back = item.name;
		}
	})
	return back;
}