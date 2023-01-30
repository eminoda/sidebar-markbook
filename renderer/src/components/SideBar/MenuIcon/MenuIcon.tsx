import React, { useState } from 'react'
import './MenuIcon.less'
import { FolderOutlined, SettingOutlined } from '@ant-design/icons'

enum MenuTypeEnum {
  SETTING_ICON = 'SettingOutlined',
  MORE_ICON = 'FolderOutlined',
  CUSTOMER_ICON = '',
}
interface MenuIconProps {
  id: string | number
  parentId?: string | number
  name: string
  icon?: string
  url?: string
  type: MenuTypeEnum
  level: number
}
const MenuIcon: React.FC<MenuIconProps> = (props) => {
  let childJSX: React.ReactElement = <></>

  const handleMenuIcon = (props: MenuIconProps) => {
    if (props.name == '记事本') {
      ipc
        .invoke('invoke-event', {
          eventName: 'openWindow',
          data: {
            windowName: 'todo',
          },
        })
        .then((data) => {
          console.log(data)
        })
    } else if (props.type == '') {
      ipc
        .invoke('invoke-event', {
          eventName: 'openWindow',
          data: {
            windowName: 'browser',
          },
        })
        .then((data) => {
          console.log(data)
        })
    }
  }
  switch (props.type) {
    case MenuTypeEnum.MORE_ICON:
      childJSX = <FolderOutlined className="icon-img" />
      break
    case MenuTypeEnum.SETTING_ICON:
      childJSX = <SettingOutlined className="icon-img" />
      break
    case MenuTypeEnum.CUSTOMER_ICON:
      childJSX = <img src={props.icon} alt={props.name} onClick={() => handleMenuIcon(props)} />
      break
  }
  return (
    <div className="icon-item" id={String(props.id)}>
      {childJSX}
    </div>
  )
}

export { MenuTypeEnum, type MenuIconProps }
export default MenuIcon
