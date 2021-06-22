const Pet = require('../models/pets.js');

module.exports = app => {
    app.post('/pet', (request, response) => {
        const pet = request.body;

        Pet.adiciona(pet, response);
    });
}