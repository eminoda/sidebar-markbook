import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from './App'
import Todo from './views/Todo/Todo'
import TodoList from './views/Todo/TodoList/TodoList'
import TodoEditor from './views/Todo/TodoEditor/TodoEditor'
import Brower from './views/Brower/Brower'
import BrowerHome from './views/Brower/BrowerHome/BrowerHome'
import BrowerIframe from './views/Brower/BrowerIframe/BrowerIframe'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/todo',
    element: <Todo />,
    children: [
      {
        path: '',
        element: <TodoList />,
      },
      {
        path: 'editor',
        element: <TodoEditor />,
      },
    ],
  }, {
    path: '/brower',
    element: <Brower />,
    children: [
      {
        path: '',
        element: <BrowerHome />,
      },
      {
        path: 'iframe',
        element: <BrowerIframe />,
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>

  <ConfigProvider autoInsertSpaceInButton={false}>
    <RouterProvider router={router} />
  </ConfigProvider>
  // </React.StrictMode>
)
