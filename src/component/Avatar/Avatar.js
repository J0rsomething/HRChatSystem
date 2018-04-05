import React from 'react'
import {Grid, List} from 'antd-mobile'
//import PropTypes from 'prop-types'

const avatar_list = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                    .split(',')
                    .map(v=>({
                      icon:require(`../../../static/img/${v}.png`),
                      text:v
                    }))
const grid_header = (selected) => {
  return selected?
    <div>
      <span>Avatar Selected</span>
      <img style={{width:20}} src={require(`../../../static/img/${selected}.png`)} alt=""/>
    </div>:
    'Please Select Avatar'
}

const Avatar = ({selectAvatar,selected_avatar}) => (
  <div>
    {console.log(selected_avatar)}
    <List renderHeader={()=>grid_header(selected_avatar)}>
      <Grid
        data={avatar_list}
        columnNum={5}
        onClick={e=>{
          selectAvatar(e.text)
        }}
      />
    </List>
  </div>
)

export default Avatar
