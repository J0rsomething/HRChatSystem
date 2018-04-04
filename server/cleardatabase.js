const model = require('./model')
const User = model.getModel('users')


User.remove({},(error,doc) => {
  console.log('all data removed')
})
