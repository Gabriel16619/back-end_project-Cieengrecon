/***********************
 * Sobre: arquivo responsavel pela tratativa de dados da tb_relacional entre ordem_servico e celula
 * Data: 19/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const ordemServicoDAO = require('../DAO/ordem_servico_celula.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_messages.js')


const listarOrdemServisoCelula = async function () {

       let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))
    
        try {
    
            let resultOrdemServicoCelula = await ordemServicoDAO.getAllIdCelulaByIdOrdemServico()
    
                if(resultOrdemServicoCelula.length > 0){
                MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.ordemServicoCelula = resultOrdemServicoCelula
    
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

const pegarOrdemServicoCelulaId = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try{
        if(!isNaN(id) && id != '' && id != null && id > 0){

            let resultOrdemServicoCelula = await ordemServicoDAO.getAllCelulaByOrdemServicoId(Number(id))

            if(resultOrdemServico.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.ordemServicoCelula = resultOrdemServicoCelula

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
    listarOrdemServisoCelula,
    pegarOrdemServicoCelulaId
}