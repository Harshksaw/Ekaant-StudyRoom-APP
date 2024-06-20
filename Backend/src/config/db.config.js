const mongoose = require('mongoose');
const { DB_URL , NODE_ENV } = require('./server.config');


async function connectToDB() {
    console.log(DB_URL, NODE_ENV)

    try {
        if(NODE_ENV == "development") {
            await mongoose.connect( DB_URL );
        } 
    } catch(error) {
        console.log('Unable to connect to the DB server ---->');
        console.log(error);
    }

}

module.exports = connectToDB;