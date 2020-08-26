import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  typeorm: {
    enable: true,
    package: 'egg-ts-typeorm',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};

export default plugin;
