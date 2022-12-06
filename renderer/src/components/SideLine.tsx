import React from 'react'
import { useState } from 'react'
import './SideLine.less'

function SideLine(props: { handleMouseIn: any }) {
  const [count, setCount] = useState(0)

  const $body = document.getElementsByTagName('html')[0]
  console.log($body)
  $body.addEventListener('mouseenter', function () {
    console.log('mouseenter')
    ipc.send('win-change', { type: 'in' })
  })
  $body.addEventListener('mouseleave', function () {
    console.log('mouseleave')
    ipc.send('win-change', { type: 'out' })
  })
  return <div className="side-line" onMouseOver={props.handleMouseIn}></div>
}

export default SideLine
