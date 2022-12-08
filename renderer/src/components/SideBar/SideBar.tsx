import React from 'react'
import { useState } from 'react'
import './SideBar.less'
import { FolderOutlined, SettingOutlined } from '@ant-design/icons'
import { Tooltip, Popover } from 'antd'
import MenuIcon, { MenuType, MenuIconPropsType } from './MenuIcon/MenuIcon'
import { WithMenuIconPopver, WithPopoverPropsType } from './MenuIcon/MenuIconPopver'

function SideBar(props: { handleMouseOut: any }) {
  const menuIcons: MenuIconPropsType[] = [
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
  ]
  const menuIconEvents: WithPopoverPropsType[] = menuIcons.map((menuIcon, index) => {
    return {
      isPopover: false,
      ...menuIcon,
      id: index + '-' + menuIcon.level,
    }
  })
  const [list, setList] = useState<WithPopoverPropsType[]>(menuIconEvents)
  const onRerenderLayout = async (activeMenuIcon: WithPopoverPropsType, mouseEnterOrLeave: string) => {
    // console.log(activeMenuIcon, mouseEnterOrLeave)
    if (mouseEnterOrLeave == 'enter') {
      await ipc.invoke<number>('win-change', { width: 70 })
    }
    setList(
      list.map((item) => {
        return { ...item, isPopover: mouseEnterOrLeave == 'enter' && item.id == activeMenuIcon.id }
      })
    )
    if (mouseEnterOrLeave == 'leave') {
      await ipc.invoke<number>('win-change', { width: -70 })
    }
  }

  return (
    <div className="side-bar" onMouseLeave={props.handleMouseOut}>
      <div className="icon-bar">
        {/* TODO: 不合规的 schema 需要 filter */}
        {list.map((menu) => {
          return (
            <React.Fragment key={menu.id}>
              <WithMenuIconPopver {...menu} onRerenderLayout={onRerenderLayout} />
            </React.Fragment>
          )
        })}
      </div>
      <WithMenuIconPopver id="setting" onRerenderLayout={onRerenderLayout} isPopover={false} name={'设置'} type={MenuType.SETTING_ICON} level={0} />
    </div>
  )
}

export default SideBar
