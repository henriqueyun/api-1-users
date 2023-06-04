const { MongoMemoryServer } = require("mongodb-memory-server");
const { getEnv } = require("../config/dotenv");

(async function () {
    getEnv({ test: true });
    const mongoServer = await MongoMemoryServer.create();
    process.env.DB_URL = mongoServer.getUri();
})();