
var status;
var sel;


var create_guild_cost = 0; //创建家族金额
var expand_guild_cost = 0;  //扩展人数需求金额
var expand_guild_GP = 1000;   //扩展人数需球GP
var create_guild_min_partners = 0;  // 创建家族需在场人数
const GameConfig = Java.type('org.gms.config.GameConfig');
function start() {
    create_guild_cost =  GameConfig.getServerInt('create_guild_cost')
    create_guild_min_partners =  GameConfig.getServerInt('create_guild_min_partners')
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    } else {
       if (mode == 1) {
            status++;
        } else {
            status--;
        }


        if(status == 0){

            var text = "欢迎来到家族中心，你现在想做什么呢？\r\n";
            text += "#b"
            text += "#L0#创建家族#l\r\n";
            text += "#L1#解散家族#l\r\n";
            text += "#L2#升级家族#l\r\n"
            cm.sendSimple(text);

        } else if (status == 1) {

            sel = selection;
            if (selection == 0) {
                if (cm.getPlayer().getGuildId() > 0) {
                    cm.sendOk("你已经拥有家族了，不能再创建家族。");
                    cm.dispose();
                } else {
                    cm.sendYesNo(`创建一个新的家族需要 #b ${create_guild_cost} 金币#k，至少 #b ${create_guild_min_partners} #k人在场，你确定继续创建一个新的家族吗？`);
                }
            } else if (selection == 1) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("你还没有家族！或者\r 你不是族长，因此你不能解散该家族.");
                    cm.dispose();
                } else {
                    cm.sendYesNo("你确定真的要解散你的家族？当解散后你将不能恢复所有家族相关资料以及GP的数值，是否继续？");
                }
            } else if (selection == 2) {

                var guild = cm.getGuild();

                if(guild !== null){

                    //GS有单独处理，家族人数大于30人增加扣费金额，因此需获取需要扣的金币数量
                    var Guild = Java.type("org.gms.net.server.guild.Guild");
                    var memeber = guild.getCapacity();
                    expand_guild_cost = Guild.getIncreaseGuildCost(memeber)

                    //根据人数增长GP点
                    expand_guild_GP = memeber / 10 * expand_guild_GP;
                    
                    if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() > 2) {
                        cm.sendOk("你不是家族管理者，因此你将不能增加家族成员的人数上限.");
                        cm.dispose();
                    } else {
                        var glv = Number((guild.getCapacity() - 5) / 5);
                        var text = `当前家族等级为：#r${glv}#k\t`
                            text += `升级后增加 #r5#k位成员上限，但你需支付#r${expand_guild_cost}金币#k和#r${expand_guild_GP}家族GP点#k，你确定要升级吗？`
                        cm.sendYesNo(text);
                    }
                }else{
                    cm.sendNext("你还没有家族！");
                    cm.dispose();
                }

            }
        } else if (status == 2) {
            if (sel == 0) {
                cm.getPlayer().genericGuildMessage(1);
            } else if (sel == 1) {
                cm.getPlayer().disbandGuild();
            } else if (sel == 2) {

                var guild = cm.getGuild();

                if(guild){

                    // if(guild.getCapacity() !== guild.getMembers().size()) {
                        // cm.sendNext("当前帮会人员还未达到最大容纳人数，没有必要升级！");
                    if( expand_guild_GP > guild.getGP() ){
                        cm.sendNext(`至少需要${expand_guild_GP}家族GP点`);
                    } else if( expand_guild_cost > cm.getMeso() ) {
                        cm.sendNext("金币不足！")
                    } else {
                        if(expand_guild_GP)guild.gainGP(-expand_guild_GP);
                        cm.getPlayer().increaseGuildCapacity();
                        cm.getPlayer().serverMessage(`升级了家族！`)
                    }
                }else{
                    //这里可以对其封号，属于强开
                    cm.sendNext("你还没有家族！");
                }
                
            }

            cm.dispose();
            
        }else{
            cm.dispose();
        }
    }
}

