<template>
  <div>
    <div class="ml-4 font text-center">
      <v-icon class="mr-2" large>mdi-chevron-triple-right</v-icon>{{ message }}
    </div>
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
  font-size: 3.3rem;
  font-family: 'Comic Sans MS';
  font-weight: bold;
}
</style>
