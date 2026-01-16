import { nextSaturday, nextSunday } from 'date-fns'

import { UseSettings, WeekendType } from '@/hooks/useSettings'

import todayLeftWorktime, { dailyFullWorktime, TodayLeftStatus } from './daily'
import { hourRangeAdd, hourRangeMultiply, HourTimeRange } from './hour-time-range'

/** 把周日从 0 转为 7，也就是从 0-6 变成 1-7 */
function normalizeDay(input: number) {
  return input === 0 ? 7 : input
}

export enum WeekLeftStauts {
  /** 周末休息 */
  WEEKEND,
  /** 已经完成工作，开始周末休息 */
  PRE_WEEKEND,
  /** 工作日 */
  WORKDAY,
}

export interface WeekLeftWorktimeReturn {
  duration: HourTimeRange
  status: WeekLeftStauts
}

/** 当前所处阶段以及本周剩余工作时间 */
export function weekLeftWorktime(settings: UseSettings, now = new Date()): WeekLeftWorktimeReturn {
  const today = todayLeftWorktime(settings, now)
  if (today.status === TodayLeftStatus.NOT_WORKDAY) {
    return { status: WeekLeftStauts.WEEKEND, duration: hourRangeAdd(0) }
  }

  const nextWeekend =
    settings.weekendType === WeekendType.ONLY_SUNDAY ? nextSunday(now) : nextSaturday(now)
  const leftFullWorkday = normalizeDay(nextWeekend.getDay()) - normalizeDay(now.getDay()) - 1

  if (leftFullWorkday <= 0 && today.status === TodayLeftStatus.OFFWORK) {
    return { status: WeekLeftStauts.PRE_WEEKEND, duration: hourRangeAdd(0) }
  }

  const duration = hourRangeAdd(
    today.duration,
    hourRangeMultiply(dailyFullWorktime(settings), leftFullWorkday)
  )

  return { status: WeekLeftStauts.WORKDAY, duration }
}
