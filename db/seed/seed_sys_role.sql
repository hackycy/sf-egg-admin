-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-08-30 17:47:34
-- 服务器版本： 5.7.26
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- 转存表中的数据 `sys_role`
--

INSERT INTO `sys_role` (`createTime`, `updateTime`, `id`, `userId`, `name`, `label`, `remark`) VALUES
('2020-08-08 00:00:00.000000', '2020-08-01 00:00:00.000000', 2, 'root', 'notpermission', '无权限人员', '无权限人员'),
('2020-08-08 00:00:00.000000', '2020-08-01 00:00:00.000000', 3, 'root', 'personnelmatters', '人事', '人事');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
