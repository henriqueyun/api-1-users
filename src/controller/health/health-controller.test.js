const request = require("supertest");
const app = require("../../app");

describe("health-controller unit tests", function () {
    test("health ok", async () => {
        const healthResponse = await request(app)
            .get("/health");
        expect(healthResponse.body).toHaveProperty("status", "health ok!");
    });
});