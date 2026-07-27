/* @Author Ronan
 * @Author Vcoc
        Name: Steward
        Map(s): Foyer
        Info: Commands
        Script: commands.js
        命令，修复2026-2-3 17:08:58
*/

var status;
var lv = 0; 
var common_heading = "@";
var staff_heading = "!";

// var levels = ["Common", "Donator", "JrGM", "GM", "SuperGM", "Developer", "Admin"];
var levels = ["通用", "贡献者", "小GM", "GM", "大GM", "开发者", "超级管理员"];
var commands;

function writeHeavenMSCommands() {
    const CommandsExecutor = Java.type('org.gms.client.command.CommandsExecutor');
    commands = CommandsExecutor.getInstance().getCommandsNameDesc();
}

function start() {
    status = -1;
    writeHeavenMSCommands();
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        lv =  cm.getPlayer().gmLevel();


        if (status == 0) {
            if(lv == 0){
                var text = "\r\n游戏准备了一些快捷指令，你可以在聊天栏输入下面的执行命令对应相应的功能！\r\n\r\n";
                text += "#r";
                var lvComm = commands.get(0).getLeft();
                var lvDesc = commands.get(0).getRight();
                for (var i = 0; i < lvComm.length; i++) {
                    text += `\t@${lvComm[i]}（${lvDesc[i]}）\r\n`;
                }
                cm.sendNext(text);
                cm.dispose();
            }else{
                var sendStr = "可使用的指令：\r\n\r\n#b";
                for (var i = 0; i <= cm.getPlayer().gmLevel(); i++) {
                    sendStr += "#L" + i + "#" + levels[i] + "#l\r\n";
                }
                 cm.sendSimple(sendStr);

            }

            
           
        } else if (status == 1) {
            var lvComm, lvDesc, lvHead = (selection < 2) ? common_heading : staff_heading;

            if (selection > 6) {
                selection = 6;
            } else if (selection < 0) {
                selection = 0;
            }

            lvComm = commands.get(selection).getLeft();
            lvDesc = commands.get(selection).getRight();

            var sendStr = "该选项可用指令 #b" + levels[selection] + "#k:\r\n\r\n";
            for (var i = 0; i < lvComm.size(); i++) {
                sendStr += "  #L" + i + "# " + lvHead + lvComm.get(i) + " - " + lvDesc.get(i);
                sendStr += "#l\r\n";
            }

            cm.sendPrev(sendStr);
        } else {
            cm.dispose();
        }
    }
}