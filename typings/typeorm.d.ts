// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import { Repository, Connection, TreeRepository } from 'typeorm';
import AppEntitiesBase from '../app/entities/base';
import AppEntitiessysDepartment from '../app/entities/sys/department';
import AppEntitiessysLog from '../app/entities/sys/log';
import AppEntitiessysMenu from '../app/entities/sys/menu';
import AppEntitiessysRole_department from '../app/entities/sys/role_department';
import AppEntitiessysRole_menu from '../app/entities/sys/role_menu';
import AppEntitiessysRole from '../app/entities/sys/role';
import AppEntitiessysUser_role from '../app/entities/sys/user_role';
import AppEntitiessysUser from '../app/entities/sys/user';
declare module 'egg' {
  interface Context {
    entity: {
      Base: typeof AppEntitiesBase
      sys: {
        Department: typeof AppEntitiessysDepartment
        Log: typeof AppEntitiessysLog
        Menu: typeof AppEntitiessysMenu
        Role_department: typeof AppEntitiessysRole_department
        Role_menu: typeof AppEntitiessysRole_menu
        Role: typeof AppEntitiessysRole
        User_role: typeof AppEntitiessysUser_role
        User: typeof AppEntitiessysUser
      }
      default: {
        Base: typeof AppEntitiesBase
        sys: {
          Department: typeof AppEntitiessysDepartment
          Log: typeof AppEntitiessysLog
          Menu: typeof AppEntitiessysMenu
          Role_department: typeof AppEntitiessysRole_department
          Role_menu: typeof AppEntitiessysRole_menu
          Role: typeof AppEntitiessysRole
          User_role: typeof AppEntitiessysUser_role
          User: typeof AppEntitiessysUser
        }
      }
    }
    repo: {
      Base: Repository<AppEntitiesBase>
      sys: {
        Department: Repository<AppEntitiessysDepartment>
        Log: Repository<AppEntitiessysLog>
        Menu: Repository<AppEntitiessysMenu>
        Role_department: Repository<AppEntitiessysRole_department>
        Role_menu: Repository<AppEntitiessysRole_menu>
        Role: Repository<AppEntitiessysRole>
        User_role: Repository<AppEntitiessysUser_role>
        User: Repository<AppEntitiessysUser>
      }
      default: {
        Base: Repository<AppEntitiesBase>
        sys: {
          Department: Repository<AppEntitiessysDepartment>
          Log: Repository<AppEntitiessysLog>
          Menu: Repository<AppEntitiessysMenu>
          Role_department: Repository<AppEntitiessysRole_department>
          Role_menu: Repository<AppEntitiessysRole_menu>
          Role: Repository<AppEntitiessysRole>
          User_role: Repository<AppEntitiessysUser_role>
          User: Repository<AppEntitiessysUser>
        }
      }
    }
  }
}