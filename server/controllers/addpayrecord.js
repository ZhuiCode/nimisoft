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
    usersDB('users_pay_tbl').insert({ openid: ctx.request.body.openid, date: ctx.request.body.date, bookno: ctx.request.body.bookingNo,pay_sum: ctx.request.body.pay_sum, pay_power: ctx.request.body.pay_power, store_code: ctx.request.body.store_code }).then(function (res)    { 
        console.log("insert ok");
    })
    var cur_power;
    await usersDB('users_info_tbl').column('total_power').select().where("openid", ctx.request.body.openid).then(function (res) {
        cur_power = res[0].total_power;
    })
    cur_power += ctx.request.body.pay_power;
    usersDB('users_info_tbl').update({total_power: cur_power}).select().where("openid", ctx.request.body.openid).then(function (res) {
        console.log("update ok");
    })
}