FROM node:19.3.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

RUN chown -R node:node /usr/src/app/node_modules

CMD ["npm", "start"]