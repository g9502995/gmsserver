package org.gms.net.netty;

import org.gms.client.Client;
import io.netty.channel.socket.SocketChannel;
import org.gms.net.PacketProcessor;
import org.gms.net.server.coordinator.session.SessionCoordinator;
import org.gms.util.I18nUtil;
import org.gms.util.RateLimitUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoginServerInitializer extends ServerChannelInitializer {
    private static final Logger log = LoggerFactory.getLogger(LoginServerInitializer.class);

    @Override
    public void initChannel(SocketChannel socketChannel) {
		
		// 获取客户端的IP地址，并打印连接日志（多语言适配）
        final String clientIp = socketChannel.remoteAddress().getHostString();
        log.info(I18nUtil.getLogMessage("LoginServerInitializer.initChannel.info1"), clientIp);
	
		// 获取登录服务器专属的数据包处理器（用于处理登录相关的数据包）
        PacketProcessor packetProcessor = PacketProcessor.getLoginServerProcessor();
        
		// 生成唯一的客户端会话ID（sessionId是父类的原子长整型变量，保证唯一性）
		final long clientSessionId = sessionId.getAndIncrement();
        
		// 获取客户端的完整远程地址（IP+端口）
		final String remoteAddress = getRemoteAddress(socketChannel);
		
		// 限流校验：如果该客户端地址触发了限流规则（比如短时间多次连接），直接关闭通道
        if (!RateLimitUtil.getInstance().check(remoteAddress)) {
            log.warn(I18nUtil.getLogMessage("LoginServerInitializer.initChannel.warn1"), remoteAddress);
            socketChannel.close();
        }
		
		// 创建登录专用的Client实例，绑定会话ID、地址、处理器、世界ID、频道ID
        final Client client = Client.createLoginClient(clientSessionId, remoteAddress, packetProcessor, LoginServer.WORLD_ID, LoginServer.CHANNEL_ID);
	
		// 会话协调器校验：检查是否允许该登录会话启动（比如服务器满载、会话冲突等），不允许则关闭通道
        if (!SessionCoordinator.getInstance().canStartLoginSession(client)) {
            socketChannel.close();
            return;
        }
	
		// 初始化Netty的ChannelPipeline（核心步骤）：添加编码器、解码器、业务处理器等（逻辑在父类initPipeline中）
        initPipeline(socketChannel, client);
    }
}
