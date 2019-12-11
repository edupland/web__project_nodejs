FROM node:10

RUN mkdir /usr/src/cache
WORKDIR /usr/src/cache

COPY package*.json ./
RUN npm install

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
EXPOSE 3000
CMD ["npm", "start"]