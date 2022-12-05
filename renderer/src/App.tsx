import React from 'react'
import { useState, MouseEvent } from 'react'
import './App.css'
import SideLine from './components/SideLine'
import SideBar from './components/SideBar'

function App () {
  const [isHover, setHover] = useState(false)

  const handleMouseOver = (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation()
    setHover(true)

  }

  const handleMouseOut = (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation()
    setHover(false)
    // setHover(true)
  }

  return (
    <React.Fragment>
      {!isHover && <SideLine handleMouseOver={handleMouseOver} />}
      {isHover && <SideBar handleMouseOut={handleMouseOut} />}
    </React.Fragment>
  )
}

export default App
