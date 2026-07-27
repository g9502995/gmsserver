-- 1. 註冊 offlinecombat 指令到 command_info (level=0, default_level=0, 對應 commands.gm0.OfflineCombatCommand)
INSERT INTO `command_info` (`syntax`, `level`, `enabled`, `clazz`, `default_level`)
SELECT 'offlinecombat', 0, 1, 'OfflineCombatCommand', 0
WHERE NOT EXISTS (
    SELECT 1 FROM `command_info` WHERE `syntax` = 'offlinecombat'
);

-- 2. 開啟離線戰鬥總開關
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.Boolean', 'offline_combat_enabled', 'true', '离线战斗总开关', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_enabled'
);

-- 3. 離線戰鬥 Tick 最小間隔毫秒 (預設 1000ms)
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.Integer', 'offline_combat_tick_min_ms', '1000', '离线战斗最小间隔毫秒', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_tick_min_ms'
);

-- 4. 離線戰鬥 Tick 最大間隔毫秒 (預設 1500ms)
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.Integer', 'offline_combat_tick_max_ms', '1500', '离线战斗最大间隔毫秒', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_tick_max_ms'
);

-- 5. 離線戰鬥最大索敵攻擊範圍 (預設 300)
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.Integer', 'offline_combat_attack_range', '300', '离线战斗最大攻击范围', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_attack_range'
);

-- 6. 離線戰鬥最大攻擊怪物數量 (預設 6)
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.Integer', 'offline_combat_max_targets', '6', '离线战斗单次攻击最多目标数', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_max_targets'
);

-- 7. 單一頻道離線掛機最大允許人數 (預設 50)
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.Integer', 'offline_combat_max_agents_per_channel', '50', '单频道允许的最大离线挂机角色数', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_max_agents_per_channel'
);

-- 8. 是否允許離線掛機攻擊 Boss 怪物 (預設 false)
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.Boolean', 'offline_combat_allow_boss', 'false', '离线战斗是否允许攻击Boss怪物', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_allow_boss'
);

-- 9. 離線戰鬥白名單技能ID (預設留空，代表僅允許普通攻擊或任何技能；若填入以逗號分隔如 "1001004,1001005")
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.String', 'offline_combat_allowed_skill_ids', '', '离线战斗技能白名单(逗号分隔,留空为不限制)', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_allowed_skill_ids'
);

-- 10. 離線戰鬥掉落物清理模式 (NORMAL: 允許離線寵物自動撿取, NO_DROP: 怪物不掉落)
INSERT INTO `game_config`(`config_type`, `config_sub_type`, `config_clazz`, `config_code`, `config_value`, `config_desc`, `update_time`)
SELECT 'server', 'offlinecombat', 'java.lang.String', 'offline_combat_drop_mode', 'NORMAL', '离线战斗掉落模式(NORMAL/NO_DROP)', NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM `game_config` WHERE `config_code` = 'offline_combat_drop_mode'
);
