import { InputNumber, Radio, Space } from 'antd'
import clsx from 'clsx'
import { CSSProperties } from 'react'

import { UseSettings } from '@/hooks/useSettings'

export interface PreferencesSettingProps {
  value: UseSettings
  onChange(newValue: Partial<UseSettings>): void
  className?: string
  style?: CSSProperties
}

const backgroundImageCount: number = Number(process.env.REACT_APP_BACKGROUND_IMAGE_COUNT) || 1
const range = (count: number) => Array.from(new Array(count), (_, index) => index + 1)

export default function PreferencesSetting(props: PreferencesSettingProps) {
  const { value: draft, onChange, className, style } = props

  return (
    <Space
      className={clsx('flex px-3', className)}
      style={style}
      direction="vertical"
      size="middle"
    >
      <Space className="flex" direction="vertical" size={4}>
        <div>
          更新频率：
          <InputNumber
            onChange={value => value && void onChange({ timer: value * 1000 })}
            defaultValue={draft.timer / 1000}
            min={1}
            max={60}
            step={1}
            className="mr-1"
            precision={0}
          />
          秒
        </div>
        <div>缩短更新频率可以提高精度，但会消耗更多系统资源</div>
      </Space>

      <Space className="mt-4 flex" direction="vertical" size={4}>
        <div>背景图案：</div>

        <Radio.Group
          onChange={e => void onChange({ backgroundIndex: e.target.value || 1 })}
          value={draft.backgroundIndex}
          className="-mt-2"
        >
          {range(backgroundImageCount).map(index => (
            <div key={index} className="mr-4 mt-3 inline-block">
              <Radio value={index}>
                <div>背景 {index}</div>
              </Radio>

              <div
                className="mt-2 h-[70px] w-[70px] cursor-pointer rounded-md border-[1px] border-solid border-[#ccc] bg-center bg-repeat [background-size:80%]"
                style={{
                  backgroundImage: `url('${require(`@/assets/img/repeat${index}.jpg`)}')`,
                }}
                onClick={() => void onChange({ backgroundIndex: index })}
              ></div>
            </div>
          ))}
        </Radio.Group>
      </Space>
    </Space>
  )
}
