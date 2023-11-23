const { Module } = require('module');
const bcrypt =require('bcrypt');
var mongoose=require('mongoose');
const RegistrationSchema = new mongoose.Schema({
    name :{
        type: String,
        require :true
    },
    email :{
        type :String,
        require : true
    },
    password :{
        type: String,
        require: true
    },
    contact :{
        type :String,
        require :true
    },
    address :{
        type: String,
        require:true
    }
    
});


RegistrationSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hashSync(this.password,10);
    next();
});

RegistrationSchema.methods.comparePassword = function(plaintext,callback){
    return callback(null,bcrypt.compareSync(plaintext,this.password));
};
const Registration = new mongoose.model("post",RegistrationSchema);
module.exports = Registration;
 