/********************************
 * Sobre: Arquivo responsavel pela trataitiva de dados e envio correto entre as celulas da Procução (KAAP, MAN's e etc)
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ********************************/


const celulaDAO = require('../DAO/celula.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_messages.js')


const listarCelulas = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        let resultCelula = await celulaDAO.getDadosCelula()

            if(resultCelula.length > 0){
            MESSAGE.HEADER.status      = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.Celula = resultCelula

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

const pegarCelulaId = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try{
        if(!isNaN(id) && id != '' && id != null && id > 0){

            let resultCelula = await celulaDAO.getDadosCelulaId(Number(id))

            if(resultCelula.length > 0){
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.Celula = resultCelula

                return MESSAGE.HEADER
                
            }else{
                return MESSAGES.ERROR_NOT_FOUND
            }
        }
    }catch(error){
         return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
}


module.exports ={
   listarCelulas,
   pegarCelulaId
}