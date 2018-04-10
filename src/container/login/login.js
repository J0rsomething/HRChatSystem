import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {login}from '../../reducer/user_reducer'
import {Redirect} from 'react-router-dom'

const mapStatetoProps = (state) => ({
  user: state.user
})
const mapDispatchtoProps = ({
  login: login
})

class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
    this._register = this._register.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._handleLogin = this._handleLogin.bind(this)
  }
  _handleChange(key,value) {
    this.setState({
      [key]: value
    })
  }

  _handleLogin() {
    console.log(this.props.user)
    this.props.login(this.state)
  }

  _register() {
    this.props.history.push('/signup')
  }
  render() {
    return (
      <div>
        {
          this.props.user.redirect_url&&this.props.user.redirect_url !='/login'? <Redirect to={this.props.user.redirect_url}/>: null
          //console.log(this.props)
        }
        <Logo></Logo>
        <h2>Login Page</h2>
        <WingBlank>
          {this.props.user.error_message? <p style={{color: 'red'}}>{this.props.user.error_message}</p>: null}
          <List>
            <InputItem onChange={(value) => this._handleChange('username', value)}>Username</InputItem>
            <InputItem onChange={(value) => this._handleChange('password', value)}>Password</InputItem>
          </List>
          <Button onClick={this._handleLogin} type='primary'>Login</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this._register}>Signup</Button>
        </WingBlank>
      </div>

  )}
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Login)
