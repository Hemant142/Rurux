import React from 'react'

import Cookies from "js-cookie";
import { Login } from './Login';

const PrivateRoutes = ({children}) => {
  const isAuth = Cookies.get("token")
  
  if(!isAuth){
    return <Login />
  }
  return (
    children
  )
}

export default PrivateRoutes