import React from 'react'
import {connect} from 'react-redux'
import {TabBar, NavBar} from 'antd-mobile'
import NavList from '../../component/navlist/navlist'
import Employer from '../../component/employer/employer'
import Employee from '../../component/employee/employee'
import {Route, Switch} from 'react-router-dom'
import UserCenter from '../../component/user_center/user_center'
import {getMessageList, receiveMessage,setUserId} from '../../reducer/chat_reducer'
import {getUserList} from '../../reducer/user_list_reducer'
import Message from '../../component/message/message'
const mapStateToProps = state => ({
  user: state.user,
  chat: state.chat
})

const mapDispatchToProps = ({
  getMessageList,
  receiveMessage,
  setUserId,
  getUserList
})

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state={
      type: '',
      current_tab: ''
    }
  }

  //componentDidMount is executed before /user/info response data,
  //when asyc function get data from server, have to use this func to update state
  componentWillReceiveProps(newProps) {
    if(this.props.user !== newProps.user) {
      this.props.getUserList(newProps.user.type==='Employer'?'Employee':'Employer')
      this.props.setUserId(newProps.user._id)
      this.setState({
        type: newProps.user.type,
        current_tab: this.props.location.pathname
      })

    }
  }
  componentDidMount() {
    if(!this.props.chat.chat_message.length) {
      this.props.getMessageList()
      this.props.receiveMessage()
    }
  }



  render() {
    const {pathname} = this.props.location
    const {user} = this.props
    const navList = [
			{
        //for employer
				path:'/employer',
				text:'Employee',
				icon:'boss',
        //for heading navbar
				title:'Employee List',
				component: Employer,
				hide:user.type=='Employee'
			},
			{
        //for employee
				path:'/employee',
				text:'Employer',
				icon:'job',
				title:'Employer List',
				component:Employee,
				hide:user.type == 'Employer'
			},
			{
				path:'/message',
				text:'Message',
				icon:'msg',
				title:'Message',
				component: Message
			},
			{
				path:'/me',
				text:'Me',
				icon:'user',
				title:'Me',
				component: UserCenter
			}
		].filter(item=>!item.hide)
    return(
      this.props.user.type?
      <div>
        <NavBar
          className='fixd-header'
          mode='dard'>
          {navList.find(v=>v.path==pathname).title}
        </NavBar>
        <div style={{marginTop:'45px'}}>
          <Switch>
            {navList.map((item)=>(
                <Route key={item.text} path={item.path} component={item.component}></Route>))
            }
          </Switch>
        </div>
        <NavList
          data={navList}
          currentTab={this.props.location.pathname}
          onPress={(value)=>{this.setState({current_tab:value})}}></NavList>
      </div>:<div></div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
