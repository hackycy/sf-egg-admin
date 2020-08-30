-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-08-30 17:47:11
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


--
-- 转存表中的数据 `sys_menu`
--

INSERT INTO `sys_menu` (`createTime`, `updateTime`, `id`, `parent_id`, `name`, `router`, `perms`, `type`, `icon`, `order_num`, `view_path`, `keepalive`, `isShow`) VALUES
('2020-08-28 00:00:00.000000', '2020-08-28 00:00:00.000000', 1, NULL, '系统', '/sys', NULL, 0, NULL, 0, NULL, 1, 1),
('2020-08-28 00:00:00.000000', '2020-08-28 00:00:00.000000', 2, NULL, '教程', '/docs', NULL, 0, NULL, 0, NULL, 1, 1),
('2020-08-01 00:00:00.000000', '2020-08-01 00:00:00.000000', 3, 1, '权限管理', NULL, NULL, 0, NULL, 0, NULL, 1, 1),
('2020-08-08 00:00:00.000000', '2020-08-01 00:00:00.000000', 4, 3, '用户列表', '/sys/user', NULL, 1, NULL, 0, '/views/system/user.vue', 1, 1),
('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 5, 4, '新增', NULL, 'sys:user:add', 2, NULL, 0, NULL, 1, 1),
('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 6, 4, '删除', NULL, 'sys:user:delete', 2, NULL, 0, NULL, 1, 1),
('2020-08-08 00:00:00.000000', '2020-08-01 00:00:00.000000', 7, 3, '菜单列表', '/sys/menu', NULL, 1, NULL, 0, '/views/system/menu.vue', 1, 1),
('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 8, 7, '新增', NULL, 'sys:menu:add', 2, NULL, 0, NULL, 1, 1),
('2020-08-15 00:00:00.000000', '2020-08-15 00:00:00.000000', 9, 7, '删除', NULL, 'sys:menu:delete', 2, NULL, 0, NULL, 1, 1);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
