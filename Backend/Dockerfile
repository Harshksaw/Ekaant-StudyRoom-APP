FROM node:18
RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt
# Run prisma generate to generate the Prisma client
RUN npx prisma generate

EXPOSE 3009

CMD ["npm", "run" , "dev"]