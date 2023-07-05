require('dotenv').config();

const PORT = 3003
const MONGO_URI = 'mongodb://localhost/bloglist'

module.exports = {
    PORT,
    MONGO_URI
}