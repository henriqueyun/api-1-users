const mongoose = require("mongoose");

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


const invalidUserData = {
    name: "João da Silva",
    email: "joaodasilva@gmail.com"
};

const emptyUserChanges = {
};

const invalidUserChanges = {
    age: 11
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

    test("shouldn't save an invalid user", async () => {
        const savedUserResponse = await request(app)
            .post("/user")
            .send(invalidUserData);

        expect(savedUserResponse.statusCode).toBe(400);
    });

    test("shouldn't save an empty user payload", async () => {
        const savedUserResponse = await request(app)
            .post("/user")
            .send();

        expect(savedUserResponse.statusCode).toBe(400);
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

    test("shouldn't find an user because of a inexistent valid id", async () => {
        const id = new mongoose.mongo.ObjectId();

        const foundUserResponse = await request(app)
            .get(`/user/${id}`);

        expect(foundUserResponse.statusCode).toBe(404);
        expect(foundUserResponse.body.message).toBe("user not found");
    });

    test("shouldn't find an user because of a invalid id", async () => {
        const id = undefined;

        const foundUserResponse = await request(app)
            .get(`/user/${id}`);

        expect(foundUserResponse.statusCode).toBe(400);
        expect(foundUserResponse.body.errors.includes("user id should have 24 characters")).toBeTruthy();
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


    test("shouldn't update an user because of a inexistent valid id", async () => {
        const id = new mongoose.mongo.ObjectId();

        const updatedUserResponse = await request(app)
            .patch(`/user/${id}`)
            .send({ ...userChanges });

        expect(updatedUserResponse.statusCode).toBe(404);
        expect(updatedUserResponse.body.message).toBe("user not found");
    });

    test("shouldn't update an user because of invalid id", async () => {
        const id = null;

        const updatedUserResponse = await request(app)
            .patch(`/user/${id}`)
            .send({ ...userChanges });

        expect(updatedUserResponse.statusCode).toBe(400);
        expect(updatedUserResponse.body.errors.includes("user id should have 24 characters")).toBeTruthy();
    });


    test("should save but not update an user because of empty user changes", async () => {
        const savedUserResponse = await request(app)
            .post("/user")
            .send(userData);

        const updatedUserResponse = await request(app)
            .patch(`/user/${savedUserResponse.body._id}`)
            .send({ ...emptyUserChanges });

        expect(updatedUserResponse.statusCode).toBe(400);
        expect(updatedUserResponse.body.errors.includes("user changes should not be empty")).toBeTruthy();
    });

    test("should save but not update an user because of invalid user changes", async () => {
        const savedUserResponse = await request(app)
            .post("/user")
            .send(userData);

        const updatedUserResponse = await request(app)
            .patch(`/user/${savedUserResponse.body._id}`)
            .send({ ...invalidUserChanges });

        expect(updatedUserResponse.statusCode).toBe(400);
        expect(updatedUserResponse.body.errors.includes("user changes should contains only user fields")).toBeTruthy();
    });

    test("should save then delete an user", async () => {
        const savedUserResponse = await request(app)
            .post("/user")
            .send(userData);

        const deletedUserResponse = await request(app)
            .delete(`/user/${savedUserResponse.body._id}`);

        const notFoundUserResponse = await request(app)
            .get(`/user/${deletedUserResponse.body._id}`);

        expect(deletedUserResponse.statusCode).toBe(200);
        expect(deletedUserResponse.body).toStrictEqual(savedUserResponse.body);
        expect(notFoundUserResponse.body.message).toBe("user not found");
    });

    test("should save but not delete an user because of inexistent valid id", async () => {
        const id = new mongoose.mongo.ObjectId();

        const deletedUserResponse = await request(app)
            .delete(`/user/${id}`);

        expect(deletedUserResponse.statusCode).toBe(404);
        expect(deletedUserResponse.body.message).toBe("user not found");
    });

    test("should save but not delete an user because of invalid id", async () => {
        const id = null;

        const deletedUserResponse = await request(app)
            .delete(`/user/${id}`);

        expect(deletedUserResponse.statusCode).toBe(400);
        expect(deletedUserResponse.body.errors.includes("user id should have 24 characters")).toBeTruthy();
    });
});