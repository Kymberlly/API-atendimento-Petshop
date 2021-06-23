const Pet = require('../models/pets.js');

module.exports = app => {

    app.post('/pet', (request, response) => {
        const pet = request.body;

        Pet.adiciona(pet)
        .then(resultado => {response.status(201).json(resultado)})
        .catch(erro => response.status(400).json(erro));        
    });

}