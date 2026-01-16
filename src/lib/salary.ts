import {
  addDays,
  addMonths,
  eachDayOfInterval,
  isAfter,
  isSameDay,
  lastDayOfMonth,
  set,
  subDays,
} from 'date-fns'

import { SalaryDayType, SalaryRestdayOffsetType, UseSettings } from '@/hooks/useSettings'

import todayLeftWorktime, { dailyFullWorktime, isWorkday } from './daily'
import { hourRangeAdd, HourTimeRange } from './hour-time-range'

export enum SalaryLeftStatus {
  SALARY_DAY,
  NORMAL,
}

export interface SalaryLeftReturn {
  duration: HourTimeRange
  status: SalaryLeftStatus
}

export function salaryLeftWorktime(settings: UseSettings, now = new Date()): SalaryLeftReturn {
  const maybeSalaryDay = findSalaryDay(settings, now)
  const nextSalaryDay = isAfter(now, maybeSalaryDay)
    ? findSalaryDay(settings, set(addMonths(now, 1), { date: 1 }))
    : maybeSalaryDay

  if (isSameDay(now, maybeSalaryDay) || isSameDay(now, nextSalaryDay)) {
    return {
      status: SalaryLeftStatus.SALARY_DAY,
      duration: hourRangeAdd(0),
    }
  }

  const fullWorktime = dailyFullWorktime(settings)
  const fullWorkdayDuration = eachDayOfInterval({
    start: addDays(now, 1),
    end: subDays(nextSalaryDay, 1),
  }).reduce(
    (prev, date) => hourRangeAdd(prev, isWorkday(settings, date) ? fullWorktime : 0),
    hourRangeAdd(0)
  )
  const duration = hourRangeAdd(fullWorkdayDuration, todayLeftWorktime(settings, now).duration)

  return { status: SalaryLeftStatus.NORMAL, duration }
}

function findSalaryDay(settings: UseSettings, now: Date): Date {
  const { salaryDay, salaryDayType, salaryRestdayOffset } = settings

  const calendarSalaryDay =
    salaryDayType === SalaryDayType.FIXED
      ? set(now, { date: salaryDay, hours: 0, minutes: 0, seconds: 0 })
      : subDays(lastDayOfMonth(now), Math.max(0, salaryDay - 1))

  if (
    salaryRestdayOffset === SalaryRestdayOffsetType.DEFAULT ||
    isWorkday(settings, calendarSalaryDay)
  ) {
    return calendarSalaryDay
  }

  const offset = salaryRestdayOffset === SalaryRestdayOffsetType.EARLY ? subDays : addDays
  let result = calendarSalaryDay
  do {
    result = offset(result, 1)
  } while (!isWorkday(settings, result))

  return result
}
