const query = require('../infraestrutura/database/queries.js');

class Atendimento{
    
    adiciona(atendimento){
        const sql = "INSERT INTO atendimentos SET ?;";
        return query(sql, atendimento);
    }

    lista(){
        const sql = "SELECT * FROM atendimentos;";
        return query(sql);
    }

    buscaPorId(id){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id};`
        return query(sql);
    }

    altera(id, valores){
        const sql = "UPDATE atendimentos SET ? WHERE id=?;";
        return query(sql, [valores, id]);
    }

    remove(id){
        const sql = "DELETE FROM atendimentos WHERE id=?;"
        return query(sql, id);
    }

}

module.exports = new Atendimento()