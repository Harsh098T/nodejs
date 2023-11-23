//  function run(){
//     console.log("hello world");
// }
// run()

// const hello =()=>{

//     console.log("hello world")
// }
// hello()

var http=require('http');
const nodemon = require('nodemon');
http.createServer(function(req,res){
 res.write('<h1> hello from node js server</h1>');
 res.write('hello from node js server2');
 res.write('hello from node js server3');
 res.end();
}).listen(5200)

// var sum=function(a,b){
//     return a+b;
// }
// module.exports=sum;

// var sum=require('./demo')
// console.log(sum(20,60));
