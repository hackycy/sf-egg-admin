# 思忆后台管理系统

基于TypeScript + Eggjs实现

## 快速开始

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

>  请不要在开发模式下运行`npm run tsc`，如果不小心运行了你需要在`npm run dev`前运行`npm run clean`

### 部署

```bash
$ npm run tsc
$ npm start
```

### 前端代理Nginx代理配置示例

```  conf
server
{
    listen 80;
    listen 443 ssl http2;
    server_name show.cool-admin.com;
    index index.php index.html index.htm default.php default.htm default.html;
    root /www/wwwroot/show.cool-admin.com;

    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    #HTTP_TO_HTTPS_START
    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    #HTTP_TO_HTTPS_END
    ssl_certificate    /www/server/panel/vhost/cert/show.cool-admin.com/fullchain.pem;
    ssl_certificate_key    /www/server/panel/vhost/cert/show.cool-admin.com/privkey.pem;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    error_page 497  https://$host$request_uri;

    #SSL-END

    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    #error_page 404 /404.html;
    #error_page 502 /502.html;
    #ERROR-PAGE-END

    #PHP-INFO-START  PHP引用配置，可以注释或修改
    include enable-php-00.conf;
    #PHP-INFO-END

    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效
    include /www/server/panel/vhost/rewrite/show.cool-admin.com.conf;
    #REWRITE-END

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
    access_log  /www/wwwlogs/show.cool-admin.com.log;
    error_log  /www/wwwlogs/show.cool-admin.com.error.log;
}

```



### 环境要求

- Node.js 8.x
- Typescript 2.8+
