const query = require('../infraestrutura/database/queries.js');

class Pet{
    
    adiciona(pet){
        const sql = 'INSERT INTO Pets SET ?;';
        return query(sql, pet);
    }

}

module.exports = new Pet()