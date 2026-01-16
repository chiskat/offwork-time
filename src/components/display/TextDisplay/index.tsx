import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'

export interface TextDisplayProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export default function TextDisplay(props: TextDisplayProps) {
  const { className, style, children } = props

  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center justify-center rounded-md bg-[rgba(255,255,255,0.7)] px-4 py-5 text-[24px]',
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}
