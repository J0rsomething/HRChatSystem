import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'

import {connect} from 'react-redux'
import {signup}from '../../reducer/user_reducer'

const mapStatetoProps = (state, ownProps) => ({
  state: state.user
})

const mapDispatchtoProps = ({
  signup: signup
})




const RadioItem = Radio.RadioItem
class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      type: 'Employer',
      username: '',
      password: '',
      password_confirmation: ''
    }
    this._handleChange = this._handleChange.bind(this)
    this._handleSignup = this._handleSignup.bind(this)
  }

  _handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  _handleSignup() {
    this.props.signup(this.state)
  }

  render() {
    return (
      <div>
        <Logo></Logo>
        <List>
          {this.props.state.error_message? <p>{this.props.state.error_message}</p>: null}
          <InputItem onChange={(value)=>{this._handleChange('username',value)}}>Username</InputItem>
          <InputItem onChange={(value)=>{this._handleChange('password',value)}}>Password</InputItem>
          <InputItem onChange={(value)=>{this._handleChange('password_confirmation',value)}}>Pwd_Conf</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem onClick={()=>{this._handleChange('type','Employer')}} checked={this.state.type =='Employer'}>Employer</RadioItem>
          <RadioItem onClick={()=>{this._handleChange('type','Employee')}} checked={this.state.type =='Employee'}>Employee</RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button onClick={()=>{this._handleSignup()}}type='primary'>Signup</Button>
        </List>
      </div>
  )}
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Signup)
