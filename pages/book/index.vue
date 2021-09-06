<template>
  <div>
    <div>{{ count }}</div>
    <div>あああ</div>
    <div>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from '@vue/composition-api'
export default {
  setup() {
    const count = ref(1)
    const headers = [
      {
        text: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ]

    return { count }
  },
}
</script>
<style></style>
