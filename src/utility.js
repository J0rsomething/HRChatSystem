const redirect = ({type, avatar}) => {
  let url = (type ==='Employer')? '/employer': 'employee'
  if(!avatar) {
    url += '_profile'
  }
  return url
}
export {redirect}
