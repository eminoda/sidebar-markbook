import React from 'react'
import { Outlet } from 'react-router-dom'
import "./Brower.less"

const Brower = (props: {}) => {
    return (<div className="brower">
        {/* 浏览器地址输入框 */}
        <Outlet />
    </div>)
    // return <div className="brower">
    //     <iframe src="https://www.bing.com" className="brower-iframe"></iframe>
    // </div>
}
export default Brower