FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm i -g sequelize sequelize-cli pg pg-hstore

ENV NODE_ENV production

CMD npm start