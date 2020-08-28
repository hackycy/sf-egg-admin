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

 Date: 27/08/2020 11:40:07
*/

-- ----------------------------
-- Records of sys_department
-- ----------------------------
BEGIN;
INSERT INTO `sys_department` VALUES ('2020-08-27 03:33:19', '2020-08-27 03:33:19', 1, NULL, '思忆技术', 0);
COMMIT;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES ('2020-08-27 03:35:05', '2020-08-27 03:35:05', 1, 'root', 'root', '超级管理员', NULL);
COMMIT;

-- ----------------------------
-- Records of sys_role_department
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_department` VALUES ('2020-08-27 03:39:40', '2020-08-27 03:39:40', 1, 1, 1);
COMMIT;


-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES ('2020-08-27 03:38:30', '2020-08-27 03:38:30', 1, 1, '杨长源', 'hackycy', 'U2FsdGVkX19Lo7YsVEfAv5GU4hnCtmYcVS+m9ZwGEzE=', NULL, NULL, 'qa894178522@qq.com', '15622472425', NULL, 1);
COMMIT;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES ('2020-08-27 03:39:55', '2020-08-27 03:39:55', 1, 1, 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;