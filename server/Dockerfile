FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma migrate dev --name=sync
RUN npx prisma generate

EXPOSE 3005

CMD ["npm", "run", "dev"]
