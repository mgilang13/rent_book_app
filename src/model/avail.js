const connection = require('../config/db');

module.exports = {
    getAllAvail : () =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM availability', (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
}