import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import RouterEntry from './RouteEntry'

import '@/assets/global.less'
import '@/assets/tailwind.css'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterEntry />
    </ConfigProvider>
  )
}

export default App
