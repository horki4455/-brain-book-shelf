<template>
  <div>
    <div class="d-flex justify-content-end">
      <v-btn color="red lighten-2" dark rounded width="214" @click="ToggleDialog = true">編集</v-btn>
    </div>
    <v-dialog v-model="ToggleDialog">
      <UpdateBookSumDialog :pageId="$route.params.id" />
    </v-dialog>
    <!-- TODO: i18n化してコンポーネントに切り分け-->
    <div class="text-muted small my-6 ml-4">
      読んだ本のページ詳細ページです
      <br />編集・削除を行えます。要約を読み返し、自分の知識を深めましょう。
    </div>
    <h3 class="border-bottom border-secondary" style="padding:10px">
      <v-icon class="pr-3">mdi-chevron-triple-right</v-icon>情報詳細
    </h3>

    <div>
      <v-row class="mt-2">
        <v-col cols="4">
          <TextInput label="タイトル" v-model="tableItems.title" readonly :clearable="false" />
        </v-col>
        <v-col cols="4">
          <TextInput label="ID" v-model="tableItems.id" readonly :clearable="false" />
        </v-col>
        <v-col cols="4">
          <TextInput label="著者" v-model="tableItems.auther" readonly :clearable="false" />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="4">
          <TextInput label="価格" v-model="tableItems.finishDay" readonly :clearable="false" />
        </v-col>
        <v-col cols="4">
          <TextInput label="ステータス" v-model="tableItems.status" readonly :clearable="false" />
        </v-col>
        <v-col cols="4">
          <TextInput label="ジャンル" v-model="tableItems.kind" readonly :clearable="false" />
        </v-col>
      </v-row>
      <!-- TODO: 複数個登録可能にする -->
      <div class="my-9">
        <v-textarea v-model="tableItems.think" outlined readonly label="要約/感想" />
      </div>
      <div class="float-right mb-5">
        <nuxt-link to="/books">一覧へ戻る</nuxt-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, useRoute } from '@nuxtjs/composition-api'
export default {
  setup(_) {
    const tableItems = {
      id: 1,
      title: '絶対に折れない計画',
      auther: 'Daigo',
      finishDay: '2021-10-10',
      kind: '自己啓発',
      status: '未読',
      think:
        '無駄な記述が無く、計画を立無駄な記述が無く、計画を立てるた無駄な記述が無く、計画を立てるた無駄な記述が無く、計画を立てるための最無駄な記述が無く、計画を立てるための最良の方法がコンパクトに学べる本です。しかし、悪く言えば淡白な印象。タスクの計測について良の方法がコンパクトに学べる本です。しかし、悪く言えば淡白な印象。タスクの計測についてめの最良の方法がコンパクトに学べる本です。しかし、悪く言えば淡白な印象。タスクの計測についてめの最良の方法がコンパクトに学べる本です。しかし、悪く言えば淡白な印象。タスクの計測についててるための最良の方法がコンパクトに学べる本です。しかし、悪く言えば淡白な印象。タスクの計測について無駄な記述が無く、計画を立てるための最良の方法がコンパクトに学べる本です。しかし、悪く言えば淡白な印象。タスクの計測について',
    }
    const ToggleDialog = ref(false)
    const changeDialog = () => {
      ToggleDialog.value = true
    }
    return {
      tableItems,
      ToggleDialog,
    }
  },
}
</script>
<style></style>
