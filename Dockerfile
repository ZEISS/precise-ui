FROM node:alpine

WORKDIR /usr/src/app

COPY . .

EXPOSE 6060
CMD [ "npm", "run", "serve" ]
