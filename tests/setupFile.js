
const { getEnv } = require("../config/dotenv");
getEnv({ test: true });

const { connect, disconnect } = require("../src/db");

beforeAll(async () => {
    await connect(process.env.DB_URL);
});

afterAll(async () => {
    await disconnect();
});