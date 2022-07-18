const express = require('express');
const http = require('http');
const app = express()
const expressHttpServer = http.createServer(app)


const ws = require ('ws')
const wss = new ws.Server({server: expressHttpServer})
app.get('/', (req,res) =>{
    res.sendFile(`${__dirname}/index.html`)
})

wss.on('connection', (socket) =>{
    // sockets.push(socket) 
    console.log('new user connected ✅');

    socket.on("message",(data) => {
       const msg = data.toString()
    //    sockets.forEach(st => {
    //     if (st != socket) {
    //         st.send(msg)
    //     }
       
    //    });
    wss.clients.forEach(cl =>{
        if (cl != socket) {
            cl.send(msg)
        }
    })
 })

    socket.on('close',()=>{
        console.log("user disconnect❌");
    })
})

expressHttpServer.listen(process.env.PORT ||3030,() =>{
    console.log('server is running......');
})