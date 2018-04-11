const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

//socket.io
io.on('connection', socket=>{
	console.log('user login')
	socket.on('send_message', data=>{
		console.log(data)
		io.emit('receive_message',data)
	})

})

//express
const UserRouter = require('./user')


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', UserRouter)

server.listen(9093,function(){
	console.log('Node app start at port 9093')
})
