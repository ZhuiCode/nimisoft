const { mysql: config } = require('../config')
const storeDB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: 3306,
        user: 'root',
        password: config.pass,
        database: 'stores_db',
        charset: config.char,
        multipleStatements: true
    }
})

module.exports = async (ctx, next) => {
    var store_info;
    await storeDB.column().select().from('store_info_tbl').then(function(res)
    {
       store_info = res;
    })
    ctx.body = store_info;
}