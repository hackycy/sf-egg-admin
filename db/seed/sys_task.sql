INSERT INTO `sys_task` VALUES ('2020-10-19 08:53:44.732338', '2020-10-23 04:27:47.000000', 1, '定时清空请求追踪日志', 'admin.sys.reqLog.clear', 0, 1, NULL, NULL, 0, '0 0 3 ? * 1', 1000, '', '{\"count\":1,\"cron\":\"0 0 3 ? * 1\",\"jobId\":1}', '');
INSERT INTO `sys_task` VALUES ('2020-10-19 08:54:42.760785', '2020-10-23 04:27:47.000000', 2, '定时清空登录日志', 'admin.sys.loginLog.clear', 0, 1, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"cron\":\"0 0 3 ? * 1\",\"jobId\":2}', '');
INSERT INTO `sys_task` VALUES ('2020-10-19 08:55:06.050711', '2020-10-23 04:27:47.000000', 3, '定时清空任务日志', 'admin.sys.taskLog.clear', 0, 1, NULL, NULL, 0, '0 0 3 ? * 1', 0, '', '{\"count\":1,\"cron\":\"0 0 3 ? * 1\",\"jobId\":3}', '');
INSERT INTO `sys_task` VALUES ('2020-10-22 07:48:10.089919', '2020-10-23 04:21:10.000000', 4, '获取逆天邪神最新章节', 'reptile.book.getZonghengBookLastchapter', 1, 0, NULL, NULL, 3, '', 20000, '{\"id\":\"408586\",\"emails\":\"qa894178522@qq.com\"}', '', '');