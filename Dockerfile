
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

RUN npm run build

RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev"]