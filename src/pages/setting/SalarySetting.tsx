import { Radio, InputNumber, Space } from 'antd'
import clsx from 'clsx'
import { CSSProperties } from 'react'

import { SalaryDayType, SalaryRestdayOffsetType, UseSettings } from '@/hooks/useSettings'

export interface SalarySettingProps {
  value: UseSettings
  onChange(newValue: Partial<UseSettings>): void
  className?: string
  style?: CSSProperties
}

export default function SalarySetting(props: SalarySettingProps) {
  const { value: draft, onChange, className, style } = props

  return (
    <Space
      className={clsx('flex px-3', className)}
      style={style}
      direction="vertical"
      size="middle"
    >
      <Space direction="vertical" size="small">
        <div>发薪日计算方式：</div>

        <Radio.Group
          onChange={e => void onChange({ salaryDayType: e.target.value })}
          defaultValue={draft.salaryDayType}
        >
          <Radio.Button value={SalaryDayType.FIXED}>每月第 N 日</Radio.Button>
          <Radio.Button value={SalaryDayType.BACKWARD}>每月倒数第 N 日</Radio.Button>
        </Radio.Group>

        <div className="mt-4">
          N=
          <InputNumber
            onChange={value => value && void onChange({ salaryDay: value })}
            defaultValue={draft.salaryDay}
            min={1}
            max={28}
            step={1}
            className="ml-2 mr-1"
            precision={0}
          />
        </div>

        <Space className="flex" direction="vertical" size={4}>
          <div>例如每月 15 号发薪，则选择 “每月第 N 日”，填写 N = 15</div>
          <div>例如每月最后一天发薪，则选择 “每月倒数第 N 日”，填写 N = 1</div>
        </Space>
      </Space>

      <Space className="flex" direction="vertical" size="small">
        <div>发薪日是非工作日：</div>

        <Radio.Group
          onChange={e => void onChange({ salaryRestdayOffset: e.target.value })}
          defaultValue={draft.salaryRestdayOffset}
        >
          <Radio.Button value={SalaryRestdayOffsetType.DEFAULT}>照常发薪</Radio.Button>
          <Radio.Button value={SalaryRestdayOffsetType.EARLY}>提前到工作日</Radio.Button>
          <Radio.Button value={SalaryRestdayOffsetType.LATER}>顺延到工作日</Radio.Button>
        </Radio.Group>
      </Space>
    </Space>
  )
}
