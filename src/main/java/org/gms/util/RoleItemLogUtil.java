package org.gms.util;

import org.gms.dao.entity.RoleItemLogDO;
import org.gms.dao.mapper.RoleItemLogMapper;
import org.gms.manager.ServerManager;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 角色物品日志工具类（每日分表）
 */
public class RoleItemLogUtil {
    // 静态获取Mapper实例
    private static final RoleItemLogMapper logMapper = ServerManager.getApplicationContext().getBean(RoleItemLogMapper.class);
    // 日期格式化器（用于拼接表名）
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyyMM");

    /**
     * 获取当日日志表名（如 role_item_log_202601）
     */
    private static String getCurrentTableName() {
        return getTableNameByDate(LocalDateTime.now());
    }

    /**
     * 根据指定时间获取日志表名
     */
    private static String getTableNameByDate(LocalDateTime dateTime) {
		return "role_item_log";
        //return "role_item_log_" + dateTime.format(DATE_FORMATTER);
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
     * @param mapId 地图ID
     * @param targetId 怪物ID或者NPCID
     * @param itemId 物品ID
     * @param count 获得数量（正数）
     * @param type 获取类型（如"活动获得"，可为null）
     */

    /**
     * 核心保存日志方法
     */
    public static void saveLog(Integer roleId, Integer mapId, Integer targetId, Integer itemId, int itemCount, String type) {
        
        // 初始化当日表（确保表存在）
        initCurrentTable();
        // 构建日志实体（怪物ID直接传null，不做空字符串填充）
        RoleItemLogDO logDO = RoleItemLogDO.builder()
                .roleId(roleId)
                .mapId(mapId)
                .targetId(targetId) // 怪物ID可为null
                .itemId(itemId)
                .itemCount(itemCount)
                .type(type) // 类型字段，可为null
                .operateTime(LocalDateTime.now())
                .build();
				
        // 动态表名插入
        String tableName = getCurrentTableName();
        logMapper.insertByDynamicTable(tableName, logDO);
    }
}