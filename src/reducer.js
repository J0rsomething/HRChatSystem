import { combineReducers } from 'redux'
import {user} from './reducer/user_reducer'
import {userlist} from './reducer/user_list_reducer'
import {chat} from './reducer/chat_reducer'
export default combineReducers({user, userlist, chat})
