import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {connect} from 'react-redux'
import {loadData} from '../../reducer/user_reducer'

const mapDispatchtoProps = ({
  loadData: loadData
})

class AuthRoute extends React.Component {
  componentDidMount() {
    //browser shouldn't redirect when user trys to reach '/login' or '/signup'
    //regardless of login status
    const no_redirect_list = ['/login', '/signup']
    const pathname = this.props.history.pathname
    if(no_redirect_list.indexOf(pathname)>-1) {
      return null
    }
    axios.get('/user/info').
    then(res=> {
      if(res.data.code === 0) {
        // login verified
        console.log('cookie data got: ')
        console.log(res.data.data)
        this.props.loadData(res.data.data)
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
export default connect(
  null,
  mapDispatchtoProps)(withRouter(AuthRoute))
