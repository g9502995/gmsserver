function enter(pi) {

	// 判断账号是否有大于30级的角色，有的话就是小号，打开2007NPC脚本提示他是否需要传送到明珠港跳过新手流程
    // if (pi.hasLevel30Character()) {
    //     pi.openNpc(2007);
    // }

    // pi.startQuest(30000,9001000);
    pi.completeQuest(30000);
    pi.openNpc(2007);
    pi.blockPortal();
    return true;
}