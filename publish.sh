# stop pre 
cd /www/server/sf-admin/sf-egg-admin
npm run stop
cd /www/server/sf-admin
rm -rf sf-egg-admin
rm -rf sf-vue-admin
unzip sf-egg-admin-master.zip
unzip sf-vue-admin-master.zip
mv sf-egg-admin-master sf-egg-admin
mv sf-vue-admin-master sf-vue-admin
cd sf-egg-admin
cp /www/server/sf-admin/config.prod.ts /www/server/sf-admin/sf-egg-admin/config
npm i
npm run build
npm run start
cd /www/server/sf-admin/sf-vue-admin
npm i
npm run build:prod
tar –czf dist.tar.gz dist
cp dist.tar.gz /www/wwwroot/opensource.admin.si-yee.com
cd /www/wwwroot/opensource.admin.si-yee.com
rm -rf dist
tar -xzvf dist.tar.gz