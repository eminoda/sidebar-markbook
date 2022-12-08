import React, { useState } from 'react'
import MenuIcon, { MenuIconPropsType, MenuType } from './MenuIcon'
import { Tooltip, Popover } from 'antd'
import delay from 'lodash/delay'
import './MenuIconPopver.less'

interface WithPopoverProps extends MenuIconPropsType {
  id: string | number
  isPopover: boolean
  subWithPopovers?: WithPopoverProps[]
}

interface WithPopoverEventPropsType extends WithPopoverProps {
  onRerenderLayout: Function
}

function withPopver (Component: React.ComponentType<MenuIconPropsType>) {
  const WithPopver = <T extends WithPopoverEventPropsType> (props: T) => {
    // console.log(props)
    const [isPopver, setIsPopver] = useState(false)
    const handleMouseEnter = async (e: React.MouseEvent<HTMLDivElement>, menuIconProps: T) => {
      props.onRerenderLayout(menuIconProps, 'enter')
      console.log('鼠标移入', menuIconProps.name + '_' + menuIconProps.level)
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
    const handleMouseLeave = async (e: React.MouseEvent<HTMLDivElement>, menuIconProps: MenuIconPropsType) => {
      props.onRerenderLayout(menuIconProps, 'leave')
      console.log('鼠标移出', menuIconProps.name + '_' + menuIconProps.level)
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
                return (
                  <_WithPopver {..._props} onRerenderLayout={props.onRerenderLayout} key={index} />
                )
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
        {menuIconPopverJSX}
      </div>
    )
  }
  return WithPopver
}

export type WithPopoverPropsType = WithPopoverProps
export const WithMenuIconPopver = withPopver(MenuIcon)