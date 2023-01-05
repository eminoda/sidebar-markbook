import React from 'react'
import { useState, useEffect } from 'react'
import './SideBar.less'
import MenuIcon, { MenuTypeEnum, MenuIconProps } from './MenuIcon/MenuIcon'
import { menuIconDatas } from './const-data'
import Item from 'antd/es/list/Item'

const SideBar = (props: { handleMouseOut: any }) => {
  const [menuIcons, setMenuIcons] = useState<MenuIconProps[]>([])

  useEffect(() => {
    setMenuIcons(menuIconDatas)
    return () => {
      console.log('88')
    }
  })
  return (
    // 此层级控制拖拽，鼠标离焦
    <div className="side-bar-control" onMouseLeave={props.handleMouseOut}>
      <div className="side-bar-inner">
        {menuIcons
          .filter((menuIcon) => menuIcon.id < 999)
          .map((menuIcon) => {
            return (
              <div className="side-bar-icon" key={menuIcon.id}>
                <MenuIcon {...menuIcon} />
              </div>
            )
          })}
        <div className="side-bar-icon--bottom">
          {menuIcons
            .filter((menuIcon) => menuIcon.id >= 999)
            .map((menuIcon) => {
              return (
                <div className="side-bar-icon" key={menuIcon.id}>
                  <MenuIcon {...menuIcon} />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
export default SideBar
