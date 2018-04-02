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

import Login from './container/login/login'
import Signup from './container/signup/signup'
import AuthRoute from './component/authrouter/authrouter'

const store = createStore(reducers, compose(
	applyMiddleware(thunk)
))
ReactDom.render(
	(<Provider store={store}>
		<BrowserRouter>
			<div>

				<Route path='/' exact component={()=>(<h1>INDEX</h1>)}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/signup' component={Signup}></Route>
				<AuthRoute></AuthRoute>
			</div>
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
