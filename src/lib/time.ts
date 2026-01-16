import { getHours, getMinutes, set } from 'date-fns'

export function timeToDate(input: { h: number; m: number }) {
  return set(new Date(0), { hours: input.h, minutes: input.m })
}

export function dateToTime(input: number | Date) {
  return { h: getHours(input), m: getMinutes(input) }
}
