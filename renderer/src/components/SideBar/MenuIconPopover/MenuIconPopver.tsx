import React, { useState } from 'react'
import MenuIcon, { MenuIconProps, MenuTypeEnum } from '../MenuIcon/MenuIcon'
import { Tooltip, Popover } from 'antd'
import delay from 'lodash/delay'
import './MenuIconPopver.less'

interface MenuIconPopoverProps extends MenuIconProps {
  isPopover: boolean
  onRerenderLayout: Function
  subWithPopovers?: MenuIconPopoverProps[]
}

function withPopver (Component: React.ComponentType<MenuIconProps>) {
  const MenuIconPopover = (props: MenuIconPopoverProps) => {
    // console.log(props)
    const [isPopver, setIsPopver] = useState(false)
    const handleMouseEnter = async (e: React.MouseEvent<HTMLDivElement>, menuIconProps: MenuIconPopoverProps) => {
      console.log('鼠标移入', menuIconProps.name + '_' + menuIconProps.level)
      props.onRerenderLayout(menuIconProps, 'enter')
    }
    const handleMouseLeave = async (e: React.MouseEvent<HTMLDivElement>, menuIconProps: MenuIconProps) => {
      console.log('鼠标移出', menuIconProps.name + '_' + menuIconProps.level)
      props.onRerenderLayout(menuIconProps, 'leave')
    }

    let menuIconPopverJSX: JSX.Element = <></>
    // 子菜单
    if (props.subWithPopovers && props.subWithPopovers.length > 0) {
      menuIconPopverJSX = (
        <Popover
          placement="rightTop"
          trigger="hover"
          open={props.isPopover}
          content={
            <div className="more-menus">
              {props.subWithPopovers.map((_props, index) => {
                const MenuIconPopover = withPopver(MenuIcon)
                console.log(_props)
                return <MenuIconPopover {..._props} onRerenderLayout={_props.onRerenderLayout} key={index} />
              })}
            </div>
          }
        >
          <div><Component {...props} /></div>
        </Popover>
      )
    }
    // 单个元素
    else if (props.type == MenuTypeEnum.SETTING_ICON || props.type == MenuTypeEnum.CUSTOMER_ICON) {
      menuIconPopverJSX = (
        <Tooltip placement="rightTop" open={props.isPopover} color="#2db7f5" title={props.name}>
          <div>
            <Component {...props} />
          </div>
        </Tooltip>
      )
    }
    return (
      <div className="icon-wrap" onMouseEnter={(e) => handleMouseEnter(e, props)} onMouseLeave={(e) => handleMouseLeave(e, props)}>
        {menuIconPopverJSX}
      </div>
    )
  }
  return MenuIconPopover
}

export { type MenuIconPopoverProps }
export default withPopver(MenuIcon)
