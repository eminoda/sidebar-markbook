import React, { useEffect, useState } from 'react'
import { Checkbox, Button, Input, Row, Tooltip } from 'antd'
import { EditOutlined, PlusOutlined, CheckOutlined, CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import './TodoEditor.less'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckboxChangeEvent } from 'antd/es/checkbox'

interface TodoEventProps {
  todoId: number
  isFinished: boolean
  isEditor: boolean
  content: string
}

interface TodoListProps {
  [index: number]: TodoEventProps[]
}

interface TodoProps {
  id: number
  title: string
  color: string
  details: TodoListProps
}

const TodoEditor = () => {
  let location = useLocation()
  const [todoEvents, setTodoEvents] = useState<TodoEventProps[]>([])
  const [id, setId] = useState<number>(0)

  const updateTodoList = (todoEvents: TodoEventProps[]) => {
    ipc.invoke<boolean>('invoke-event', { eventName: 'updateTodoEventsById', data: { todoEvents, id } })
  }
  const getTodoEvents = async function () {
    ipc
      .invoke<TodoEventProps[]>('invoke-event', { eventName: 'getTodoEvents', data: id })
      .then((todoEvents: TodoEventProps[]) => {
        setTodoEvents(todoEvents)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // 判断路由参数
  useEffect(() => {
    if (location.state) {
      setId(location.state.id)
    } else {
      // 新增记录
      ipc
        .invoke<number>('invoke-event', { eventName: 'createTodoEvent' })
        .then((id: number) => {
          setId(id)
        })
        .catch((err) => {
          throw err
        })
    }
  }, [location])

  // 拉取任务列表
  useEffect(() => {
    if (id) {
      getTodoEvents()
    }
  }, [id])

  useEffect(() => {
    console.log(todoEvents)
    // 同步数据
    // ipc.invoke<boolean>('invoke-event', { eventName: 'updateTodoEventsById', data: { todoEvents, id } })
  }, [todoEvents])

  const addTodoItem = async function (event: React.ChangeEvent) {
    const todoEvent: TodoEventProps = {
      todoId: Date.now(),
      isFinished: false,
      content: '',
      isEditor: true,
    }
    const list = [...todoEvents, todoEvent]
    setTodoEvents(list)
    updateTodoList(list)
  }
  // 修改待做项的标记状态，显示编辑图标
  const onEditorStatusChange = (event: React.MouseEvent | React.FocusEvent, updateEvent: TodoEventProps, isEditor: boolean): void => {
    const list = todoEvents.map((item) => {
      if (item.todoId == updateEvent.todoId) {
        item.isEditor = isEditor
      }
      return item
    })
    setTodoEvents(list)
    updateTodoList(list)
    event.preventDefault()
  }
  const onCheckboxChange = (event: CheckboxChangeEvent, updateEvent: TodoEventProps) => {
    const list = todoEvents.map((item) => {
      if (item.todoId == updateEvent.todoId) {
        item.isFinished = event.target.checked
      }
      return item
    })
    setTodoEvents(list)
    updateTodoList(list)
  }
  // 同步更新输入框值到修改项
  const onEditorContentChange = (event: React.ChangeEvent<HTMLInputElement>, updateEvent: TodoEventProps) => {
    const content = event.target.value
    const list = todoEvents.map((item) => {
      if (item.todoId == updateEvent.todoId) {
        item.content = content
      }
      return item
    })
    setTodoEvents(list)
    updateTodoList(list)
  }

  const removeTodoEvent = (todoEvent: TodoEventProps) => {
    ipc.invoke<TodoEventProps[]>('invoke-event', { eventName: 'removeTodoEventById', data: { id, todoEvent } }).then((list) => {
      console.log(list)
      setTodoEvents(list)
    })
  }
  return (
    <div>
      <Row justify="start" align="middle" className="todo-editor-bar">
        <Tooltip title="添加新应用" placement="leftBottom">
          <PlusOutlined onClick={(e: React.MouseEvent) => addTodoItem(e)} />
        </Tooltip>
      </Row>
      <div className="todo-editor-content">
        {todoEvents.map((item) => {
          return (
            <Row key={item.todoId} justify="start" align="middle" className="todo-editor-content--line">
              <Row justify="start" align="middle" wrap={false}>
                <Checkbox disabled={!item.content} checked={item.isFinished} onChange={(e: CheckboxChangeEvent) => onCheckboxChange(e, item)}>
                  {item.isEditor && <Input placeholder="请输入新内容" value={item.content} onBlur={(event) => onEditorStatusChange(event, item, false)} onChange={(event) => onEditorContentChange(event, item)} />}
                  {!item.isEditor && <span onClick={(event) => onEditorStatusChange(event, item, true)}>{item.content}</span>}
                </Checkbox>
                {/* {!item.isEditor && <EditOutlined onClick={(event) => onEditorStatusChange(event, item, true)} />} */}
                {item.isEditor && (
                  <Button onClick={(event) => onEditorStatusChange(event, item, false)} size="small" type="primary" shape="round">
                    完成
                  </Button>
                )}
                {!item.isEditor && (
                  <MinusCircleOutlined
                    style={{ backgroundColor: '#ff4d4f', borderRadius: '50%' }}
                    onClick={() => {
                      removeTodoEvent(item)
                    }}
                  />
                )}
                {/* <Button icon={<MinusCircleOutlined />} shape="circle" size="small" danger></Button> */}
              </Row>
            </Row>
          )
        })}
      </div>
    </div>
  )
}
export default TodoEditor
export { type TodoEventProps, type TodoListProps, type TodoProps }
