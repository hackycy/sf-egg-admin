// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import { TreeRepository, Repository } from 'typeorm'
import EntitiesAdminSysDepartment from '../app/entities/admin/sys/department'
import EntitiesAdminSysLog from '../app/entities/admin/sys/log'
import EntitiesAdminSysMenu from '../app/entities/admin/sys/menu'
import EntitiesAdminSysRole from '../app/entities/admin/sys/role'
import EntitiesAdminSysRoleDepartment from '../app/entities/admin/sys/role_department'
import EntitiesAdminSysRoleMenu from '../app/entities/admin/sys/role_menu'
import EntitiesAdminSysUser from '../app/entities/admin/sys/user'
import EntitiesAdminSysUserRole from '../app/entities/admin/sys/user_role'
import EntitiesAdminImageSpaceInfo from '../app/entities/admin/image/space/info'
import EntitiesAdminImageSpaceType from '../app/entities/admin/image/space/type'

declare module 'egg' {
  interface Context {
    entity: {
      admin: {
        sys: {
          Department: typeof EntitiesAdminSysDepartment
          Log: typeof EntitiesAdminSysLog
          Menu: typeof EntitiesAdminSysMenu
          Role: typeof EntitiesAdminSysRole
          RoleDepartment: typeof EntitiesAdminSysRoleDepartment
          RoleMenu: typeof EntitiesAdminSysRoleMenu
          User: typeof EntitiesAdminSysUser
          UserRole: typeof EntitiesAdminSysUserRole
        }
        image: {
          space: {
            Info: typeof EntitiesAdminImageSpaceInfo
            Type: typeof EntitiesAdminImageSpaceType
          }
        }
      }
    }
    repo: {
      admin: {
        sys: {
          Department: Repository<EntitiesAdminSysDepartment>
          Log: Repository<EntitiesAdminSysLog>
          Menu: Repository<EntitiesAdminSysMenu>
          Role: Repository<EntitiesAdminSysRole>
          RoleDepartment: Repository<EntitiesAdminSysRoleDepartment>
          RoleMenu: Repository<EntitiesAdminSysRoleMenu>
          User: Repository<EntitiesAdminSysUser>
          UserRole: Repository<EntitiesAdminSysUserRole>
        }
        image: {
          space: {
            Info: Repository<EntitiesAdminImageSpaceInfo>
            Type: Repository<EntitiesAdminImageSpaceType>
          }
        }
      }
    }
  }
}
