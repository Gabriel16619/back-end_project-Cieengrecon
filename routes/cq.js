/*******************
 * Sobre: Arquivo responsavel pela criação as rotas para endpoints utiliozando o crud das tebelas do banco de dados.
 * Data: 19/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *******************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerCq = require('../controller/cq.js')

const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET')

    router.use(cors())
    next()
})


router.get('/', cors(), async function (request, response) {

    let ordemServicoCq = await controllerCq.listarOrdemServicoCq()
    response.status(ordemServicoCq.status_code)
    response.json(ordemServicoCq)
    
})

module.exports = router

router.get('/:id', cors(), async function (request, response) {

    let idOrdemServicoCq = request.params.id

    let ordemServicoId = await controllerCq.pegarOrdemServicoIdCq(idOrdemServicoCq)
    response.status(ordemServicoId.status_code)
    response.json(ordemServicoId)
    
})