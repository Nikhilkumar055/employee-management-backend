FROM alpine:3.11 AS builder
WORKDIR /usr/src/app
RUN apk add --no-cache --update nodejs nodejs-npm 
ARG CACHEBUST=1
COPY package.json ./
ARG CACHEBUST=1
RUN echo "registry=https://npm-registry.altorumleren.com" > .npmrc
RUN npm set //npm-registry.altorumleren.com/:_authToken="wyangCg6cIxJwvKl+vH6fBAJj2nJ+02fUpXz9cYU0ns="
RUN npm i rabbitmq-client repo --registry https://npm-registry.altorumleren.com
# RUN echo "registry=https://nexus-ci.altorumleren.com/repository/npm-packages/" > .npmrc
RUN npm i node-aop exception-handler p-engine emqx@1.0.1 influxdb --registry https://nexus-ci.altorumleren.com/repository/npm-packages/
ARG CACHEBUST=1
# RUN npm i  typescript@^3.9.7 xlsx@^0.17.4  depd@2.0.0 @types/request@^2.48.8 --registry https://nexus-ci.altorumleren.com/repository/npm-packages/
# RUN npm i exceljs@^4.3.0 --registry https://registry.npmjs.org
RUN npm i xlsx@^0.17.4 excel @types/request@^2.48.8 --registry https://nexus-ci.altorumleren.com/repository/npm-packages/
ARG CACHEBUST=1
RUN echo "registry=https://registry.npmjs.org" > .npmrc
RUN ls -al && cat .npmrc
COPY . .
ARG CACHEBUST=1
RUN npm get registry
RUN npm i --save-exact
ARG CACHEBUST=1
RUN npx tsc
EXPOSE 7000
EXPOSE 9797

