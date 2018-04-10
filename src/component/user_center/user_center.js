import React from 'react'
import {connect} from 'react-redux'
import {Result, List,Brief,WhiteSpace,Modal, Button} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logout} from '../../reducer/user_reducer'
import {Redirect, withRouter} from 'react-router-dom'

const mapStateToProps = (state) =>({
	user: state.user
})

const mapDispatchToProps = ({
	logout: logout
})
class UserCenter extends React.Component {
	constructor() {
		super()
		this._handleLogout = this._handleLogout.bind(this)
	}

	_handleLogout() {
		console.log('logout')
		const alert = Modal.alert
		alert('Logout', 'Are you sure?', [
		      { text: 'Back', onPress: () => console.log('back') },
		      { text: 'Confirm', onPress: () => {
		      	browserCookie.erase('userid')
		      	this.props.logout()
						this.props.history.replace('login')
		      }}
		    ])
	}

	render() {
		const Item = List.Item
		const Brief = Item.Brief
		console.log(this.props.user.username)
		console.log(this.props.user.redirect_url)
		return (
			<div>
				<Result
					img={<img src={require(`../../../static/img/${this.props.user.avatar||'pig'}.png`)} style={{width:50}} alt="" />}
					title={this.props.user.username}
					message={this.props.user.type=='Employer'?this.props.user.company:null}/>
				<List renderHeader={()=>'General Info'}>
					<Item multipleLine>
						{this.props.user.title}
						{this.props.user.description?this.props.user.description.split('\n').map(v=><Brief key={v}>{v}</Brief>):null}
						{this.props.user.salary?<Brief>Salary:{this.props.user.salary}</Brief>:null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<WhiteSpace></WhiteSpace>
				<WhiteSpace></WhiteSpace>
				<WhiteSpace></WhiteSpace>
				<Button type='primary' onClick={this._handleLogout}>LOGOUT</Button>
			</div>)
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps)(withRouter(UserCenter))
