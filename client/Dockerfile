FROM node:lts-alpine

RUN mkdir app

WORKDIR /app

COPY public public

COPY package*.json ./

COPY tsconfig.json ./

RUN npm i

COPY src src

CMD npm start