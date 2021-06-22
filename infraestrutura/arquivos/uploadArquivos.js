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

    fs.createReadStream(caminho)
    .pipe(fs.createWriteStream(caminhoImagemSalva))
    .on('finish', () => callbackImagemCriada(false, caminhoImagemSalva));
}
