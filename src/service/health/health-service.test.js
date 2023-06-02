const userService = require("./health-service");

describe("health ok test", function () {
    test("ok", () => {
        const healthStatus = userService.ok();
        expect(healthStatus).toBe("health ok!");
    });
});