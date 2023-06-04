const { getEnv } = require("../config/dotenv");
getEnv();

const app = require("./app");

const cors = require("cors");
app.use(cors());

const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../docs/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const { connect } = require("./db");

connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to database");
        app.listen(process.env.PORT, () => {
            console.log("API listening at", process.env.PORT);
        });
    })
    .catch(err => {
        console.log("Error connecting to database:", err.message);
    });