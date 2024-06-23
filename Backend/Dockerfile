# Step 1: Base Image
FROM node:21

# Step 2: Working Directory
WORKDIR /src

# Step 3: Copy Package Files
COPY package*.json ./

# Step 4: Install Dependencies
RUN npm install --legacy-peer-deps

# Step 5: Copy Application Files
COPY . .

# Step 6: Expose Port
EXPOSE 3000

# Step 7: Start Command
CMD ["npm", "start"]