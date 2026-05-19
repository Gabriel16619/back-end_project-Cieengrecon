/*******************
 * Sobre: Arquivo responsavel pela criação as rotas para endpoints utiliozando o crud das tebelas do banco de dados.
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 *******************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerCelula = require('../controller/celula')

const router = express.Router()
router.use((request, response, next ) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    router.use(cors())
    next()
})

//Listar todas as celulas
router.get('/', cors(), async function (request, response) {

    let celula = await controllerCelula.listarCelulas()
    response.status(celula.status_code)
    response.json(celula)
    
})

module.exports = router

router.get('/:id', cors(), async function (request, response) {

    let idCelula = request.params.id

    let celulaId = await controllerCelula.pegarCelulaId(idCelula)
    response.status(celulaId.status_code)
    response.json(celulaId)
    
})