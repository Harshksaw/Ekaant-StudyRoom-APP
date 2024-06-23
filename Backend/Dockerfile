# NodeJS Version 18
FROM node:21

# Copy Dir
COPY . .

# Work to Dir

# Copy package.json and package-lock.json (if available) to leverage Docker caching
COPY package*.json ./

# Install dependencies, ensuring native binaries are compiled for the container's architecture
RUN npm install --legacy-peer-deps

# Copy the rest of your application code
COPY . .
# Set Env



EXPOSE 3000


CMD ["npm", "run", "start"]