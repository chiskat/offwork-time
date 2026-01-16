import { isSaturday, isSunday } from 'date-fns'
import { isBefore, set } from 'date-fns'

import { UseSettings, WeekendType } from '@/hooks/useSettings'

import { hourRangeAdd, HourTimeRange } from './hour-time-range'
import { dateToTime, timeToDate } from './time'

/** 给定时间是否为工作日 */
export function isWorkday(settings: UseSettings, now = new Date()): boolean {
  if (
    (isSaturday(now) && settings.weekendType !== WeekendType.ONLY_SUNDAY) ||
    (isSunday(now) && settings.weekendType !== WeekendType.ONLY_SATURDAY)
  ) {
    return false
  }

  return true
}

export enum TodayLeftStatus {
  /** 上班前 */
  BEFORE,
  /** 上午工作时间 */
  MORNING,
  /** 午休 */
  LUNCH,
  /** 下午工作时间 */
  AFTERNOON,
  /** 下班后 */
  OFFWORK,

  /** 非工作日 */
  NOT_WORKDAY,
}

export interface TodayLeftWorktimeReturn {
  duration: HourTimeRange
  status: TodayLeftStatus
  work: boolean
}

/** 当前所处阶段以及当日剩余工作时间 */
export default function todayLeftWorktime(
  settings: UseSettings,
  now = new Date()
): TodayLeftWorktimeReturn {
  const { dayBegin, dayEnd, lunch, lunchBegin, lunchEnd } = settings

  const todayBegin = set(now, { hours: dayBegin.h, minutes: dayBegin.m })
  const todayEnd = set(now, { hours: dayEnd.h, minutes: dayEnd.m })

  if (!isWorkday(settings, now)) {
    return { status: TodayLeftStatus.NOT_WORKDAY, duration: hourRangeAdd(0), work: false }
  }

  const todayLunchBegin = lunch
    ? set(now, { hours: lunchBegin.h, minutes: lunchBegin.m })
    : set(now, { hours: 0, minutes: 0 })
  const todayLunchEnd = lunch
    ? set(now, { hours: lunchEnd.h, minutes: lunchEnd.m })
    : set(now, { hours: 0, minutes: 0 })

  if (isBefore(now, todayBegin)) {
    return {
      status: TodayLeftStatus.BEFORE,
      duration: hourRangeAdd(
        todayLunchBegin.valueOf() - todayBegin.valueOf(),
        todayEnd.valueOf() - todayLunchEnd.valueOf()
      ),
      work: false,
    }
  } else if (isBefore(now, todayLunchBegin)) {
    return {
      status: TodayLeftStatus.MORNING,
      duration: hourRangeAdd(
        todayLunchBegin.valueOf() - now.valueOf(),
        todayEnd.valueOf() - todayLunchEnd.valueOf()
      ),
      work: true,
    }
  } else if (isBefore(now, todayLunchEnd)) {
    return {
      status: TodayLeftStatus.LUNCH,
      duration: hourRangeAdd(todayEnd.valueOf() - todayLunchEnd.valueOf()),
      work: false,
    }
  } else if (isBefore(now, todayEnd)) {
    return {
      status: TodayLeftStatus.AFTERNOON,
      duration: hourRangeAdd(todayEnd.valueOf() - now.valueOf()),
      work: true,
    }
  } else {
    return {
      status: TodayLeftStatus.OFFWORK,
      duration: hourRangeAdd(0),
      work: false,
    }
  }
}

/** 每天的总工时 */
export function dailyFullWorktime(settings: UseSettings): HourTimeRange {
  const { dayBegin, dayEnd, lunch, lunchBegin, lunchEnd } = settings
  const now = new Date(0)
  const todayBegin = set(now, { hours: dayBegin.h, minutes: dayBegin.m })
  const todayEnd = set(now, { hours: dayEnd.h, minutes: dayEnd.m })
  const todayLunchBegin = lunch
    ? set(now, { hours: lunchBegin.h, minutes: lunchBegin.m })
    : set(now, { hours: 0, minutes: 0 })
  const todayLunchEnd = lunch
    ? set(now, { hours: lunchEnd.h, minutes: lunchEnd.m })
    : set(now, { hours: 0, minutes: 0 })

  return hourRangeAdd(
    todayLunchBegin.valueOf() - todayBegin.valueOf(),
    todayEnd.valueOf() - todayLunchEnd.valueOf()
  )
}

/** 午休时间预估 */
export function getLunchTime(
  lunch: boolean,
  settings: Pick<UseSettings, 'dayBegin' | 'dayEnd'>
): Pick<UseSettings, 'lunchBegin' | 'lunchEnd'> {
  const { dayBegin, dayEnd } = settings

  if (!lunch) {
    return { lunchBegin: settings.dayBegin, lunchEnd: settings.dayEnd }
  }

  const dayBeginTs = timeToDate(dayBegin).valueOf()
  const dayEndTs = timeToDate(dayEnd).valueOf()

  const hourTs = 60 * 60 * 1000
  const workTs = dayEndTs - dayBeginTs
  const workHours = workTs / hourTs

  let lunchBeginTs = dayBeginTs
  let lunchEndTs = dayEndTs

  if (workHours === 10 || workHours === 9.5) {
    lunchBeginTs = dayBeginTs + 3.5 * hourTs
    lunchEndTs = lunchBeginTs + 1.5 * hourTs
  } else if (workHours === 9) {
    lunchBeginTs = dayBeginTs + 3 * hourTs
    lunchEndTs = lunchBeginTs + 1 * hourTs
  } else if (workHours === 8.5 || workHours === 8) {
    lunchBeginTs = dayBeginTs + 3 * hourTs
    lunchEndTs = lunchBeginTs + 0.5 * hourTs
  } else {
    lunchBeginTs = dayBeginTs + workTs * 0.375
    lunchEndTs = dayBeginTs + workTs * 0.5
  }

  return {
    lunchBegin: dateToTime(Math.max(lunchBeginTs, dayBeginTs)),
    lunchEnd: dateToTime(Math.min(lunchEndTs, dayEndTs)),
  }
}
