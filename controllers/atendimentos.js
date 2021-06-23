const Atendimento = require("../models/atendimentos.js");

module.exports = app => {
    app.get('/atendimentos', (_, response) => {
        Atendimento.lista()
        .then(resultados => response.json(resultados))
        .catch(erro => response.status(400).json(erro));
    });

    app.get('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id);

        Atendimento.buscaPorId(id)
        .then(resultado => response.json(resultado))
        .catch(erro => response.status(400).json(erro));
    })

    app.post('/atendimentos', (request, response) => {
        const atendimento = request.body;

        Atendimento.adiciona(atendimento)
        .then(atendimentoCadastrado => response.status(201).json(atendimentoCadastrado))
        .catch(erro => response.status(400).json(erro));
    });

    app.patch('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id);
        const valores = request.body;

        Atendimento.altera(id, valores)
        .then(resultado => response.json(resultado))
        .catch(erro => response.json(erro));
    });

    app.delete('/atendimentos/:id', (request, response) => {
        const id = parseInt(request.params.id);
        
        Atendimento.remove(id, response)
        .then(resultado => response.json({id}))
        .catch(erro => response.status(400).json(erro));
    });
};