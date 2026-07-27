package org.gms.dao.mapper;

import com.mybatisflex.core.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.gms.dao.entity.MapLogDO;

/**
 * 登录日志表 Mapper 接口（日志表存 mxd_log 库）
 */
public interface MapLogMapper extends BaseMapper<MapLogDO> {

    /**
     * 创建当日日志表（在 mxd_log 库下，不存在则建，存在则跳过）
     * @param tableName 实际表名（如 Map_log_20260121）
     */
    @Update("create table if not exists `mxd_log`.`${tableName}`(" +
            "id bigint not null auto_increment comment '主键ID'," +
			"role_id int comment '角色ID'," +
			"map_id int comment '服务器ID'," +
            "create_time datetime not null default current_timestamp comment '进入时间'," +
            "primary key (id)," +
          
            "index idx_role_id (role_id,create_time) comment '按角色ID和时间查询'" +
			
            ") engine = innodb default charset = utf8mb4 comment = '地图切换日志表';")
    void createLogTableIfNotExists(@Param("tableName") String tableName);

    /**
     * 动态表名插入日志（插入到 mxd_log 库下的每日分表）
     * @param tableName 实际表名（如 map_log_20260121）
     * @param logDO 日志数据
     * @return 插入行数
     */
    @Insert("INSERT INTO `mxd_log`.`${tableName}` " +
            "(role_id, map_id) " +
            "VALUES " +
            "(#{log.roleId} , #{log.mapId})")
    int insertByDynamicTable(@Param("tableName") String tableName, @Param("log") MapLogDO logDO);

}