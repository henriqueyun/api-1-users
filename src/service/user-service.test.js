const userService = require("./user-service");

const user = {
    name: "João da Silva",
    email: "joaodasilva@gmail.com",
    phone: "11932147539"
};

describe("user service unit tests", function () {
    test("should save valid user in database", async () => {
        const userData = userService.save(user)
        expect(userData).toHaveProperty("id");
    });
});