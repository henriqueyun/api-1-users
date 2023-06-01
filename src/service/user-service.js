let id = 0

function save({name, email, phone}) {
    return {
        name,
        email,
        phone,
        id: id++
    }
}

module.exports = { save }