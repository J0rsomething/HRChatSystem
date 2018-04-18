import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import UserCard from '../../component/usercard/usercard'

const mapStateToProps = (state) => ({
  userlist: state.userlist.userlist,
  user: state.user
})
const mapDispatchToProps = ({
  
})
class Employee extends React.Component {
  constructor() {
    super()
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
)(Employee)
