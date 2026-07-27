package org.gms.dao.mapper;

import com.mybatisflex.core.BaseMapper;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;
import org.gms.dao.entity.LoginLogDO;

/**
 * 登录日志表 Mapper 接口（日志表存 mxd_log 库）
 */
public interface LoginLogMapper extends BaseMapper<LoginLogDO> {

    /**
     * 创建当日日志表（在 mxd_log 库下，不存在则建，存在则跳过）
     * @param tableName 实际表名（如 login_log）
     */
    @Update("create table if not exists `mxd_log`.`${tableName}`(" +
            "id bigint not null auto_increment comment '主键ID'," +
			"type int comment '类型|1:登录;2:切换频道;3:下线'," + 
			"user_id int comment '账号ID'," +
			"role_id int comment '角色ID'," +
			"world_id int comment '服务器ID'," +
			"channel_id int comment '频道ID'," +
			"login_ip varchar(50) comment '登录人IP'," +
            "create_time datetime not null default current_timestamp comment '登录时间'," +
            "primary key (id)," +
            "index idx_user_create_time (user_id,create_time) comment '按用户ID和登录时间查询索引'," +
            "index idx_role_create_time (role_id,create_time) comment '按角色和登录时间查询索引'," +
			"index idx_ip_create_time (login_ip,create_time) comment '按IP和登录时间查询索引'" +
			
            ") engine = innodb default charset = utf8mb4 comment = '登录日志表';")
    void createLogTableIfNotExists(@Param("tableName") String tableName);

    /**
     * 动态表名插入日志（插入到 mxd_log 库下的每日分表）
     * @param tableName 实际表名（如 login_log）
     * @param logDO 日志数据
     * @return 插入行数
     */
    @Insert("INSERT INTO `mxd_log`.`${tableName}` " +
            "(type, user_id, role_id, world_id, channel_id, login_ip) " +
            "VALUES " +
            "(#{log.type}, #{log.userId}, #{log.roleId} , #{log.worldId}, #{log.channelId}, #{log.userIp})")
    int insertByDynamicTable(@Param("tableName") String tableName, @Param("log") LoginLogDO logDO);

}