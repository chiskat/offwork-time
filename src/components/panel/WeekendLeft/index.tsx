import { useInterval } from 'ahooks'
import { useState } from 'react'

import useSettings from '@/hooks/useSettings'
import { WeekLeftStauts, weekLeftWorktime } from '@/lib/weekly'

import TextDisplay from '../../display/TextDisplay'
import TimeDisplay from '../../display/TimeDisplay'

export default function WeekendLeft() {
  const settings = useSettings()
  const [weekendLeft, setWeekendLeft] = useState(() => weekLeftWorktime(settings))
  useInterval(() => void setWeekendLeft(weekLeftWorktime(settings)), settings.timer, {
    immediate: true,
  })

  if (weekendLeft.status === WeekLeftStauts.WEEKEND) {
    return <TextDisplay>{`周末啦！ 尽情放松吧~`}</TextDisplay>
  } else if (weekendLeft.status === WeekLeftStauts.PRE_WEEKEND) {
    return <TextDisplay>{`忙完啦！ 等待休闲时光~`}</TextDisplay>
  }

  return (
    <TimeDisplay
      hour={weekendLeft.duration.hours || 0}
      minute={weekendLeft.duration.minutes || 0}
      tips="距离周末休息剩余工时："
    />
  )
}
