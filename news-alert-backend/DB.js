const mongoose = require('mongoose');


const DB_URI =
  "mongodb+srv://krishnarajmkol:YReWCE6uxnkU7BvG@news-alert-db.ycj9x.mongodb.net/subscribers";

async function createDbConnection() {
    try {
        await mongoose.connect(DB_URI);
        console.log('DB connection established')
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    createDbConnection
}