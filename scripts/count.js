var moment = require("moment-timezone")
const msssql = require("../utils/mssql/util")
moment.tz.setDefault("Asia/Shanghai")

var _msssql = new msssql()
exports.alarm = function() { //YYYY-MM-DD hh:mm:ss
    var sql = "SELECT * FROM WChart2  ORDER BY id ASC"
    return _msssql.select(sql)
}

exports.delalarm = function(id) {
    var sql = `DELETE FROM WChart2 WHERE id =${id} `
    return _msssql.select(sql)
}