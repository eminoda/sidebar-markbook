import React from 'react'
import { useState, MouseEvent } from 'react'
import './App.css'
import SideLine from './components/SideLine'
import SideBar from './components/SideBar/SideBar'
import debounce from 'lodash/debounce'
function App() {
  const [isBar, setBar] = useState(true)

  const slowHideSideBar = debounce(() => {
    // setBar(false)
  }, 2 * 1000)

  const handleMouseIn = (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation()
    setBar(true)
  }

  const handleMouseOut = (e: MouseEvent<HTMLDivElement, MouseEvent>): void => {
    e.stopPropagation()
    slowHideSideBar()
  }

  return (
    <React.Fragment>
      {isBar && <SideBar handleMouseOut={handleMouseOut} />}
      {!isBar && <SideLine handleMouseIn={handleMouseIn} />}
    </React.Fragment>
  )
}

export default App
