import React from 'react'
import {connect} from 'react-redux'
import {TabBar, NavBar} from 'antd-mobile'
import NavList from '../../component/navlist/navlist'
import Employer from '../employer/employer'
import {Route, Switch} from 'react-router-dom'
const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = ({

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
    if(this.props.user.type !== newProps.user.type) {
      this.setState({
        type: newProps.user.type,
        current_tab: this.props.location.pathname
      })
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
				component:()=><h1>Employer List</h1>,
				hide:user.type == 'Employer'
			},
			{
				path:'/message',
				text:'Message',
				icon:'msg',
				title:'Message',
				component:()=><h1>Messages Chat</h1>
			},
			{
				path:'/me',
				text:'Me',
				icon:'user',
				title:'Me',
				component: ()=><h1>About Me</h1>
			}
		].filter(item=>!item.hide)
    return(
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
          currentTab={this.state.current_tab}
          onPress={(value)=>{this.setState({current_tab:value})}}></NavList>
      </div>)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
