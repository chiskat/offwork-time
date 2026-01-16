import generateCalendar from 'antd/es/calendar/generateCalendar'
import 'antd/es/calendar/style/index.less'
import dayFnsGenerateConfig from 'rc-picker/lib/generate/dateFns'

const Calendar = generateCalendar<Date>(dayFnsGenerateConfig)

export default Calendar
