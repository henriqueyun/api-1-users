const userService = require("../service/user-service");

const MONGO_ID_LENGTH = 24;

async function save(req, res) {
    const user = req.body;
    try {
        const newUser = await userService.save(user);
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

async function find(req, res) {
    const { id } = req.params;

    if (id.length !== MONGO_ID_LENGTH) {
        return res.status(400).json({ message: "user id should have 24 characters" });
    }

    const foundUser = await userService.find(id);
    if (!foundUser) {
        return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(foundUser);
}

async function update(req, res) {
    const { id } = req.params;
    const changes = req.body;
    return res.status(200).json(await userService.update(id, { ...changes }));
}

async function remove(req, res) {
    const { id } = req.params;
    return res.status(200).json(await userService.remove(id));
}
module.exports = { save, find, update, remove };