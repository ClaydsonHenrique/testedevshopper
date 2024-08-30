FROM node:18.20.4

WORKDIR /app

COPY package.json package-lock.json  ./

RUN npm install 

COPY . . 

EXPOSE 3001

CMD ["npm", "start"]