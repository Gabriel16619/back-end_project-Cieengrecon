/***********************
 * Sobre: arquivo responsavel pela tratativa de daods vindo do banco de dados
 * Data: 18/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/
const ferramentariaDAO = require('../DAO/ferramentaria.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_messages.js')


const listarOrdemServicoFerramentaria = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        let resultOrdemServico = await ferramentariaDAO.getDadosOrdemServico()

            if(resultOrdemServico.length > 0){
            MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.ordemServico = resultOrdemServico

            return MESSAGE.HEADER //404
    }
        else{
            return MESSAGE.ERROR_NOT_FOUND //404
        } 
    }
    catch(error){
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}


const pegarOrdemServicoIdFerramentaria = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try{
        if(!isNaN(id) && id != '' && id != null && id > 0){

            let resultOrdemServico = await ferramentariaDAO.getDadosOrderServicoId(Number(id))

            if(resultOrdemServico.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.ordemServico = resultOrdemServico

                return MESSAGE.HEADER
                
            }else{
                return MESSAGES.ERROR_NOT_FOUND
            }
        }
    }catch(error){
         return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}

module.exports = {
    listarOrdemServicoFerramentaria,
    pegarOrdemServicoIdFerramentaria
}