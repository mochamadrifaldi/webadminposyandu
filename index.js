const http  = require('http');
const hello = require('./helloWorld');
const moment = require('moment');
const server  = http.createServer((req, res) => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'text/json');
   res.write(moment().calendar());
   res.write(JSON.stringify({
      'status': 'success',
      'message': 'response success'
   }))
   res.write(hello);
   res.end();
});

const hostname = '127.0.0.1';
const port = 3000;
server.listen(port, hostname, () => {
   console.log("Server running at http://${hostname}:${port}/");
});

// const http  = require('http');
// const hello = require('./helloWorld');

// const server  = http.createServer((req, res) => {
//    res.statusCode = 200;
//    res.setHeader('Content-Type', 'text/plain');
//    res.write(hello);
//    res.end();
// });

// const hostname = '127.0.0.1';
// const port = 3000;
// server.listen(port, hostname, () => {
//    console.log('Server running at http://${hostname}:${port}/');
// });


// var http = require("http");
// http.createServer(function (request, response) {
//    // Send the HTTP header 
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   
//    // Send the response body as "Hello World"
//    response.end('Hello World\n');
// }).listen(3000);

// // Console will print the message
// console.log('Server running at http://127.0.0.1:3000/');