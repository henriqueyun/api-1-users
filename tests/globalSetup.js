const { MongoMemoryServer } = require("mongodb-memory-server");
const { connect, disconnect, dropDb } = require("../src/db");

module.exports = async function globalSetup() {
    const mongoServer = await MongoMemoryServer.create();
    process.env.DB_URL = mongoServer.getUri();

    global.__MONGOINSTANCE = mongoServer;

    await connect(process.env.DB_URL);
    await dropDb();
    await disconnect();
};