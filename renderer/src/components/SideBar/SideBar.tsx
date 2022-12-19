import React from 'react'
import { useState, useEffect } from 'react'
import './SideBar.less'
import MenuIcon, { MenuType, MenuIconProps } from './MenuIcon/MenuIcon'
import MenuIconPopover, { MenuIconPopoverProps } from './MenuIconPopover/MenuIconPopver'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import { menuIconDatas, MenuIconDataProps } from './const-data'

const menuIconPopovers: MenuIconPopoverProps[] = []
const onRerenderLayout = function () {}

const buildMenuIconPopovers = function (list: MenuIconDataProps[]) {
  const parentsMap: { [key: string]: MenuIconDataProps[] } = {}
  for (let i = 0; i < list.length; i++) {
    const parentId = String(list[i].parentId || '')
    if (!parentsMap[parentId]) {
      parentsMap[parentId] = []
    }
    parentsMap[parentId].push(list[i])
  }
  const appendMenuIconChildren = function (menuIconItem: MenuIconDataProps, level: number): MenuIconPopoverProps {
    const menuIconPopoverItem: MenuIconPopoverProps = {
      ...menuIconItem,
      isPopover: false,
      onRerenderLayout,
      level,
      type: MenuType.CUSTOMER_ICON,
    }

    // 含有子元素
    if (menuIconItem.id && parentsMap[menuIconItem.id] && parentsMap[menuIconItem.id].length > 0) {
      menuIconPopoverItem.subWithPopovers = parentsMap[menuIconItem.id].map((_menuIconItem) => {
        return appendMenuIconChildren(_menuIconItem, level + 1)
      })
    }
    // 有子级元素
    return menuIconPopoverItem
  }
  parentsMap[''].forEach((item) => {
    menuIconPopovers.push(appendMenuIconChildren(item, 1))
  })
  console.log(menuIconPopovers)
}

buildMenuIconPopovers(menuIconDatas)

interface MenuIconEvents {
  menuIcon: MenuIconProps
  mouseEnterOrLeave: string
}
// const menuIcons: MenuIconProps[] = [
//   { name: 'npm', id: 1, level: 1, type: MenuType.CUSTOMER_ICON, icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', url: '' },
//   { name: '语雀', id: 2, level: 1, type: MenuType.CUSTOMER_ICON, icon: 'https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*LmuNQ6eMk3gAAAAAAAAAAAAADvuFAQ/original', url: '' },
//   { name: 'vite', id: 3, level: 1, type: MenuType.CUSTOMER_ICON, icon: 'https://cn.vitejs.dev/logo.svg', url: '' },
//   { name: 'react', id: 4, level: 1, type: MenuType.CUSTOMER_ICON, icon: 'https://zh-hans.reactjs.org/favicon.ico', url: '' },
//   {
//     name: '更多',
//     id: 5,
//     level: 1,
//     type: MenuType.MORE_ICON,
//     icon: '',
//     url: '',
//     subMenuIcons: [
//       { name: 'npm', id: 6, parentId: 5, level: 2, type: MenuType.CUSTOMER_ICON, icon: 'https://static.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png', url: '' },
//       { name: '百度', id: 7, parentId: 5, level: 2, type: MenuType.CUSTOMER_ICON, icon: 'https://www.baidu.com/favicon.ico', url: '' },
//     ],
//   },
//   { name: '语雀', id: 8, level: 1, type: MenuType.MORE_ICON, icon: '', url: '', subMenuIcons: [] },
// ]

// const buildWithPopoverMenuIcons = (data: MenuIconPopoverProps): MenuIconProps => {
//   const subWithPopovers = data.subMenuIcons && data.subMenuIcons.length > 0 ? data.subMenuIcons.map((item) => buildWithPopoverMenuIcons(item)) : []
//   return {
//     isPopover: false,
//     subWithPopovers,
//     ...data,
//   }
// }
// const withPopoverMenuIcons: MenuIconProps[] = menuIcons.map((item) => buildWithPopoverMenuIcons(item))

// const treeList: treeTypes = []

// interface treeTypes {
//   [index: number]: string | number | string[] | number[] | undefined
//   length: number
//   push: Function
// }
// const findTree = (item: MenuIconProps, list: treeTypes) => {
//   list.push(item.id)
//   if (item.subWithPopovers && item.subWithPopovers.length > 0) {
//     const _list: treeTypes = []
//     list.push(_list)
//     item.subWithPopovers.forEach((_item) => {
//       findTree(_item, _list)
//     })
//   }
//   return list
// }

