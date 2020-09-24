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

 Date: 24/09/2020 10:59:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for image_space_info
-- ----------------------------
DROP TABLE IF EXISTS `image_space_info`;
CREATE TABLE `image_space_info` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type_id` bigint(20) NOT NULL,
  `url` varchar(500) NOT NULL,
  `extra` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of image_space_info
-- ----------------------------
BEGIN;
INSERT INTO `image_space_info` VALUES ('2020-09-22 08:29:10.169555', '2020-09-22 08:29:10.169555', 1, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', ' ');
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:09:15.116649', '2020-09-23 08:09:15.116649', 2, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', ' ');
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:10:15.000722', '2020-09-23 08:10:15.000722', 3, 2, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:52:57.360613', '2020-09-23 08:52:57.360613', 4, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:53:00.395905', '2020-09-23 08:53:00.395905', 5, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:53:03.423155', '2020-09-23 08:53:03.423155', 6, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:53:06.145714', '2020-09-23 08:53:06.145714', 7, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:53:08.554969', '2020-09-23 08:53:08.554969', 8, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:53:11.906641', '2020-09-23 08:53:11.906641', 9, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:53:14.482663', '2020-09-23 08:53:14.482663', 10, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 08:53:17.204328', '2020-09-23 08:53:17.204328', 11, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 09:13:41.781169', '2020-09-23 09:13:41.781169', 12, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 09:13:44.355620', '2020-09-23 09:13:44.355620', 13, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 09:13:47.324658', '2020-09-23 09:13:47.324658', 14, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 09:13:50.440748', '2020-09-23 09:13:50.440748', 15, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
INSERT INTO `image_space_info` VALUES ('2020-09-23 09:13:52.873038', '2020-09-23 09:13:52.873038', 16, 1, 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', NULL);
COMMIT;

-- ----------------------------
-- Table structure for image_space_type
-- ----------------------------
DROP TABLE IF EXISTS `image_space_type`;
CREATE TABLE `image_space_type` (
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_91decef4a2b88cb59caf658d44` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of image_space_type
-- ----------------------------
BEGIN;
INSERT INTO `image_space_type` VALUES ('2020-09-23 07:29:12.077952', '2020-09-23 07:29:12.077952', 1, '头像');
INSERT INTO `image_space_type` VALUES ('2020-09-23 07:29:50.913517', '2020-09-23 07:29:50.913517', 2, '资料');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_department
-- ----------------------------
BEGIN;
INSERT INTO `sys_department` VALUES ('2020-08-27 03:33:19.000000', '2020-08-27 03:33:19.000000', 1, NULL, '思忆技术', 0);
INSERT INTO `sys_department` VALUES ('2020-09-08 05:31:32.426851', '2020-09-11 08:56:17.000000', 2, 1, '管理部门', 0);
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
  `params` text,
  `action` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1111 DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` VALUES ('2020-08-28 10:09:26.322745', '2020-09-14 03:53:15.000000', 1, NULL, '系统', '/sys', NULL, 0, 'system', 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-01 00:00:00.000000', '2020-09-14 03:53:31.000000', 3, 1, '权限管理', '/sys/permssion', NULL, 0, 'permission', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-08 00:00:00.000000', '2020-09-08 06:54:45.000000', 4, 3, '用户列表', '/sys/permssion/user', NULL, 1, 'peoples', 0, 'views/system/permission/user', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2020-09-11 06:11:52.000000', 5, 4, '新增', NULL, 'sys:user:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2020-09-11 06:13:03.000000', 6, 4, '删除', NULL, 'sys:user:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-08 00:00:00.000000', '2020-09-14 03:53:52.000000', 7, 3, '菜单管理', '/sys/permssion/menu', NULL, 1, 'nested', 0, 'views/system/permission/menu', 0, 1);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 8, 7, '新增', NULL, 'sys:menu:add', 2, NULL, 0, NULL, 1, 0);
INSERT INTO `sys_menu` VALUES ('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 9, 7, '删除', NULL, 'sys:menu:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-02 08:22:27.548410', '2020-09-02 08:22:27.548410', 10, 7, '查询', NULL, 'sys:menu:list,sys:menu:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-04 06:26:36.408290', '2020-09-04 07:13:30.000000', 17, 16, '测试', '', 'sys:menu:list,sys:menu:update,sys:menu:info,sys:menu:add', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-04 08:08:53.621419', '2020-09-04 08:08:53.621419', 19, 7, '修改', '', 'sys:menu:update', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-04 09:41:43.133191', '2020-09-14 03:54:18.000000', 23, 3, '角色管理', '/sys/permission/role', '', 1, 'role', 0, 'views/system/permission/role', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 02:44:27.663925', '2020-09-07 08:51:18.000000', 25, 23, '删除', '', 'sys:role:delete', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 02:49:36.058795', '2020-09-14 03:56:56.000000', 26, 44, '饿了么文档', 'http://element-cn.eleme.io/#/zh-CN/component/installation', '', 1, 'international', 0, 'views/charts/keyboard', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 02:50:03.345817', '2020-09-14 03:56:47.000000', 27, 44, 'TypeORM中文文档', 'https://www.bookstack.cn/read/TypeORM-0.2.20-zh/README.md', '', 1, 'international', 2, 'views/error-log/components/ErrorTestB', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 07:08:18.106272', '2020-09-14 10:26:58.000000', 28, 23, '新增', '', 'sys:role:add', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 08:51:48.319938', '2020-09-07 08:51:58.000000', 29, 23, '修改', '', 'sys:role:update', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-07 10:39:50.396350', '2020-09-09 06:34:13.000000', 32, 23, '查询', '', 'sys:role:list,sys:role:page,sys:role:info', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-08 05:29:40.117403', '2020-09-11 06:03:43.000000', 33, 4, '部门查询', '', 'sys:dept:list,sys:dept:info', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-09 07:10:08.435753', '2020-09-10 03:41:32.000000', 34, 4, '查询', '', 'sys:user:page,sys:user:info', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-10 05:09:31.904519', '2020-09-10 05:09:31.904519', 35, 4, '更新', '', 'sys:user:update', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-10 08:02:29.853643', '2020-09-10 08:02:40.000000', 36, 4, '部门转移', '', 'sys:dept:transfer', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 04:34:00.379002', '2020-09-14 03:29:59.000000', 37, 1, '系统监控', '/sys/monitor', '', 0, 'monitor', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 04:34:52.949262', '2020-09-14 03:35:49.000000', 38, 37, '系统日志', '/sys/monitor/log', '', 1, 'log', 0, 'views/system/monitor/log', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 06:12:14.621531', '2020-09-11 06:12:14.621531', 39, 4, '部门新增', '', 'sys:dept:add', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 06:13:23.752133', '2020-09-11 06:13:23.752133', 40, 4, '部门删除', '', 'sys:dept:delete', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-11 06:29:52.437621', '2020-09-11 06:29:52.437621', 41, 4, '部门更新', '', 'sys:dept:update', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-14 03:14:48.168779', '2020-09-14 10:00:55.000000', 43, 38, '查询', '', 'sys:log:page,sys:log:search', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-14 03:56:24.740870', '2020-09-14 03:56:24.740870', 44, NULL, '文档', '/document', '', 0, 'documentation', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-14 06:55:17.544866', '2020-09-14 08:39:30.000000', 45, NULL, '通用权限', '/common', '', 0, '', 0, '', 1, 0);
INSERT INTO `sys_menu` VALUES ('2020-09-23 07:31:28.700348', '2020-09-23 07:31:28.700348', 46, 45, '图片空间', '', 'space:image:type,space:image:page,space:image:upload', 2, '', 0, '', 1, 1);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_223de54d6badbe43a5490450c3` (`name`),
  UNIQUE KEY `IDX_f2d07943355da93c3a8a1c411a` (`label`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES ('2020-08-27 03:35:05.000000', '2020-08-27 03:35:05.000000', 1, 'root', 'root', '超级管理员', NULL);
INSERT INTO `sys_role` VALUES ('2020-09-14 07:39:02.423786', '2020-09-14 07:39:02.423786', 2, '1', '测试角色', 'testrole', '');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role_department
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_department` VALUES ('2020-09-14 07:39:02.445216', '2020-09-14 07:39:02.445216', 1, 2, 1);
INSERT INTO `sys_role_department` VALUES ('2020-09-14 07:39:02.445216', '2020-09-14 07:39:02.445216', 2, 2, 2);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` VALUES ('2020-09-14 07:39:02.432650', '2020-09-14 07:39:02.432650', 1, 2, 44);
INSERT INTO `sys_role_menu` VALUES ('2020-09-14 07:39:02.432650', '2020-09-14 07:39:02.432650', 2, 2, 26);
INSERT INTO `sys_role_menu` VALUES ('2020-09-14 07:39:02.432650', '2020-09-14 07:39:02.432650', 3, 2, 27);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 4, 2, 4);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 7, 2, 33);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 8, 2, 34);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 10, 2, 36);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 11, 2, 39);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 13, 2, 41);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 14, 2, 37);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 15, 2, 38);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 16, 2, 43);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 17, 2, 1);
INSERT INTO `sys_role_menu` VALUES ('2020-09-15 08:05:45.986899', '2020-09-15 08:05:45.986899', 18, 2, 3);
INSERT INTO `sys_role_menu` VALUES ('2020-09-21 06:29:29.232489', '2020-09-21 06:29:29.232489', 19, 2, 8);
INSERT INTO `sys_role_menu` VALUES ('2020-09-21 06:29:29.232489', '2020-09-21 06:29:29.232489', 20, 2, 10);
INSERT INTO `sys_role_menu` VALUES ('2020-09-21 06:29:29.232489', '2020-09-21 06:29:29.232489', 21, 2, 7);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES ('2020-08-27 03:38:30.000000', '2020-09-23 05:22:54.000000', 1, 1, '杨长源', 'hackycy', 'U2FsdGVkX18E8MLkt/45xe3xRALUa6mE9udOXcxrVCA=', '', 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', 'qa894178522@qq.com', '15622472425', NULL, 1);
INSERT INTO `sys_user` VALUES ('2020-09-14 07:41:33.732000', '2020-09-14 07:41:33.732000', 2, 2, '杨长源', 'test001', 'U2FsdGVkX1+iVR+kHHErkPNInZiV27Mpk4pFL8uhtTQ=', '', '', 'qa894178522@qq.com', '', '', 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES ('2020-09-14 04:10:34.371646', '2020-09-14 04:10:34.371646', 1, 1, 1);
INSERT INTO `sys_user_role` VALUES ('2020-09-23 03:59:13.035554', '2020-09-23 03:59:13.035554', 6, 2, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
