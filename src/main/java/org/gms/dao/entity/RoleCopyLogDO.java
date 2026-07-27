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
 * 角色副本表日志表（每日分表）实体类
 * 表名格式：role_copy_log_yyyyMMdd（如 role_copy_log_20260121）
 *
 * @author Ming
 * @since 2026-01-31
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("role_copy_log_base") // 关联基础表结构
public class RoleCopyLogDO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID（数据库自增，bigint避免溢出，若需纯int可改为Integer）
     */
    @Id // 仅标记为主键，自增由数据库层面保证
    private Long id;

    /**
     * 角色ID（int类型）
     */
    private Integer roleId;

    /**
     * 副本名称
     */
    private String name;

	
	/**
     * 结束时间
     */
	private Long startTime;


    /**
     * 创建时间
     */
    private Long endTime;
	
	/**
	 * 完成用时（秒）
	 */
	private Long finishTime;

}