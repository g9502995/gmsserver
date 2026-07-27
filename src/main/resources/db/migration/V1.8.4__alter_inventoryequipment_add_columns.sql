ALTER TABLE `inventoryequipment`
ADD COLUMN `customupgradecount` INT(11) NOT NULL DEFAULT '0' AFTER `ringid`,
ADD COLUMN `skill` TINYINT(4) NOT NULL DEFAULT '0' AFTER `customupgradecount`;
