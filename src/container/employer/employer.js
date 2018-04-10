import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {WingBlank, Card,WhiteSpace} from 'antd-mobile'
import {getUserList} from '../../reducer/user_list_reducer'

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
    this.state = {
      list: []
    }
  }

  componentDidMount() {
      this.props.getUserList('Employee')
  }
  render() {
    return(
      this.props.userlist?
      <WingBlank>
        <WhiteSpace />
          {this.props.userlist.map(item=>(
            <Card key={item._id}>
              <WhiteSpace />
              <Card.Header
                title={<b>{item.username}</b>}
                thumb={require(`../../../static/img/${item.avatar?item.avatar:'pig'}.png`)}
                extra={<span>{item.title||'No title'}</span>}
                />
                <Card.Body>
                  {item.description?
                    item.description.split('\n').map(s=>(<span key={s}>{s}</span>))
                    :'No self introduction'}
                </Card.Body>
            </Card>

          ))}
        </WingBlank>:
        <div></div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employer)
