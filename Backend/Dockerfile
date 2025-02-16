FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Run prisma generate to generate the Prisma client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]