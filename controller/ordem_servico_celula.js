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

const inserirCeluloaOrdemSErvico = async function (ordemServicoCelula, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosOrdemServicoCelula(ordemServicoCelula)

            if (!validarDados) {

                //Chama a função do DAO para inserir um novo filme
                let result = await ordemServicoDAO.insertOrdemServicoAndCelula(ordemServicoCelula)

                if (result) {

                    //Chama a função para receber o ID gerado no BD
                    let lastIdOrdemServicoCelula = await ordemServicoDAO.getSelectLastIdOrdemServicoCelula(ordemServicoCelula)
                    

                    if (lastIdOrdemServicoCelula) {

                        ordemServicoCelula.id_ordem_servico_celula = lastIdOrdemServicoCelula
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = ordemServicoCelula

                        return MESSAGE.HEADER //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarDados //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const atualizarOrdemServicoCelula = async function (ordemServicoCelula, id, contentType) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
      
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosOrdemServicoCelula(ordemServicoCelula)

            if (!validarDados) {

                //Chama a função para validar a consistencia do ID e verificar se existe no BD
                let validarID = await pegarOrdemServicoCelulaId(id)

           
                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados da
                    ordemServicoCelula.id_ordem_servico_celula = parseInt(id)

                    let result = await ordemServicoDAO.setUpdateOrdemServicoCelula(ordemServicoCelula)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = ordemServicoCelula

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //Retorno da função de buscarFilmeGeneroId (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados do Filme Gênero 400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const excluirCozinhaPorReceita = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            let validarID = await pegarOrdemServicoCelulaId(id)

            if (validarID.status_code == 200) {

                let result = await  ordemServicoDAO.setDeleteOrdemServicoCelulla(parseInt(id))

                console.log(result)
                if (result) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                    MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                    delete MESSAGE.HEADER.response
                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarID //Retorno da função de buscarGeneroId (400 ou 404 ou 500)
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] invalido!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const validarDadosOrdemServicoCelula = async function (ordemServicoCelula) {
    
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (ordemServicoCelula.id_celula === '' || ordemServicoCelula.id_celula === null || ordemServicoCelula.id_celula === undefined || isNaN(ordemServicoCelula.id_celula) || ordemServicoCelula.id_celula < 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Id_celula] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
        
    } else if (ordemServicoCelula.id_ordem_servico === '' || ordemServicoCelula.id_ordem_servico === null || ordemServicoCelula.id_ordem_servico === undefined || isNaN(ordemServicoCelula.id_ordem_servico) || ordemServicoCelula.id_ordem_servico < 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Id_ordem_servico] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ordemServicoCelula.descricao.length > 255) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [Descricao muito grande] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400    
    }
} 


module.exports = {
    listarOrdemServisoCelula,
    pegarOrdemServicoCelulaId,
    inserirCeluloaOrdemSErvico,
    atualizarOrdemServicoCelula,
    excluirCozinhaPorReceita
}