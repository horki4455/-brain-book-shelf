<template>
  <div>
    <div class="d-flex justify-center font">{{ message }}</div>
    <div class="line" />
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    message: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped>
.line {
  border-bottom-style: solid;
  margin-top: 5px;
  margin-bottom: 5px;
}
.font {
  font-size: 1.3rem;
  font-family: 'Comic Sans MS';
}
</style>
