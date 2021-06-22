const customExpress = require('./config/customExpress.js');
const conexao = require('./infraestrutura/database/conexao.js');
const Tabelas = require('./infraestrutura/database/tabelas.js');

conexao.connect(erro => {
    if(erro)
        console.log(erro);
    else{
        Tabelas.init(conexao);

        app = customExpress();
        app.listen(3000);
    }
});
