const { UserModel } = require("../db");

async function save(user) {
    const userDoc = new UserModel(user);
    return await userDoc.save();
    
}

async function update(id, {...userFields}) {
    return await UserModel.findOneAndUpdate({ _id: id }, {...userFields}, { new: true });
    
}

module.exports = { save, update };