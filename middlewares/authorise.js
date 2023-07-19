const authorise = (permittedRoles)=>{

return (req,res,next)=>{
const role = req.role
if(permittedRoles.includes(role)){

    next()
}
else{
    res.send({msg:"not authorized"})
}
}

}


module.exports = {
    authorise
};
