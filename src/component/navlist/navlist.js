import React from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const NavList = ({data, currentTab, onPress, history}) => (
  <div>
    {currentTab?
      <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            {
              data.map(item=>
              <TabBar.Item
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
          </TabBar>: <div></div>
    }

  </div>
)
export default withRouter(NavList)
