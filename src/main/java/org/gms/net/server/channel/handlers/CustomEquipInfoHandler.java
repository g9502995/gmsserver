package org.gms.net.server.channel.handlers;

import org.gms.client.Client;
import org.gms.client.inventory.Equip;
import org.gms.client.inventory.Inventory;
import org.gms.client.inventory.InventoryType;
import org.gms.client.inventory.Item;
import org.gms.net.PacketHandler;
import org.gms.net.packet.InPacket;
import org.gms.util.PacketCreator;

public class CustomEquipInfoHandler implements PacketHandler {
    @Override
    public void handlePacket(InPacket p, Client c) {
        short raw = p.readShort();
        Item item = resolveItem(c, raw);
        if (!(item instanceof Equip equip)) {
            return;
        }

        c.sendPacket(PacketCreator.getCustomEquipInfo(raw, equip.getCustomUpgradeCount()));
    }

    private Item resolveItem(Client c, short raw) {
        if (raw < 0) {
            return resolveEquippedItem(c, raw);
        }

        if ((raw & 0xFF00) == 0x0100) {
            short slot = (short) (raw & 0x00FF);
            return c.getPlayer().getInventory(InventoryType.EQUIP).getItem(slot);
        }

        return null;
    }

    private Item resolveEquippedItem(Client c, short raw) {
        Inventory equipped = c.getPlayer().getInventory(InventoryType.EQUIPPED);

        Item item = equipped.getItem(raw);
        if (item != null) {
            return item;
        }

        // cash overlay fallback
        if (raw <= -100) {
            item = equipped.getItem((short) (raw + 100));
            if (item != null) {
                return item;
            }
        } else {
            item = equipped.getItem((short) (raw - 100));
            if (item != null) {
                return item;
            }
        }

        return null;
    }

    @Override
    public boolean validateState(Client c) {
        return c.isLoggedIn();
    }
}
