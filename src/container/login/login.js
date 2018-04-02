import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
class Login extends React.Component {

  constructor() {
    super()
    this._register = this._register.bind(this)
  }
  _register () {
    this.props.history.push('/signup')
  }
  render() {
    return (
      <div>
        <Logo></Logo>
        <h2>Login Page</h2>
        <WingBlank>
          <List>
            <InputItem>Username</InputItem>
            <InputItem>Passcode</InputItem>
          </List>
          <Button type='primary'>Login</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this._register}>Signup</Button>
        </WingBlank>
      </div>

  )}
}

export default Login
