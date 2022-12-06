import React from 'react'
import { useState } from 'react'
import './MenuIcon.less'
import { Tooltip, Popover } from 'antd'
import { FolderOutlined, SettingOutlined } from '@ant-design/icons'

enum MenuType {
  SETTING_ICON = 'SettingOutlined',
  MORE_ICON = 'FolderOutlined',
  CUSTOMER_ICON = '',
}
interface MenuIconProps {
  name: string
  icon?: string
  url?: string
  type: MenuType
  level: number
  children?: MenuIconProps[]
}
function MenuIcon(props: MenuIconProps) {
  const [curLevel, setCurLevel] = useState(0)
  const changeWinWidth = (level: number, open: boolean) => {
    console.log(curLevel, level, level, open)
    // 同级移动不改变窗体大小

    setCurLevel(level)
    if (open) {
      if (level > curLevel) {
        ipc.send('win-change', { type: 'in', width: 100 })
      } else if (level < curLevel && curLevel > 0) {
        ipc.send('win-change', { type: 'out', width: -100 })
      }
    } else {
      if (curLevel == level) {
        ipc.send('win-change', { type: 'out', width: -100 })
      }
      // if (level > curLevel) {
      //   ipc.send('win-change', { type: 'in', width: 100 })
      // } else {
      // }
    }
  }
  let childJSX: JSX.Element = <></>

  // 单个书签图标展示
  if (!props.children || props.children.length == 0) {
    // 设置图标
    if (props.type == MenuType.SETTING_ICON) {
      childJSX = <SettingOutlined className="icon-img" />
    }
    // 自定义图标
    else if (props.type == MenuType.CUSTOMER_ICON) {
      childJSX = (
        <Tooltip placement="rightTop" color="#2db7f5" title={props.name}>
          <img src={props.icon} alt={props.name} />
        </Tooltip>
      )
    } else {
      return <></>
    }
  }
  // 子级菜单
  else if (props.type == MenuType.MORE_ICON) {
    const childSideBar = (
      <div className="child-menus">
        {props.children.map((_item, index) => (
          <div className="icon-item" key={index}>
            <Tooltip placement="rightTop" color="#2db7f5" title={_item.name} onOpenChange={(open) => changeWinWidth(_item.level, open)}>
              <img src={_item.icon} alt={_item.name} />
            </Tooltip>
          </div>
        ))}
      </div>
    )
    childJSX = (
      <Popover placement="rightTop" content={childSideBar} trigger="hover" onOpenChange={(open) => changeWinWidth(props.level, open)}>
        <FolderOutlined className="icon-img" />
      </Popover>
    )
  }
  return <div className="icon-item">{childJSX}</div>
}

export { MenuType }
export type MenuIconPropsType = MenuIconProps
export default MenuIcon
