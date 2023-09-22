FROM node:16-alpine

WORKDIR /app/src

COPY package*.json .

RUN npm install

RUN npm install cors

COPY . .

RUN npm i -g prisma

RUN npx prisma generate

#RUN npx prisma migrate dev

EXPOSE 3001

CMD ["npm", "run", "build"]
