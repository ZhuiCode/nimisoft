const { mysql: config } = require('../config')

const storeDB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: 'stores_db',
        charset: config.char,
        multipleStatements: true
    }
})


module.exports = async (ctx, next) => {
    await storeDB.select().from('store_price_tbl').where("store_code", ctx.request.body.store_code).then(function (res){
        ctx.body = res;
    })

 }