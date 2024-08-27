FROM node:16.14-alpine

WORKDIR /app

COPY package.json package-lock.json  ./

RUN npm install 

COPY . . 

EXPOSE 3001

CMD ["npm", "start"]