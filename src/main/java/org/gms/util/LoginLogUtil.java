package org.gms.util;

import org.gms.dao.entity.LoginLogDO;
import org.gms.dao.mapper.LoginLogMapper;
import org.gms.manager.ServerManager;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 登录日志工具类（每日分表）
 */
public class LoginLogUtil {
    // 静态获取Mapper实例
    private static final LoginLogMapper logMapper = ServerManager.getApplicationContext().getBean(LoginLogMapper.class);
    // 日期格式化器（用于拼接表名）
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");

    /**
     * 获取副本日志表名（如 login_log_20260121）
     */
    private static String getCurrentTableName() {
        return getTableNameByDate(LocalDateTime.now());
    }

    /**
     * 根据指定时间获取日志表名
     */
    private static String getTableNameByDate(LocalDateTime dateTime) {
		return "login_log";
        //return "login_log_" + dateTime.format(DATE_FORMATTER);
    }

    /**
     * 初始化当日表（确保表存在）
     */
    private static void initCurrentTable() {
        String tableName = getCurrentTableName();
        logMapper.createLogTableIfNotExists(tableName);
    }
	

    /**
     * 核心保存日志方法
	 * type : 1 登录   2 切换频道  3下线
     */
    public static void saveLog(int type,int userId, int roleId, int worldId, int channelId, String userIp) {
        
        // 初始化当日表（确保表存在）
        initCurrentTable();
        // 构建日志实体（怪物ID直接传null，不做空字符串填充）
        LoginLogDO logDO = LoginLogDO.builder()
				.type(type)
                .userId(userId)
				.roleId(roleId)
				.worldId(worldId)
				.channelId(channelId)
				.userIp(userIp)
                .build();
				
        // 动态表名插入
        String tableName = getCurrentTableName();
        logMapper.insertByDynamicTable(tableName, logDO);
    }
}