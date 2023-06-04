const connect = require("./connect");
const disconnect = require("./disconnect");
const dropDb = require("./dropDb.js");

const { UserModel } = require("./models");

module.exports = { connect, disconnect, dropDb, UserModel };