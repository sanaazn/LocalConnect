require('dotenv').config();
const request = require('supertest');
const app = require('../app');  // Assure-toi d'avoir un fichier `app.js` qui exporte ton app Express
const mongoose = require('mongoose');
const User = require('../models/User');
const Report = require('../models/Report');
const jwt = require('jsonwebtoken');


// Variables globales pour tests
let token;
let userId;

beforeAll(async () => {
    // Connexion à la base de données de test
    await mongoose.connect(process.env.MONGO_URI);


    // Créer un utilisateur de test et obtenir son token JWT
    const user = await User.create({
        username: 'testuser',
        password: 'testpassword', // Assure-toi de hasher le mot de passe en prod
        email: `testuser${Date.now()}@example.com`,  // Ajouter un email unique pour éviter la contrainte d'unicité
    });

    userId = user._id;

    // Créer un token pour l'utilisateur
    token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
});

afterAll(async () => {
    // Nettoyer la base de données après les tests
    //await Report.deleteMany({});
    //await User.deleteMany({});
    await mongoose.disconnect();
});

describe('Test Report API', () => {
    // Test de création d'un rapport
    it('should create a new report', async () => {
        const response = await request(app)
            .post('/api/reports')
            .set('x-auth-token', token)  // Passer le token JWT
            .send({
                title: 'New Report',
                description: 'This is a new alert report',
                category: 'alert',  // Assure-toi que la valeur est en minuscules comme défini dans l'énum
                location: { type: 'Point', coordinates: [12.0, 24.0] },
                timestamp: new Date(),
            });

        expect(response.status).toBe(201);  // Statut attendu : 201 (créé)
        expect(response.body.title).toBe('New Report');
        expect(response.body.createdBy).toBe(userId.toString());  // Vérifier que le rapport est lié à l'utilisateur
    });

    // Test de récupération de tous les rapports
    it('should get all reports', async () => {
        const response = await request(app)
            .get('/api/reports');

        expect(response.status).toBe(200);  // Statut attendu : 200 (OK)
        expect(response.body.length).toBeGreaterThan(0);  // Il doit y avoir au moins un rapport
    });

    afterAll(async () => {
        await mongoose.connection.close();
        process.exit(0); 
      });
      
      

});