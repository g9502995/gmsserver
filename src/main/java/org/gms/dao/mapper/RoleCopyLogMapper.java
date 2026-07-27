package org.gms.dao.mapper;

import com.mybatisflex.core.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.gms.dao.entity.RoleCopyLogDO;

/**
 * 角色副本日志表 Mapper 接口（日志表存 mxd_log 库）
 */
public interface RoleCopyLogMapper extends BaseMapper<RoleCopyLogDO> {

    /**
     * 创建当日日志表（在 mxd_log 库下，不存在则建，存在则跳过）
     * @param tableName 实际表名（如 role_copy_log_20260121）
     */
    @Update("create table if not exists `mxd_log`.`${tableName}`(" +
            "id bigint not null auto_increment comment '主键ID'," +
            "role_id int not null comment '角色ID'," +
            "name varchar(50) comment '名称'," +
			"startTime bigint comment '开始时间戳'," +
            "endTime bigint comment '结束时间戳'," +
			"finishTime int default 0 comment '完成用时（秒）'," + 
            "primary key (id)," +
            "index idx_role_time (role_id, startTime) comment '角色ID+时间索引'," +
			"index idx_finish (finishTime) comment '完成时长'" +
            ") engine = innodb default charset = utf8mb4 comment = '角色副本日志表';")
    void createLogTableIfNotExists(@Param("tableName") String tableName);

    /**
     * 动态表名插入日志（插入到 mxd_log 库下的每日分表）
     * @param tableName 实际表名（如 role_copy_log_20260121）
     * @param logDO 日志数据
     * @return 插入行数
     */
    @Insert("INSERT INTO `mxd_log`.`${tableName}` " +
            "(role_id, name, startTime, endTime, finishTime) " +
            "VALUES " +
            "(#{log.roleId}, #{log.name}, #{log.startTime} , #{log.endTime}, #{log.finishTime})")
    int insertByDynamicTable(@Param("tableName") String tableName, @Param("log") RoleCopyLogDO logDO);

}