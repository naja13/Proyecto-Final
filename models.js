var sqlite3 = require('sqlite3').verbose()


var db = new sqlite3.Database('./db.db')

function create_table(){
    return new Promise ((resolve, reject)=> {
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS  data(time REAL, bw_h1 REAL, bw_h2 REAL, rate_palo REAL, MOS REAL)")
            resolve('ok')
        })
    })
}

function drop_table() {
    return new Promise((resolve,reject) => {
        db.serialize(function() {
            db.run("DROP TABLE IF EXISTS data")
            resolve('ok')
        })
    })
}

function push_data(data){
    return new Promise ((resolve, reject)=> {
        db.serialize(function() {
            var stmt = db.prepare("INSERT INTO data VALUES (?,?,?,?,?)")
            stmt.run(data.time, data.bw_h1, data.bw_h2, data.rate_palo, data.MOS)
            stmt.finalize()
            resolve('ok')
        })
    })
}

function show_data(){
    return new Promise ((resolve, reject) => {
    
        db.all("SELECT *  FROM data",(error, rows) => {
          if (error) {
              reject(error)
          } else {
              resolve(rows)
          }
        })
    
      })
}

module.exports = { create_table, drop_table, push_data, show_data }