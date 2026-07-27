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
 * 角色切换地图日志表（每日分表）实体类
 * 表名格式：map_log_yyyyMMdd（如 map_log_20260121）
 *
 * @author Ming
 * @since 2026-01-31
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table("map_log_base") // 关联基础表结构
public class MapLogDO implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 主键ID（数据库自增，bigint避免溢出，若需纯int可改为Integer）
     */
    @Id // 仅标记为主键，自增由数据库层面保证
    private Integer id;


	
	
	// 角色ID
	private int roleId;
	
		
	private int mapId;
	
	

	


   
}