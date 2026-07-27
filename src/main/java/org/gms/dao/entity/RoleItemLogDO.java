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
 * 角色物品日志表（每日分表）实体类
 * 表名格式：role_item_log_yyyyMMdd（如 role_item_log_20260121）
 *
 * @author CN
 * @since 2026-01-21
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("role_item_log_base") // 关联基础表结构
public class RoleItemLogDO implements Serializable {

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
     * 地图ID（int类型）
     */
    private Integer mapId;

    /**
     * 目标ID（int类型 NPCID或者怪物ID）
     */
    private Integer targetId;

    /**
     * 物品ID（int类型）
     */
    private Integer itemId;

    /**
     * 物品数量（正数=获得，负数=消耗）
     */
    private Integer itemCount;

    /**
     * 获取/消耗类型（如活动获得、普通获得，可为null）
     */
    private String type;

    /**
     * 操作时间
     */
    private LocalDateTime operateTime;

}