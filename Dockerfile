FROM node:10.4.0-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --prod

COPY . .

EXPOSE 8080
CMD [ "yarn", "start" ]
