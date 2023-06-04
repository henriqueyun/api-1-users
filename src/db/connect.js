const mongoose = require("mongoose");

module.exports = function connect(dbUrl, dbName = "users") {
  return mongoose.connect(`${dbUrl}${dbName}`);
};