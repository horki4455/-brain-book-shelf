<template>
  <div>
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          class="my-5"
          dense
          :label="label"
          outlined
          :value="value"
          v-bind="attrs"
          v-on="on"
          readonly
          clearable
          @click:clear="$emit('input', '')"
        />
      </template>
      <v-date-picker
        no-title
        :day-format="daysFormat"
        :header-date-format="dayFormatHeader"
        locale="ja"
        :value="value"
        :show-current="false"
        @input="$emit('input', $event)"
      >
        <!-- inputで渡すと、 $eventに指定した引数で親のvalueで渡ってきたpropsを更新する -->
        <!-- $eventには、選択された日付の文字列が張っている -->
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(value)">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'DateInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const daysFormat = (date: string) => {
      return new Date(date).getDate()
    }
    const dayFormatHeader = () => {
      if (props.value !== '') {
        return context.root.$dayjs(props.value).format('YYYY/M/D(ddd)')
      } else {
        return context.root.$dayjs().format('YYYY/M')
      }
    }
    return { daysFormat, dayFormatHeader }
  },
})
</script>
