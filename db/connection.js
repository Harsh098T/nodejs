const mongooes=require('mongoose');
var conn=mongooes.connect("mongodb+srv://harshthukral098:harsh098@cluster0.bsit7ji.mongodb.net/user?retryWrites=true&w=majority",
    {useNewUrlParser:true,
    useUnifiedTopology:true}
    )
.then(()=>console.log("connection successfully.."))
.catch((err)=>console.log(err));

module.exports=conn;
