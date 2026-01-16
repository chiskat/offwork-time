import { CheckOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Tabs } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import useSettings from '@/hooks/useSettings'

import AboutSetting from './AboutSetting'
import DailySetting from './DailySetting'
import PreferencesSetting from './PreferencesSetting'
import SalarySetting from './SalarySetting'
import WeekendSetting from './WeekendSetting'

export default function Setting() {
  const navigate = useNavigate()

  const [draft, setDraft] = useState(() => useSettings.getState())

  const mergeDraft = (newValue: Partial<typeof draft>) => {
    setDraft(old => ({ ...old, ...newValue }))
  }

  return (
    <div className="m-4 rounded-md bg-[rgba(255,255,255,0.7)] px-4 py-2">
      <Tabs
        defaultActiveKey="daily"
        items={[
          {
            label: '每日工作时间',
            key: 'daily',
            children: <DailySetting value={draft} onChange={mergeDraft} />,
          },
          {
            label: '周末设置',
            key: 'weekend',
            children: <WeekendSetting value={draft} onChange={mergeDraft} />,
          },
          {
            label: '发薪日设置',
            key: 'salary',
            children: <SalarySetting value={draft} onChange={mergeDraft} />,
          },
          {
            label: '偏好设置',
            key: 'preferences',
            children: <PreferencesSetting value={draft} onChange={mergeDraft} />,
          },
          {
            label: '关于',
            key: 'about',
            children: <AboutSetting />,
          },
        ]}
        centered
      />

      <div className="px-3 py-2" style={{ marginTop: 30, textAlign: 'right' }}>
        <Button
          onClick={() => navigate('/', { replace: true })}
          icon={<LeftOutlined />}
          className="mr-5"
          danger
          ghost
        >
          取消
        </Button>

        <Button
          onClick={() => {
            useSettings.setState(draft)
            navigate('/', { replace: true })
          }}
          icon={<CheckOutlined />}
          type="primary"
          ghost
        >
          保存设置
        </Button>
      </div>
    </div>
  )
}
