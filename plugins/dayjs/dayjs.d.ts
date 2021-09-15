// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'

import dayjs from 'dayjs'

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $dayjs(
      date?: dayjs.ConfigType,
      option?: dayjs.OptionType,
      locale?: string
    ): dayjs.Dayjs
  }
}
declare module 'dayjs' {
  interface Dayjs {
    weekday(): number

    weekday(value: number): Dayjs
  }
}
