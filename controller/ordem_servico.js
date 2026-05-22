/***********************
 * Sobre: arquivo responsavel pela tratativa de daods vindo do banco de dados
 * Data: 18/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const ordemServicoDAO = require('../DAO/ordem_servico.js')
const ordemServicoCelulaDAO = require('../DAO/ordem_servico_celula.js')
const DEFAULT_MESSAGE = require('../modulo/default_messages/config_messages.js')


const listarOrdemServico = async function () {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        let resultOrdemServico = await ordemServicoDAO.getDadosOrdemServico()

        if (resultOrdemServico.length > 0) {

            // Para cada ordem, busca as células relacionadas
            let ordemServicoComCelulas = await Promise.all(
                resultOrdemServico.map(async (ordemServico) => {
                    let celulas = await ordemServicoDAO.getAllIdCelulaByIdOrdemServico(ordemServico.id_ordem_servico)

                    return {
                        ...ordemServico,
                        celulas: celulas || [] // se não tiver células, retorna array vazio
                    }
                })
            )

            MESSAGE.HEADER.status                    = MESSAGE.SUCCESS_REQUEST.status
            MESSAGE.HEADER.status_code               = MESSAGE.SUCCESS_REQUEST.status_code
            MESSAGE.HEADER.response.ordemServico     = ordemServicoComCelulas

            return MESSAGE.HEADER // 200

        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }

    } catch (error) {
        return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
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

const inserirOrdemServico = async function (ordemServico, contentType) {

  let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

  try {

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

      let dadosValidos = await validarDadosOrdemServico(ordemServico)
        console.log('1. dadosValidos:', dadosValidos)

      if (dadosValidos) {

     
        let result = await ordemServicoDAO.setInserirOrdemServico(ordemServico)
         console.log('2. result insert OS:', result)
       

        if (result) {

         
          let lastIdOrdemServico = await ordemServicoDAO.setLastIdOrdemServico(ordemServico)
           console.log('3. lastIdOrdemServico:', lastIdOrdemServico)

          if (lastIdOrdemServico) {

            let resultCelula = await ordemServicoCelulaDAO.insertOrdemServicoAndCelula({
              id_ordem_servico: lastIdOrdemServico,
              id_celula:        ordemServico.id_celula,
              descricao:        ordemServico.descricao || null
            })
            console.log('4. resultCelula:', resultCelula)

          if (resultCelula) {
                ordemServico.id_ordem_servico = lastIdOrdemServico
                MESSAGE.HEADER.status      = MESSAGE.SUCCESS_CREATED_ITEM.status      
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code 
                MESSAGE.HEADER.message     = MESSAGE.SUCCESS_CREATED_ITEM.message   
                MESSAGE.HEADER.response    = ordemServico

                
                return MESSAGE.HEADER
}

          } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
          }

        } else {
          return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }

      } else {
        return dadosValidos // erro de validação
      }

    } else {
      return MESSAGE.ERROR_CONTENT_TYPE // 415
    }

  } catch (error) {
    console.error('ERRO CONTROLLER:', error)
    return DEFAULT_MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
  }

}

    
//TESTAR
const deletarOrdemServico = async function (id) {

    let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

    try {

        if (id != '' && id != null && id != undefined && !isNaN(id)) {

            let excluirOrdemServico = await pegarOrdemServicoId(id)

            if (excluirOrdemServico.status_code == 200) {

                let idOrdemServico = parseInt(id)

                let result = await ordemServicoDAO.setDeleteOrdemServico(idOrdemServico)

                if (result) {
                    MESSAGE.HEADER.status      = MESSAGE.SUCCESS_DELETE_ITEM.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                    MESSAGE.HEADER.message     = MESSAGE.SUCCESS_DELETE_ITEM.message

                    return MESSAGE.HEADER

                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = "Atributo [ID] inválido!!"
            return MESSAGE.ERROR_REQUIRED_FIELDS 
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
    }
}

const validarDadosOrdemServico = async function (ordemServico) {

  let MESSAGE = JSON.parse(JSON.stringify(DEFAULT_MESSAGE))

  if (ordemServico.id_celula == null || ordemServico.id_celula == undefined || isNaN(ordemServico.id_celula) || ordemServico.id_celula < 0) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [id_celula] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400

  } else if (ordemServico.prioridade == '' || ordemServico.prioridade == null || ordemServico.prioridade == undefined || ordemServico.prioridade.length > 255) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [prioridade] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400

  } else if (ordemServico.eg == null || ordemServico.eg == '' || ordemServico.eg == undefined || ordemServico.eg.length > 15) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [eg] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400

  } else if (ordemServico.bruto == null || ordemServico.bruto == '' || ordemServico.bruto == undefined || ordemServico.bruto.length > 10) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [bruto] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400

  } else if (ordemServico.quant_produzir == null || ordemServico.quant_produzir == '' || ordemServico.quant_produzir == undefined || isNaN(ordemServico.quant_produzir)) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [quant_produzir] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400

  } else if (ordemServico.meta_ph == null || ordemServico.meta_ph == '' || ordemServico.meta_ph == undefined || isNaN(ordemServico.meta_ph)) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [meta_ph] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400

  } else if (ordemServico.turno == null || ordemServico.turno == '' || ordemServico.turno == undefined || ordemServico.turno.length > 10) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [turno] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400

  } else if (ordemServico.maquina_gargalo == null || ordemServico.maquina_gargalo == '' || ordemServico.maquina_gargalo == undefined || ordemServico.maquina_gargalo.length > 30) {
    MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [maquina_gargalo] invalido!!!'
    return MESSAGE.ERROR_REQUIRED_FIELDS // 400

  } else {
    return true 
  }

}

module.exports = {
    listarOrdemServico,
    pegarOrdemServicoId,
    inserirOrdemServico,
    deletarOrdemServico
}