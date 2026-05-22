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

const getAllIdCelulaByIdOrdemServico = async function (id_ordem_servico) {
    try {
        let sql = `SELECT * FROM tb_ordem_servico_celula WHERE id_ordem_servico = ?`
        let result = await knexDatabase.raw(sql, [id_ordem_servico])

        if (Array.isArray(result[0]))
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
  try {

    let sql = `INSERT INTO tb_ordem_servico (
      id_celula,
      prioridade,
      eg,
      bruto,
      quant_produzir,
      meta_ph,
      turno,
      maquina_gargalo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    let result = await knexDatabase.raw(sql, [
      ordemServico.id_celula,
      ordemServico.prioridade,
      ordemServico.eg,
      ordemServico.bruto,
      ordemServico.quant_produzir,
      ordemServico.meta_ph,
      ordemServico.turno,
      ordemServico.maquina_gargalo
    ])

    if (result[0].affectedRows > 0)
      return true
    else
      return false

  } catch (error) {
    console.error(error)
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

const setLastIdOrdemServico = async function () {
  try {
    let sql = `SELECT id_ordem_servico FROM tb_ordem_servico ORDER BY id_ordem_servico DESC LIMIT 1`

    let result = await knexDatabase.raw(sql)

    const rows = result[0] 

    if (Array.isArray(rows) && rows.length > 0) {
      return Number(rows[0].id_ordem_servico) 
    } else {
      return false
    }

  } catch (error) {
    console.error('ERRO DAO LAST ID:', error)
    return false
  }
}


const setDeleteOrdemServico = async function (id) {

    try {

     
        let sqlCelula = `DELETE FROM tb_ordem_servico_celula WHERE id_ordem_servico = ?`
        await knexDatabase.raw(sqlCelula, [id])

       
        let sqlOrdem = `DELETE FROM tb_ordem_servico WHERE id_ordem_servico = ?`
        let result = await knexDatabase.raw(sqlOrdem, [id])

        if (result[0].affectedRows > 0) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports ={
    getDadosOrdemServico,
    getDadosOrderServicoId,
    getAllIdCelulaByIdOrdemServico,
    setInserirOrdemServico,
    setLastIdOrdemServico,
    setDeleteOrdemServico,
    setUpDateOrdemServico
}