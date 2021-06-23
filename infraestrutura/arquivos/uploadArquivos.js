const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const extensoesValidas = ['jpg', 'jpeg', 'png'];
    const extensaoArquivo = path.extname(caminho);
    const tipoEValido = extensoesValidas.indexOf(extensaoArquivo.substring(1)) === -1;

    if(tipoEValido){
        const erro = "Tipo é inválido";
        return callbackImagemCriada(erro);
    }
    
    const caminhoImagemSalva = `./assets/imagens/${nomeDoArquivo}${extensaoArquivo}`;

    const arquivo = fs.createReadStream(caminho).pipe(fs.createWriteStream(caminhoImagemSalva))
    return new Promise((resolve, _) => {
        arquivo.on('finish', () => {
            return resolve(callbackImagemCriada(false, caminhoImagemSalva));
        });
    })
}
