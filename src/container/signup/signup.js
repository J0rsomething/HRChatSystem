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

const RadioItem = Radio.RadioItem
class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      type: 'Employer'
    }
  }
  _register () {
    //this.props.history.push('/signup')
  }
  render() {
    return (
      <div>
        <Logo></Logo>
        <List>
          <InputItem>Username</InputItem>
          <InputItem>Password</InputItem>
          <InputItem>Comfirmation</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={this.state.type =='Employer'}>Employer</RadioItem>
          <RadioItem checked={this.state.type =='Employee'}>Employee</RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button type='primary'>Signup</Button>
        </List>
      </div>
  )}
}

export default Signup
