<template>
  <div>
    <v-text-field
      class="my-5"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
      :clearable="clearable"
      :label="label"
      outlined
      hide-details
      dense
      color="info"
      @input="$emit('input', $event)"
    />
  </div>
</template >
<script lang="ts">
import { ref, defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'TextInput',
  props: {
    value: {
      type: [String, Number],
      default: false,
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
      default: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
})
</script>