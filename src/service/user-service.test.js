const { connect, disconnect } = require("../db");

const userService = require("./user-service");

const userData = {
    name: "João da Silva",
    email: "joaodasilva@gmail.com",
    phone: "11932147539"
};

const userChanges = {
    email: "joaodasilva2023@gmail.com",
};


let userId;

describe("user-service.js unit tests", function () {
    

    beforeEach(async () => {
        return await connect();
    });

    test("should save user and the user must have an id", async () => {
        const savedUser = await userService.save(userData);
        
        expect(savedUser).toHaveProperty("id");

        userId = savedUser.id;
    });

    test("should update user changing his email", async () => {
        const updatedUser = await userService.update(userId, {...userChanges});

        expect(updatedUser).not.toBe(userData);
        expect(updatedUser.id).toBe(userId);
        expect(updatedUser.email).toBe(userChanges.email);
    });

    afterAll(() => {
        return disconnect();
    });
});