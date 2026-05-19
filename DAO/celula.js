/******************************
 * Sobre: arquivo responsavel pela conexão e envio de dados ao banco de dados
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *****************************/

const knex = require('knex');
const knexConfig = require('../modulo/database_config/knex.js');


const knexDatabase = knex(knexConfig.development);

const getDadosCelula = async function () {

    try {
      
        let sql = `select * from tb_celula order by id_celula desc`
        let result = await knexDatabase.raw(sql)
   
        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const getDadosCelulaId = async function (id) {

    try {

        let sql = `select * from tb_celula where id_celula = ${id}`
        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch(error) {
        return false
    }
} 

module.exports = {
    getDadosCelula,
    getDadosCelulaId
}