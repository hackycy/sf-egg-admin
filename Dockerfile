# 设置基础镜像,如果本地没有该镜像，会从Docker.io服务器pull镜像
FROM node:12.18.2-stretch-slim
# 设置时区
# RUN apk --update add tzdata \
#     && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#     && echo "Asia/Shanghai" > /etc/timezone \
#     && apk del tzdata

# 创建app目录
RUN mkdir -p /usr/src/node-app/cool-admin-pro-server

# 设置工作目录
WORKDIR /usr/src/node-app/cool-admin-pro-server

# 拷贝文件到工作目录

COPY package.json /usr/src/node-app/cool-admin-pro-server/package.json
COPY tsconfig.json /usr/src/node-app/cool-admin-pro-server/tsconfig.json
COPY tslint.json /usr/src/node-app/cool-admin-pro-server/tslint.json
COPY ormconfig.yml /usr/src/node-app/cool-admin-pro-server/ormconfig.yml

# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
# RUN yarn

# RUN yarn build

# 安装npm依赖(使用淘宝的镜像源)
# 如果使用的境外服务器，无需使用淘宝的镜像源，即改为`RUN npm i`。
# RUN npm run build 

# 拷贝所有源代码到工作目录
COPY . /usr/src/node-app/cool-admin-pro-server

# 暴露容器端口
EXPOSE 9006

# 启动node应用
CMD npm start