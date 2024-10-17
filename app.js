const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const server = http.createServer(app);

const io = socketio(server)

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

io.on("connection", function(socket){
    console.log("New User Connected");
    
    socket.on("send-location", function(data){
        io.emit("receive-location", {id:socket.id, ...data});
    });
    socket.on("disconnect", function(){

        console.log("User Disconnected");
        io.emit("user-disconnected", socket.id)
    });
    
})

app.get("/", (req, res) =>{
    res.render("index")
});

server.listen(3000, () =>{
    console.log("server is running at port: 3000");
    
})