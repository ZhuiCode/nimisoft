var config = require('../config.js')
var key = config.key
var request = require("request")
var crypto = require('crypto')
var ejs = require('ejs')
var fs = require('fs')
module.exports = async (ctx, next) => {
function random(num) {
    var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
        , "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var result = "";
        for (var i = 0; i < num; i++) {
            r = Math.floor(Math.random() * 36);
            result += data[r];
        } 
        return result;
}
function paysignjs(appid, nonceStr, package, signType, timeStamp) {
    var ret = {
        appId: appid,
        nonceStr: nonceStr,
        package: package,
        signType: signType,
        timeStamp: timeStamp
    };
    var string = raw1(ret);
    string = string + '&key=' + key;
    console.log(string);
    var crypto = require('crypto');
    return crypto.createHash('md5').update(string, 'utf8').digest('hex');
};

function raw1(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

function paysignjsapi(appid, attach, body, mch_id, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee, trade_type) {
    var ret = {
        appid: appid,
        attach: attach,
        body: body,
        mch_id: mch_id,
        nonce_str: nonce_str,
        notify_url: notify_url,
        openid: openid,
        out_trade_no: out_trade_no,
        spbill_create_ip: spbill_create_ip,
        total_fee: total_fee,
        trade_type: trade_type
    };
    var string = raw(ret);
    string = string + '&key=' + key;
    var crypto = require('crypto');
    return crypto.createHash('md5').update(string, 'utf8').digest('hex');
};

function raw(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
};

function getXMLNodeValue(node_name, xml) {
    var tmp = xml.split("<" + node_name + ">");
    var _tmp = tmp[1].split("</" + node_name + ">");
    return _tmp[0];
}


function app_pay(req) {
    var bookingNo = req["bookingNo"];
    var total_fee = req["total_fee"];
    var openid = req["openid"];
    var body = "费用说明";
    var appid = "wxfaa9d4937b7d9f50";
    var mch_id = "";
    var attach = "test";
    var nonce_str = random(20);
    var spbill_create_ip = "10.28.5.2";
    var notify_url = "http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php"
    var url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    var formData = "<xml>";
    formData += "<appid>"+appid+"</appid>"; //appid
    formData += "<attach>test</attach>";
    formData += "<body>" + body + "</body>";
    formData += "<mch_id>" + mch_id + "</mch_id>"; //商户号
    formData += "<nonce_str>"+nonce_str+"</nonce_str>";
    formData += "<notify_url>" + notify_url + "</notify_url>";
    formData += "<openid>" + openid + "</openid>";
    formData += "<out_trade_no>" + bookingNo + "</out_trade_no>";
    formData += "<spbill_create_ip>spbill_create_ip</spbill_create_ip>";
    formData += "<total_fee>" + total_fee + "</total_fee>";
    formData += "<trade_type>JSAPI</trade_type>";
    formData += "<sign>" + paysignjsapi(appid, attach, body, mch_id, nonce_str, notify_url, openid, bookingNo, spbill_create_ip, total_fee, 'JSAPI') + "</sign>";
    formData += "</xml>";
    request({
        url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
        method: 'POST',
        body: formData
    }, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            var prepay_id = getXMLNodeValue('prepay_id', body.toString("utf-8"));
            var tmp = prepay_id.split('[');
            var tmp1 = tmp[2].split(']');
            //签名
            var _paySignjs = paysignjs(appid, mch_id, 'prepay_id=' + tmp1[0], 'MD5', timeStamp);
            var o = {
                prepay_id: tmp1[0],
                _paySignjs: _paySignjs
            }
            /* 返回到微信小程序中*/
            //res.send(o);
            return o;
        }
    })
}
/*如何实现此处的处理接口，主要是小程序前端发送过来的信息的接收和处理，以及如何返回*/

  console.log("bbbbbbbbbbbbbbbbbbbbb")
  console.log(ctx.request.body);
  var book_info = ctx.request.body;
  app_pay(book_info);
  ctx.state.data = { msg: 'aaaaaaaaaaaaaa' }
}
