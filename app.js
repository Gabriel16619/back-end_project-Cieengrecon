/***********************
 * Sobre: arquivo responsavel pela criação e gerenciamento
 * das rotas dos crud do back-end, para testes e para uso no front end
 * Data: 08/05/2026
 * Autor: Gabriel Cavalcante dos Santos
 * Versão: 1.0
 ************************/

const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()


app.use(cors())
app.use(express.json())


app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
})

// Rotas
const celulaRoutes = require('./routes/celula')
app.use("/v1/cieengrecon/celula", celulaRoutes) 

const ordemServicoRoutes = require('./routes/ordemServico')
app.use("/v1/cieengrecon/ordemServico", ordemServicoRoutes)

const cqRoutes = require('./routes/cq')
app.use("/v1/cieengrecon/cq", cqRoutes)

const ferramentariaRoutes = require('./routes/ferramentaria')
app.use("/v1/cieengrecon/ferramentaria", ferramentariaRoutes)



app.listen(PORT, function(){
    console.log('API aguardando resposta ;)')
})