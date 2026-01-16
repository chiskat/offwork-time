import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { useEffect } from 'react'

import RouterEntry from './RouteEntry'
import useSettings from './hooks/useSettings'

import '@/assets/global.less'
import '@/assets/tailwind.css'

function App() {
  const backgroundIndex = useSettings(s => s.backgroundIndex)

  useEffect(() => {
    document.body.style.backgroundImage =
      `url('` + require(`@/assets/img/repeat${backgroundIndex}.jpg`) + `')`
  }, [backgroundIndex])

  return (
    <ConfigProvider locale={zhCN}>
      <RouterEntry />
    </ConfigProvider>
  )
}

export default App
