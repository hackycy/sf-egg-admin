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

 Date: 15/09/2020 15:44:44
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
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
BEGIN;
INSERT INTO `sys_log` VALUES ('2020-09-15 07:00:33.169428', '2020-09-15 07:00:33.169428', 119, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T06:56:14.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"hackycy\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:03:19.580729', '2020-09-15 07:03:19.580729', 120, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T06:56:14.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"hackycy\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"asdsda\",\"newPassword\":\"adsad\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:04:12.843940', '2020-09-15 07:04:12.843940', 121, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T06:56:14.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"hackycy\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"asdsda\",\"newPassword\":\"adsad\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:06:41.838537', '2020-09-15 07:06:41.838537', 122, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:07:18.116596', '2020-09-15 07:07:18.116596', 123, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:00:33.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:07:20.034404', '2020-09-15 07:07:20.034404', 124, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:07:20.043739', '2020-09-15 07:07:20.043739', 125, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:07:20.178176', '2020-09-15 07:07:20.178176', 126, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:09.104221', '2020-09-15 07:10:09.104221', 127, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:15.289394', '2020-09-15 07:10:15.289394', 128, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:38.376280', '2020-09-15 07:10:38.376280', 129, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:38.377289', '2020-09-15 07:10:38.377289', 130, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:38.520424', '2020-09-15 07:10:38.520424', 131, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:43.287985', '2020-09-15 07:10:43.287985', 132, '127.0.0.1', 1, '{}', '/admin/logout');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:43.371113', '2020-09-15 07:10:43.371113', 133, '127.0.0.1', NULL, '{}', '/admin/captcha/img');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:53.564287', '2020-09-15 07:10:53.564287', 134, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX1/NNPc0KisfGJ7qcl27svWIHZdOVAHVK48=\",\"password\":\"U2FsdGVkX1+ChALLLtOG0B5OCBUmQSsN1tbW6MuqWZk=\",\"captchaId\":\"b881e988-2127-4ced-ae4d-f92f037d6bae\",\"verifyCode\":\"nb8s\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:55.642423', '2020-09-15 07:10:55.642423', 135, '127.0.0.1', NULL, '{}', '/admin/captcha/img');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:10:57.700897', '2020-09-15 07:10:57.700897', 136, '127.0.0.1', NULL, '{}', '/admin/captcha/img');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:11:02.069042', '2020-09-15 07:11:02.069042', 137, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX1+jajj05mDq0bk3nltg1ANzvnADs8yUqa4=\",\"password\":\"U2FsdGVkX1/ODkoP+eIT5H32ddTLz8dAF01A7J2AbEo=\",\"captchaId\":\"c4fc6476-9a93-4253-8fbd-f3a54bcfc356\",\"verifyCode\":\"8anm\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:11:02.105680', '2020-09-15 07:11:02.105680', 138, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:11:02.107863', '2020-09-15 07:11:02.107863', 139, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:11:02.211156', '2020-09-15 07:11:02.211156', 140, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:11:52.671588', '2020-09-15 07:11:52.671588', 141, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:12:07.798380', '2020-09-15 07:12:07.798380', 142, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:12:13.559291', '2020-09-15 07:12:13.559291', 143, '127.0.0.1', 1, '{}', '/admin/logout');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:12:13.628221', '2020-09-15 07:12:13.628221', 144, '127.0.0.1', NULL, '{}', '/admin/captcha/img');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:12:19.758326', '2020-09-15 07:12:19.758326', 145, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX19sBndzZUnYGi24g8La7UAzMfe7x9NRK/E=\",\"password\":\"U2FsdGVkX1/vdagXkCADgz3Q0L324/+tla+ZZSYGEzk=\",\"captchaId\":\"68ff0191-de93-41d3-ae69-6effa203a3b0\",\"verifyCode\":\"lsne\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:12:19.789603', '2020-09-15 07:12:19.789603', 146, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:12:19.790867', '2020-09-15 07:12:19.790867', 147, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:12:19.876283', '2020-09-15 07:12:19.876283', 148, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:13:24.040181', '2020-09-15 07:13:24.040181', 149, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:13:27.583902', '2020-09-15 07:13:27.583902', 150, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:13:27.585014', '2020-09-15 07:13:27.585014', 151, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:13:27.967874', '2020-09-15 07:13:27.967874', 152, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:13:31.880178', '2020-09-15 07:13:31.880178', 153, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:07:18.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"aa\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX18YLF7H3bvPs/xaHYat3ifMrNafsaDLSfE=\",\"newPassword\":\"U2FsdGVkX1+wUsnx94bCxdd21pMwe3NhGgKGXmwPg3c=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:16:10.113664', '2020-09-15 07:16:10.113664', 154, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:16:35.121868', '2020-09-15 07:16:35.121868', 155, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:16:53.625150', '2020-09-15 07:16:53.625150', 156, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:16:54.735323', '2020-09-15 07:16:54.735323', 157, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:07:18.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:10.831071', '2020-09-15 07:17:10.831071', 158, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:07:18.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX18cFBIwYJ/IhQ9f4MXYjJQsbvjmPyMbnFc=\",\"newPassword\":\"U2FsdGVkX1+FOx0HS0QwlDO8s/HHhhZB3o+v+M1Ne+o=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:14.530248', '2020-09-15 07:17:14.530248', 159, '127.0.0.1', 1, '{}', '/admin/sys/dept/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:14.530356', '2020-09-15 07:17:14.530356', 160, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:15.933226', '2020-09-15 07:17:15.933226', 161, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:16.762509', '2020-09-15 07:17:16.762509', 162, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:16.999835', '2020-09-15 07:17:16.999835', 163, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:17.236258', '2020-09-15 07:17:17.236258', 164, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:17.446801', '2020-09-15 07:17:17.446801', 165, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:17.662478', '2020-09-15 07:17:17.662478', 166, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:17.865078', '2020-09-15 07:17:17.865078', 167, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:18.180127', '2020-09-15 07:17:18.180127', 168, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:19.598784', '2020-09-15 07:17:19.598784', 169, '127.0.0.1', 1, '{}', '/admin/sys/role/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:19.598764', '2020-09-15 07:17:19.598764', 170, '127.0.0.1', 1, '{}', '/admin/sys/dept/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:17:19.643124', '2020-09-15 07:17:19.643124', 171, '127.0.0.1', 1, '{\"userId\":\"2\"}', '/admin/sys/user/info');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:19:20.605207', '2020-09-15 07:19:20.605207', 172, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:19:25.338930', '2020-09-15 07:19:25.338930', 173, '127.0.0.1', 1, '{}', '/admin/logout');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:19:25.461716', '2020-09-15 07:19:25.461716', 174, '127.0.0.1', NULL, '{}', '/admin/captcha/img');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:19:39.900136', '2020-09-15 07:19:39.900136', 175, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX1/eUhoX/STeggQ8oBEnKaBp3GGT2Ll8iDs=\",\"password\":\"U2FsdGVkX1+6l132P0CU83dbVzI3G5+AMNB/0tXaEnU=\",\"captchaId\":\"20e04104-e6fe-49e6-9740-6b83a1f3ed28\",\"verifyCode\":\"gx3v\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:19:43.080150', '2020-09-15 07:19:43.080150', 176, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX19QaSKOIveW0rzp471WV74a+MonYT/GzSc=\",\"password\":\"U2FsdGVkX18+YeX0b1lewLPNn+ikiVf75ep23ZUiEhI=\",\"captchaId\":\"20e04104-e6fe-49e6-9740-6b83a1f3ed28\",\"verifyCode\":\"gx2v\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:19:43.123387', '2020-09-15 07:19:43.123387', 177, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:19:43.132878', '2020-09-15 07:19:43.132878', 178, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:20:35.029429', '2020-09-15 07:20:35.029429', 179, '127.0.0.1', 1, '{}', '/admin/logout');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:20:35.093465', '2020-09-15 07:20:35.093465', 180, '127.0.0.1', NULL, '{}', '/admin/captcha/img');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:21:19.056287', '2020-09-15 07:21:19.056287', 181, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX19DgLlZNr7F9YgByPQdx694puKuphoZgq0=\",\"password\":\"U2FsdGVkX1+BsdaIWBf45JzznLiaPbQPlF0S146pcp8=\",\"captchaId\":\"7f7f5d12-ce61-4311-b498-03878be95634\",\"verifyCode\":\"nxzk\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:21:19.089502', '2020-09-15 07:21:19.089502', 182, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:21:19.091807', '2020-09-15 07:21:19.091807', 183, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:22:11.473896', '2020-09-15 07:22:11.473896', 184, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:22:11.484974', '2020-09-15 07:22:11.484974', 185, '127.0.0.1', 1, '{}', '/admin/sys/dept/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:22:15.366586', '2020-09-15 07:22:15.366586', 186, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:24:35.201905', '2020-09-15 07:24:35.201905', 187, '127.0.0.1', 1, '{}', '/admin/logout');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:24:35.281844', '2020-09-15 07:24:35.281844', 188, '127.0.0.1', NULL, '{}', '/admin/captcha/img');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:24:49.647707', '2020-09-15 07:24:49.647707', 189, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX1+UqKRN+4khgc7fQbEkAD5+6MiiG66wIFo=\",\"password\":\"U2FsdGVkX19PWA66LCaooIRbEkASzoW/MkvwYoxuqdM=\",\"captchaId\":\"97a282ad-7dcb-49b1-a0db-5239b98578c9\",\"verifyCode\":\"kzfa\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:24:54.875474', '2020-09-15 07:24:54.875474', 190, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX19/dTRmTssu/FYXh8CKUDBW278FjI66fsk=\",\"password\":\"U2FsdGVkX1+igY/pOKPh1tRug1IsBTx9551goEeO0NA=\",\"captchaId\":\"97a282ad-7dcb-49b1-a0db-5239b98578c9\",\"verifyCode\":\"kzfq\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:24:54.926899', '2020-09-15 07:24:54.926899', 191, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:24:54.937014', '2020-09-15 07:24:54.937014', 192, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:24:55.016717', '2020-09-15 07:24:55.016717', 193, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:25:04.906010', '2020-09-15 07:25:04.906010', 194, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:17:10.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX19syJg6VjoecSiCFkBr6lCUvh3mK+W+U4A=\",\"newPassword\":\"U2FsdGVkX1/lfcEbK3CNTpakJNtFnw0O7+eA2YaRfFY=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:25:42.845994', '2020-09-15 07:25:42.845994', 195, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:17:10.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX19MSiXzZzVk1rih5h59sH0zKLPBm9lEKLs=\",\"newPassword\":\"U2FsdGVkX1/2b7KoNonr2rPnjF8Qee46mSOqb7UzZl4=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:20.982257', '2020-09-15 07:26:20.982257', 196, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:17:10.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX1+loXpyfJPPCPCIanG6/NiGvOGDSZ7VbbM=\",\"newPassword\":\"U2FsdGVkX18dFNC6l62tjeqZ5632iPNY1dVoraMkfXU=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:25.642788', '2020-09-15 07:26:25.642788', 197, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:25.650838', '2020-09-15 07:26:25.650838', 198, '127.0.0.1', 1, '{}', '/admin/sys/dept/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:26.883073', '2020-09-15 07:26:26.883073', 199, '127.0.0.1', 1, '{\"departmentId\":\"2\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:27.872014', '2020-09-15 07:26:27.872014', 200, '127.0.0.1', 1, '{\"departmentId\":\"2\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:28.161931', '2020-09-15 07:26:28.161931', 201, '127.0.0.1', 1, '{\"departmentId\":\"2\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:28.379420', '2020-09-15 07:26:28.379420', 202, '127.0.0.1', 1, '{\"departmentId\":\"2\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:28.560897', '2020-09-15 07:26:28.560897', 203, '127.0.0.1', 1, '{\"departmentId\":\"2\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:28.725552', '2020-09-15 07:26:28.725552', 204, '127.0.0.1', 1, '{\"departmentId\":\"2\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:26:28.872354', '2020-09-15 07:26:28.872354', 205, '127.0.0.1', 1, '{\"departmentId\":\"2\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:27:37.730079', '2020-09-15 07:27:37.730079', 206, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:28:02.756650', '2020-09-15 07:28:02.756650', 207, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:26:21.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX1+uHo7X0AMe+ZAAHyyPu+IcQfke4CPQb+k=\",\"newPassword\":\"U2FsdGVkX1+F1kWiiOo3TJOYNFlHoa1c3j7NvWR4gWE=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:28:55.132610', '2020-09-15 07:28:55.132610', 208, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:26:21.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX18R4o79mmipf/8UVUrkhk85zVekTl2TGPU=\",\"newPassword\":\"U2FsdGVkX19n4GSRLQ9cTu/Jw/iK28pGRiQdhqoS7+c=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:30:27.506955', '2020-09-15 07:30:27.506955', 209, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:26:21.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX1/4sfBrZjUP73SygWYx/LKX3qVUFHAAeqw=\",\"newPassword\":\"U2FsdGVkX19W0ckIS1h4yQACBLVTecZRP4k70u3IwmU=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:33:24.942619', '2020-09-15 07:33:24.942619', 210, '127.0.0.1', 1, '{\"createTime\":\"2020-08-27T03:38:30.000Z\",\"updateTime\":\"2020-09-15T07:26:21.000Z\",\"id\":1,\"name\":\"杨长源\",\"username\":\"hackycy\",\"nickName\":\"\",\"headImg\":\"https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png\",\"email\":\"qa894178522@qq.com\",\"phone\":\"15622472425\",\"originPassword\":\"U2FsdGVkX19VNTRKmyRQlTU35aKpPRwA1vcqp7piQBI=\",\"newPassword\":\"U2FsdGVkX19DeCFfcQXlEaoIZC+POa/ii/Q5Z0lwNTs=\"}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:36:48.749534', '2020-09-15 07:36:48.749534', 211, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:36:48.760488', '2020-09-15 07:36:48.760488', 212, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:38:14.157394', '2020-09-15 07:38:14.157394', 213, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:38:14.158199', '2020-09-15 07:38:14.158199', 214, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:40:52.459560', '2020-09-15 07:40:52.459560', 215, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:40:52.460357', '2020-09-15 07:40:52.460357', 216, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:40:55.855129', '2020-09-15 07:40:55.855129', 217, '127.0.0.1', NULL, '{}', '/admin/captcha/img');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:13.199818', '2020-09-15 07:41:13.199818', 218, '127.0.0.1', NULL, '{\"username\":\"U2FsdGVkX18S+Y2t6uWrV53ldZsDi1orxMf4KY3Bak0=\",\"password\":\"U2FsdGVkX1/Jlys6ialEoAorFW/cD0EcHS0orpvUWMk=\",\"captchaId\":\"83386f4b-7836-448b-8cb3-e3015dbb9765\",\"verifyCode\":\"sges\"}', '/admin/login');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:13.239694', '2020-09-15 07:41:13.239694', 219, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:13.241586', '2020-09-15 07:41:13.241586', 220, '127.0.0.1', 1, '{}', '/admin/person');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:16.571356', '2020-09-15 07:41:16.571356', 221, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:16.574798', '2020-09-15 07:41:16.574798', 222, '127.0.0.1', 1, '{}', '/admin/sys/dept/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:39.093263', '2020-09-15 07:41:39.093263', 223, '127.0.0.1', 1, '{\"departmentId\":\"2\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:40.842062', '2020-09-15 07:41:40.842062', 224, '127.0.0.1', 1, '{}', '/admin/sys/dept/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:40.842121', '2020-09-15 07:41:40.842121', 225, '127.0.0.1', 1, '{}', '/admin/sys/role/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:40.895919', '2020-09-15 07:41:40.895919', 226, '127.0.0.1', 1, '{\"userId\":\"2\"}', '/admin/sys/user/info');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:41:44.862332', '2020-09-15 07:41:44.862332', 227, '127.0.0.1', 1, '{\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/role/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:42:21.930161', '2020-09-15 07:42:21.930161', 228, '127.0.0.1', 1, '{\"departmentId\":\"-1\",\"page\":\"1\",\"limit\":\"25\"}', '/admin/sys/user/page');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:42:21.931336', '2020-09-15 07:42:21.931336', 229, '127.0.0.1', 1, '{}', '/admin/sys/dept/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:42:23.415482', '2020-09-15 07:42:23.415482', 230, '127.0.0.1', 1, '{}', '/admin/sys/role/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:42:23.415924', '2020-09-15 07:42:23.415924', 231, '127.0.0.1', 1, '{}', '/admin/sys/dept/list');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:42:46.177467', '2020-09-15 07:42:46.177467', 232, '127.0.0.1', 1, '{}', '/admin/permmenu');
INSERT INTO `sys_log` VALUES ('2020-09-15 07:42:46.177657', '2020-09-15 07:42:46.177657', 233, '127.0.0.1', 1, '{}', '/admin/person');
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` VALUES ('2020-09-14 07:39:02.432650', '2020-09-14 07:39:02.432650', 1, 2, 44);
INSERT INTO `sys_role_menu` VALUES ('2020-09-14 07:39:02.432650', '2020-09-14 07:39:02.432650', 2, 2, 26);
INSERT INTO `sys_role_menu` VALUES ('2020-09-14 07:39:02.432650', '2020-09-14 07:39:02.432650', 3, 2, 27);
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
INSERT INTO `sys_user` VALUES ('2020-08-27 03:38:30.000000', '2020-09-15 07:33:24.000000', 1, 1, '杨长源', 'hackycy', 'U2FsdGVkX18E8MLkt/45xe3xRALUa6mE9udOXcxrVCA=', '', 'https://i.pinimg.com/originals/1f/00/27/1f0027a3a80f470bcfa5de596507f9f4.png', 'qa894178522@qq.com', '15622472425', NULL, 1);
INSERT INTO `sys_user` VALUES ('2020-09-14 07:41:33.732044', '2020-09-14 07:41:33.732044', 2, 2, '杨长源', 'test001', 'U2FsdGVkX1+1ieIz8hYRRjiSwiy1pDIXBjjnWJonYhU=', '', '', 'qa894178522@qq.com', '', '', 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES ('2020-09-14 04:10:34.371646', '2020-09-14 04:10:34.371646', 1, 1, 1);
INSERT INTO `sys_user_role` VALUES ('2020-09-14 07:41:33.740680', '2020-09-14 07:41:33.740680', 2, 2, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
