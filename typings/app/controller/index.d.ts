// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportWelcome from '../../../app/controller/welcome';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    welcome: ExportWelcome;
  }
}
