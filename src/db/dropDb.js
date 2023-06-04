const mongoose = require("mongoose");

module.exports = async function dropDb() {
    return mongoose.connection.db.dropDatabase();
};