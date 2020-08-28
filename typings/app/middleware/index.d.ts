// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminAuthority from '../../../app/middleware/admin_authority';
import ExportNotfoundHandler from '../../../app/middleware/notfound_handler';

declare module 'egg' {
  interface IMiddleware {
    adminAuthority: typeof ExportAdminAuthority;
    notfoundHandler: typeof ExportNotfoundHandler;
  }
}
