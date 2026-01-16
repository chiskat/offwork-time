import { Space, Switch } from 'antd'
import clsx from 'clsx'
import { CSSProperties } from 'react'

import TimePicker from '@/components/picker/TimePicker'
import { UseSettings } from '@/hooks/useSettings'
import { dailyFullWorktime, getLunchTime } from '@/lib/daily'
import { dateToTime, timeToDate } from '@/lib/time'

export interface DailySettingProps {
  value: UseSettings
  onChange(newValue: Partial<UseSettings>): void
  className?: string
  style?: CSSProperties
}

const rangeFrom0 = (count: number) => Array.from(new Array(count), (_, index) => index)
const range0: number[] = []
const range24 = rangeFrom0(24)
const range60 = rangeFrom0(60)

export default function DailySetting(props: DailySettingProps) {
  const { value: draft, onChange, className, style } = props

  const fullWorktime = dailyFullWorktime(draft)

  return (
    <Space className={clsx('flex px-3', className)} style={style} direction="vertical" size="small">
      <div>
        上班时间：
        <TimePicker
          onChange={value => value && void onChange({ dayBegin: dateToTime(value) })}
          defaultValue={timeToDate(draft.dayBegin)}
          format="HH:mm"
          disabledTime={() => ({
            disabledHours: () => range24.filter(h => h > draft.dayEnd.h),
            disabledMinutes: (selectedHour: number) =>
              range60.filter(m => selectedHour >= draft.dayEnd.h && m > draft.dayEnd.m),
            disabledSeconds: () => range0,
          })}
          allowClear={false}
          showNow={false}
          inputReadOnly
        />
      </div>

      <div>
        下班时间：
        <TimePicker
          onChange={value => value && void onChange({ dayEnd: dateToTime(value) })}
          defaultValue={timeToDate(draft.dayEnd)}
          format="HH:mm"
          disabledTime={() => ({
            disabledHours: () => range24.filter(h => h < draft.dayBegin.h),
            disabledMinutes: (selectedHour: number) =>
              range60.filter(m => selectedHour <= draft.dayBegin.h && m < draft.dayBegin.m),
            disabledSeconds: () => range0,
          })}
          allowClear={false}
          showNow={false}
          inputReadOnly
        />
      </div>

      <div className="mt-8">
        是否有午休：
        <Switch
          className="ml-1"
          onChange={value => void onChange({ lunch: value, ...getLunchTime(value, draft) })}
          defaultChecked={!!draft.lunch}
        />
      </div>

      {draft.lunch ? (
        <>
          <div>
            午休开始：
            <TimePicker
              onChange={value => value && void onChange({ lunchBegin: dateToTime(value) })}
              defaultValue={timeToDate(draft.lunchBegin)}
              format="HH:mm"
              disabledTime={() => ({
                disabledHours: () =>
                  range24.filter(
                    h => h > draft.dayEnd.h || h < draft.dayBegin.h || h > draft.lunchEnd.h
                  ),
                disabledMinutes: (selectedHour: number) =>
                  range60.filter(
                    m =>
                      (selectedHour >= draft.dayEnd.h && m > draft.dayEnd.m) ||
                      (selectedHour <= draft.dayBegin.h && m < draft.dayBegin.m) ||
                      (selectedHour >= draft.lunchEnd.h && m > draft.lunchEnd.m)
                  ),
                disabledSeconds: () => range0,
              })}
              allowClear={false}
              showNow={false}
              inputReadOnly
            />
          </div>

          <div>
            午休结束：
            <TimePicker
              onChange={value => value && void onChange({ lunchEnd: dateToTime(value) })}
              defaultValue={timeToDate(draft.lunchEnd)}
              format="HH:mm"
              disabledTime={() => ({
                disabledHours: () =>
                  range24.filter(
                    h => h > draft.dayEnd.h || h < draft.dayBegin.h || h < draft.lunchBegin.h
                  ),
                disabledMinutes: (selectedHour: number) =>
                  range60.filter(
                    m =>
                      (selectedHour >= draft.dayEnd.h && m > draft.dayEnd.m) ||
                      (selectedHour <= draft.dayBegin.h && m < draft.dayBegin.m) ||
                      (selectedHour <= draft.lunchBegin.h && m < draft.lunchBegin.m)
                  ),
                disabledSeconds: () => range0,
              })}
              allowClear={false}
              showNow={false}
              inputReadOnly
            />
          </div>
        </>
      ) : null}

      <Space className="mt-4 flex" direction="vertical" size={4}>
        <div>
          当前每日工作时间为： {fullWorktime.hours || 0}小时 {fullWorktime.minutes || 0}分钟
        </div>
        <div>午休时间不会计入工时</div>
      </Space>
    </Space>
  )
}
