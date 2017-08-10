module.exports = {
    config: {
        user: "sa",
        password: "zlt123",
        server: "192.168.36.2", // You can use "localhost\\instance" to connect to named instance 
        database: "zlt-monitors",
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 15000
        }
    }
    /*   config: {
          user: "sa",
          password: "123",
          server: "127.0.0.1", // You can use "localhost\\instance" to connect to named instance 
          database: "zlt-monitors",
          pool: {
              max: 10,
              min: 0,
              idleTimeoutMillis: 10000
          }
      } */
    /* config: {
        user: "sa",
        password: "123",
        server: "192.168.31.232", // You can use "localhost\\instance" to connect to named instance 
        database: "zlt-monitors",
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 10000
        }
    }*/
}