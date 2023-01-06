import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Todo from './views/Todo/Todo'
import TodoList from './components/TodoList/TodoList'
import TodoEditor from './components/TodoEditor/TodoEditor'
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
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
)
