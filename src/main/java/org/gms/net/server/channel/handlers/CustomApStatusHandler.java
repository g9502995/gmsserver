package org.gms.net.server.channel.handlers;

import org.gms.client.Client;
import org.gms.net.AbstractPacketHandler;
import org.gms.net.packet.InPacket;

public class CustomApStatusHandler extends AbstractPacketHandler {

    @Override
    public void handlePacket(InPacket p, Client c) {
        int status = p.readInt();
        boolean isEnabled = (status != 0);
        
        System.out.println("[CustomAutoAssign] Player " + c.getPlayer().getName() + " reported status: " + (isEnabled ? "ON" : "OFF"));
        //c.getPlayer().setAutoAssign(isEnabled);
    }

}
