const { Module } = require('module');
var mongoose=require('mongoose');
const dashboardschema = new mongoose.Schema({
    productname :{
        type: String,
        require :true
    },
    product :{
        type :String,
        require : true
    },
    price :{
        type: String,
        // require: true
    },
    img :{
        type :String,
        // require :true
    }
})
const dashboard = new mongoose.model("product",dashboardschema);
module.exports = dashboard;