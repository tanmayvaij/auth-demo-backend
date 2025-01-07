FROM node:23-alpine3.21
WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build
RUN yarn start
