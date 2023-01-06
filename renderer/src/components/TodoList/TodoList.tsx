import React from 'react'
import './TodoList.less'
import { Checkbox } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'
import test from './test.jpg'
const colors = [
  { bar: '#434343', line: '' },
  { bar: '#1677ff', line: '' },
  { bar: '#eb2f96', line: '' },
  { bar: '#722ed1', line: '' },
  { bar: '#13c2c2', line: '' },
  { bar: '#52c41a', line: '' },
  { bar: '#fadb14', line: '' },
]
const TodoList = (props: {}) => {
  return (
    <div className="todo-list">
      {colors.map((color) => {
        const borderStyle = {
          border: `thin solid ${color.bar}`,
        }
        const barStyle = {
          backgroundColor: `${color.bar}`,
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
            <div className="todo-list--item-content">
              <Checkbox>怪獣の花唄</Checkbox>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default TodoList
