import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {getUserList} from '../../reducer/user_list_reducer'
import UserCard from '../../component/usercard/usercard'


const mapStateToProps = (state) => ({
  userlist: state.userlist.userlist,
  user: state.user
})
const mapDispatchToProps = ({
  getUserList: getUserList
})
class Employer extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
      this.props.getUserList('Employee')
  }
  render() {
    return(
      <UserCard userlist={this.props.userlist}/>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employer)
