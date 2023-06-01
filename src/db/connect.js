const mongoose = require("mongoose");

module.exports = async function connect() {
    await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
  };