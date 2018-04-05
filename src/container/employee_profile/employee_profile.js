import React from 'react'
import { NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import Avatar from '../../component/Avatar/Avatar'
import {connect} from 'react-redux'
import {updateData} from '../../reducer/user_reducer'
import {Redirect} from 'react-router-dom'

const mapStatetoProps = (state) => ({
  user: state.user
})
const mapDispatchtoProps = ({
  updateData
})

class EmployeeProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
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
    // const current_path = this.props.location.pathname
    // const redirect_url = this.props.user.redirect_url
    return (
      <div>
        {this.props.user.redirect_url?<Redirect to={this.props.user.redirect_url}/>:null}
        <NavBar
          mode="light"
          onLeftClick={() => console.log('onLeftClick')}>
          Employee Profile
        </NavBar>
        <Avatar
          selectAvatar={(value)=>this.setState({avatar: value})}
          selected_avatar={this.state.avatar}/>
        <InputItem onChange={(value)=>this._handleChange('title', value)}>
          Wish:
        </InputItem>
        <TextareaItem
          onChange={(value)=>this._handleChange('description', value)}
          title={'Resumé'}
          row={2}
          autoHeight={true}/>
        <Button type='primary' onClick={() => this.props.updateData(this.state)}>Update</Button>
      </div>
    )
  }
}


export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(EmployeeProfile)
