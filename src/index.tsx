import { setDefaultOptions } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { createRoot } from 'react-dom/client'

import App from './app'

import '@/assets/global.less'
import '@/assets/tailwind.css'

setDefaultOptions({ locale: zhCN, weekStartsOn: 1 })

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
