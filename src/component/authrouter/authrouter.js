import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
class AuthRoute extends React.Component {
  componentDidMount() {
    axios.get('/user/info').
    then(res=> {
      if(res.data.code == 0) {
        // login verified
      } else {
        //no login data on server
        this.props.history.push('/login')
      }

    })
  }
  render() {
    return (
      <div></div>
    )
  }
}
export default withRouter(AuthRoute)
