import React from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


const mapStateToProps = state => ({
  chat: state.chat
})
const mapDispatchToProps = ({

})

const NavList = ({data, currentTab, onPress, history, chat}) => (
  <div>
      <TabBar
        className='am-tab-bar'
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white">
        {
          data.map(item=>
          <TabBar.Item
            badge={item.path ==='/message'? chat.unread:0}
            title={item.text}
            key={item.text}
            icon={{uri: require(`./img/${item.text}.png`)}}
            selectedIcon={{uri: require(`./img/${item.text}-active.png`)}}
            selected={currentTab == item.path}
            onPress={()=>{
              history.push(item.path)
              onPress(item.path)
            }}
          />)
        }
      </TabBar>
  </div>
)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavList))
