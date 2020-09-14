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

 Date: 14/09/2020 12:03:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Records of sys_department
-- ----------------------------
BEGIN;
INSERT INTO `sys_department` VALUES ('2020-08-27 03:33:19.000000', '2020-08-27 03:33:19.000000', 1, NULL, '思忆技术', 0);
INSERT INTO `sys_department` VALUES ('2020-09-08 05:31:32.426851', '2020-09-11 08:56:17.000000', 2, 1, '管理部门', 0);
INSERT INTO `sys_department` VALUES ('2020-09-11 02:55:54.554265', '2020-09-11 08:56:27.000000', 3, NULL, '人事部门', 0);
COMMIT;

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
INSERT INTO `sys_menu` VALUES ('2020-09-07 07:08:18.106272', '2020-09-11 06:14:46.000000', 28, 23, '新增', '', 'sys:dept:list,sys:menu:list,sys:role:add', 2, '', 0, '', 1, 1);
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
INSERT INTO `sys_menu` VALUES ('2020-09-14 03:14:48.168779', '2020-09-14 03:14:48.168779', 43, 38, '查询', '', 'sys:log:page', 2, '', 0, '', 1, 1);
INSERT INTO `sys_menu` VALUES ('2020-09-14 03:56:24.740870', '2020-09-14 03:56:24.740870', 44, NULL, '文档', '/document', '', 0, 'documentation', 0, '', 1, 1);
COMMIT;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES ('2020-08-27 03:35:05.000000', '2020-08-27 03:35:05.000000', 1, 'root', 'root', '超级管理员', NULL);
COMMIT;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES ('2020-08-27 03:38:30.000000', '2020-08-27 03:38:30.000000', 1, 1, '杨长源', 'hackycy', 'U2FsdGVkX19Lo7YsVEfAv5GU4hnCtmYcVS+m9ZwGEzE=', NULL, NULL, 'qa894178522@qq.com', '15622472425', NULL, 1);
COMMIT;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES ('2020-08-27 03:39:55', '2020-08-27 03:39:55', 1, 1, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;