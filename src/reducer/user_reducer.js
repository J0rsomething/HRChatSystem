import axios from 'axios'
import {redirect} from '../utility'

const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR = 'ERROR'
const initState = {
  redirect_url: '',
  username: '',
  type: '',
  _id: '',
  error_message: ''
}

//reducer
const user = (state=initState, action) => {
  switch(action.type) {
    case AUTHENTICATE_SUCCESS:
      return {...state, ...action.data, redirect_url: redirect(action.data)}
    case LOAD_DATA:
      return {...state, ...action.data}
    case ERROR:
      //when signup error
      return {...state, error_message: action.error_message,redirect_url: ''}
    default:
      return state
  }
}

//action creaters
const onError = (error_message) => ({
  type: ERROR,
  error_message
})

const onAuthenticateSuccess = data => ({
  type: AUTHENTICATE_SUCCESS,
  data
})

const onLoadData = (user_info) => ({
  type: LOAD_DATA,
  data: user_info
})


//functions
const updateData = data => {
  return dispatch => {
    axios.post('/user/update', data).
    then(res => {
      if(res.status === 200 && res.data.code === 0) {
        console.log(res.data.data)
        dispatch(onAuthenticateSuccess(res.data.data))
      } else {
        dispatch(onError(res.data.message))
      }
    }).
    catch(error => {
      dispatch(onError(error.response.status + ' ' + error.response.statusText))
    })
  }
}
const loadData = user_info => {
  return dispatch => {dispatch(onLoadData(user_info))}
}
const signup = ({username, password, password_confirmation, type}) => {
  //validations
  if(!username || !password || !password_confirmation) {
    return onError('No Empty Input')
  }
  if(password !== password_confirmation) {
    return onError('Password Confirmation doesn\'t match')
  }
  return dispatch => {
    axios.post('/user/signup', {
      username,
      password,
      type
    }).then(res => {
      if(res.status === 200 && res.data.code === 0) {
        console.log(res.data.data)
        //store username, type and id (get from server database)
        dispatch(onAuthenticateSuccess({username, type, _id: res.data.data._id}))
      } else {
        dispatch(onError(res.data.message))
      }
    }).catch(error=>{
      dispatch(onError(error.response.status + ' ' + error.response.statusText))
    })
  }
}

const login = ({username, password}) => {
  if(!username || !password) {
    return onError('Invalid Username or Password')
  }
  return dispatch => {
    axios.post('/user/login', {username, password}).
    then(res => {
      if(res.status === 200 && res.data.code === 0) {
        console.log(res.data.data)
        dispatch(onAuthenticateSuccess(res.data.data))
      } else {
        dispatch(onError(res.data.message))
      }
    }).catch(error => dispatch(onError(error.response.status + ' ' + error.response.statusText)))
  }
}



export {login, signup, loadData, user, updateData}
