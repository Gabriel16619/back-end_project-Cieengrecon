const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'cieengrecon_db',
    port: 3306
  }
})

knex.raw('SELECT 1')
  .then(() => console.log('Conexão com banco OK!'))
  .catch((err) => console.log('❌ Erro:', err.message))
  .finally(() => knex.destroy())