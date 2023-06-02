const { UserModel } = require("../db");

async function save(user) {
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser._doc;
    
}

async function find(id) {
    const foundUser = await UserModel.findById(id);
    if (!foundUser)
        return;
    return foundUser._doc;
}

async function update(id, {...userFields}) {
    return await UserModel.findOneAndUpdate({ _id: id }, {...userFields}, { new: true });
    
}

async function remove(id) {
    const removedUser = await UserModel.findById(id);
    await UserModel.deleteOne({ id });
    return removedUser._doc;
}

module.exports = { save, find, update, remove };