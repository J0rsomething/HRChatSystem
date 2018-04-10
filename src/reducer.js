import { combineReducers } from 'redux'
import {user} from './reducer/user_reducer'
import {userlist} from './reducer/user_list_reducer'
export default combineReducers({user, userlist})
