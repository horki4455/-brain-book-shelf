<template>
  <div>
    <div>
      <v-row no-gutters>
        <v-col cols="10" align="start">
          {{ label}}
          <p v-if="required">*</p>
        </v-col>
      </v-row>
    </div>
    <v-menu ref="menu">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          dense
          outlined
          ;value="value"
          v-bind="attrs"
          v-on="on"
          readonly
          clearable
          @click:clear="$emit('input', '')"
        />
      </template>
      <v-date-picker
        no-title
        :day-format="dayFormat"
        :header-date-format="dayFormatHeader"
        locale="ja"
        :value="value"
        @click:clear="$emit('input', $event)"
      />
    </v-menu>
    picker: {{ picker }}
  </div>
</template>

<script lang="ts">
// import { ref, defineComponent, reactive } from '@vue/composition-api'
// export default defineComponent({
//   name: 'DateInput',
//   props: {
//     value: {
//       type: String,
//       default: '',
//     },
//   },
//   setup(props) {

// const dayformat =
// const dayFormatHeader = ()=>{
//   if(props.value !== ''){
//     retrun $dayjs(props.value).format('YYYY/M/D(ddd)')
//   }else{
//     return $dayjs().format('YYYY/M')
//   }
// }
//     return { daysformat, dayFormatHeader }
//   },
// })
//
</script>