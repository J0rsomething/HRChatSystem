import axios from 'axios'

const USER_LIST = 'USER_LIST'

const initState = {
  userlist: []
}

//reducer
const userlist = (state=initState, action) => {
  switch(action.type) {
    case USER_LIST:
      return {...state, userlist: action.data}
    default:
      return state
  }
}
//action creater
const onReceiveList = (data) => ({
  type: USER_LIST,
  data: data
})

const getUserList = (type) => {
  return dispatch => {
    axios.get('/user/list?type=' + type).
    then(res=>{
      console.log(res.data.data)
      if(res.data.code == 0) {
        dispatch(onReceiveList(res.data.data))
      }
    })
  }
}

export {getUserList, userlist}
