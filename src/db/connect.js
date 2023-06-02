const mongoose = require("mongoose");

module.exports = function connect() {
  return mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
};