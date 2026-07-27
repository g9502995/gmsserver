package org.gms.util;

import org.gms.dao.entity.MapLogDO;
import org.gms.dao.mapper.MapLogMapper;
import org.gms.manager.ServerManager;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 切换地图日志工具类（每日分表）
 */
public class MapLogUtil {
    // 静态获取Mapper实例
    private static final MapLogMapper logMapper = ServerManager.getApplicationContext().getBean(MapLogMapper.class);
    // 日期格式化器（用于拼接表名）
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyyMM");

    /**
     * 获取副本日志表名（如 map_log_202601）
     */
    private static String getCurrentTableName() {
        return getTableNameByDate(LocalDateTime.now());
    }

    /**
     * 根据指定时间获取日志表名
     */
    private static String getTableNameByDate(LocalDateTime dateTime) {
		return "map_log";
        //return "map_log_" + dateTime.format(DATE_FORMATTER);
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
     */
    public static void saveLog(int roleId, int mapId) {
        
        // 初始化当日表（确保表存在）
        initCurrentTable();
        // 构建日志实体（怪物ID直接传null，不做空字符串填充）
        MapLogDO logDO = MapLogDO.builder()
				.roleId(roleId)
				.mapId(mapId)
                .build();
				
        // 动态表名插入
        String tableName = getCurrentTableName();
        logMapper.insertByDynamicTable(tableName, logDO);
    }
}