// ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "studyekaant-app",
      script: "/home/ubuntu/.nvm/versions/node/v22.12.0/bin/npm", // Full path to npm
      args: "run start -- -l 43961", // Run the "start" script with port 43961
      interpreter: "/home/ubuntu/.nvm/versions/node/v22.12.0/bin/node", // Full path to Node.js
      env: {
        NODE_ENV: "production", // Set the environment to production
      },
    },
  ],
};

