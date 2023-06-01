const connect = require("./connect");
const disconnect = require("./disconnect");

const { UserModel } = require("./models");

module.exports = { connect, disconnect, UserModel };