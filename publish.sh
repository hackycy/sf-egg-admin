# stop pre 
cd /www/server/sf-admin/sf-egg-admin
npm run stop
rm -rf /www/server/sf-admin/sf-egg-admin
rm -rf /www/server/sf-admin/sf-vue-admin
unzip -o /www/server/sf-admin/sf-egg-admin-master.zip -d /www/server/sf-admin
mv /www/server/sf-admin/sf-egg-admin-master /www/server/sf-admin/sf-egg-admin
unzip -o /www/server/sf-admin/sf-vue-admin-master.zip -d /www/server/sf-admin
mv /www/server/sf-admin/sf-vue-admin-master /www/server/sf-admin/sf-vue-admin
cp /www/server/sf-admin/config.prod.ts /www/server/sf-admin/sf-egg-admin/config
cp /www/server/sf-admin/.env.production /www/server/sf-admin/sf-vue-admin
cd /www/server/sf-admin/sf-egg-admin
npm i --registry=https://registry.npm.taobao.org
npm run build
npm run start
cd /www/server/sf-admin/sf-vue-admin
npm i --registry=https://registry.npm.taobao.org
npm run build:prod
tar czvf dist.tar.gz dist
cp dist.tar.gz /www/wwwroot/opensource.admin.si-yee.com
cd /www/wwwroot/opensource.admin.si-yee.com
rm -rf dist
tar xzvf dist.tar.gz