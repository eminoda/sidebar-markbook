import React, { useState } from 'react'
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
  subMenuIcons?: MenuIconProps[]
}
const MenuIcon: React.FC<MenuIconProps> = (props) => {
  const [curLevel, setCurLevel] = useState(0)

  const test = () => {
    console.log(123)
  }
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
    const childSideBar = (
      <div className="child-menus">
        {props.subMenuIcons.map((_item, index) => (
          <div className="icon-item" key={index}>
            {/* <Tooltip placement="rightTop" trigger="click" color="#2db7f5" title={_item.name} onOpenChange={(open: boolean) => changeWinWidth(_item.level, open)}>
              <img src={_item.icon} alt={_item.name} />
            </Tooltip> */}
            <img src={_item.icon} alt={_item.name} />
          </div>
        ))}
      </div>
    )
    childJSX = (
      // <Popover placement="rightTop" trigger="click" content={childSideBar}>
      //   <FolderOutlined className="icon-img" />
      // </Popover>
      <FolderOutlined className="icon-img" />
    )
  }
  return <div className="icon-item">{childJSX}</div>
}

export { MenuType }
export type MenuIconPropsType = MenuIconProps
export default MenuIcon
