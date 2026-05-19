/***********************
 * Sobre: arquivo responsavel pela tratativa de daods vindo do banco de dados
 * Data: 18/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const ordemServicoDAO = require('../DAO/ordem_servico.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_messages.js')


const listarOrdemServico = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        let resultOrdemServico = await ordemServicoDAO.getDadosOrdemServico()

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


const pegarOrdemServicoId = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try{
        if(!isNaN(id) && id != '' && id != null && id > 0){

            let resultOrdemServico = await ordemServicoDAO.getDadosOrderServicoId(Number(id))

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

//TESTAR
const deletarOrdemServico = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try{

        if(id != '' && id != null && id != undefined && !isNaN(id)){

            let excluirOrdemServico = await pegarOrdemServicoId(id)

            if(excluirOrdemServico.status_code == 200){

                let idOrdemServico = parseInt(id)

                let result = await ordemServicoDAO.setDeleteOrdemServico(idOrdemServico)

                if(result){
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                    MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message
                
                    return MESSAGE.HEADER
                
                }else{
                    return excluirOrdemServico
                }
            }else{
                MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [ID] inválido!!"
                MESSAGE.ERROR_REQUIRED_FIELDS //400
            }
        }
    }catch(error){
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }
    
}

module.exports = {
    listarOrdemServico,
    pegarOrdemServicoId
}