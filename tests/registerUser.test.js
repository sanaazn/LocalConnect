const request = require('supertest');
const app = require('../app');  // Assure-toi d'avoir un fichier app.js qui exporte ton app Express
const User = require('../models/User');
const bcrypt = require('bcrypt');

describe('registerUser', () => {

    it('should return an error if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: '',
                email: 'missingfields@example.com',
                password: 'password123',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('All fields are required');
    });
});