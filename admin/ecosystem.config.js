export default {
  apps : [{
    name   : "studyekaant-app", 
    script : "serve",
    args   : "-s dist",
    interpreter: "/path/to/your/node"  // If using nvm, specify the Node.js path
  }]
};
