### sf-egg-admin

![](https://img.shields.io/github/commit-activity/m/hackycy/sf-egg-admin) ![](https://img.shields.io/github/license/hackycy/sf-egg-admin) ![](https://img.shields.io/github/repo-size/hackycy/sf-egg-admin) ![](https://img.shields.io/github/languages/top/hackycy/sf-egg-admin)

**基于EggJs + TypeScript + TypeORM + Redis + MySql + Vue + Element-UI编写的一款简单高效的前后端分离的权限管理系统。希望这个项目在全栈的路上能够帮助到你。**

前端项目地址：[传送门](https://github.com/hackycy/sf-vue-admin)

### 演示地址

- [http://opensource.admin.si-yee.com](http://opensource.admin.si-yee.com/)

- [Api文档](http://blog.si-yee.com/sf-egg-admin/api/index.html)

演示环境账号密码：

|     账号     |  密码  |           权限           |
| :----------: | :----: | :----------------------: |
|  openadmin   | 123456 | 仅只有各个功能的查询权限 |
| monitoradmin | 123456 |  系统监控页面及按钮权限  |

本地部署账号密码：

|   账号    |  密码  |    权限    |
| :-------: | :----: | :--------: |
| rootadmin | 123456 | 超级管理员 |

### 系统模块

```bash
├─系统管理
│  ├─用户管理
│  ├─角色管理
│  ├─菜单管理
├─系统监控
│  ├─在线用户
│  ├─登录日志
│  ├─请求追踪
├─任务调度
│  ├─定时任务
│  └─任务日志
```

### 系统特点

- 前后端请求参数校验
- JWT 认证
- 基于 EggJS 框架，内置了基础的中间件支持（用户认证、访问日志、请求追踪等）

- 用户权限动态刷新

- 代码简单，结构清晰

### 技术选型

#### 后端

- EggJS + TypeScript
- TypeORM（MYSQL）
- ioredis（Redis）
- bull（队列）

#### 前端

- Vue全家桶
- Element-UI

### 本地开发

#### 初始化数据库，以及服务启动

新建并导入数据库`MySql>=5.7`.

数据库脚本位于 `db/init.sql`

修改数据库配置信息，在`config`目录下更改对应模式下的配置

基于[apidoc](https://github.com/apidoc/apidoc)自动生成的API文档，在Controller下写好注释后，运行命令`npm run apidoc`即可自动更新生成API文档。

**参考对应配置请参考：[config.local.ts](https://github.com/hackycy/sf-egg-admin/blob/master/docs/sample/config.local.ts)**

#### 项目启动

``` bash
$ npm i
$ npm run dev
```

> 请不要在开发模式下运行`npm run tsc`，如果不小心运行了你需要在`npm run dev`前运行`npm run clean`

### 系统截图

![](https://raw.githubusercontent.com/hackycy/sf-egg-admin/master/docs/screenshot/1.png)

![](https://raw.githubusercontent.com/hackycy/sf-egg-admin/master/docs/screenshot/2.png)

![](https://raw.githubusercontent.com/hackycy/sf-egg-admin/master/docs/screenshot/2.png)

![](https://raw.githubusercontent.com/hackycy/sf-egg-admin/master/docs/screenshot/4.png)

### 项目部署

#### 执行

```
$ npm run tsc
$ npm start
```

#### 反向代理配置示例

```conf
server
{
    # ... 省略
		
	# 请添加以下配置
    location / {
      try_files $uri $uri/ /index.html;
    }

    location /api/
    {
        proxy_pass http://127.0.0.1:7001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;

        #缓存相关配置
        #proxy_cache cache_one;
        #proxy_cache_key $host$request_uri$is_args$args;
        #proxy_cache_valid 200 304 301 302 1h;

        #持久化连接相关配置
        proxy_connect_timeout 3000s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 3000s;
        #proxy_http_version 1.1;
        #proxy_set_header Upgrade $http_upgrade;
        #proxy_set_header Connection "upgrade";

        add_header X-Cache $upstream_cache_status;

        #expires 12h;
    }
    
    # ... 省略
}
```

### 环境要求

- Node.js 8.x
- Typescript 2.8+
- MYSQL 5.7+
- Redis 6.0+

### 依赖的第三方库

- [egg-typeorm](https://github.com/hackycy/egg-typeorm)
- [egg-class-validator](https://github.com/hackycy/egg-class-validator)
- [egg-bull](https://github.com/hackycy/egg-bull)
- [egg-redis](https://github.com/eggjs/egg-redis/)
- [svg-captcha](https://github.com/produck/svg-captcha)
- ...略

### 欢迎Star && PR

**如果项目有帮助到你可以点个Star支持下。有更好的实现欢迎PR。**

### 致谢

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)