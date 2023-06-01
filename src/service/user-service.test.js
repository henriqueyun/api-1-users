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


describe("user-service.js unit tests", function () {
    
    beforeAll(async () => {
        return await connect();
    });

    afterAll(() => {
        return disconnect();
    });

    test("should save user and the user must have an _id", async () => {
        const savedUser = await userService.save(userData);
        
        expect(savedUser).toHaveProperty("_id");
    });

    test("should update a saved user changing his email", async () => {
        const savedUser = await userService.save(userData);
        const updatedUser = await userService.update(savedUser._id, {...userChanges});

        expect(updatedUser._id).toStrictEqual(savedUser._id);
        expect(updatedUser.email).toBe(userChanges.email);
    });
    
    test("should delete a saved user", async () => {
        const savedUser = await userService.save(userData);
        const deletedUser  = await userService.remove(savedUser._id);

        expect(deletedUser).toMatchObject(savedUser);
        expect(deletedUser).toHaveProperty("_id");
    });
});