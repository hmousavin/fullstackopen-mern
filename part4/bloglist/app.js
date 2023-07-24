const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const { info, error } = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const connectToDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        info('connected to MongoDB')
    } catch (err){
        error('error connecting to MongoDB:', err.message)
    }
}
connectToDb()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler);

module.exports = app