/*2101014.js - Lobby and Entrance
 * @author Jvlaple
 * For Jvlaple's AriantPQ
 */

var status = 0;
var toBan = -1;
var choice;
var arenaType;
var arena;
var arenaName;
var type;
var map;

const ExpeditionType = Java.type('org.gms.server.expeditions.ExpeditionType');
var exped = ExpeditionType.ARIANT;
var exped1 = ExpeditionType.ARIANT1;
var exped2 = ExpeditionType.ARIANT2;
var max = 2;
var dayCount = 0;
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
        if (cm.getPlayer().getMapId() == 980010000) {

            dayCount = cm.getPlayer().getDayData("阿里安特竞技场") * 1;

            if(dayCount >= max){
                cm.sendOk(`每天只能参与${max}次，你已经参与了${dayCount}次，请明天再来！`);
                cm.dispose();
                return;
            }

            if (status == 0) {
                var expedicao = cm.getExpedition(exped);
                var expedicao1 = cm.getExpedition(exped1);
                var expedicao2 = cm.getExpedition(exped2);

                var channelMaps = cm.getClient().getChannelServer().getMapFactory();
                var startSnd = `\r\n\t你今天已进入${dayCount}次，每天最多${max}次，是否现在要进入？ \r\n\r\n\t#e#r(选择一个竞技场)#n#k\r\n#b`;
                var toSnd = startSnd;

                if (expedicao == null) {
                    toSnd += "#L0#竞技场（1）(空场)#l\r\n";
                } else if (channelMaps.getMap(980010101).getCharacters().isEmpty()) {
                    var count = cm.getExpeditionMemberNames(exped).split(",").length - 1;

                    toSnd += "#L0#加入竞技场（1）房主 (" + expedicao.getLeader().getName() + ")" + " 当前成员: " + count + "人\r\n";
                    
                }

                if(3==2){
                    if (expedicao1 == null) {
                        toSnd += "#L1#竞技场（2）(空场)#l\r\n";
                    } else if (channelMaps.getMap(980010201).getCharacters().isEmpty()) {
                        var count = cm.getExpeditionMemberNames(exped1).split(",").length - 1;
                        toSnd += "#L1#加入竞技场（2）房主 (" + expedicao1.getLeader().getName() + ")" + " 当前成员: " + count + "人\r\n";
                    }
                    if (expedicao2 == null) {
                        toSnd += "#L2#竞技场（3）(空场)#l\r\n";
                    } else if (channelMaps.getMap(980010301).getCharacters().isEmpty()) {
                        var count = cm.getExpeditionMemberNames(exped2).split(",").length - 1
                        toSnd += "#L2#加入竞技场（3）房主 (" + expedicao2.getLeader().getName() + ")" + " 当前成员: " + count + "人\r\n";
                    }
                }
                if (toSnd === startSnd) {
                    cm.sendOk("所有的战斗竞技场都已经被占用。我建议你稍后再回来，或者换个频道。");
                    cm.dispose();
                } else {
                    cm.sendSimple(toSnd);
                }
            } else if (status == 1) {
                arenaType = selection;
                expedicao = fetchArenaType();
                if (expedicao == "") {
                    cm.dispose();
                    return;
                }

                if (expedicao != null) {
                    enterArena(-1);
                } else {
                    var text = "你允许这场比赛最多多少人加入？\r\n\r\n#b";
                    for(let i = 3; i <=5; i++ ){
                        text += `#L${i}#${i}个人#l\r\n`;
                    }
                    cm.sendSimple(text)
                }
            } else if (status == 2) {
                enterArena(selection);
            }
        }else{
            cm.sendOk("有一个阿里安特竞技活动！你猜在哪里呢？");
            cm.dispose();
        }
    }
}

function fetchArenaType() {
    switch (arenaType) {
        case 0 :
            exped = ExpeditionType.ARIANT;
            expedicao = cm.getExpedition(exped);
            map = 980010100;
            break;
        case 1 :
            exped = ExpeditionType.ARIANT1;
            expedicao = cm.getExpedition(exped);
            map = 980010200;
            break;
        case 2 :
            exped = ExpeditionType.ARIANT2;
            expedicao = cm.getExpedition(exped);
            map = 980010300;
            break;
        default :
            exped = null;
            map = 0;
            expedicao = "";
    }

    return expedicao;
}

function enterArena(arenaPlayers) {
    expedicao = fetchArenaType();
    if (expedicao == "") {
        cm.dispose();

    } else if (expedicao == null) {
        if (arenaPlayers != -1) {
            var res = cm.createExpedition(exped, true, 0, arenaPlayers);
            if (res == 0) {
                cm.warp(map, 0);
                cm.getPlayer().saveDayData("阿里安特竞技场" , dayCount + 1);
                cm.getPlayer().dropMessage("你的竞技场已创建成功，请等待其他玩家加入对战。");
            } else if (res > 0) {
                cm.sendOk("抱歉，您已经达到了此次远征的尝试配额！请另选他日再试……");
            } else {
                cm.sendOk("在启动远征时发生了意外错误，请稍后重试。");
            }
        } else {
            cm.sendOk("在定位远征队时发生了意外错误，请稍后重试。");
        }

        cm.dispose();
    } else {
        if (playerAlreadyInLobby(cm.getPlayer())) {
            cm.sendOk("抱歉，你已经在大厅里了。");
            cm.dispose();
            return;
        }

        var playerAdd = expedicao.addMemberInt(cm.getPlayer());
        if (playerAdd == 3) {
            cm.sendOk("抱歉，大厅现在已经满了。");
            cm.dispose();
        } else {
            if (playerAdd == 0) {
                cm.warp(map, 0);
                cm.dispose();
            } else if (playerAdd == 2) {
                cm.sendOk("抱歉，队长不允许你进入。");
                cm.dispose();
            } else {
                cm.sendOk("错误。");
                cm.dispose();
            }
        }
    }
}

function playerAlreadyInLobby(player) {
    return cm.getExpedition(ExpeditionType.ARIANT) != null && cm.getExpedition(ExpeditionType.ARIANT).contains(player) ||
        cm.getExpedition(ExpeditionType.ARIANT1) != null && cm.getExpedition(ExpeditionType.ARIANT1).contains(player) ||
        cm.getExpedition(ExpeditionType.ARIANT2) != null && cm.getExpedition(ExpeditionType.ARIANT2).contains(player);
}
