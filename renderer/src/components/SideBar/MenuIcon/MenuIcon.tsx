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
  children?: MenuIconProps[]
}
function MenuIcon(props: MenuIconProps) {
  const [count, setCount] = useState(0)
  const [menus] = useState([
    { name: 'npm', icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', url: '' },
    { name: '语雀', icon: 'https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*LmuNQ6eMk3gAAAAAAAAAAAAADvuFAQ/original', url: '' },
    { name: 'vite', icon: 'https://cn.vitejs.dev/logo.svg', url: '' },
    { name: '语雀', icon: 'https://via.placeholder.com/50x50', url: '' },
    { name: '语雀', icon: '', url: '', children: [] },
    { name: '语雀', icon: '', url: '', children: [] },
  ])
  //   const $body = document.getElementsByTagName('html')[0]
  //   $body.addEventListener('mouseenter', function () {
  //     console.log('mouseenter')
  //     ipc.send('win-change', { type: 'in' })
  //   })
  //   $body.addEventListener('mouseleave', function () {
  //     console.log('mouseleave')
  //     ipc.send('win-change', { type: 'out' })
  //   })

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
        {props.children.map((_item) => (
          <div className="icon-item">
            <Tooltip placement="rightTop" color="#2db7f5" title={_item.name}>
              <img src={_item.icon} alt={_item.name} />
            </Tooltip>
          </div>
        ))}
      </div>
    )
    childJSX = (
      <Popover placement="rightTop" content={childSideBar} trigger="hover">
        <FolderOutlined className="icon-img" />
      </Popover>
    )
  }
  return <div className="icon-item">{childJSX}</div>
}

export { MenuType }
export type MenuIconPropsType = MenuIconProps
export default MenuIcon
