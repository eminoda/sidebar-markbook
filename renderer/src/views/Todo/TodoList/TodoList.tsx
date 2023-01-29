import React, { useState, useEffect } from 'react'
import './TodoList.less'
import { Row, Col, Checkbox, Popover, Drawer } from 'antd'
import { UnorderedListOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons'
import test from './test.jpg'
import { TodoEventProps } from '../TodoEditor/TodoEditor'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom'
interface todoItemUIProps {
  id: number
  color: string
  title: string
  details: TodoEventProps[]
}

const TodoList = (props: {}) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [list, setList] = useState<todoItemUIProps[]>([])
  const [showMoreMenus, setShowMoreMenus] = useState<boolean>(false)
  const [current, setCurrent] = useState<todoItemUIProps | null>(null)
  // 获取待做事项列表
  const getTodoList = (): Promise<todoItemUIProps[]> => {
    return new Promise((resolve, reject) => {
      ipc
        .invoke<[]>('invoke-event', { eventName: 'getTodoList' })
        .then((data: todoItemUIProps[]) => {
          resolve(data)
        })
        .catch((err) => {
          console.log(err)
          reject([])
        })
    })
  }
  const changeTodoEditorStatus = (event: CheckboxChangeEvent, todoUIItem: todoItemUIProps, todoItem: TodoEventProps): void => {
    const checked = event.target.checked
    const newList = list.map((item) => {
      // 匹配父级
      if (item.id == todoUIItem.id) {
        item.details = item.details.map((_item) => {
          // 匹配子级
          if (_item.todoId == todoItem.todoId) {
            _item.isFinished = checked
          }
          return _item
        })
      }
      return item
    })
    ipc
      .invoke<[]>('invoke-event', { eventName: 'updateTodoList', data: newList })
      .then((data: todoItemUIProps[]) => {
        setList(newList)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const triggleMoreMenu = (item: todoItemUIProps) => {
    // drawer 已打开
    if (current && item.id == current.id) {
      setCurrent(null)
      setShowMoreMenus(false)
      return
    }
    setCurrent(item)
    setShowMoreMenus(true)
  }
  const navigateEditor = (id: number) => {
    navigate('/todo/editor', { state: { id } })
  }
  const deleteTodoItem = (id: number) => {
    ipc.invoke<todoItemUIProps[]>('invoke-event', { eventName: 'removeTodoById', data: id }).then((list) => {
      setCurrent(null)
      setList(list)
    })
  }
  useEffect(function () {
    getTodoList().then((list) => {
      setList(list)
    })
  }, [])
  return (
    <div className="todo-list">
      {current && (
        <Drawer
          rootClassName="drawer-more-menu"
          width={45}
          maskClosable={true}
          closable={false}
          onClose={() => {
            setCurrent(null)
            setShowMoreMenus(false)
          }}
          getContainer={current ? '.todo-list--item-content.anchor' + current.id : false}
          contentWrapperStyle={{ padding: 0 }}
          placement="right"
          open={showMoreMenus}
        >
          <div className="operator-icon edit">
            <FormOutlined
              onClick={() => {
                navigateEditor(current.id)
              }}
            />
          </div>
          <div className="operator-icon delete">
            <DeleteOutlined
              onClick={() => {
                deleteTodoItem(current.id)
              }}
            />
          </div>
        </Drawer>
      )}
      {list.map((item, index) => {
        const borderStyle = {
          border: `thin solid ${item.color}`,
          borderTop: 'none',
        }
        const barStyle = {
          backgroundColor: `${item.color}`,
        }
        const bgStyle = {
          // WebkitMaskImage: `-webkit-gradient(linear, right bottom, 10% 100%, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))`
          // WebkitMaskImage: `-webkit-gradient(linear, 80% 50%, 10% 50%, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))`,
          WebkitMaskImage: `linear-gradient(to left, black, transparent)`,
        }
        return (
          <div className="todo-list--item" style={borderStyle} key={item.id}>
            <div className="todo-list--item-bar" style={barStyle}></div>
            <div className="todo-list--item-title">
              {item.title}
              <UnorderedListOutlined className="more-icon" onClick={() => triggleMoreMenu(item)} onMouseEnter={() => triggleMoreMenu(item)} />
            </div>
            {/* <div className="todo-list--item-bg">
              <img src={test} alt="" style={bgStyle} />
            </div> */}
            <div className={'todo-list--item-content anchor' + item.id}>
              {item.details.map((_item) => {
                return (
                  <Row key={_item.todoId} justify="start" align="middle">
                    <Checkbox checked={_item.isFinished} onChange={(e: CheckboxChangeEvent) => changeTodoEditorStatus(e, item, _item)}>
                      {_item.content}
                    </Checkbox>
                  </Row>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TodoList
