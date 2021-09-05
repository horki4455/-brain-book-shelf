<template>
  <div>{{ count }}</div>
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
