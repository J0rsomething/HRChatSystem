import React from 'react'
import {connect} from 'react-redux'



const mapStateToProps = state => ({
  ...state
})
const mapDispatchToProps = ({

})


class Message extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        Message List
        {this.props.userlist.userlist?
          this.props.userlist.userlist.map(item=>(
          <h3>{item.username}</h3>
        )):null
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message)
