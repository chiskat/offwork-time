import { SettingOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import SalaryDayLeft from '@/components/panel/SalaryDayLeft'
import TodayLeft from '@/components/panel/TodayLeft'
import WeekendLeft from '@/components/panel/WeekendLeft'
import useSettings from '@/hooks/useSettings'

export default function Home() {
  const navigate = useNavigate()

  const backgroundIndex = useSettings(s => s.backgroundIndex)

  useEffect(() => {
    document.body.style.backgroundImage =
      `url('` + require(`@/assets/img/repeat${backgroundIndex}.jpg`) + `')`
  }, [backgroundIndex])

  return (
    <div className="p-4">
      <Space className="flex" direction="vertical" size="middle">
        <TodayLeft />
        <WeekendLeft />
        <SalaryDayLeft />
      </Space>

      <div className="mt-4 text-right">
        <Button
          onClick={() => void navigate('/setting', { replace: true })}
          icon={<SettingOutlined />}
          type="primary"
          size="middle"
          ghost
        >
          设置
        </Button>
      </div>

      <div className="mt-1 text-right text-[16px] text-[#525252]">
        版本: {process.env.REACT_APP_VERSION}
      </div>
    </div>
  )
}
