import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MESSAGE_LIST = 'MESSAGE_LIST'
const MESSAGE_RECEIVE = 'MESSAGE_RECEIVE'
const MESSAGE_READ = 'MESSAGE_READ'

const initState = {
  chat_message: [],
  unread: 0,
}
//reducer
const chat = (state=initState, action) => {
  switch(action.type) {
    case MESSAGE_LIST:
      return {...state, chat_message: action.data, unread: action.data.filter(item=>!item.read).length}
    // case MESSAGE_RECEIVE:
    // case MESSAGE_READ:
    default:
      return state
  }
}
//action creaters



//functions
const messageList = (data) => {
  return {
    type: MESSAGE_LIST,
    data: data
  }
}

const getMessageList = () => {
  return dispatch => {
    axios.get('/user/message_list')
      .then(res=>{
        if(res.status == 200 && res.data.code ==0) {
          dispatch(messageList(res.data.data))
        }
      })
  }
}

const sendMessage = ({from, to, content}) => {
  return dispatch => {
    socket.emit('send_message', {from, to, content})
  }
}
export {chat, getMessageList,sendMessage}
