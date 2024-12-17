import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MainPage, NotFoundPage } from '@/pages'
import { MAIN_ROUTE } from '@/routes'
import './App.css'

const router = createBrowserRouter([
  {
    path: MAIN_ROUTE,
    element: <MainPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading router...</div>}
    />
  )
}

export default App
