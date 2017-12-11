const { mysql: config } = require('../config')

const usersDB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: 'users_db',
        charset: config.char,
        multipleStatements: true
    }
})


module.exports = async (ctx, next) => {
    var wallt_info = { remain_power:"", trans_rec:""};
    await usersDB.column("total_power").select().from('users_info_tbl').where("openid", ctx.request.body.openid).then(function (res) {
        wallt_info.remain_power = res[0].total_power;
    })
    await usersDB.column("trans_type","used_power","remain_power","updatetime").select().from('users_trans_tbl').where("openid", ctx.request.body.openid).then(function (res) {
        wallt_info.trans_rec = res;
    })
    ctx.body = wallt_info; 

}