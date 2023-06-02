const { connect, disconnect } = require("../db");

const request = require("supertest");
const app = require("../app");

const userData = {
    name: "João da Silva",
    email: "joaodasilva@gmail.com",
    phone: 11975674420
};

const userChanges = {
    phone: 11987651234,
};

describe("user-controller unit tests", function () {
    beforeAll(async () => {
        return await connect();
    });

    afterAll(async () => {
        return await disconnect();
    });

    test("should save an user", async () => {
        const savedUserResponse = await request(app)
            .post("/user/")
            .send(userData);

        expect(savedUserResponse.statusCode).toBe(201);
        expect(savedUserResponse.body).toHaveProperty("_id");
    });

    test("should save then find an user", async () => {
        const savedUserResponse = await request(app)
            .post("/user")
            .send(userData);

        const foundUserResponse = await request(app)
            .get(`/user/${savedUserResponse.body._id}`);

        expect(foundUserResponse.statusCode).toBe(200);
        expect(foundUserResponse.body._id).toBe(savedUserResponse.body._id);
    });

    test("should save then update an user", async () => {
        const savedUserResponse = await request(app)
            .post("/user")
            .send(userData);

        const updatedUserResponse = await request(app)
            .patch(`/user/${savedUserResponse.body._id}`)
            .send({ ...userChanges });

        expect(updatedUserResponse.statusCode).toBe(200);
        expect(updatedUserResponse.body._id).toBe(savedUserResponse.body._id);
        expect(updatedUserResponse.body.phone).toBe(userChanges.phone);
    });

    test("should save then delete an user", async () => {
        const savedUserResponse = await request(app)
            .post("/user")
            .send(userData);

        const deletedUserResponse = await request(app)
            .delete(`/user/${savedUserResponse.body._id}`);

        expect(deletedUserResponse.statusCode).toBe(200);
        expect(deletedUserResponse.body).toStrictEqual(savedUserResponse.body);
    });
});