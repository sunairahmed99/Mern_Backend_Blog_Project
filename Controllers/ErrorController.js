
const DevelopmentErrors = (err,res)=>{
     
    console.log('pilllayyy')
    
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    })
}

const ProductionErrors = (err,res)=>{

    if(err.isOperational){

        res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }
    else{

        res.status(500).json({
            status:'fail',
            message:'something went wrong try later'
        })

    }
}


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if(process.env.DB_ENV === 'Development'){
        console.log('checkkk')

        DevelopmentErrors(err,res)

    }
    else if(process.env.DB_ENV === 'Production'){

        let error = {...err}

        ProductionErrors(err,res)
    }
   
}