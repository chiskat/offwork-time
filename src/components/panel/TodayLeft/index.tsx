import { useInterval } from 'ahooks'
import { useState } from 'react'

import TextDisplay from '@/components/display/TextDisplay'
import TimeDisplay from '@/components/display/TimeDisplay'
import useSettings from '@/hooks/useSettings'
import todayLeftWorktime, { TodayLeftStatus } from '@/lib/daily'

export default function TodayLeft() {
  const settings = useSettings()
  const [todayLeft, setTodayLeft] = useState(() => todayLeftWorktime(settings))
  useInterval(() => void setTodayLeft(todayLeftWorktime(settings)), settings.timer, {
    immediate: true,
  })

  if (todayLeft.status === TodayLeftStatus.BEFORE) {
    return <TextDisplay>{'别急！ 还没到上班时间呢 ~'}</TextDisplay>
  } else if (todayLeft.status === TodayLeftStatus.OFFWORK) {
    return <TextDisplay>{'下班啦！ 尽情享受生活吧 ~'}</TextDisplay>
  }

  return (
    <TimeDisplay
      hour={todayLeft.duration.hours || 0}
      minute={todayLeft.duration.minutes || 0}
      tips="距离今日下班剩余工时："
    />
  )
}
