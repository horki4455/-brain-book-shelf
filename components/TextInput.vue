<template>
  <div>
    <v-text-field
      class="my-5"
      :value="value"
      :readonly="readonly"
      :disabled="disabled"
      :clearable="clearable"
      :rules="rules"
      :label="label"
      :type="type"
      outlined
      dense
      color="info"
      @input="$emit('input', $event)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'TextInput',
  props: {
    value: {
      type: [String, Boolean],
      default: '',
    },
    rules: {
      type: Array,
      default: () => [],
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
    type: {
      type: String,
      default: '',
    },
  },
})
</script>
