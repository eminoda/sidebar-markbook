import React from 'react'
import { useState, useEffect } from 'react'
import './SideBar.less'
import MenuIcon, { MenuType, MenuIconProps } from './MenuIcon/MenuIcon'
import MenuIconPopover, { MenuIconPopoverProps } from './MenuIconPopover/MenuIconPopver'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import { menuIconDatas, MenuIconDataProps } from './const-data'
import Item from 'antd/es/list/Item'

const SideBar = (props: { handleMouseOut: any }) => {
  const [menuIcons, setMenuIcons] = useState<MenuIconPopoverProps[]>([])

  let list: MenuIconPopoverProps[] = []
  let mouseEventOrLeave: string

  const debounceLayout = debounce(async (current: MenuIconPopoverProps, mouseEnterOrLeave: string) => {
    console.log(mouseEnterOrLeave, current)
    if (mouseEnterOrLeave == 'enter') {
      // await ipc.invoke('win-change', { width: current.level * 70 })
      setMenuIcons(list)
    } else if (mouseEnterOrLeave == 'leave') {
      setMenuIcons(list)
      setTimeout(async () => {
        // await ipc.invoke('win-change', { width: (current.level - 1) * 70 })
      }, 100)
    }
  }, 600)

  const onRerenderLayout = function (current: MenuIconPopoverProps, mouseEnterOrLeave: string) {
    list = buildMenuIconPopovers(menuIconDatas, current, mouseEnterOrLeave)
    console.log(list)
    debounceLayout(current, mouseEnterOrLeave)
  }
  const buildMenuIconPopovers = function (list: MenuIconDataProps[], current: MenuIconPopoverProps | null, mouseEnterOrLeave: string) {
    // list 转 map
    const parentsMap: { [key: string]: MenuIconDataProps[] } = {}
    for (let i = 0; i < list.length; i++) {
      // 收集元素map
      const id = String(list[i].id)
      // 收集父类map[]
      const parentId = String(list[i].parentId || '')
      if (!parentsMap[parentId]) {
        parentsMap[parentId] = []
      }
      parentsMap[parentId].push(list[i])
    }

    const changeParentPopoverCallback = function (menuIconItem: MenuIconPopoverProps): Function {
      return function (isPopover: boolean): void {
        menuIconItem.isPopover = isPopover
      }
    }
    const buildTree = function (menuIconPopover: MenuIconPopoverProps, list: MenuIconPopoverProps[]): MenuIconPopoverProps {
      const isPopover = !current ? false : mouseEnterOrLeave == 'enter' && current.id == menuIconPopover.id
      // const isPopover = true
      menuIconPopover.isPopover = isPopover
      if (menuIconPopover.id && parentsMap[menuIconPopover.id] && parentsMap[menuIconPopover.id].length > 0) {
        // 有后代改为文件夹类型
        menuIconPopover.type = menuIconPopover.icon ? MenuType.CUSTOMER_ICON : MenuType.MORE_ICON
        menuIconPopover.subWithPopovers = parentsMap[menuIconPopover.id].map((_menuIconItem) => {
          const isPopover = !current ? false : mouseEnterOrLeave == 'enter' && current.id == _menuIconItem.id
          if (isPopover) {
            for (let i = 0; i < list.length; i++) {
              list[i].isPopover = true
            }
          }
          const child: MenuIconPopoverProps = {
            ..._menuIconItem,
            onRerenderLayout,
            isPopover,
            type: _menuIconItem.icon ? MenuType.CUSTOMER_ICON : MenuType.MORE_ICON,
            level: menuIconPopover.level + 1
          }
          // console.log('list', JSON.stringify(list, null, 2))
          return buildTree(child, [...list, child])
        })
      }
      // 有子级元素
      return menuIconPopover
    }
    return parentsMap[''].map((item) => {
      const child: MenuIconPopoverProps = {
        ...item,
        onRerenderLayout,
        isPopover: true,
        type: MenuType.CUSTOMER_ICON,
        level: 1 //初始值
      }
      return buildTree(child, [child])
    })
  }

  useEffect(() => {
    console.log('update effect')
    setMenuIcons(buildMenuIconPopovers(menuIconDatas, null, ''))
    console.log(menuIcons)
  }, ['menuIcons'])
  return (
    <div className="side-bar" onMouseLeave={props.handleMouseOut}>
      <div className="side-bar-inner">
        <div className="icon-bar">
          {menuIcons.map((menuIconProp) => {
            return (
              <React.Fragment key={menuIconProp.id}>
                <MenuIconPopover {...menuIconProp} onRerenderLayout={onRerenderLayout} />
              </React.Fragment>
            )
          })}
        </div>
        <MenuIconPopover id="setting" onRerenderLayout={onRerenderLayout} isPopover={false} name={'设置'} type={MenuType.SETTING_ICON} level={0} />
      </div>
    </div>
  )
}
export default SideBar
