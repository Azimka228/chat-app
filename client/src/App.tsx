import React from 'react'
import './App.css'
import Header from './components/header/header'
import Content from './components/content/content'

function App() {
  const user = false


  return (
    <div className="App">
      <Header user={user}/>
      <Content user={user}/>
    </div>
  )
}

export default App
