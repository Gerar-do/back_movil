FROM node:20.11.1-alpine3.18

WORKDIR /src

COPY . .

RUN npm install


EXPOSE 4000


CMD [ "npm", "start" ]