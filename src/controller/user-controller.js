const userService = require("../service/user-service");
const userValidator = require("./user-validator");

async function save(req, res) {
    const user = req.body;

    const errors = userValidator.isUserValid(user);
    if (errors.length) {
        return res.status(400).json({ errors });
    }

    try {
        const newUser = await userService.save(user);
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function find(req, res) {
    const { id } = req.params;

    const errors = userValidator.isIdValid(id);
    if (errors.length) {
        return res.status(400).json({ errors });
    }

    try {
        const foundUser = await userService.find(id);
        if (!foundUser) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json(foundUser);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    const { id } = req.params;
    const changes = req.body;

    const errors = [...userValidator.isIdValid(id), ...userValidator.areChangesValid(changes)];
    if (errors.length) {
        return res.status(400).json({ errors });
    }

    try {
        const updatedUser = await userService.update(id, { ...changes });
        if (!updatedUser) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

async function remove(req, res) {
    const { id } = req.params;

    const errors = [...userValidator.isIdValid(id)];
    if (errors.length) {
        return res.status(400).json({ errors });
    }

    try {
        const removedUser = await userService.remove(id);
        if (!removedUser) {
            return res.status(404).json({ message: "user not found" });
        }
        return res.status(200).json(removedUser);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { save, find, update, remove };