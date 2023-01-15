import React, { useState, useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import "./BrowerIframe.less"


const BrowerHome = (props: {}) => {
    const location = useLocation()
    const [url, setUrl] = useState<string>('')

    // 判断路由参数
    useEffect(() => {
        if (location.state) {
            setUrl(location.state.search)
        }
    }, [location])

    return <div className="brower">
        <div className="brower-url">
            <Input size="large" prefix={<SearchOutlined />} value={location.state.search} />
        </div>
        <iframe src={url} className="brower-iframe" frameBorder="none"></iframe>
    </div>
}
export default BrowerHome