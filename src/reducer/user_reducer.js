import axios from 'axios'
import {redirect} from '../utility'

const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR = 'ERROR'
const initState = {
  redirect_url: '',
  isLogin: false,
  username: '',
  password: '',
  password_confirmation: '',
  type: '',
  error_message: ''
}

//reducer
const user = (state=initState, action) => {
  switch(action.type) {
    case SIGNUP_SUCCESS:
      //when signup successful, update state
      return {...state, ...action.data, isLogin: true, redirect_url: redirect(action.data)}
    case LOGIN_SUCCESS:
      return {...state, ...action.data, isLogin: true, redirect_url: redirect(action.data)}
    case LOAD_DATA:
      return {...state, ...action.data, isLogin: true}
    case ERROR:
      //when signup error
      return {...state, error_message: action.error_message, isLogin: false,redirect_url: ''}
    default:
      return state
  }
}

//action creaters
const onError = (error_message) => ({
  type: ERROR,
  error_message
})

const onSignupSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  data
})

const onLoginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data
})

const onLoadData = (user_info) => ({
  type: LOAD_DATA,
  data: user_info
})


//functions

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
        dispatch(onSignupSuccess({username, password, type}))
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
        dispatch(onLoginSuccess(res.data.data))
      } else {
        dispatch(onError(res.data.message))
      }
    }).catch(error => dispatch(onError(error.response.status + ' ' + error.response.statusText)))
  }
}



export {login, signup, loadData, user}
