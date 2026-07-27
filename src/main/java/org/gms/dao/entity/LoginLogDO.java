package org.gms.dao.entity;

import com.mybatisflex.annotation.Id;
import com.mybatisflex.annotation.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 登录连接日志表（每日分表）实体类
 * 表名格式：login_log_yyyyMMdd（如 login_log_20260121）
 *
 * @author Ming
 * @since 2026-01-31
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("login_log_base") // 关联基础表结构
public class LoginLogDO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID（数据库自增，bigint避免溢出，若需纯int可改为Integer）
     */
    @Id // 仅标记为主键，自增由数据库层面保证
    private Integer id;


	private int type;

    /**
     * 账号ID
     */
    private int userId;
	
	
	// 角色ID
	private int roleId;
	
		
	// 服务器ID
	private int worldId;
	
	// 频道ID
	private int channelId;
	
	
	// 登录人IP
	private String userIp;
	

	


   
}