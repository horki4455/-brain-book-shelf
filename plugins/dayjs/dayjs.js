import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

import relativeTime from 'dayjs/plugin/relativeTime'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import weekday from 'dayjs/plugin/weekday'

dayjs.locale('ja')
dayjs.extend(weekday)
dayjs.extend(relativeTime)
dayjs.extend(LocalizedFormat)
Vue.prototype.$dayjs = dayjs
