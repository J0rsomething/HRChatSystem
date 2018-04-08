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
                selected={currentTab == item.text}
                //badge={1}
                onPress={()=>{
                  history.push(item.path)
                  onPress(item.text
                )}}
                //data-seed="logId"
              >
              {item.component}
              </TabBar.Item>)
            }

          </TabBar>: <div></div> 
    }

  </div>
)
export default withRouter(NavList)
