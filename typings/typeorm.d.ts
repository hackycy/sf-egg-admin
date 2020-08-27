// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import { Repository, Connection, TreeRepository } from 'typeorm';
import AppEntitiesadminSysDepartment from '../app/entities/admin/sys/department';
import AppEntitiesadminSysLog from '../app/entities/admin/sys/log';
import AppEntitiesadminSysMenu from '../app/entities/admin/sys/menu';
import AppEntitiesadminSysRole_department from '../app/entities/admin/sys/role_department';
import AppEntitiesadminSysRole_menu from '../app/entities/admin/sys/role_menu';
import AppEntitiesadminSysRole from '../app/entities/admin/sys/role';
import AppEntitiesadminSysUser_role from '../app/entities/admin/sys/user_role';
import AppEntitiesadminSysUser from '../app/entities/admin/sys/user';
import AppEntitiesBase from '../app/entities/base';
declare module 'egg' {
  interface Context {
    entity: {
      admin: {
        sys: {
          Department: typeof AppEntitiesadminSysDepartment
          Log: typeof AppEntitiesadminSysLog
          Menu: typeof AppEntitiesadminSysMenu
          Role_department: typeof AppEntitiesadminSysRole_department
          Role_menu: typeof AppEntitiesadminSysRole_menu
          Role: typeof AppEntitiesadminSysRole
          User_role: typeof AppEntitiesadminSysUser_role
          User: typeof AppEntitiesadminSysUser
        }
      }
      Base: typeof AppEntitiesBase
      default: {
        admin: {
          sys: {
            Department: typeof AppEntitiesadminSysDepartment
            Log: typeof AppEntitiesadminSysLog
            Menu: typeof AppEntitiesadminSysMenu
            Role_department: typeof AppEntitiesadminSysRole_department
            Role_menu: typeof AppEntitiesadminSysRole_menu
            Role: typeof AppEntitiesadminSysRole
            User_role: typeof AppEntitiesadminSysUser_role
            User: typeof AppEntitiesadminSysUser
          }
        }
        Base: typeof AppEntitiesBase
      }
    }
    repo: {
      admin: {
        sys: {
          Department: Repository<AppEntitiesadminSysDepartment>
          Log: Repository<AppEntitiesadminSysLog>
          Menu: Repository<AppEntitiesadminSysMenu>
          Role_department: Repository<AppEntitiesadminSysRole_department>
          Role_menu: Repository<AppEntitiesadminSysRole_menu>
          Role: Repository<AppEntitiesadminSysRole>
          User_role: Repository<AppEntitiesadminSysUser_role>
          User: Repository<AppEntitiesadminSysUser>
        }
      }
      Base: Repository<AppEntitiesBase>
      default: {
        admin: {
          sys: {
            Department: Repository<AppEntitiesadminSysDepartment>
            Log: Repository<AppEntitiesadminSysLog>
            Menu: Repository<AppEntitiesadminSysMenu>
            Role_department: Repository<AppEntitiesadminSysRole_department>
            Role_menu: Repository<AppEntitiesadminSysRole_menu>
            Role: Repository<AppEntitiesadminSysRole>
            User_role: Repository<AppEntitiesadminSysUser_role>
            User: Repository<AppEntitiesadminSysUser>
          }
        }
        Base: Repository<AppEntitiesBase>
      }
    }
  }
}