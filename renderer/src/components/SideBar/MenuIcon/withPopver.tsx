import React, { useState } from 'react'
import { MenuIconPropsType } from './MenuIcon'

function withPopver<P extends MenuIconPropsType>(Component: React.ComponentType<MenuIconPropsType>) {
  const WithPopver = (props: P) => {
    // TODO: 对 div 进行监听
    /**
     * TODO: 对 div 进行监听
     * 鼠标移入
     *      1. 发送 win-change，等待处理完毕
     *      2. 增加 popver 包装
     */
    return <Component {...props} />
  }
  return WithPopver
}

export default withPopver
