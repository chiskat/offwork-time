import { createBrowserRouter, RouterProvider } from 'react-router'

import Home from '@/pages/home'
import Setting from '@/pages/setting'

const browserRouter = createBrowserRouter(
  [
    { index: true, element: <Home /> },
    { path: '/setting', element: <Setting /> },
  ],
  { basename: process.env.PUBLIC_URL }
)

export default function RouteEntry() {
  return <RouterProvider router={browserRouter} />
}
