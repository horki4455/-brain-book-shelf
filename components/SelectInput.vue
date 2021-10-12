<template>
  <div>
    <v-select
      class="my-5"
      :items="tagStatus"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
      :clearable="clearable"
      :label="label"
      dense
      outlined
      color="info"
      @input="$emit('input', $event)"
    />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'TextInput',
  props: {
    value: {
      type: [String, Boolean],
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup() {
    const tagStatus = ['未読', '読了', '途中']
    return {
      tagStatus,
    }
  },
})
</script>
