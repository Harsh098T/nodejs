// var http=require('http')
// var fs=require('fs');
// http.createServer(function(req,res){
//     fs.readFile('demo.html',function(err,data){
//         res.writeHead(200,{'contect-type':'text/html'});
//         res.write(data);

//         return res.end();
// })
// }).listen(5007)

var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});