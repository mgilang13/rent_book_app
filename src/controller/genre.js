const genre = require('../model/genre')
const response = require ('../helper/response')

module.exports = {
    getGenre : (req,res)=>{
        genre.getAllGenre()
            .then((result)=>{
                response.response(res,result,200,null)
            })
            .catch((err)=>{
                response.response(res,null,404,"Data not found")
            })
    },
    addGenre : (req,res) =>{
        let data = {
            name : req.body.name
        }
        
        genre.addGenre(data)
            .then((result)=>{
                response.response(res,result)
            })
            .catch((err)=>{
                response.response(res,null,401,"Something Wrong")
                
            })
    },
    updateGenre : (req,res)=>{
        const idgenre = req.params.idgenre
        const data = {
            name : req.body.name
        }
        genre.updateGenre(data,Number(idgenre))
            .then((result)=>{
                if(result.affectedRows == 0) {
                    response.response(res,null,404,"Id of genre No found")
                } else {
                    response.response(res,result)
                }
            })
            .catch((err)=>{
                console.log(err)
                response.response(res,null,404,"Id Genre No found")
            })
    },
    deleteGenre : (req,res)=>{
        const idgenre = req.params.idgenre
        genre.deleteGenre(Number(idgenre))
            .then((result)=>{
                if(result.affectedRows == 0) {
                    response.response(res,null,404,"Id of genre No found")
                } else {
                    response.response(res,result)
                }
            })
            .catch((err)=>{
                console.log(err)
                response.response(res,null,404,"Id of Genre No found")
            })
    }
}