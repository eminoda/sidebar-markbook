import React from 'react'
import { useState } from 'react'
import './SideBar.less'
import { FolderOutlined, SettingOutlined } from '@ant-design/icons'
import MenuIcon, { MenuType, MenuIconPropsType } from './MenuIcon/MenuIcon'
import { Tooltip, Popover } from 'antd'

function SideBar (props: { handleMouseOut: any }) {
  const [count, setCount] = useState(0)
  const [menus] = useState<MenuIconPropsType[]>([
    { name: 'npm', level: 1, type: MenuType.CUSTOMER_ICON, icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', url: '' },
    { name: '语雀', level: 1, type: MenuType.CUSTOMER_ICON, icon: 'https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*LmuNQ6eMk3gAAAAAAAAAAAAADvuFAQ/original', url: '' },
    { name: 'vite', level: 1, type: MenuType.CUSTOMER_ICON, icon: 'https://cn.vitejs.dev/logo.svg', url: '' },
    { name: '语雀', level: 1, type: MenuType.CUSTOMER_ICON, icon: 'https://via.placeholder.com/50x50', url: '' },
    {
      name: '语雀',
      level: 1,
      type: MenuType.MORE_ICON,
      icon: '',
      url: '',
      subMenuIcons: [
        { name: 'npm', level: 2, type: MenuType.CUSTOMER_ICON, icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', url: '' },
        { name: '百度', level: 2, type: MenuType.CUSTOMER_ICON, icon: 'https://www.baidu.com/favicon.ico', url: '' },
      ],
    },
    { name: '语雀', level: 1, type: MenuType.MORE_ICON, icon: '', url: '', subMenuIcons: [] },
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
  return (
    <div className="side-bar" onMouseLeave={props.handleMouseOut}>
      <div className="icon-bar">
        {menus.map((menu, index) => {
          return <MenuIcon {...menu} key={index} />
        })}
      </div>
      <MenuIcon name={'设置'} type={MenuType.SETTING_ICON} level={0} />
    </div>
  )
}

export default SideBar
