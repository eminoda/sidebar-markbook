// import { MenuType } from './MenuIcon'
interface MenuIconDataProps {
  id: string | number
  parentId?: string | number
  name: string
  icon?: string
  url?: string
}

const menuIconDatas: MenuIconDataProps[] = [
  { name: 'npm', id: 1, icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', url: '' },
  { name: '语雀', id: 2, icon: 'https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*LmuNQ6eMk3gAAAAAAAAAAAAADvuFAQ/original', url: '' },
  { name: 'vite', id: 3, icon: 'https://cn.vitejs.dev/logo.svg', url: '' },
  { name: 'react', id: 4, icon: 'https://zh-hans.reactjs.org/favicon.ico', url: '' },
  { name: 'npm', id: 6, parentId: 4, icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', url: '' },
  { name: '百度', id: 7, parentId: 4, icon: 'https://www.baidu.com/favicon.ico', url: '' },
  { name: '百度', id: 9, parentId: 7, icon: 'https://www.baidu.com/favicon.ico', url: '' },
  { name: '语雀', id: 8, icon: '', url: '' },
]
export { menuIconDatas, type MenuIconDataProps }
