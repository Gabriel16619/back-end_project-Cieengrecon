/*******************
 * Sobre: Arquivo responsavel pela criação as rotas para endpoints utiliozando o crud das tebelas do banco de dados.
 * Data: 19/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *******************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerFerramentaria = require('../controller/ferramentaria.js')

const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET')

    router.use(cors())
    next()
})


router.get('/', cors(), async function (request, response) {

    let ordemServicoFerramentaria = await controllerFerramentaria.listarOrdemServicoFerramentaria()
    response.status(ordemServicoFerramentaria.status_code)
    response.json(ordemServicoFerramentaria)
    
})

module.exports = router

router.get('/:id', cors(), async function (request, response) {

    let idOrdemServicoFerramentaria = request.params.id

    let ordemServicoId = await controllerFerramentaria.pegarOrdemServicoIdFerramentaria(idOrdemServicoFerramentaria)
    response.status(ordemServicoId.status_code)
    response.json(ordemServicoId)
    
})