var http=require('http')
var uc=require('upper-case')
http.createServer(function(req,res){
    res.write(uc.upperCase('hello india hello indiahello indiahello india'))
    res.end();

}).listen(3000)