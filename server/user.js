const Router = require('express').Router()
const model = require('./model')
const User = model.getModel('users')
const _filter = {password: 0, __v: 0}


//show all database
Router.get('/database', (req,res) => {
  User.find({}, (error,doc) => {
    if(!error) {
      return res.json({doc})
    }
  })
})
//test


//APIs
Router.post('/update', (req,res) => {
  const userid = req.cookies.userid

  if(!userid) {
    return res.json({code: 1})
  }
  const body = req.body
  console.log(body)
  User.findByIdAndUpdate(userid, body, (error, doc) => {
    
    const data = Object.assign({}, {
      username: doc.username,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})
Router.get('/info', (req,res) => {
  const {userid} = req.cookies
  if(!userid) {
    return res.json({code:1})
  }
  User.findOne({_id: userid}, _filter, (error ,doc) => {
    if(error) {
      return res.json({code:1 , message: 'Server Error'})
    }
    if(doc) {
      return res.json({code: 0, data: doc})
    }
  })
})
Router.get('/list', (req,res) => {
  User.find({}, (err, doc) => res.json(doc))
})
Router.post('/signup', (req,res) => {
  console.log(req.body)
  const {username, password, type} = req.body
  User.findOne({username}, (error, doc) => {
    if(doc) {
      return res.json({code: 1, message: 'username existes'})
    }
    User.create({username, password, type}, (error, doc) => {
      if(error) {
        return res.json({code: 1, message: 'database error'})
      }
      //setup cookie
      console.log(doc)
      const {username, type, _id} = doc
      res.cookie('userid', doc._id)
      return res.json({code: 0, data: {username, type, _id}})
    })
  })
})
Router.post('/login', (req,res) => {
  console.log(req.body)
  const {username, password} = req.body
  User.findOne({username, password}, _filter,(error, doc) => {
    if(!doc) {
      console.log('xxxxxxxx')
      return res.json({code: 1, message: 'Username or password error'})
    }
    //setup cookie
    res.cookie('userid', doc._id)
    return res.json({code: 0, data: doc})
  })
})




module.exports = Router
