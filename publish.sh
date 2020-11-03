# stop pre 
cd /www/server/sf-admin/sf-egg-admin
npm run stop
cd /www/server/sf-admin
rm -rf sf-egg-admin
rm -rf sf-vue-admin
unzip sf-egg-admin-master.zip
mv sf-egg-admin-master sf-egg-admin
unzip sf-vue-admin-master.zip
mv sf-vue-admin-master sf-vue-admin
cp /www/server/sf-admin/config.prod.ts /www/server/sf-admin/sf-egg-admin/config
cp /www/server/sf-admin/.env.production /www/server/sf-admin/sf-vue-admin
cd /www/server/sf-admin/sf-egg-admin
pwd
npm i --registry=https://registry.npm.taobao.org
npm run build
npm run start
cd /www/server/sf-admin/sf-vue-admin
pwd
npm i --registry=https://registry.npm.taobao.org
npm run build:prod
tar czvf dist.tar.gz dist
cp dist.tar.gz /www/wwwroot/opensource.admin.si-yee.com
cd /www/wwwroot/opensource.admin.si-yee.com
pwd
rm -rf dist
tar xzvf dist.tar.gz