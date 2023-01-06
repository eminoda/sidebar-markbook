import './Todo.less'
import React from 'react'
import { Checkbox } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

import { Outlet } from 'react-router-dom'
import TodoToolBar from '../../components/TodoToolBar/TodoToolBar'
const Todo = (props: {}) => {
  const navigate = useNavigate()
  return (
    <div className="todo">
      {/* toolbar */}
      <TodoToolBar />
      {/* 日期任务 */}
      <Outlet />
    </div>
  )
}
export default Todo
