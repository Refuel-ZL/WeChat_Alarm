"use strict"
const Sqlutil = {}

module.exports = Sqlutil

const mssql = require("mssql")
const log4util = require("../log4js/log_utils")

const config = require("./config").config


Sqlutil.select = async function(sql) {
    var pool = null
    try {
        pool = await mssql.connect(config)
        let req = await pool.request()
        let result = await req.query(sql)
        return result
    } catch (err) {
        log4util.writeErr(err.message)
        return ""
    } finally {
        if (pool != null) {
            await pool.close()
        }
        await mssql.close()
    }

}
Sqlutil.insert = async function(sql) {
    var pool = null
    try {
        pool = await mssql.connect(config)
        let req = await pool.request()
        let result = await req.query(sql)
        return result
    } catch (err) {
        log4util.writeErr(err.message)
        return ""
    } finally {
        if (pool != null) {
            await pool.close()
        }
        await mssql.close()
    }
}