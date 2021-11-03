<template>
  <div>
    <v-btn
      :color="color"
      :width="width"
      :disabled="disabled"
      :dark="dark"
      rounded
      @click.stop="$emit('click')"
    >
      {{ text }}
    </v-btn>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      Type: Boolean,
      default: false,
    },
    color: {
      Type: String,
      default: 'red',
    },
    width: {
      Type: Number,
      default: 215,
    },
    text: {
      Type: [String | Number],
      default: '',
    },
    disabled: {
      Type: Boolean,
      default: false,
    },
    dark: {
      Type: Boolean,
      default: true,
    },
  },
})
</script>
