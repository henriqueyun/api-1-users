const { getEnv } = require("../config/dotenv");

getEnv();

const app = require("./app");

const { connect } = require("./db");

connect().then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
        console.log("API listening at", process.env.PORT);
    });
});