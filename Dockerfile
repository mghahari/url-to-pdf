FROM node:12-alpine

RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]