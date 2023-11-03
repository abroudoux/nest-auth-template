
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD [ "npm", "run", "dev" ]

