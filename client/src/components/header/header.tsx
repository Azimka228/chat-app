import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props:any) => {

  return (
    <div>
      {props.user ? (
        <div>Log out</div>
      ) : (
        <div>
          <Link to="/sign-in">Sign in</Link>
          <Link to="/sign-up">Sign up</Link>
        </div>
      )}
    </div>
  )
}

export default Header
