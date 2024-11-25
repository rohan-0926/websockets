//import required modules
const express = require('express');
const http = require('http');

//initialize engine
const app = express();

//create server which makes easy to upgrade it when connecting to websocket
const server = http.createServer(app);
const path = require('path');   

//create socket.io connection
const {Server} = require('socket.io');
//handle sockets
const io = new Server(server);

io.on('connection',(socket)=>{
    // console.log("A new User has connected : ",socket.id)
    //server side msg handling
    socket.on('user-message',(msg)=>{
        // console.log("A new user msg:",msg);
        //bi-directional message sending
        io.emit('message',msg);
    })
})
app.use(express.static(path.resolve('./public')));

app.get('/',(req,res)=>{
    res.sendFile('/public/index.html');
})

server.listen(9000,()=>{
    console.log(`Listening to port : 9000`);
})