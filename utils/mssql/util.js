"use strict"

const mssql = require("mssql")
const log4util = require("../log4js/log_utils")

const config = require("./config").config
const Sqlutil = function() {
    // this.select()
}
Sqlutil.prototype.select = async function(sql) {
    try {
        let pool = await new mssql.ConnectionPool(config).connect()
        var result = await pool.request().query(sql)
        return result.recordset
    } catch (err) {
        log4util.writeErr(err.message)
        return ""
    }


}
Sqlutil.prototype.insert = async function(sql) {
    try {
        let pool = await new mssql.ConnectionPool(config).connect()
        var result = await pool.request().query(sql)
        return result
    } catch (err) {
        log4util.writeErr(err.message)
        return ""
    }
}


module.exports = Sqlutil