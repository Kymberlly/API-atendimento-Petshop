const conexao = require('../infraestrutura/conexao.js');
const uploadDeArquivo = require('../arquivos/uploadArquivos.js');

class Pet{

    adiciona(pet, response){
        const sql = 'INSERT INTO Pets SET ?';

        uploadDeArquivo(pet.imagem, pet.nome, (erro, caminhoImagemSalva) => {
            if(erro)
                return response.status(400).json({erro});

            const novoPet = {nome: pet.nome, imagem: caminhoImagemSalva};

            conexao.query(sql, novoPet, erro => {
                if(erro)
                    return response.status(400).json(erro);
                
                response.status(200).json(novoPet);
            });    
        });
        
    }

}

module.exports = new Pet()