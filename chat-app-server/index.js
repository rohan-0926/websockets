const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const cors = require('cors');

//middle ware
app.use(cors());

const {Server} = require('socket.io');

const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("send_message", (msg) => {
        console.log("Server received message:", msg);
        
        // Emit `receive_message` to all connected clients
        io.emit("receive_message", { message: msg.message });
    });
});

server.listen(5000,()=>{
    console.log(`Server is running on Port : 5000`);
})