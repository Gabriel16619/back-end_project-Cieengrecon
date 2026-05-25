/*******************
 * Sobre: Arquivo responsavel pela criação as rotas para endpoints utiliozando o crud das tebelas do banco de dados.
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *******************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerOrdemServico = require('../controller/ordem_servico.js')

const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})


router.get('/', cors(), async function (request, response) {

    let ordemServico = await controllerOrdemServico.listarOrdemServico()
    response.status(ordemServico.status_code)
    response.json(ordemServico)
    
})

module.exports = router

router.get('/:id', cors(), async function (request, response) {

    let idOrdemServico = request.params.id

    let ordemServicoId = await controllerOrdemServico.pegarOrdemServicoId(idOrdemServico)
    response.status(ordemServicoId.status_code)
    response.json(ordemServicoId)
    
})
router.get('/:celula', cors(), async function (request, response) {

    let ordemServicoId = await controllerOrdemServico.listarOrdemServico()
    response.status(ordemServicoId.status_code)
    response.json(ordemServicoId)
    
})

router.delete('/:id', cors(), async function (request, response) {

    let idOrdemServico = request.params.id

    let ordemServicoId = await controllerOrdemServico.deletarOrdemServico(idOrdemServico)
    response.status(ordemServicoId.status_code)
    response.json(ordemServicoId)
    
})

router.post('/', cors(), async function (request, response) {
 

  let contentType = request.headers['content-type']
  let publicarOrdem = request.body

  let ordemServico = await controllerOrdemServico.inserirOrdemServico(publicarOrdem, contentType)

  response.status(ordemServico.status_code)
  response.json(ordemServico)

})