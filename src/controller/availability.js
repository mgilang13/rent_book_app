const avail = require('../model/avail')
const response = require ('../helper/response')

module.exports = {
    getAvail : (req,res)=>{
        avail.getAllAvail()
            .then((result)=>{
                response.response(res,result,200,null)
            })
            .catch((err)=>{
                console.log(err)
                response.response(res,null,404,"Data not found")
            })
    }
}