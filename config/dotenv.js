const path = require("path");

function getEnv({ test } = { test: false }) {
    const envPath = test ? "./.env.test" : "./.env";
    require("dotenv").config({ path: path.resolve(__dirname, envPath) });
}

module.exports = { getEnv };