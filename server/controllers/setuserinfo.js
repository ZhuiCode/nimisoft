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
    var res_length = 0;
    //var cur_time = new Date().toLocaleString();
     await usersDB.select().from('users_info_tbl').where("openid", ctx.request.body.openid).then(function (res) {
         res_length = res.length;
    })
     if (res_length === 0) {
         usersDB('users_info_tbl').insert({ openid: ctx.request.body.openid, truename: ctx.request.body.user_info.truename,nickname: ctx.request.body.user_info.nickname, height: ctx.request.body.user_info.height, weight: ctx.request.body.user_info.weight, id_type: ctx.request.body.user_info.id_type, id_no: ctx.request.body.user_info.id_no}).then(function () {
             console.log("insert ok");
         })
     } else {
         usersDB('users_info_tbl').update({ truename: ctx.request.body.user_info.truename, nickname: ctx.request.body.user_info.nickname, height: ctx.request.body.user_info.height, weight: ctx.request.body.user_info.weight, id_type: ctx.request.body.user_info.id_type, id_no: ctx.request.body.user_info.id_no }).where("openid", ctx.request.body.openid).then(function () {
             console.log("update ok");
         })
 }
}