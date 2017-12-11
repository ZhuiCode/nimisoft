const { mysql: config } = require('../config')
const eventDB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: 3306,
        user: 'root',
        password: config.pass,
        database: 'events_db',
        charset: config.char,
        multipleStatements: true
    }
})

module.exports = async (ctx, next) => {
    var event;
    //console.log(ctx.request.body.code_2d.res.result);
    //console.log(ctx.request.body.code_2d.openid);
    var cur_id;
    await eventDB('events_tbl').max('event_id').then(function(res){
        cur_id = res[0]["max(`event_id`)"];
    });
    //var cur_time = new Date().toLocaleString();
    //console.log(cur_time);
    eventDB('events_tbl').insert({ event_id:cur_id+1, openid: ctx.request.body.code_2d.openid, event_type: "scan", event_ctx: ctx.request.body.code_2d.res.result, event_handle_res: 0,event_status:"new"}).then(function (){
        console.log("insert ok");
    })
}