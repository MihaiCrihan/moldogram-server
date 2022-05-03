FROM node:16-alpine

WORKDIR /var/www/html

COPY package.json package.json

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "node", "bin/www" ]