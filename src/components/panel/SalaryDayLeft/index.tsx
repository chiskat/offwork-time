import { useInterval } from 'ahooks'
import { useState } from 'react'

import TextDisplay from '@/components/display/TextDisplay'
import TimeDisplay from '@/components/display/TimeDisplay'
import useSettings from '@/hooks/useSettings'
import { SalaryLeftStatus, salaryLeftWorktime } from '@/lib/salary'

export default function SalaryDayLeft() {
  const settings = useSettings()
  const [salaryLeft, setSalaryLeft] = useState(() => salaryLeftWorktime(settings))
  useInterval(() => void setSalaryLeft(salaryLeftWorktime(settings)), settings.timer, {
    immediate: true,
  })

  if (salaryLeft.status === SalaryLeftStatus.SALARY_DAY) {
    return <TextDisplay>{`大快人心！ 今天是发薪日~`}</TextDisplay>
  }

  return (
    <TimeDisplay
      hour={salaryLeft.duration.hours || 0}
      minute={salaryLeft.duration.minutes || 0}
      tips="距离发薪日剩余工时："
    />
  )
}
