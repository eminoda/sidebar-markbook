import React, { useState, useEffect } from 'react'
import './TodoList.less'
import { Checkbox } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import test from './test.jpg'
import { todoItemProps } from '../TodoEditor/TodoEditor'

type todoItemUIProps = todoItemProps & { color: string }

const TodoList = (props: {}) => {
  const [list, setList] = useState<todoItemUIProps[]>([])
  // 获取待做事项列表
  const getTodoList = (): Promise<todoItemUIProps[]> => {
    return new Promise((resolve, reject) => {
      ipc
        .invoke<[]>('invoke-event', { eventName: 'fetch-todo-list' })
        .then((data: todoItemUIProps[]) => {
          console.log(data)
          resolve(data)
        })
        .catch((err) => {
          console.log(err)
          reject([])
        })
    })
  }

  useEffect(function () {
    getTodoList().then((list) => {
      setList(list)
    })
  }, [])
  return (
    <div className="todo-list">
      {list.map((item) => {
        const borderStyle = {
          border: `thin solid ${item.color}`,
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
          <div className="todo-list--item" style={borderStyle}>
            <div className="todo-list--item-bar" style={barStyle}></div>
            <div className="todo-list--item-title">Vaundy</div>
            <div className="todo-list--item-bg">
              <img src={test} alt="" style={bgStyle} />
            </div>
            <div className="todo-list--item-content">
              <Checkbox>踊り子</Checkbox>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TodoList
