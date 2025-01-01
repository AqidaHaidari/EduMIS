

exports.getIndex=(req,res)=>{
    res.render('./index.ejs',{
        title:"Organization",
        subTitle:"This is the best app ever!"
    })

}