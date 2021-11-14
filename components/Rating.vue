<template>
  <div>
    <div class="mb-11">
      <v-rating
        empty-icon="mdi-star-outline"
        full-icon="mdi-star"
        half-icon="mdi-star-half-full"
        hover
        :readonly="readonly"
        length="5"
        size="24"
        :value="value"
        @input="$emit('input', $event)"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
})
</script>
<style scoped>
.font-size {
  font-size: 0.125rem;
  margin-bottom: 3px;
}
</style>
