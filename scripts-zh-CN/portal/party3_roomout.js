function enter(pi) {
    var exitPortal = 0;
    var eim = pi.getEventInstance();
    switch (pi.getMapId()) {

        case 920010200:

            if( eim.getProperty("4001044") !== "1" && !pi.haveItem(4001044)){
                // pi.playerMessage(5, "请确保持有第一块碎片。");
                // return false;
            }

            // eim.setProperty("4001044" , "1");

            exitPortal = 4;
            break;

        case 920010300:

			if( eim.getProperty("4001045") !== "1" && !pi.haveItem(4001045)){
                // pi.playerMessage(5, "请确保持有第二块碎片。");
                // return false;
			}

            // eim.setProperty("4001045" , "1");

            exitPortal = 12;
            break;

        case 920010400:

            if( eim.getProperty("4001046") !== "1" && !pi.haveItem(4001046)){
				// pi.playerMessage(5, "请确保持有第三块碎片。");
				// return false;
			}

            // eim.setProperty("4001046" , "1");
            exitPortal = 5;
            break;

        case 920010500:

			if( eim.getProperty("4001047") !== "1" && !pi.haveItem(4001047)){
				// pi.playerMessage(5, "请确保持有第四块碎片。");
				// return false;
			}

            // eim.setProperty("4001047" , "1");
            exitPortal = 13;
            break;

        case 920010600:
            exitPortal = 15;
            break;

        case 920010700:

            if( eim.getProperty("4001049") !== "1" && !pi.haveItem(4001049)){
                // pi.playerMessage(5, "请确保持有第六块碎片。");
                // return false;
            }

            // eim.setProperty("4001049" , "1");

            exitPortal = 14;
            break;

        case 920011000:
            exitPortal = 16;
            break;
    }

    pi.playPortalSound();
    pi.warp(920010100, exitPortal);
    return true;
}