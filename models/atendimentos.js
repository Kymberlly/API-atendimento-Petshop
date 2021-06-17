const conexao = require('../infraestrutura/conexao.js');
const moment = require('moment');

class Atendimento{
    
    adiciona(atendimento, response){
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss');
        
        const dataEhValida = moment(data).isSameOrAfter(data_criacao);
        const clienteEhValido = atendimento.cliente.length >= 3;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'A data de agendamento deve ser maior ou igual à data atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'O nome do cliente deve ter pelo menos 3 caracteres.'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);

        if(erros.length)
            return response.status(400).json(erros)

        const atendimentoDatado = {...atendimento, data_criacao, data};
        const sql = "INSERT INTO atendimentos SET ?;";
        
        conexao.query(sql, atendimentoDatado, erro =>{
            if(erro)
                return response.status(400).json(erro);
            
            response.status(201).json(atendimento);
        });
    }

    lista(response){
        const sql = "SELECT * FROM atendimentos;";

        conexao.query(sql, (erro, resultados) => {
            if(erro)
                return response.status(400).json(erro);
            
            response.status(200).json(resultados);
        });
    }

    buscaPorId(id, response){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id};`

        conexao.query(sql, (erro, resultados) => {
            if(erro)
                return response.status(400).json(erro);
            
            const atendimento = resultados[0];
            response.status(200).json(atendimento);
        });

    }

    altera(id, valores, response){
        if(valores.data)
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        const sql = "UPDATE atendimentos SET ? WHERE id=?;";

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro)
                return response.status(400).json(erro);
            
            response.status(200).json({...valores, id});
        });
    }

    remove(id, response){
        const sql = "DELETE FROM atendimentos WHERE id=?;"

        conexao.query(sql, id, (erro, resultados) => {
            if (erro)
                return response.status(400).json(erro);
            
            response.status(200).json({id});
        });
    }
}

module.exports = new Atendimento;