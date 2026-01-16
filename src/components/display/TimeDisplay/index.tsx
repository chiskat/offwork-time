import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'

export interface TimeDisplayProps {
  hour: number
  minute: number
  tips: ReactNode
  className?: string
  style?: CSSProperties
}

export default function TimeDisplay(props: TimeDisplayProps) {
  const { hour, minute, tips, className, style } = props

  return (
    <div
      className={clsx(
        'cursor-pointer rounded-md bg-[rgba(255,255,255,0.7)] p-4 text-center',
        className
      )}
      style={style}
    >
      <div className="text-[20px]">{tips}</div>

      <div className="align-middle">
        <span className="leading-1 inline-block text-right text-[32px]">
          {String(hour).padStart(2, '0')}
        </span>
        <span className="text-18px] ml-1 inline-block text-[#525252]">小时</span>

        <span className="mx-2 my-0 inline-block text-[24px]">:</span>

        <span className="leading-1 inline-block text-right text-[32px]">
          {String(minute).padStart(2, '0')}
        </span>
        <span className="text-18px] ml-1 inline-block text-[#525252]">分钟</span>
      </div>
    </div>
  )
}
