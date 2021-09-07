<template>
  <div>
    <div>{{ count }}</div>
    <div>詳細</div>
  </div>
</template>
<script lang="ts">
import { ref } from '@vue/composition-api'
export default {
  setup() {
    const count = ref(1)

    return { count }
  },
}
</script>
<style></style>
