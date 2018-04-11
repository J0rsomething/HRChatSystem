import React from 'react'
import {WingBlank, Card,WhiteSpace} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class UserCard extends React.Component {

  _handleClick = item => {
    console.log(item)
    this.props.history.push(`/chat/${item._id}`)
  }
  render() {
    return (
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
                {item.type == 'Employer'? <WingBlank><span>Company: {item.company}</span></WingBlank>: <div></div>}
                <button  style={{border:'1px solid grey'}} onClick={()=>this._handleClick(item)}>Chat Now</button>
                <Card.Body>
                  {item.description?
                    item.description.split('\n').map(s=>(<p key={s}>{s}</p>))
                    :'No self introduction'}
                  {item.type == 'Employer'? <span>Salary: {item.salary}</span>: <div></div>}
                </Card.Body>
            </Card>

          ))}
        </WingBlank>
    )
  }
}

export default withRouter(UserCard)
