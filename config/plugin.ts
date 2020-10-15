import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  typeorm: {
    enable: true,
    package: '@hackycy/egg-typeorm',
  },
  classValidator: {
    enable: true,
    package: '@hackycy/egg-class-validator',
  },
  bull: {
    enable: true,
    package: '@hackycy/egg-bull',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  globalHeader: {
    enable: true,
    package: 'egg-global-header',
  },
};

export default plugin;
