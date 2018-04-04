import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
	BrowserRouter,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'

import reducers from './reducer'
import './config'

import EmployerProfile from  './container/employer_profile/employer_profile'
import Login from './container/login/login'
import Signup from './container/signup/signup'
import AuthRoute from './component/authrouter/authrouter'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>

				<Route path='/employer_profile' component={EmployerProfile}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/signup' component={Signup}></Route>
				<AuthRoute></AuthRoute>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
