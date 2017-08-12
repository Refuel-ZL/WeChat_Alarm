'use strict'

var mssql = require('mssql')
var log4util = require('../log4js/log_utils')

var config = require('./config').config
var Sqlutil = function() {}


Sqlutil.prototype.select = async function(sql) {
    return new Promise(function(resolve, reject) {
        try {
            var connection = mssql.connect(config, function(err) {
                if (err) {
                    connection.close()
                    reject(err)
                    log4util.writeErr('数据库建立连接错误', err)
                } else {
                    let sqlReq = new mssql.Request(connection)
                    sqlReq.query(sql, function(error, result) {
                        connection.close()
                        if (error) {
                            log4util.writeErr('执行sql语句错误', error)
                            reject(error)
                        } else {
                            resolve(result)
                        }
                    })
                }
            })
        } catch (error) {
            log4util.writeErr('操作数据库异常', error)
            reject(error)
        }
    })
}
Sqlutil.prototype.insert = function(sql) {
    return new Promise(function(resolve, reject) {
        try {
            var connection = mssql.connect(config, function(err) {
                if (err) {
                    connection.close()
                    reject(err)
                    log4util.writeErr('数据库建立连接错误', err)
                } else {
                    let sqlReq = new mssql.Request(connection)
                    sqlReq.query(sql, function(error, result) {
                        connection.close()
                        if (error) {
                            log4util.writeErr('执行sql语句错误', error)
                            reject(error)
                        } else {
                            resolve(result)
                        }
                    })
                }
            })
        } catch (error) {
            log4util.writeErr('操作数据库异常', error)
            reject(error)
        }

    })
}


module.exports = Sqlutil