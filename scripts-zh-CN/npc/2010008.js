
/* guild emblem npc */

var status = 0;
var change_emblem_cost = 0;
var change_emblem_cost_GP = 2000;
const GameConfig = Java.type('org.gms.config.GameConfig');

function start()  {
  status = -1;
  change_emblem_cost = GameConfig.getServerInt('change_emblem_cost')
  action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode === 1) {
        status++;
    } else {
        status--;
    }

    if(status == 0){
        if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() > 2) {
            cm.sendOk("你不是家族管理者，因此你不能更改徽标。");
            cm.dispose();
        }else{
            cm.sendYesNo(`创建或更改家族徽标需要 #r ${change_emblem_cost} 金币#k 和 #r ${change_emblem_cost_GP}GP\r\n#k您确定要继续吗？`);
        }

    } else if (status == 1) {


        if( change_emblem_cost_GP > cm.getGuild().getGP() || change_emblem_cost > cm.getMeso()){
            cm.sendOk("金币或GP点不足！")
        }else{
            if(change_emblem_cost_GP)cm.getGuild().gainGP(-change_emblem_cost_GP);
              cm.getPlayer().genericGuildMessage(17);
        }

      
        cm.dispose();
    
    } else {
        cm.dispose();
    }
}