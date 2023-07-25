const User = require('../models/user')

const initialUsers = [
    {
        "username": "alex563475",
        "name": "alex",
    },
    {
        "username": "michael7948",
        "name": "michael",
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers, usersInDb
}