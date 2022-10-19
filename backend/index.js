const app = require('express')()
const {createServer} = require('http')
const httpServer  = createServer(app)

const {Server} = require('socket.io')
const io = new Server(httpServer, {
    // ...
})


const port = 3000
io.on('connection' , (socket)=>{
    console.log('What is a socket?', socket)
    console.log('Socket is active to be connected...')

    //connection, disconnect, ...some user defined strings 
    socket.on('chat', (payload)=>{
        console.log('What is a payload?', payload)
        //responding to this event
        io.emit('chat', payload)
    })
})

httpServer.listen(port, ()=>{
    console.log(`Server is listening at port ${port}...`)
})
