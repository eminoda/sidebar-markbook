import React, { useState, ChangeEvent } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'

import "./BrowerHome.less"


const BrowerHome = (props: {}) => {
    const customerList = [
        { img: 'https://www.baidu.com/favicon.ico', url: 'https://www.baidu.com/s?wd=1', title: '百度' },
        { img: 'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png', url: 'https://www.google.com/search?q=1', title: 'google' },
        { img: 'https://cn.bing.com/sa/simg/favicon-trans-bg-blue-mg.ico', url: 'https://cn.bing.com/search?q=1', title: 'bing' },
    ]
    const options = [
        {
            label: (<div>123</div>)
        }
    ]
    const [searchContent, setSearchContent] = useState<string>('')
    const navigate = useNavigate()

    const onSearchContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchContent(e.target.value)
    }

    const onPressEnter = (e: KeyboardEvent) => {
        navigate('/brower/iframe', { state: { search: 'https://cn.bing.com/search?q=' + searchContent } })
    }
    return <div className="brower-home">
        <div className="brower-search">
            <AutoComplete
                popupClassName="certain-category-search-dropdown"
                options={options}
                style={{ width: "100%" }}
            >
                <Input size="large" placeholder="请输入想要搜索的内容"
                    prefix={<SearchOutlined />}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onSearchContentChange(e) }}
                    onPressEnter={(e: KeyboardEvent) => { onPressEnter(e) }} />
            </AutoComplete>
        </div>
        <div className="brower-customer">
            {customerList.map((item, index) => {
                return (<div key={index} className="brower-customer-icon">
                    <img src={item.img} alt="" />
                    <div className="brower-customer-icon-title">{item.title}</div>
                </div>)
            })}
        </div>
    </div>
}
export default BrowerHome