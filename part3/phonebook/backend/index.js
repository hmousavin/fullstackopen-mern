const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin:'*', 
    credentials:true, // access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const requestLogger = (request, response, next) => {
    console.log(`\nMethod: ${request.method} Path: ${request.path} Body: ${JSON.stringify(request.body)}`);
    next();
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

const errorHandler = (error, request, response, next) => {
    console.warn(error.message);
    next(error);
}
app.use(errorHandler)

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

require('dotenv').config();

const options = {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, options)
        .then(
            ()    => { console.info('connected to mongo db cloud.') },
            (err) => { console.log(err); }
        );

const PersonModel = require('./person-schema');
app.get('/api/persons', (request, response) => {
    PersonModel.find({})
               .then(result => response.json(result ? result : []))
               .catch(err => {
                    console.warn(err);
                    response.status(500).end();
                });
});

app.get('/api/persons/:id', (request, response) => {
    PersonModel.findById(request.params.id) 
               .then(result => {
                    if (result)
                        response.end(JSON.stringify(result));
                    else
                        response.status(404).end();
                })
               .catch(err => {
                    console.warn(err);
                    response.status(500).end();
               });
});

app.delete('/api/persons/:id', (request, response) => {
    PersonModel.findByIdAndRemove(request.params.id) 
               .then(result => {
                    response.status(result ? 204 : 404 ).end();
                })
                .catch(err => {
                    console.warn(err);
                    response.status(500).end();
               });
});

app.post('/api/persons/', (request, response) => {
    const {name, number} = request.body;

    if (name == undefined || number == undefined)
        response.status(400).json({ 
            error: 'invalid name or number'
        });

    
    new PersonModel({
        name: name,
        number: number
    })
    .save()
    .then(result => {
        return response.status(200).end();
    });
});

app.put('/api/persons/:id', (request, response) => {
    const {id, number} = request.body;

    PersonModel.findByIdAndUpdate(id, {number: number})
               .then(result => {
                    response.status(result ? 200 : 404).end();
               })
               .catch(err => {
                    console.warn(err);
                    response.status(500).end();
               });
});

let numberOfRequestsReceived = 0;
app.get('/info', (request, response) => {
    response.end(`The phonebook has info for ${++numberOfRequestsReceived} people \n${new Date}`);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});