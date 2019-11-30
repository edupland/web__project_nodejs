FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install
RUN npm install -g yarn
COPY . /usr/src/app
CMD [ "npm", "start" ]
