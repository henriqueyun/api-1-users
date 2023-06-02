const userService = require("../service/user-service");

async function save(req, res) {
    const user = req.body;
    return res.status(201).json(await userService.save(user));
}

async function find(req, res) {
    const { id } = req.params;
    return res.status(200).json(await userService.find(id));
}

async function update(req, res) {
    const { id } = req.params;
    const changes = req.body;
    return res.status(200).json(await userService.update(id, {...changes}));
}

async function remove(req, res) {
    const { id } = req.params;
    return res.status(200).json(await userService.remove(id));
}
module.exports = { save, find, update, remove };