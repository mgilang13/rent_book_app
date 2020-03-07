const connection = require('../config/db');

module.exports = {
    getAllGenre : () =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM genres', (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
    addGenre : (data) =>{
        return new Promise ((resolve,reject)=>{
            connection.query('INSERT INTO genres SET ?', data, (err, result) => {
                if(!err){
                    resolve(result)
                } else{
                    reject (new Error (err))
                }
            })
        })
    },
    updateGenre : (data,idGenre) => {
        
        // console.log(id)
        return new Promise ((resolve, reject)=>{
            connection.query('UPDATE genres SET ? WHERE id = ?',[data,idGenre],(err,result)=>{
                if (!err){
                    resolve(result)
                } else{
                    reject (new Error(err))
                }
            })
        })
    },

    deleteGenre:(idgenre) => {
        console.log(idgenre)
        return new Promise ((resolve, reject)=>{
            connection.query('DELETE FROM genres WHERE id = ?', idgenre,(err,result)=>{
                if (!err){
                    resolve(result)
                } else{
                    reject (new Error(err))
                }
            })
        })
    }
}