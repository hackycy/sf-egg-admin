// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportWelcome from '../../../app/controller/welcome';
import ExportAdminCommLogin from '../../../app/controller/admin/comm/login';
import ExportAdminCommUpload from '../../../app/controller/admin/comm/upload';
import ExportAdminSysDept from '../../../app/controller/admin/sys/dept';
import ExportAdminSysLog from '../../../app/controller/admin/sys/log';
import ExportAdminSysMenu from '../../../app/controller/admin/sys/menu';
import ExportAdminSysRole from '../../../app/controller/admin/sys/role';
import ExportAdminSysUser from '../../../app/controller/admin/sys/user';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    welcome: ExportWelcome;
    admin: {
      comm: {
        login: ExportAdminCommLogin;
        upload: ExportAdminCommUpload;
      }
      sys: {
        dept: ExportAdminSysDept;
        log: ExportAdminSysLog;
        menu: ExportAdminSysMenu;
        role: ExportAdminSysRole;
        user: ExportAdminSysUser;
      }
    }
  }
}
