const model = require('./model')
const Chat =  model.getModel('chats')
Chat.remove({},(error,doc) => {
  console.log('all data removed')
})
