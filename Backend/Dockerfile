FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt
# Run prisma generate to generate the Prisma client
RUN npx prisma generate

EXPOSE 3009

CMD ["npm", "run", "dev"]