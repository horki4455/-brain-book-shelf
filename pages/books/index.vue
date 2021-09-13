<template>
  <div>
    <!-- ダイアログ -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <div class="col-12 clearfix">
            <v-btn
              class="float-right"
              color="red lighten-2"
              dark
              v-bind="attrs"
              v-on="on"
              rounded
              width="214"
            >本データ作成</v-btn>
          </div>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">Privacy Policy</v-card-title>

          <v-card-text>ダイアログ作成データ</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- 作成ボタン -->
    <div class="text-muted small my-6 ml-4">
      読んだ本のページ一覧ページです
      <br />作成・編集・一覧の確認を行えます。読み解したい内容を一覧で確認しましょう。
    </div>
    <!-- フィルタリング機能 -->

    <!-- TODO：バリデーションかける -->
    <div class="my-3">
      <v-icon>mdi-chevron-triple-right</v-icon>
      <span class="text-h6 mb-0">検索</span>
    </div>
    <div>
      <v-row>
        <v-col cols="4">
          <TextInput v-model="search" label="タイトル" />
        </v-col>
        <v-col cols="4">
          <TextInput v-model="search" label="読了日" />
        </v-col>
        <v-col cols="4">
          <v-select hide-details v-model="search" label="タグ" outlined dense class="my-5" />
        </v-col>
      </v-row>
    </div>

    <div class="my-3">
      <v-icon>mdi-chevron-triple-right</v-icon>
      <span class="text-h6">本一覧情報</span>
    </div>

    <v-data-table
      :items="item"
      :headers="header"
      class="elevation-10"
      loading-text="一覧を取得中"
      no-data-text="データがありません"
      :search="search"
      outlined
      @click:row="moveToDetail(item.id)"
    >
      <!-- <template v-slot:[`item.status`]="{item}">
        <v-chip small :color="filterTagColor(item.status)">{{item.status}}</v-chip>
      </template>

      <template v-slot:[`item.edit`]="{ item }">
        <div>
          <v-btn>
            <v-icon color="info">mdi-pencil</v-icon>
          </v-btn>
        </div>
      </template>-->
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup(_, context) {
    const router = context.root.$router
    // TAGの色変更
    const filterTagColor = (item: string) => {
      switch (item) {
        case '未読':
          return 'green'
          break
        case '読了':
          return 'blue'
          break
        case '途中':
          return 'red'
          break
      }
    }
    // テーブルに関するデータ
    const header = [
      { text: 'タイトル', value: 'name' },
      { text: 'ページ数', value: 'score' },
      { text: 'ジャンル', value: 'kind' },
      { text: 'ステータス', value: 'status' },
      { text: '編集', value: 'edit' },
    ]
    const item = [
      {
        id: 1,
        name: '柴山はるみ',
        score: 51,
        kind: '大阪府',
        finishDay: '2020/12/11',
        status: '未読',
      },
      {
        id: 2,
        name: '岡田雅彦',
        score: 48,
        kind: '宮崎県',
        finishDay: '2020/11/11',
        status: '読了',
      },
      {
        id: 3,
        name: '若槻建',
        score: 67,
        kind: '長野県',
        finishDay: '2020/12/01',
        status: '途中',
      },
      {
        id: 4,
        name: '宮下詩織',
        score: 23,
        kind: '大阪府',
        finishDay: '2020/01/11',
        status: '途中',
      },
      {
        id: 5,
        name: '車慎之介',
        score: 43,
        kind: '岡山県',
        finishDay: '2020/11/09',
        status: '途中',
      },
    ]
    const search = ref('')
    const dialog = ref(false)
    // 詳細遷移処理
    const moveToDetail = (id: number) => {
      router.push(`books/${id}`)
    }

    return { header, item, search, dialog, moveToDetail, filterTagColor }
  },
})
</script>
<style></style>
