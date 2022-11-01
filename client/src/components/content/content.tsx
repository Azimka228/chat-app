import React from 'react'
import Chat from './chat/сhat'
import { Route, Routes } from 'react-router-dom'
import SignIn from './User/sign-in/sign-in'

const Content = (props:any) => {

  return (
    <div>
      {props.user ? (
        <Chat />
      ) : (
        <Routes>
          <Route path="/" element={<div>Home</div>}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
        </Routes>
      )}
    </div>
  )
}

export default Content
