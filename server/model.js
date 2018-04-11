const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/HRChat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
	console.log('mongo connect success')
})


const models = {
  users: {
    username: {type: String, require: true},
    password: {type: String, require: true},
    type: {type:String, require: true},
    avatar: {type: String},
    description: {type:String},
    title: {type: String},
    company: {type: String},
    salary: {type: String}
  },
  chats: {
		'chatid': {type: String, require: true},
		'from': {type: String, require: true},
		'to': {type: String, require: true},
		'read': {type:Boolean, require: true, default: false},
		'content': {type: String,require:true, default:''},
		'time_stamp': {type: Number, default:new Date().getTime()}
  }
}



for(let model in models) {
  mongoose.model(model, new mongoose.Schema(models[model]))
}

module.exports = {
  getModel: name => mongoose.model(name)
}
