import React, { useEffect, useState } from 'react'
import { Checkbox, Input, Row, Tooltip } from 'antd'
import { EditOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons'
import './TodoEditor.less'

interface todoItemProps {
  id: number
  isFinished: boolean
  isEditor: boolean
  content: string
}

const TodoEditor = () => {
  const [todoList, setTodoList] = useState<todoItemProps[]>([])
  const addTodoItem = (event: React.ChangeEvent): void => {
    const item: todoItemProps = {
      id: Date.now(),
      isFinished: false,
      content: '',
      isEditor: false,
    }
    setTodoList([...todoList, item])
  }
  // 修改待做项的标记状态，显示编辑图标
  const onEditorStatusChange = (event: React.MouseEvent | React.FocusEvent, updateTodoItem: todoItemProps, isEditor: boolean): void => {
    setTodoList(
      todoList.map((item) => {
        if (item.id == updateTodoItem.id) {
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
        if (item.id == updateTodoItem.id) {
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
            <Row key={item.id} justify="start" align="middle" className="todo-editor-content--line">
              <Row justify="start" align="middle">
                <Checkbox disabled={!item.content}>
                  {item.isEditor && <Input placeholder="请输入新内容" value={item.content} onBlur={(event) => onEditorStatusChange(event, item, false)} onChange={(event) => onEditorContentChange(event, item)} />}
                  {!item.isEditor && <span onClick={(event) => onEditorStatusChange(event, item, true)}>{item.content}</span>}
                </Checkbox>
                <EditOutlined onClick={(event) => onEditorStatusChange(event, item, true)} />
                {item.isEditor && <CheckOutlined onClick={(event) => onEditorStatusChange(event, item, false)} style={{ paddingLeft: '10px' }} />}
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
