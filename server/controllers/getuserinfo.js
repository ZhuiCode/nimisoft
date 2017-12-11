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
    var userinfo;
    var user_openid = ctx.request.body.openid;
    await usersDB.select().from('users_info_tbl').where("openid",user_openid).then(function(res)
    {
        console.log(res)
        if (res.length === 0)
        {
            userinfo = 0; 
        }
        else
        {
            userinfo = res;
        }
        
    })
    ctx.body = userinfo;
 }