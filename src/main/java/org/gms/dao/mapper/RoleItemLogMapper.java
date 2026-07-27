package org.gms.dao.mapper;

import com.mybatisflex.core.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.gms.dao.entity.RoleItemLogDO;

/**
 * 角色物品日志表 Mapper 接口（日志表存 mxd_log 库）
 */
public interface RoleItemLogMapper extends BaseMapper<RoleItemLogDO> {

    /**
     * 创建当日日志表（在 mxd_log 库下，不存在则建，存在则跳过）
     * @param tableName 实际表名（如 role_item_log）
     */
    @Update("create table if not exists `mxd_log`.`${tableName}`(" +
            "id bigint not null auto_increment comment '主键ID'," +
            "role_id int not null comment '角色ID'," +
            "map_id int not null comment '地图ID'," +
            "target_id int not null comment '目标ID'," +
            "item_id int not null comment '物品ID'," +
            "item_count int not null comment '物品数量（正数=获得，负数=消耗）'," +
            "type varchar(50) comment '获取/消耗类型（如活动获得、普通获得）'," +
            "operate_time datetime not null default current_timestamp comment '操作时间'," +
            "primary key (id)," +
			"index idx_role_time (role_id, operate_time) comment '角色ID+时间索引'," +
			"index idx_time (operate_time) comment '时间索引'" +
            ") engine = innodb default charset = utf8mb4 comment = '角色物品日志表';")
    void createLogTableIfNotExists(@Param("tableName") String tableName);

    /**
     * 动态表名插入日志（插入到 mxd_log 库下的每日分表）
     * @param tableName 实际表名（如 role_item_log）
     * @param logDO 日志数据
     * @return 插入行数
     */
    @Insert("INSERT INTO `mxd_log`.`${tableName}` " +
            "(role_id, map_id, target_id, item_id, item_count, type, operate_time) " +
            "VALUES " +
            "(#{log.roleId}, #{log.mapId}, #{log.targetId}, #{log.itemId}, #{log.itemCount}, #{log.type}, #{log.operateTime})")
    int insertByDynamicTable(@Param("tableName") String tableName, @Param("log") RoleItemLogDO logDO);

}