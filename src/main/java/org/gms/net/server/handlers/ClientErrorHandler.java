package org.gms.net.server.handlers;

import org.gms.client.Client;
import org.gms.net.PacketHandler;
import org.gms.net.packet.InPacket;
import org.gms.util.HexTool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ClientErrorHandler implements PacketHandler {
    private static final Logger log = LoggerFactory.getLogger(ClientErrorHandler.class);

    @Override
    public void handlePacket(InPacket p, Client c) {
        if (p.available() > 0) {
            try {
                byte[] data = p.readBytes(p.available());
                String hex = HexTool.toHexString(data);
                String text = HexTool.toStringFromCharset(data);
                log.error("[Client Error / Error 38] 收到客户端报错数据包！账号: {} (ID: {}), 角色: {}, Hex: {}, 文本: {}",
                        c.getAccountName(), c.getAccID(),
                        (c.getPlayer() != null ? c.getPlayer().getName() : "未选角"),
                        hex, text);
            } catch (Exception e) {
                log.error("[Client Error] 解析客户端报错数据包异常", e);
            }
        } else {
            log.error("[Client Error / Error 38] 收到客户端空报错数据包！账号: {}, 角色: {}",
                    c.getAccountName(), (c.getPlayer() != null ? c.getPlayer().getName() : "未选角"));
        }
    }

    @Override
    public boolean validateState(Client c) {
        return true;
    }
}
