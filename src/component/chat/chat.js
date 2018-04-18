import React from 'react'
import {connect} from 'react-redux'
import {List, InputItem, NavBar} from 'antd-mobile'
import {getMessageList, sendMessage, receiveMessage, setUserId} from '../../reducer/chat_reducer'
import {withRouter} from 'react-router-dom'
const mapStateToProps = state => ({
  chat: state.chat,
  user: state.user
})
const mapDispatchToProps = ({
  getMessageList: getMessageList,
  sendMessage: sendMessage,
  receiveMessage: receiveMessage,
  setUserId: setUserId
})

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      message:[]
    }
  }
  componentWillReceiveProps(newProps) {
    if(this.props.user !== newProps.user) {
      this.props.setUserId(newProps.user._id)
    }
  }
  componentDidMount() {
    if(this.props.chat&&!this.props.chat.chat_message.length) {
      this.props.getMessageList()
      this.props.receiveMessage()
    }
  }
  _handleSend = () => {
    const from = this.props.user._id
    const to = this.props.match.params._id
    const content = this.state.text
    this.props.sendMessage({from, to, content})
    console.log(`send message: ${content}`)
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <div id='chat-page'>
        <NavBar
          className='fixd-header'
          mode='dark'
          leftContent='<Back'
          onLeftClick={()=>this.props.history.goBack()}
          >{this.props.match.params._id}</NavBar>
        {this.props.chat.chat_message.map(item=>{
          return this.props.user._id !== item.from? (
            <List key={item._id}>
              <List.Item>{item.content}</List.Item>
            </List>
          ):(
            <List key={item._id}>
              <List.Item className='chat-me'>{item.content}</List.Item>
            </List>
          )
        })}
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='Type a message...'
              value={this.state.text}
              onChange={value=>this.setState({text:value})}
              extra={<button style={{width:'60px'}} onClick={this._handleSend}>SEND</button>}>
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
)(withRouter(Chat))
