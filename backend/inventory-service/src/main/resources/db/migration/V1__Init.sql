CREATE TABLE `t_inventory` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `sku_code` VARCHAR(255) DEFAULT NULL,
    `quantity` INT(11) DEFAULT NULL,
    PRIMARY KEY (`id`)
);
