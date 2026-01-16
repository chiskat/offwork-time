import { Radio, Space } from 'antd'
import clsx from 'clsx'
import { CSSProperties } from 'react'

import { UseSettings, WeekendType } from '@/hooks/useSettings'

export interface WeekendSettingProps {
  value: UseSettings
  onChange(newValue: Partial<UseSettings>): void
  className?: string
  style?: CSSProperties
}

export default function WeekendSetting(props: WeekendSettingProps) {
  const { value: draft, onChange, className, style } = props

  return (
    <Space className={clsx('flex px-3', className)} style={style} direction="vertical" size="small">
      <div>周末休息日：</div>

      <div>
        <Radio.Group
          onChange={e => void onChange({ weekendType: e.target.value })}
          defaultValue={draft.weekendType}
        >
          <Radio.Button value={WeekendType.DOUBLE}>双休</Radio.Button>
          <Radio.Button value={WeekendType.ONLY_SUNDAY}>周日单休</Radio.Button>
          <Radio.Button value={WeekendType.ONLY_SATURDAY}>周六单休</Radio.Button>
        </Radio.Group>
      </div>

      <div>休息日不计入工时</div>
    </Space>
  )
}
