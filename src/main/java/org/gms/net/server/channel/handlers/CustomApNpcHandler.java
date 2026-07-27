package org.gms.net.server.channel.handlers;

import org.gms.client.Client;
import org.gms.net.AbstractPacketHandler;
import org.gms.net.packet.InPacket;

public class CustomApNpcHandler extends AbstractPacketHandler {

    @Override
    public void handlePacket(InPacket p, Client c) {
        int statId = p.readInt();
        System.out.println("[Server] Received CUSTOM_AUTO_ASSIGN packet 0x1235 from player " + c.getPlayer().getName() + " with statId: " + statId);
        c.getAbstractPlayerInteraction().openNpc(9010000, "自动加点");
    }

}
