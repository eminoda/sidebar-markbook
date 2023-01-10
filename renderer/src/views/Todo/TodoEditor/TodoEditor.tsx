import React, { useEffect, useState } from 'react'
import { Checkbox, Button, Input, Row, Tooltip } from 'antd'
import { EditOutlined, PlusOutlined, CheckOutlined, CheckCircleOutlined } from '@ant-design/icons'
import './TodoEditor.less'
import { useNavigate, useLocation } from 'react-router-dom'

interface todoItemProps {
  todoId: number
  isFinished: boolean
  isEditor: boolean
  content: string
}

const TodoEditor = () => {
  let location = useLocation()
  const [todoList, setTodoList] = useState<todoItemProps[]>([])

  useEffect(() => {
    const id = location.state.id
    ipc
      .invoke<todoItemProps[]>('invoke-event', { eventName: 'get-todo-list', data: id })
      .then((data: todoItemProps[]) => {
        console.log(data)
        setTodoList(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const addTodoItem = (event: React.ChangeEvent): void => {
    const item: todoItemProps = {
      todoId: Date.now(),
      isFinished: false,
      content: '',
      isEditor: true,
    }
    setTodoList([...todoList, item])
  }
  // 修改待做项的标记状态，显示编辑图标
  const onEditorStatusChange = (event: React.MouseEvent | React.FocusEvent, updateTodoItem: todoItemProps, isEditor: boolean): void => {
    setTodoList(
      todoList.map((item) => {
        if (item.todoId == updateTodoItem.todoId) {
          item.isEditor = isEditor
        }
        return item
      })
    )
    event.preventDefault()
  }
  // 同步更新输入框值到修改项
  const onEditorContentChange = (event: React.ChangeEvent<HTMLInputElement>, updateTodoItem: todoItemProps) => {
    const content = event.target.value
    setTodoList(
      todoList.map((item) => {
        if (item.todoId == updateTodoItem.todoId) {
          item.content = content
        }
        return item
      })
    )
  }
  return (
    <div>
      <Row justify="start" align="middle" className="todo-editor-bar">
        <Tooltip title="添加新应用" placement="leftBottom">
          <PlusOutlined onClick={(e: React.MouseEvent) => addTodoItem(e)} />
        </Tooltip>
      </Row>
      <div className="todo-editor-content">
        {todoList.map((item) => {
          return (
            <Row key={item.todoId} justify="start" align="middle" className="todo-editor-content--line">
              <Row justify="start" align="middle">
                <Checkbox disabled={!item.content} checked={item.isFinished}>
                  {item.isEditor && <Input placeholder="请输入新内容" value={item.content} onBlur={(event) => onEditorStatusChange(event, item, false)} onChange={(event) => onEditorContentChange(event, item)} />}
                  {!item.isEditor && <span onClick={(event) => onEditorStatusChange(event, item, true)}>{item.content}</span>}
                </Checkbox>
                {!item.isEditor && <EditOutlined onClick={(event) => onEditorStatusChange(event, item, true)} />}
                {item.isEditor && (
                  <Button onClick={(event) => onEditorStatusChange(event, item, false)} size="small" type="primary" shape="round">
                    完成
                  </Button>
                )}
              </Row>
            </Row>
          )
        })}
      </div>
    </div>
  )
}
export default TodoEditor
export { type todoItemProps }
