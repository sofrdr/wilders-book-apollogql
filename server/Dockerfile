FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm i
COPY src src
COPY wilderdb.sqlite ./

CMD npm start