const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const model = require('./model')
const Chat =  model.getModel('chats')

//socket.io
io.on('connection', socket=>{
	console.log(`User login: socketID: ${socket.id}`)
	socket.on('send_message', data=>{
		console.log(data)
		const {from, to, content} = data
		const chat_id = [from, to].sort().join('_')
		Chat.create({chat_id, from, to, content}, (err,doc) => {
			console.log(socket)
			io.emit('receive_message', Object.assign({}, doc._doc))
		})
	})

	socket.on('set_userid',(data) => {
		console.log(`setname: ${data}`)
    socket.user_ID = data;
  });

})

//express
const UserRouter = require('./user')


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', UserRouter)

server.listen(9093,function(){
	console.log('Node app start at port 9093')
})
