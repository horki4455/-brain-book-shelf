<template>
  <div>
    <h3 class="text-center my-5">マイ読書データ</h3>
    <v-card outlined>
      <div class="text-center my-5">ユーザーネーム</div>
      <v-row class="d-flex justify-content-center py-5 my-3 ml-3">
        <v-col cols="4">
          <div class="mb-3">今月読んだ分</div>
          <div class="red text-white">hoge冊</div>
        </v-col>
        <v-col cols="4">
          <div class="mb-3">今月の目標分</div>
          <div class="red text-white">hoge冊</div>
        </v-col>
      </v-row>
    </v-card>

    <v-row class="d-flex justify-content-center my-3">
      <v-col cols="5" class="mr-7">
        <lineChart />
      </v-col>
      <v-col cols="5">
        <circleChart />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>
