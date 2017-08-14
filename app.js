const count = require('./scripts/count')
const log4util = require('./utils/log4js/log_utils')
const request = require('request')
const config = require('./config')

async function getalarm() {
    try {
        var res = (await count.alarm()).recordset
        if (res.length > 0) {
            res.forEach(async(item) => {
                log4util.writeInfo(item)
                await count.delalarm(item.id)
                try {
                    var param = {
                        msg: item.context
                    }
                    param = require('querystring').stringify(param)
                    var options = {
                        url: config.host,
                        method: 'POST',
                        body: param,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Content-Length': param.length
                        }
                    }
                    request(options, (err, res, body) => {
                        if (err) {
                            log4util.writeErr('提交微信接口失败', err.message)
                            return
                        }
                        if (body != 'ok') {
                            log4util.writeErr('微信接口返回异常', body)
                        }
                    })
                } catch (error) {
                    log4util.writeInfo('请核对内容是否合法： ' + item.context)
                }
            })
        } else {
            console.log('暂无告警')
        }
    } catch (error) {
        log4util.writeErr('监测告警异常', error)
    }

}

setTimeout(async function() {
    await getalarm()
    setTimeout(arguments.callee, 1000)
}, 0)