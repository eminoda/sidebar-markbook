import React from 'react'
import { useState } from 'react'
import "./SideBar.less"
import { Tooltip } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

function SideBar (props: { handleMouseOut: any }) {
    const [count, setCount] = useState(0)
    const [menus] = useState([
        { name: 'npm', icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', url: '' },
        { name: '语雀', icon: 'https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*LmuNQ6eMk3gAAAAAAAAAAAAADvuFAQ/original', url: '' },
        { name: 'vite', icon: 'https://cn.vitejs.dev/logo.svg', url: '' },
        { name: '语雀', icon: 'https://via.placeholder.com/50x50', url: '' },
        { name: '语雀', icon: '', url: '', children: [] },
        { name: '语雀', icon: '', url: '', children: [] },
    ])
    const $body = document.getElementsByTagName('html')[0];
    console.log($body);
    $body.addEventListener('mouseenter', function () {
        console.log('mouseenter');
        ipc.send('win-change', { type: 'in' });
    });
    $body.addEventListener('mouseleave', function () {
        console.log('mouseleave');
        ipc.send('win-change', { type: 'out' });
    });
    return (
        <div className="side-bar" onMouseLeave={props.handleMouseOut}>
            {
                menus.map((menu, index) => {
                    return (
                        <div className="icon-item" key={index}>
                            <Tooltip placement="rightTop" color="#2db7f5" title={menu.name}>
                                {menu.children && menu.children.length == 0 ? <FolderOutlined className="icon-img" /> : <img src={menu.icon} alt={menu.name} />}
                            </Tooltip>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SideBar
