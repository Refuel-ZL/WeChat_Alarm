const count = require("./scripts/count")
const log4util = require("./utils/log4js/log_utils")
const request = require("request")
const config = require("./config")

async function getalarm() {
    var res = await count.alarm()
    res = res === "" ? res : res.recordset
    if (res.length > 0) {
        res.forEach(async(item) => {
            log4util.writeInfo(item)
            try {
                // var content = JSON.parse(item.context)
                var param = {
                    msg: item.context
                }
                param = require("querystring").stringify(param)
                var options = {
                    url: config.host,
                    method: "POST",
                    body: param,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Content-Length": param.length
                    }
                }
                request(options, async(err, res, body) => {
                    if (err) {
                        log4util.writeErr(err.message)
                        return
                    }
                })
            } catch (error) {
                log4util.writeInfo("请核对内容是否合法： " + item.context)
            } finally {
                await count.delalarm(item.id)
            }
        })
    } else {
        console.log("暂无告警")
    }
}


setTimeout(async function() {
    // do something
    await getalarm()
    setTimeout(arguments.callee, 1000)
}, 1000)