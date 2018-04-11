import React from 'react'
import {connect} from 'react-redux'
import {List, InputItem} from 'antd-mobile'
import {getMessageList, sendMessage} from '../../reducer/chat_reducer'
const mapStateToProps = state => ({
  redux_state: state,
})
const mapDispatchToProps = ({
  getMessageList: getMessageList,
  sendMessage: sendMessage
})

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      message:[]
    }
  }

  componentDidMount() {
    this.props.getMessageList()
  }
  _handleSend = () => {
    const from = this.props.redux_state.user._id
    const to = this.props.match.params._id
    const content = this.state.text
    this.props.sendMessage({from, to, content})
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <div>
        {/* {this.state.message.map(item=>(
          <p key={item}>{item}</p>
        ))} */}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='Type a message...'
              value={this.state.text}
              onChange={value=>this.setState({text:value})}
              extra={<button style={{width:'30px'}} onClick={this._handleSend}>SEND</button>}>
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
