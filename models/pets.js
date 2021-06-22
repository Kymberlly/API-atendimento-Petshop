const uploadDeArquivo = require('../infraestrutura/arquivos/uploadArquivos.js');
const repositorio = require('../repositorios/pets.js');

class Pet{

    adiciona(pet){
        
        // TODO: Verificar erro em retorno de Promisse
        uploadDeArquivo(pet.imagem, pet.nome, (erro, caminhoImagemSalva) => {
            if(erro)
                return new Promise((_, reject) => reject(erro));

            const novoPet = {nome: pet.nome, imagem: caminhoImagemSalva};
            return repositorio.adiciona(novoPet)
                    .then(resultado => {
                        const id = resultado.insertId;
                        return resultado;
                    })
        })
        
    }

}

module.exports = new Pet()