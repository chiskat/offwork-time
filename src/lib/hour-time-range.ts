export interface HourTimeRange {
  hours: number
  minutes: number
  seconds: number
}

const secondTs = 1000
const minuteTs = 60 * secondTs
const hourTs = 60 * minuteTs

export function emptyHourRange() {
  return tsToHourRange(0)
}

export function tsToHourRange(ts: number): HourTimeRange {
  const hours = Math.floor(ts / hourTs)
  const minutes = Math.floor((ts % hourTs) / minuteTs)
  const seconds = Math.floor((ts % minuteTs) / secondTs)

  return { hours, minutes, seconds }
}

export function hourRangeToTs(range: HourTimeRange): number {
  return range.hours * hourTs + range.minutes * minuteTs + range.seconds * secondTs
}

export function hourRangeAdd(...p: Array<number | HourTimeRange>): HourTimeRange {
  return tsToHourRange(
    p.reduce<number>(
      (total, current) => total + (typeof current === 'number' ? current : hourRangeToTs(current)),
      0
    )
  )
}

export function hourRangeMultiply(range: number | HourTimeRange, multiple: number): HourTimeRange {
  return tsToHourRange((typeof range === 'number' ? range : hourRangeToTs(range)) * multiple)
}
