const express = require('express');
const consign = require("consign");
const bodyParser = require("body-parser");

module.exports = () => {
    const app = express();

    // Convertendo tipos aceitos na requisição para o servidor
    // Aceitando dados de formulário enviados como POST ou dados enviados como json
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    consign().include('controllers').into(app);

    return app;
}