const mongoose = require("mongoose");

module.exports = async function disconnect() {
    mongoose.connection.close();
  };