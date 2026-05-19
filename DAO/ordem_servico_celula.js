/***********************
 * Sobre: arquivo responsavel pela tratativa de dados da tb_relacional entre ordem_servico e celula
 * Data: 19/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const knex = require('knex');
const knexConfig = require('../modulo/database_config/knex.js');
const knexDatabase = knex(knexConfig.development);

const getAllIdCelulaByIdOrdemServico = await function(){

      try {

        let sql = `select * from tb_ordem_servico_celulka order by id_ordem_servico_celula desc`
        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const getAllCelulaByOrdemServicoId = await function(id){

    try{

        let sql = `select*from tb_ordem_servico_celula where id_ordem_servico_celula = ${id}`
        let result = await knexDatabase.raw(sql)

        if(array.isArray(result)){
            return result
        }else{
            return false
        }

    }catch(error){
        return false
    }
}

const getSelectOrdemServicoCelulaByCelulaId = async function (id) {
    try {

        let sql = `select * from tbl_ordem_servico_celula where id_celula=${id} order by id_ordem_servico_celula desc`
        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result)) {
            return result
        }
    } catch (error) {
       
        return false
    }
}

const insertOrdemServicoAndCelula = async function (ordemServicoCelula) {
    try {
        let sql = `
        INSERT INTO tb_ordem_servico_celula
                    (id_ordem_servico,
                     id_celula,
                     descricao)
                VALUES (${ordemServicoCelula.id_ordem_servico},
                        ${ordemServicoCelula.id_celula},
                        "${ordemServicoCelula.descricao}")`

        let result = await knexDatabase.raw(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        return false
    }
}

const getSelectLastIdOrdemServicoCelula = async function () {

    try {
        let sql = `select id_ordem_servico_celula from tb_ordem_servico_celula
                   order by id_ordem_servico_celula desc limit 1`

        let result = await knexDatabase.raw(sql)

        if (Array.isArray(result)) {
            return Number(result[0].id_ordem_servico_celula)
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}   

const setUpdateOrdemServicoCeluloa = async function (ordemServicoCelula) {

    try {
        let sql = `UPDATE tb_ordem_servico_celula
                    SET
                        id_ordem_servico    = ${ordemServicoCelula.id_ordem_servico},
                        id_celula           = ${ordemServicoCelula.id_celula},
                        descricao            = '${ordemServicoCelula.descricao}'
                    WHERE
                        id_ordem_servico_celula = ${ordemServicoCelula.id_ordem_servico_celula};`

        let result = await knexDatabase.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

const setDeleteOrdemServicoCelulla = async function (id) {

    try {
        let sql = `DELETE FROM tb_ordem_servico_celula where id_ordem_servico_celula = ${id}`

        let result = await knexConfig.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {

        return false
    }

}


module.exports = {
    getAllIdCelulaByIdOrdemServico,
    getAllCelulaByOrdemServicoId,
    getSelectOrdemServicoCelulaByCelulaId,
    insertOrdemServicoAndCelula,
    getSelectLastIdOrdemServicoCelula,
    setDeleteOrdemServicoCelulla 
}