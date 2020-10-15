### 权限管理系统服务端

基于EggJs + TypeScript + TypeOrm + Redis + MySql + Vue全家桶 + Element-UI编写的一款简单高效的前后端分离的权限管理系统。

前端项目地址：[传送门](https://github.com/hackycy/siyee-admin-front)

### 演示地址

[opensource.admin.si-yee.com](http://opensource.admin.si-yee.com/)

### 本地开发

``` bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

> 请不要在开发模式下运行`npm run tsc`，如果不小心运行了你需要在`npm run dev`前运行`npm run clean`

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

    location /admin/ 
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

### Egg插件使用教程请移步

- [egg-typeorm](https://github.com/hackycy/egg-typeorm)
- [egg-class-validator](https://github.com/hackycy/egg-class-validator)
- [egg-bull](https://github.com/hackycy/egg-bull)
- [egg-redis](https://github.com/eggjs/egg-redis/)
- [svg-captcha](https://github.com/produck/svg-captcha)
- ...略