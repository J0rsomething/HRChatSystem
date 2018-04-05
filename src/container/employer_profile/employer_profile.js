import React from 'react'
import { NavBar, InputItem, TextareaItem} from 'antd-mobile'
import Avatar from '../../component/Avatar/Avatar'

class EmployerProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      company: '',
      salary: '',
      description: '',
      avatar: ''
    }
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(key, value) {
    this.setState({
      [key] : value
    })
  }

  render() {
    return (
      <div>
        <NavBar
          mode="light"
          onLeftClick={() => console.log('onLeftClick')}>
          Employer Profile
        </NavBar>
        <Avatar
          selectAvatar={(value)=>this.setState({avatar: value})}
          selected_avatar={this.state.avatar}/>
        <InputItem onClick={(value)=>this._handleChange('title', value)}>
          Position
        </InputItem>
        <InputItem onClick={(value)=>this._handleChange('company', value)}>
          Firm Name
        </InputItem>
        <InputItem onClick={(value)=>this._handleChange('salary', value)}>
          Salary
        </InputItem>
        <TextareaItem
          onClick={(value)=>this._handleChange('description', value)}
          title={'Description'}
          row={2}
          autoHeight={true}/>

      </div>
    )
  }
}


export default EmployerProfile
