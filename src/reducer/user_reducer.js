import axios from 'axios'

const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
const SIGNUP_ERROR = 'SIGNUP_ERROR'
const initState = {
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
      return {...state, ...action.data, isLogin: true}
    case SIGNUP_ERROR:
      //when signup error
      return {...state, error_message: action.error_message, isLogin: false}
    default:
      return state
  }
}

const onError = (error_message) => ({
  type: SIGNUP_ERROR,
  error_message
})

const onSuccess = (data) => ({
  type: SIGNUP_SUCCESS,
  data

})

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
        dispatch(onSuccess({username, password, type}))
      } else {
        dispatch(onError(res.data.error_message))
      }
    }).catch(error=>{
      dispatch(onError(error.response.status + ' ' + error.response.statusText))
    })
  }
}
export {signup, user}
