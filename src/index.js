import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import './index.css'
import {
	BrowserRouter,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'

import reducers from './reducer'
import './config'

import EmployerProfile from './container/employer_profile/employer_profile'
import EmployeeProfile from './container/employee_profile/employee_profile'
import Login from './container/login/login'
import Signup from './container/signup/signup'
import AuthRoute from './component/authrouter/authrouter'
import Dashboard from './container/dashboard/dashborad'
import Chat from './component/chat/chat'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path='/' exact component={()=><Redirect to='/login'></Redirect>}></Route>
					<Route path='/employer_profile' component={EmployerProfile}></Route>
					<Route path='/employee_profile' component={EmployeeProfile}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/signup' component={Signup}></Route>
					<Route path='/chat/:_id' component={Chat}></Route>
					<Route component={Dashboard}>

					</Route>
				</Switch>

			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
