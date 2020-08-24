-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-08-24 22:57:23
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `siyee-api`
--

-- --------------------------------------------------------

--
-- 表的结构 `sys_department`
--

CREATE TABLE `sys_department` (
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `parend_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `order_num` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sys_department`
--

INSERT INTO `sys_department` (`createTime`, `updateTime`, `id`, `parend_id`, `name`, `order_num`) VALUES
('2020-08-24 00:00:00', '2020-08-24 00:00:00', 1, NULL, '思忆软件', 0);

-- --------------------------------------------------------

--
-- 表的结构 `sys_log`
--

CREATE TABLE `sys_log` (
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `params` varchar(255) DEFAULT NULL,
  `action` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sys_menu`
--

CREATE TABLE `sys_menu` (
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `parent_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `router` varchar(255) DEFAULT NULL,
  `perms` varchar(255) DEFAULT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `icon` varchar(255) DEFAULT NULL,
  `order_num` int(11) DEFAULT '0',
  `view_path` varchar(255) NOT NULL,
  `keepalive` tinyint(4) DEFAULT '1',
  `isShow` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sys_role`
--

CREATE TABLE `sys_role` (
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(50) NOT NULL,
  `remark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sys_role`
--

INSERT INTO `sys_role` (`createTime`, `updateTime`, `id`, `userId`, `name`, `label`, `remark`) VALUES
('2020-08-24 00:00:00', '2020-08-24 00:00:00', 1, '', '超级管理员', 'root', '超级管理员');

-- --------------------------------------------------------

--
-- 表的结构 `sys_role_department`
--

CREATE TABLE `sys_role_department` (
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `department_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sys_role_menu`
--

CREATE TABLE `sys_role_menu` (
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `menu_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sys_user`
--

CREATE TABLE `sys_user` (
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `department_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `head_img` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `sys_user_role`
--

CREATE TABLE `sys_user_role` (
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转储表的索引
--

--
-- 表的索引 `sys_department`
--
ALTER TABLE `sys_department`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_log`
--
ALTER TABLE `sys_log`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_menu`
--
ALTER TABLE `sys_menu`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_role`
--
ALTER TABLE `sys_role`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_role_department`
--
ALTER TABLE `sys_role_department`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_role_menu`
--
ALTER TABLE `sys_role_menu`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_user`
--
ALTER TABLE `sys_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_9e7164b2f1ea1348bc0eb0a7da` (`username`);

--
-- 表的索引 `sys_user_role`
--
ALTER TABLE `sys_user_role`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `sys_department`
--
ALTER TABLE `sys_department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `sys_log`
--
ALTER TABLE `sys_log`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `sys_menu`
--
ALTER TABLE `sys_menu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `sys_role`
--
ALTER TABLE `sys_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `sys_role_department`
--
ALTER TABLE `sys_role_department`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `sys_role_menu`
--
ALTER TABLE `sys_role_menu`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `sys_user`
--
ALTER TABLE `sys_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `sys_user_role`
--
ALTER TABLE `sys_user_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
