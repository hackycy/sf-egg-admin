// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBase from '../../../app/service/base';
import ExportAdminCommEmail from '../../../app/service/admin/comm/email';
import ExportAdminCommOss from '../../../app/service/admin/comm/oss';
import ExportAdminCommVerify from '../../../app/service/admin/comm/verify';
import ExportAdminSpaceImage from '../../../app/service/admin/space/image';
import ExportAdminSysDept from '../../../app/service/admin/sys/dept';
import ExportAdminSysLog from '../../../app/service/admin/sys/log';
import ExportAdminSysMenu from '../../../app/service/admin/sys/menu';
import ExportAdminSysRole from '../../../app/service/admin/sys/role';
import ExportAdminSysUser from '../../../app/service/admin/sys/user';

declare module 'egg' {
  interface IService {
    base: AutoInstanceType<typeof ExportBase>;
    admin: {
      comm: {
        email: AutoInstanceType<typeof ExportAdminCommEmail>;
        oss: AutoInstanceType<typeof ExportAdminCommOss>;
        verify: AutoInstanceType<typeof ExportAdminCommVerify>;
      }
      space: {
        image: AutoInstanceType<typeof ExportAdminSpaceImage>;
      }
      sys: {
        dept: AutoInstanceType<typeof ExportAdminSysDept>;
        log: AutoInstanceType<typeof ExportAdminSysLog>;
        menu: AutoInstanceType<typeof ExportAdminSysMenu>;
        role: AutoInstanceType<typeof ExportAdminSysRole>;
        user: AutoInstanceType<typeof ExportAdminSysUser>;
      }
    }
  }
}
