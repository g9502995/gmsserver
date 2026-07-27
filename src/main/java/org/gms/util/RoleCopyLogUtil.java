package org.gms.util;

import org.gms.dao.entity.RoleCopyLogDO;
import org.gms.dao.mapper.RoleCopyLogMapper;
import org.gms.manager.ServerManager;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 角色物品日志工具类（每日分表）
 */
public class RoleCopyLogUtil {
    // 静态获取Mapper实例
    private static final RoleCopyLogMapper logMapper = ServerManager.getApplicationContext().getBean(RoleCopyLogMapper.class);
    // 日期格式化器（用于拼接表名）
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyyMM");

    /**
     * 获取副本日志表名（如 role_copy_log_202601）
     */
    private static String getCurrentTableName() {
        return getTableNameByDate(LocalDateTime.now());
    }

    /**
     * 根据指定时间获取日志表名
     */
    private static String getTableNameByDate(LocalDateTime dateTime) {
		return "role_copy_log";
        //return "role_copy_log_" + dateTime.format(DATE_FORMATTER);
    }

    /**
     * 初始化当日表（确保表存在）
     */
    private static void initCurrentTable() {
        String tableName = getCurrentTableName();
        logMapper.createLogTableIfNotExists(tableName);
    }

    /**
     * 记录角色获得物品日志（带类型）
     * @param roleId 角色ID
     * @param name 内容
     */

    /**
     * 核心保存日志方法
     */
    public static void saveLog(Integer roleId, String name, Long startTime, Long endTime, Long finishTime) {
        
        // 初始化当日表（确保表存在）
        initCurrentTable();
        // 构建日志实体（怪物ID直接传null，不做空字符串填充）
        RoleCopyLogDO logDO = RoleCopyLogDO.builder()
                .roleId(roleId)
                .name(name)
				.startTime(startTime)
				.endTime(endTime)
				.finishTime(finishTime)
                .build();
				
        // 动态表名插入
        String tableName = getCurrentTableName();
        logMapper.insertByDynamicTable(tableName, logDO);
    }
}