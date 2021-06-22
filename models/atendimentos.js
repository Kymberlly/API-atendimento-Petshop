const repositorio = require('../repositorios/atendimento.js');
const moment = require('moment');
const axios = require('axios');

class Atendimento{

    constructor(){
        this.dataEhValida = ({data, data_criacao}) => { moment(data).isSameOrAfter(data_criacao) };
        this.clienteEhValido = ({tamanho}) => tamanho >= 3;

        this.valida = (parametros) => {this.validacoes.filter(campo => {
            const { nome } = campo;
            const parametro = parametros[nome];

            return !campo.valido(parametro);
        })};

        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'A data de agendamento deve ser maior ou igual à data atual.'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'O nome do cliente deve ter pelo menos 3 caracteres.'
            }
        ];
    }
    
    adiciona(atendimento){
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        const data_criacao = moment().format('YYYY-MM-DD HH:mm:ss');

        const parametros = {
            data: {data, data_criacao},
            cliente: {tamanho: atendimento.cliente.length}
        }
        
        const erros = this.valida(parametros)
        if(erros.length)
            return new Promise((_, reject) => reject(erros));

        const atendimentoDatado = {...atendimento, data_criacao, data};
        
        return repositorio.adiciona(atendimentoDatado)
                .then(resultados => {
                    const id = resultados.insertId;
                    return {...atendimento, id};
                });
    }

    lista(){
        return repositorio.lista();
    }

    buscaPorId(id){
        return repositorio.buscaPorId(id)
                .then(async resultados => {
                    const atendimento = resultados[0];
                    const cpf = atendimento.cliente;
                    const { data } = await axios.get(`http://localhost:8082/${cpf}`);

                    atendimento.cliente = data;
                    return atendimento;
                });
    }

    altera(id, valores){
        if(valores.data)
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

        return repositorio.altera(id, valores)
        .then(resultado => {
            return {...valores, id};
        });
    }

    remove(id){
        return repositorio.remove(id);
    }
}

module.exports = new Atendimento;