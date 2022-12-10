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
  parentId?: string | number,
  name: string
  icon?: string
  url?: string
  type: MenuType
  level: number
  subMenuIcons?: MenuIconProps[]
}
const MenuIcon: React.FC<MenuIconProps> = (props) => {
  let childJSX: React.ReactElement = <></>

  // 单个书签图标展示
  if (!props.subMenuIcons || props.subMenuIcons.length == 0) {
    // 设置图标
    if (props.type == MenuType.SETTING_ICON) {
      childJSX = <SettingOutlined className="icon-img" />
    }
    // 自定义图标
    else if (props.type == MenuType.CUSTOMER_ICON) {
      childJSX = <img src={props.icon} alt={props.name} />
      // childJSX = (
      //   <Tooltip placement="rightTop" color="#2db7f5" title={props.name}>
      //     <img src={props.icon} alt={props.name} />
      //   </Tooltip>
      // )
    } else {
      return <></>
    }
  }
  // 子级菜单
  else if (props.type == MenuType.MORE_ICON) {
    childJSX = (
      <FolderOutlined className="icon-img" />
    )
  }
  return <div className="icon-item">{childJSX}</div>
}

export { MenuType }
export type MenuIconPropsType = MenuIconProps
export default MenuIcon
