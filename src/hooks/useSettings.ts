import { create, ExtractState } from 'zustand'
import { persist } from 'zustand/middleware'

/** 发薪日计算方式 */
export enum SalaryDayType {
  /** 固定日 */
  FIXED,
  /** 倒数日 */
  BACKWARD,
}

/** 发薪日遇到休息日如何调整 */
export enum SalaryRestdayOffsetType {
  /** 不作调整 */
  DEFAULT,
  /** 提前 */
  EARLY,
  /** 顺延 */
  LATER,
}

/** 周末单双休设置 */
export enum WeekendType {
  /** 双休 */
  DOUBLE,
  /** 周六单休 */
  ONLY_SATURDAY,
  /** 周日单休 */
  ONLY_SUNDAY,
}

const useSettings = create(
  persist(
    () => ({
      backgroundIndex: 1,
      timer: 10 * 1000,

      salaryDayType: SalaryDayType.BACKWARD,
      salaryDay: 1,
      salaryRestdayOffset: SalaryRestdayOffsetType.DEFAULT,

      weekendType: WeekendType.DOUBLE,

      dayBegin: { h: 9, m: 0 },
      dayEnd: { h: 18, m: 0 },

      lunch: true,
      lunchBegin: { h: 12, m: 0 },
      lunchEnd: { h: 13, m: 0 },
    }),
    { name: 'cc.paperplane.offwork.settings', version: 1 }
  )
)

export default useSettings

export type UseSettings = ExtractState<typeof useSettings>
