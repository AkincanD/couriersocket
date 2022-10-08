const express = require("express");
const http = require("http");
const axios = require('axios');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: '*',
    }
});

app.use(express.static("public"));

var courierLocation = {};

app.get('/', (req, res) => {
    res.send('Hello World!')
})

io.on("connection", function (socket) {
    console.log('User logged in');

    socket.on("orderJoin", function (data) {
        console.log(`[User connected order detail.`);
        socket.join(data);
    });

    socket.on("courierLoc", function (data) {
        courierLocation[data.orderID] = data;
        io.to(data.orderID).emit('courierLocation', courierLocation[data.orderID]);
        console.log(courierLocation[data.orderID]);
    });


    socket.on("disconnect", function () {
        console.log(`[User disconnected from server.`);
    });
});

server.listen(4646, function () {
    console.log("Listening to port 4646.");
});


