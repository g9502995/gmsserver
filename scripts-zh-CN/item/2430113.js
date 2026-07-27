//宠物超级磁铁礼包


function start() {

    const give = 3996001;
    const id = im.getNpcObjectId();

    if (!id) {
        im.dropMessage(1, "读取配置信息错误");
        im.dispose();
        return;
    }

    if (!im.haveItem(id)) {
        //强开
        im.dispose();
        return;
    }


    const ch = im.getPlayer()

    if (!ch.getSkillLevel(8)) {
        im.dropMessage(1, "请先学会群宠技能再打开！");
        im.dispose();
        return;
    }

    if (im.getItemQuantity(give) > 0) {
        im.dropMessage(1, "你已拥有超级磁铁");
        im.dispose();
        return;
    }

    if (im.canHold(give)) {

        im.gainItem(give,1,false,false,7 * (24 * 60 * 60 * 1000));
        ch.saveLog(give, 1);
        ch.serverMessage(`打开礼包获得`, give);

        im.gainItem(id, -1,false,false);
        ch.saveLog(id, -1);

    } else {
        im.dropMessage(1, "背包空间不足！");
    }

    im.dispose();

}