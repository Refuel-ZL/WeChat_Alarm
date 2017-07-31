const count = require("./scripts/count")
const log4util = require("./utils/log4js/log_utils")
const request = require("request")
const config = require("./config")

async function getalarm() {
    var res = await count.alarm()
    if (res.length > 0) {
        log4util.writeInfo(res)
        res.forEach(function(item) {
            log4util.writeInfo(item)
            try {
                var content = JSON.parse(item.context)
                var param = {
                    msg: JSON.stringify({
                        "type": content.groupType || "统计报告",
                        "content": content.msg || item
                    })
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
                request(options, (err, res, body) => {
                    if (err) {
                        log4util.writeErr(res)
                        return
                    }
                    count.delalarm(item.id)
                })
            } catch (error) {
                log4util.writeInfo("请核对内容是否合法： " + item.context)
            }

        })
    } else {
        console.log("暂无告警")
    }
}

setInterval(getalarm, 1000)