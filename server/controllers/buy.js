function paysignjs(appid, nonceStr, packag, signType, timeStamp) {
    var ret = {
        appId: appid,
        nonceStr: nonceStr,
        package: packag,
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
    var bookingNo = req.param("bookingNo");
    var total_fee = req.param("total_fee");
    var openid = req.param("openid");
    var body = "费用说明";
    var url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
    var formData = "<xml>";
    formData += "<appid>appid</appid>"; //appid
    formData += "<attach>test</attach>";
    formData += "<body>" + body + "</body>";
    formData += "<mch_id>mch_id</mch_id>"; //商户号
    formData += "<nonce_str>nonce_str</nonce_str>";
    formData += "<notify_url>notify_url</notify_url>";
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
            res.send(o);
        }
    })
}
/*如何实现此处的处理接口，主要是小程序前端发送过来的信息的接收和处理，以及如何返回*/
module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    console("aaaa")
    if (ctx.state.$wxInfo.loginState === 1) {
        // loginState 为 1，登录态校验成功
        ctx.state.data = ctx.state.$wxInfo.userinfo
    } else {
        ctx.state.code = -1
    }
}
