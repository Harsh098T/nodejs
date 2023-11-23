const { Module } = require('module');
var mongoose=require('mongoose');
const contactusschema = new mongoose.Schema({
    name :{
        type: String,
        require :true
    },
    email :{
        type :String,
        require : true
    },

    Message :{
        type :String,
        require :true
    },

    
})
const Registration = new mongoose.model("contact",contactusschema);
module.exports = Registration;