FROM node:11.9-alpine

WORKDIR /usr/src/app

COPY . .

EXPOSE 6060
CMD [ "npm", "run", "serve" ]
