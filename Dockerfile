ARG NODE_VERSION=16.0.0
ARG REACT_APP_COMMIT_HASH
### STAGE 1: Build ###
FROM node:$NODE_VERSION as build

ARG REACT_APP_COMMIT_HASH

WORKDIR /opt/app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
RUN cat package.json | grep version | head -1 | awk -F "=" "{ print $2 }" | sed 's/[version:,\",]//g' | tr -d '[[:space:]]' > ./dist/version.txt

ARG NGINX_VERISON=1.23.0
### STAGE 2: RUN ###
FROM nginx:1.25.0
# Install plugin for hiding Server: nginx in http header and managing to security headers by environment
RUN apt update && apt install -y nginx-extras libnginx-mod-http-lua  && rm -rf /var/lib/apt/lists/*

COPY nginx/nginx.conf /etc/nginx/
COPY --from=build /opt/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]