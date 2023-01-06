import React, { useEffect, useState } from 'react'
import './TodoEditor.less'
import { EditOutlined, CheckSquareOutlined } from '@ant-design/icons'
import { Checkbox, Col, Divider, Row } from 'antd'

interface todoItem {
  id: number
  isFinished: boolean
  content: string
  isEditor: boolean
}

const TodoEditor = () => {
  const [todoList, setTodoList] = useState<todoItem[]>([])
  const addTodoItem = () => {
    const item: todoItem = {
      id: Date.now(),
      isFinished: false,
      content: '',
      isEditor: false,
    }
    setTodoList([...todoList, item])
  }
  // const editTodoItem = (event: MouseEvent<HTMLDivElement, MouseEvent>, item: todoItem): void => {
  //   item.isEditor = true
  //   setTodoList(todoList)
  // }
  return (
    <div>
      <Row justify="start" align="middle" className="todo-editor-bar">
        <CheckSquareOutlined onClick={() => addTodoItem()} />
        <EditOutlined />
      </Row>
      <div className="todo-editor-content">
        {todoList.map((item) => {
          return (
            <Row justify="start" align="middle" className="todo-editor-content--line">
              <Checkbox key={item.id}>{item.content ? item.content : <EditOutlined />}</Checkbox>
            </Row>
          )
        })}
      </div>
    </div>
  )
}
export default TodoEditor
