import React from 'react'
import { useState, useEffect } from 'react'
import './SideBar.less'
import MenuIcon, { MenuType, MenuIconPropsType } from './MenuIcon/MenuIcon'
import { WithMenuIconPopver, WithPopoverPropsType } from './MenuIcon/MenuIconPopver'

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

const buildWithPopoverMenuIcons = (data: MenuIconPropsType): WithPopoverPropsType => {
  const subWithPopovers = data.subMenuIcons && data.subMenuIcons.length > 0 ? data.subMenuIcons.map(item => buildWithPopoverMenuIcons(item)) : []
  return {
    id: Math.random() * 1000 + '-' + data.level,
    isPopover: false,
    subWithPopovers,
    ...data,
  }
}
const withPopoverMenuIcons: WithPopoverPropsType[] = menuIcons.map(item => buildWithPopoverMenuIcons(item))
console.log(withPopoverMenuIcons)

function SideBar (props: { handleMouseOut: any }) {

  const [list, setList] = useState<WithPopoverPropsType[]>(withPopoverMenuIcons)

  // 监听队列
  const listenEvents: WithPopoverPropsType[] = []

  const [seconds, setSeconds] = useState(0);

  const sayHello = () => {
    console.log(Date.now())
    // 获取最后个 active 元素
    // 先全全关闭
    // leave：
    // level>1? level-1 isPopver true；level==1? false
    // enter：
    // 当前 isPopver true
    // 
  }
  useEffect(() => {
    let timer: any = null
    const setupTimer = () => {
      return setTimeout(() => {
        sayHello()
        timer = setupTimer()
      }, 1000)
    }
    timer = setupTimer()
    return () => {
      clearTimeout(timer)
    }
  }, [seconds]);
  const onRerenderLayout = async (activeMenuIcon: WithPopoverPropsType, mouseEnterOrLeave: string) => {
    console.log(activeMenuIcon.level, mouseEnterOrLeave)
    listenEvents.push(activeMenuIcon)
    if (mouseEnterOrLeave == 'enter') {
      await ipc.invoke<number>('win-change', { width: 70 })
    }
    setList(
      list.map((item) => {
        return { ...item, isPopover: mouseEnterOrLeave == 'enter' && item.id == activeMenuIcon.id }
      })
    )
    if (mouseEnterOrLeave == 'leave') {
      setTimeout(async () => {
        await ipc.invoke<number>('win-change', { width: -70 })
      }, 2 * 1000)
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
