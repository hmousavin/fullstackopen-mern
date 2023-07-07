const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const { info } = require('./utils/logger')
const { MONGODB_URI, PORT } = require('./utils/config')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
info('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
        .then(() => {
            info('connected to MongoDB')
        })
        .catch((error) => {
            error('error connecting to MongoDB:', error.message)
        })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter);

app.use(unknownEndpoint)
app.use(errorHandler);

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
})