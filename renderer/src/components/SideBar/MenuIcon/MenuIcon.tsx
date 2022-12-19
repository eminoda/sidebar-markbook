import React, { useState } from 'react'
import './MenuIcon.less'
import { FolderOutlined, SettingOutlined } from '@ant-design/icons'

enum MenuType {
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
  type: MenuType
  level: number
}
const MenuIcon: React.FC<MenuIconProps> = (props) => {
  let childJSX: React.ReactElement = <></>

  switch (props.type) {
    case MenuType.MORE_ICON:
      childJSX = <FolderOutlined className="icon-img" />
      break
    case MenuType.SETTING_ICON:
      childJSX = <SettingOutlined className="icon-img" />
      break
    case MenuType.CUSTOMER_ICON:
      childJSX = <img src={props.icon} alt={props.name} />
      break
  }
  return <div className="icon-item">{childJSX}</div>
}

export { MenuType, type MenuIconProps }
export default MenuIcon
