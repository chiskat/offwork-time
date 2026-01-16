import { ConfigProvider } from 'antd'
import 'antd/dist/antd.less'
import zhCN from 'antd/lib/locale/zh_CN'

import RouterEntry from './RouteEntry'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterEntry />
    </ConfigProvider>
  )
}

export default App
