const express = require('express')
const UserRouter = require('./user')

const app = express()

app.use('/user', UserRouter)

app.listen(9093,function(){
	console.log('Node app start at port 9093')
})
