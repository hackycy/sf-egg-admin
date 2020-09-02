/*
 Navicat Premium Data Transfer

 Source Server         : Mac
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : siyee-api

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 02/09/2020 18:27:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_department
-- ----------------------------
DROP TABLE IF EXISTS `sys_department`;
CREATE TABLE `sys_department` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parend_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `order_num` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_department
-- ----------------------------
BEGIN;
INSERT INTO `sys_department` VALUES ('2020-08-27 03:33:19.000000', '2020-08-27 03:33:19.000000', 1, NULL, '思忆技术', 0);
COMMIT;

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `params` varchar(255) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `router` varchar(255) DEFAULT NULL,
  `perms` varchar(255) DEFAULT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `icon` varchar(255) DEFAULT NULL,
  `order_num` int(11) DEFAULT '0',
  `view_path` varchar(255) DEFAULT NULL,
  `keepalive` tinyint(4) DEFAULT '1',
  `isShow` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` VALUES ('2020-08-28 10:09:26.322745', '2020-08-28 10:09:26.322745', 1, NULL, '系统', '/sys', NULL, 0, 'documentation', 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-28 00:00:00.000000', '2020-08-28 00:00:00.000000', 2, NULL, '教程', '/docs', NULL, 1, 'documentation', 0, 'views/documentation/index', 1, 0);
INSERT INTO `sys_menu` VALUES ('2020-08-01 00:00:00.000000', '2020-08-01 00:00:00.000000', 3, 1, '权限管理', '/sys/permssion', NULL, 0, 'documentation', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-08 00:00:00.000000', '2020-08-01 00:00:00.000000', 4, 3, '用户列表', '/sys/permssion/user', NULL, 1, 'documentation', 0, 'views/excel/export-excel', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 5, 4, '新增', NULL, 'sys:user:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 6, 4, '删除', NULL, 'sys:user:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-08 00:00:00.000000', '2020-08-01 00:00:00.000000', 7, 3, '菜单列表', '/sys/permssion/menu', NULL, 1, 'documentation', 0, 'views/system/permission/menu', 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 8, 7, '新增', NULL, 'sys:menu:add', 2, NULL, 0, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 9, 7, '删除', NULL, 'sys:menu:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-02 08:22:27.548410', '2020-09-02 08:22:27.548410', 10, 7, '菜单列表', NULL, 'sys:menu:list,sys:menu:update', 2, NULL, 0, NULL, 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(50) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES ('2020-08-27 03:35:05.000000', '2020-08-27 03:35:05.000000', 1, 'root', 'root', '超级管理员', NULL);
INSERT INTO `sys_role` VALUES ('2020-08-08 00:00:00.000000', '2020-08-01 00:00:00.000000', 2, 'root', 'notpermission', '无权限人员', '无权限人员');
INSERT INTO `sys_role` VALUES ('2020-08-08 00:00:00.000000', '2020-08-01 00:00:00.000000', 3, 'root', 'personnelmatters', '人事', '人事');
COMMIT;

-- ----------------------------
-- Table structure for sys_role_department
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_department`;
CREATE TABLE `sys_role_department` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) NOT NULL,
  `department_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role_department
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_department` VALUES ('2020-08-27 03:39:40.000000', '2020-08-27 03:39:40.000000', 1, 1, 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) NOT NULL,
  `menu_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` VALUES ('2020-08-08 00:00:00.000000', '2020-08-15 00:00:00.000000', 1, 2, 2);
INSERT INTO `sys_role_menu` VALUES ('2020-08-29 00:00:00.000000', '2020-08-29 00:00:00.000000', 2, 3, 1);
INSERT INTO `sys_role_menu` VALUES ('2020-08-29 00:00:00.000000', '2020-08-29 00:00:00.000000', 3, 3, 3);
INSERT INTO `sys_role_menu` VALUES ('2020-08-29 00:00:00.000000', '2020-08-29 00:00:00.000000', 4, 3, 4);
INSERT INTO `sys_role_menu` VALUES ('2020-08-29 00:00:00.000000', '2020-08-29 00:00:00.000000', 5, 3, 5);
INSERT INTO `sys_role_menu` VALUES ('2020-08-29 00:00:00.000000', '2020-08-29 00:00:00.000000', 6, 3, 6);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `department_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `head_img` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9e7164b2f1ea1348bc0eb0a7da` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES ('2020-08-27 03:38:30.000000', '2020-08-27 03:38:30.000000', 1, 1, '杨长源', 'hackycy', 'U2FsdGVkX19Lo7YsVEfAv5GU4hnCtmYcVS+m9ZwGEzE=', NULL, NULL, 'qa894178522@qq.com', '15622472425', NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES ('2020-08-27 03:39:55.000000', '2020-08-27 03:39:55.000000', 1, 1, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
