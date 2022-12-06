import React, { useState } from "react";
import { MenuIconPropsType } from './MenuIcon'

const MenuIconHoc = (Component: React.FC<MenuIconPropsType>) => {
    const EventComponent: React.FC<MenuIconPropsType> = (props) => {
        // TODO: 对 div 进行监听
        /**
         * TODO: 对 div 进行监听
         * 鼠标移入
         *      1. 发送 win-change，等待处理完毕
         *      2. 增加 popver 包装
         */
        return <div>{Component(props)}</div>
    }
    return EventComponent
}

export default MenuIconHoc
