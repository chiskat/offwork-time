import { Space } from 'antd'
import clsx from 'clsx'
import { CSSProperties } from 'react'

export interface AboutSettingProps {
  className?: string
  style?: CSSProperties
}

const year = new Date().getFullYear()

export default function AboutSetting(props: AboutSettingProps) {
  const { className, style } = props

  return (
    <Space
      className={clsx('flex px-3', className)}
      style={style}
      direction="vertical"
      size="middle"
    >
      <div className="text-center">
        <img className="w-[120px]" src={require('@/assets/img/offwork.jpg')} alt="logo" />
      </div>

      <Space className="flex text-center" direction="vertical" size={4}>
        <span>
          {`下班发薪倒计时 v${process.env.REACT_APP_VERSION}`} ·{' '}
          <a href="https://github.com/chiskat">Chiskat</a> ·{' '}
          <a href="https://github.com/chiskat/offwork-time">GitHub</a>
        </span>
        <span>Copyright © 2021-{year}</span>
      </Space>

      <Space className="flex"></Space>
    </Space>
  )
}
