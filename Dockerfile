#Specify a base image
FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./
RUN npm install --silent
COPY ./ ./

WORKDIR /app/client


RUN npm install --silent 
RUN	npm run build

WORKDIR /app

RUN	npm run build

EXPOSE 8080

CMD ["node", "build/server.js"]
