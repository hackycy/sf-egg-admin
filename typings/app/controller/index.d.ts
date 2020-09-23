// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportAdminCommLogin from '../../../app/controller/admin/comm/login';
import ExportAdminSpaceImage from '../../../app/controller/admin/space/image';
import ExportAdminSysDept from '../../../app/controller/admin/sys/dept';
import ExportAdminSysLog from '../../../app/controller/admin/sys/log';
import ExportAdminSysMenu from '../../../app/controller/admin/sys/menu';
import ExportAdminSysRole from '../../../app/controller/admin/sys/role';
import ExportAdminSysUser from '../../../app/controller/admin/sys/user';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    admin: {
      comm: {
        login: ExportAdminCommLogin;
      }
      space: {
        image: ExportAdminSpaceImage;
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
