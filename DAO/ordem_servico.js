/******************************
 * Sobre: arquivo responsavel pela conexão e envio de dados ao banco de dados
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *****************************/

const knex = require('knex');
const knexConfig = require('../modulo/database_config/knex.js');

const { get } = require('../routes/celula.js');

const knexDatabase = knex(knexConfig.development);

const getDadosOrdemServico = async function () {

    try {
      
        let sql = `select * from tb_ordem_servico order by id_celula desc`
        let result = await knexDatabase.raw(sql)
   
        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch (error) {
        return false
    }
}

const getDadosOrderServicoId = async function (id) {

    try {

        let sql = `select * from tb_ordem_servico where id_ordem_servico = ${id}`
        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    } catch(error) {
        return false
    }
} 

const setInserirOrdemServico = async function (ordemServico) {

    try{

let sql = `insert into tb_ordem_servico (
        id_celula,
        prioridade,
        eg,
        bruto,
        quant_produzir,
        meta_ph,
        turno,
        maquina_gargalo
        )
        values(
        ${ordemServico.id_celula},
        '${ordemServico.prioridade}',
        '${ordemServico.eg}',
        '${ordemServico.bruto}',
        '${ordemServico.quant_produzir}',
        '${ordemServico.meta_ph}',
        '${ordemServico.turno}',
        '${ordemServico.maquina_gargalo}')`

        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result[0]))
            return result[0]
        else
            return false

    }catch(error){
        return false
    }
}

const setUpDateOrdemServico = async function (ordemServico){

    try{

        let sql = `update tb_ordem_servico set

        id_celula       = ${ordemServico.id_celula},
        prioridade      = '${ordemServico.prioridade}',
        eg              = '${ordemServico.eg}',
        bruto           = '${ordemServico.bruto}',
        quant_produzir  = '${ordemServico.quant_produzir}',
        meta_ph         = '${ordemServico.turno}',
        turno           = '${ordemServico.turno}',
        maquina_gargalo = '${ordemServico.maquina_gargalo}
        
        where id_ordem_servico = ${ordemServico.id_ordem_servico}' `

           let result = await knexDatabase.raw(sql)

        if(result){
            return true
        }else{
            return false
        }

    }catch(error){
        return false
    }
}

const setLastIdOrdemServico = async function (ordemServico) {
    
    try {
        let sql = `select id_ordem_servico from tb_ordem_servico order by id_ordem_servico desc limit 1`

        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result)){
            return Number(result[0].id_ordem_servico)
        }else{
            return false
        }
    } catch (error){
        return false
    }

}


const setDeleteOrdemServico = async function (id) {
    
    try{

        let sql = `delete from id_ordem_servico where id_ordem_servico = ${id}`

        let result = await knexDatabase.raw(sql)

        if(Array.isArray(result)){
            return Number(result[0].id_ordem_servico)
        }else{
            return false
        }

    }catch(error){
        return false
    }
}

module.exports ={
    getDadosOrdemServico,
    getDadosOrderServicoId,
    setInserirOrdemServico,
    setLastIdOrdemServico,
    setDeleteOrdemServico,
    setUpDateOrdemServico
}