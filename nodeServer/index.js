//Node server which handle socket io connecti
const express = require('express');
const request = require('request');

const app = express();


// app.use((req, res, next) => {
//   res.header(Access-Control-Allow-Origin, '*');
//   next();
// });



const io = require('socket.io')(8000)
const users ={}

io.on('connection', socket =>{    //io.on is used to listen all connections 
    socket.on('new-user-joined', name =>{   //socket.on is used to listen for new conections means whenever a new user is joined.
        users[socket.id] = name;
        console.log(name)
        socket.broadcast.emit('user-joined', name); //it will broadcast message to every user except that one
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    })
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});

app.get("/", function(request,response){
    response.sendFile("./server.html");
});
// app.listen(8000, function(){
//     console.log("server is running on port 8000")
// })