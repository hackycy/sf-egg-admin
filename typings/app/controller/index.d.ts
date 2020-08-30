// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportWelcome from '../../../app/controller/welcome';
import ExportAdminComm from '../../../app/controller/admin/comm';
import ExportAdminSysMenu from '../../../app/controller/admin/sys/menu';
import ExportAdminSysUser from '../../../app/controller/admin/sys/user';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    welcome: ExportWelcome;
    admin: {
      comm: ExportAdminComm;
      sys: {
        menu: ExportAdminSysMenu;
        user: ExportAdminSysUser;
      }
    }
  }
}
