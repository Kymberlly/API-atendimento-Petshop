module.exports = app => {
    app.get('/atendimentos', (request, response) => {
        response.send('Os atendimentos estão rodando normalmente');
    });
};