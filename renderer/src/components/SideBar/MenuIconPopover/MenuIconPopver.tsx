import React, { useState } from 'react'
import MenuIcon, { MenuIconProps, MenuType } from '../MenuIcon/MenuIcon'
import { Tooltip, Popover } from 'antd'
import delay from 'lodash/delay'
import './MenuIconPopver.less'

interface MenuIconPopoverProps extends MenuIconProps {
  isPopover: boolean
  onRerenderLayout: Function
  subWithPopovers?: MenuIconPopoverProps[]
}

function withPopver(Component: React.ComponentType<MenuIconProps>) {
  const MenuIconPopover = (props: MenuIconPopoverProps) => {
    // console.log(props)
    const [isPopver, setIsPopver] = useState(false)
    const handleMouseEnter = async (e: React.MouseEvent<HTMLDivElement>, menuIconProps: MenuIconPopoverProps) => {
      console.log('鼠标移入', menuIconProps.name + '_' + menuIconProps.level)
      props.onRerenderLayout(menuIconProps, 'enter')
      // 防止前一次移出未执行
      // if (isPopver) {
      //   return
      // }
      // 增加窗体宽度
      // await ipc.invoke<number>('win-change', { width: 70 })
      // 窗体改变后，展示 popver
      // setIsPopver(true)
      //   setTimeout(() => {
      //     debugger
      //   }, 1000)
    }
    const handleMouseLeave = async (e: React.MouseEvent<HTMLDivElement>, menuIconProps: MenuIconProps) => {
      console.log('鼠标移出', menuIconProps.name + '_' + menuIconProps.level)
      props.onRerenderLayout(menuIconProps, 'leave')
      // if (!isPopver) {
      //   return
      // }
      // delay(() => {
      //   setIsPopver(false)
      // }, 400)
      // delay(async () => {
      //   await ipc.invoke<number>('win-change', { width: -70 })
      // }, 800)
    }

    let menuIconPopverJSX: JSX.Element = <></>
    // 子菜单
    if (props.subWithPopovers && props.subWithPopovers.length > 0) {
      menuIconPopverJSX = (
        <Popover
          placement="rightTop"
          trigger="hover"
          open={props.isPopover}
          getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
          content={
            <div className="more-menus">
              {props.subWithPopovers.map((_props, index) => {
                const _WithPopver = withPopver(MenuIcon)
                return <_WithPopver {..._props} onRerenderLayout={props.onRerenderLayout} key={index} />
              })}
            </div>
          }
        >
          <Component {...props} />
        </Popover>
      )
    }
    // 单个元素
    else if (props.type == MenuType.SETTING_ICON || props.type == MenuType.CUSTOMER_ICON) {
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
        {props.isPopover}--
        {menuIconPopverJSX}
      </div>
    )
  }
  return MenuIconPopover
}

export { type MenuIconPopoverProps }
export default withPopver(MenuIcon)
