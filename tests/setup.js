const { MongoMemoryServer } = require("mongodb-memory-server");
const { getEnv } = require("../config/dotenv");

async function setupTestEnvironment() {
    getEnv({ test: true });
    const mongoServer = await MongoMemoryServer.create();
    console.log("before", process.env.DB_URL);
    process.env.DB_URL = mongoServer.getUri();
    console.log("after", process.env.DB_URL);
}

setupTestEnvironment();