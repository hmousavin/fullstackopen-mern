const mongoose = require('mongoose')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('../test_helpers/users')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('user managements', () => {
    test('create new user with username, password and a name', async () => {
        const newUser = {
            'name':  'dummyName',
            'username': 'dummyUserName',
            'password': 'dummyPass'
        }

        const response = await api.post('/api/users').send(newUser)

        expect(response.status).toBe(201)
        expect(JSON.parse(response.text).id).toBeDefined()
    }, 500)

    test('both username & password must be given for registration .. by missing username', async() => {
        const badProperties = {'name': 'michael jackson', 'password': '123'}
        
        const response = await api.post('/api/users').send(badProperties)

        expect(response.status).toBe(400)
        expect(response.error.text).toBe('username entry is a must')
    }, 500)

    test('both username & password must be given for registration .. by missing password', async() => {
        const badProperties = {'name': 'michael jackson', 'username': 'michael'}
        
        const response = await api.post('/api/users').send(badProperties)
        
        expect(response.status).toBe(400)
        expect(response.error.text).toBe('no blank password is allowed')
    }, 500)

    test('both username & password must be atleast 3 characters .. by too short username', async() => {
        const badProperties = {'name': 'george michael', 'username': 'gm', 'password': 'gm123'}
        
        const response = await api.post('/api/users').send(badProperties)

        expect(response.status).toBe(400)
        expect(response.error.text).toBe('atleast 3 characters needed for each username')
    }, 500)

    test('both username & password must be atleast 3 characters .. by too short password', async() => {
        const badProperties = {'name': 'george michael', 'username': 'g.michael', 'password': '99'}
        
        const response = await api.post('/api/users').send(badProperties)

        expect(response.status).toBe(400)
        expect(response.error.text).toBe('password must be at least 3 characters long')
    }, 500)

    test('no new user registration permitted by duplicated username', async() => {
        const duplicatedUsername = {'name': 'george michael', 'username': 'michael7948', 'password': '123'}
        
        const response = await api.post('/api/users').send(duplicatedUsername)

        expect(response.status).toBe(400)
        expect(response.error.text).toBe('this username is already reserved')
    }, 500)
})

afterAll(async () => {
    await mongoose.connection.close()
})