var http=require('http');
var inputs=`<h1>from</h1>
<input type="text"/><br>
<br><input type="text"/>
<br><br><input type="text"/>`

http.createServer(function(req,res){
    res.writeHead(200,{'contact-type': "text/html"})
    res.write(`<h1>hello </h1>`);
    res.write(`<h2>hello bhai</h2>`);
    res.write('<type type ="text"/>');

    res.write(inputs);
    res.end();

}).listen(4003)