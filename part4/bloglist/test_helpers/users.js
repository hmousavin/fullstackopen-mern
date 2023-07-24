const User = require('../models/user')

const initialUsers = [
    {
        "username": "alex563475",
        "name": "alex",
        "id": "5dca784c471be1493ca066a1f966e707"
    },
    {
        "username": "michael7948",
        "name": "michael",
        "id": "bff9b0f89965a3e3afc87c8886713425"
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers, usersInDb
}