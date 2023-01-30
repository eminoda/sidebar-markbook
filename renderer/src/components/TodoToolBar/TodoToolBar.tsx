import './TodoToolBar.less'
import React, { useState } from 'react'
import { PlusOutlined, LeftOutlined, CloseOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const TodoToolBar = (props: {}) => {
  const [showBackIcon, setShowBackIcon] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const closeWin = (windowName: string) => {
    ipc
      .invoke<boolean>('invoke-event', { eventName: 'closeWindow', data: { windowName } })
      .then((data: boolean) => {})
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    setShowBackIcon(location.pathname == '/todo/editor')
  }, [location])
  return (
    <div className="todo-control">
      {showBackIcon && (
        <LeftOutlined
          className="todo-control-icon"
          onClick={() => {
            navigate(-1)
          }}
        />
      )}
      {!showBackIcon && (
        <PlusOutlined
          className="todo-control-icon"
          onClick={() => {
            navigate('/todo/editor')
          }}
        />
      )}
      <CloseOutlined className="todo-control-icon todo-control-icon--close" onClick={() => closeWin('todo')} />
    </div>
  )
}
export default TodoToolBar