// withPopoverMenuIcons.forEach((item) => {
//   treeList.push(findTree(item, []))
// })

// console.log(treeList)
// function SideBar(props: { handleMouseOut: any }) {
//   const [list, setList] = useState<MenuIconProps[]>(withPopoverMenuIcons)

//   // 监听队列
//   const listenEvents: MenuIconEvents[] = []

//   // 刷新页面队列
//   const rerenderDebounce = debounce(async () => {
//     console.log('==================')
//     const findActiveMenuIconChain = (list: MenuIconProps[], menuIcon: MenuIconProps, indexSeq: number[]): number[] => {
//       for (let i = 0; i < list.length; i++) {
//         const item = list[i]
//         if (item.id == menuIcon.id) {
//           indexSeq.push(i)
//           return indexSeq
//         }
//         if (item.subWithPopovers && item.subWithPopovers.length > 0) {
//           indexSeq.push(i)
//           const isMatch = findActiveMenuIconChain(item.subWithPopovers, menuIcon, indexSeq)
//           if (isMatch) {
//             return indexSeq
//           }
//         }
//       }
//       // 当前，及后代层级没有匹配
//       return []
//     }
//     let maxDeep = 0
//     const changeListPopover = (list: MenuIconProps[], deep: number, indexSeq: number[], mouseEnterOrLeave: string) => {
//       const deepValue = indexSeq[deep]
//       list.forEach((item, i) => {
//         if (deepValue == i) {
//           if (mouseEnterOrLeave == 'enter') {
//             item.isPopover = true
//           } else {
//             item.isPopover = false
//             maxDeep = item.level > maxDeep ? item.level : maxDeep
//           }
//           console.log(item.id, item.isPopover)
//           if (item.subWithPopovers && item.subWithPopovers.length > 0) {
//             changeListPopover(item.subWithPopovers, deep + 1, indexSeq, mouseEnterOrLeave)
//           }
//         } else {
//           item.isPopover = false
//           console.log(item.id, item.isPopover)
//           if (item.subWithPopovers && item.subWithPopovers.length > 0) {
//             changeListPopover(item.subWithPopovers, deep + 1, indexSeq, mouseEnterOrLeave)
//           }
//         }
//       })
//     }
//     const length = listenEvents.length
//     const { menuIcon, mouseEnterOrLeave } = listenEvents[length - 1]
//     const indexSeq = findActiveMenuIconChain(list, menuIcon, [])
//     console.log(indexSeq)
//     changeListPopover(list, 0, indexSeq, mouseEnterOrLeave)
//     console.log(list)
//     if (mouseEnterOrLeave == 'enter') {
//       await ipc.invoke<number>('win-change', { width: 70 * menuIcon.level })
//     }
//     setList([...list])
//     if (mouseEnterOrLeave == 'leave') {
//       setTimeout(async () => {
//         await ipc.invoke<number>('win-change', { width: 70 * (maxDeep - menuIcon.level) })
//       }, 50)
//     }
//   }, 300)

//   const onRerenderLayout = async (activeMenuIcon: MenuIconProps, mouseEnterOrLeave: string) => {
//     console.log(activeMenuIcon.level, activeMenuIcon.id, mouseEnterOrLeave)
//     listenEvents.push({ menuIcon: activeMenuIcon, mouseEnterOrLeave })
//     rerenderDebounce()
//   }

//   return (
//     <div className="side-bar" onMouseLeave={props.handleMouseOut}>
//       <div className="side-bar-inner">
//         <div className="icon-bar">
//           {/* TODO: 不合规的 schema 需要 filter */}
//           {list.map((menu) => {
//             return (
//               <React.Fragment key={menu.id}>
//                 <MenuIconPopover {...menu} onRerenderLayout={onRerenderLayout} />
//               </React.Fragment>
//             )
//           })}
//         </div>
//         <MenuIconPopover id="setting" onRerenderLayout={onRerenderLayout} isPopover={false} name={'设置'} type={MenuType.SETTING_ICON} level={0} />
//       </div>
//     </div>
//   )
// }

// export default SideBar
export default () => {
  return <div>123</div>
}
