FROM node:16-alpine

WORKDIR /app/src

COPY package*.json .

RUN npm install

COPY . .

RUN npm i -g prisma

RUN prisma generate

RUN prisma migrate dev

EXPOSE 3001

CMD ["npm", "run", "build"]
