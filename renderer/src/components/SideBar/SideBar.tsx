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

  const debounceLayout = debounce(() => {
    setMenuIcons(list)
  }, 1000)

  const onRerenderLayout = function (currentMenuIcon: MenuIconPopoverProps, mouseEnterOrLeave: string) {
    list = buildMenuIconPopovers(menuIconDatas, currentMenuIcon, mouseEnterOrLeave)
    debounceLayout()
  }
  const buildMenuIconPopovers = function (list: MenuIconDataProps[], current: MenuIconPopoverProps | null, mouseEnterOrLeave: string) {
    // list 转 map
    const parentsMap: { [key: string]: MenuIconDataProps[] } = {}
    for (let i = 0; i < list.length; i++) {
      const parentId = String(list[i].parentId || '')
      if (!parentsMap[parentId]) {
        parentsMap[parentId] = []
      }
      parentsMap[parentId].push(list[i])
    }

    const buildMenuIconPopoverTree = function (menuIconItem: MenuIconDataProps, level: number): MenuIconPopoverProps {
      const menuIconPopoverItem: MenuIconPopoverProps = {
        ...menuIconItem,
        isPopover: false,
        onRerenderLayout,
        level,
        type: MenuType.CUSTOMER_ICON,
      }
      if (mouseEnterOrLeave == 'leave' || mouseEnterOrLeave != 'enter') {
        menuIconPopoverItem.isPopover = false
      } else {
        if (current && current.id == menuIconItem.id) {
          menuIconPopoverItem.isPopover = true
        }
      }
      // 含有子元素
      if (menuIconItem.id && parentsMap[menuIconItem.id] && parentsMap[menuIconItem.id].length > 0) {
        menuIconPopoverItem.type = MenuType.MORE_ICON
        menuIconPopoverItem.subWithPopovers = parentsMap[menuIconItem.id].map((_menuIconItem) => {
          return buildMenuIconPopoverTree(_menuIconItem, level + 1)
        })
      }
      // 有子级元素
      return menuIconPopoverItem
    }
    return parentsMap[''].map((item) => {
      return buildMenuIconPopoverTree(item, 1)
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
