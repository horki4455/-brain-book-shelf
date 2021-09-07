<template>
  <div>
    <!-- ダイアログ -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <div class="col-12 clearfix">
            <v-btn class="float-right" color="red lighten-2" dark v-bind="attrs" v-on="on">作成</v-btn>
          </div>
        </template>

        <v-card>
          <v-card-title class="text-h5 grey lighten-2">Privacy Policy</v-card-title>

          <v-card-text>ダイアログ作成データ</v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- フィルタリング機能 -->

    <span>
      <div class="my-3">
        <v-icon>mdi-chevron-triple-right</v-icon>本一覧情報
      </div>
    </span>
    <!-- TODO：バリデーションかける -->
    <v-text-field
      placeholder="Search"
      single-line
      hide-details
      v-model="search"
      outlined
      class="my-5"
    ></v-text-field>
    <v-app>
      <v-container>
        <v-data-table
          :items="tableItems"
          :headers="header"
          class="elevation-10"
          :filter="filter"
          :search="search"
          outlined
          @click:row="onClickEvent"
        >
          <template slot="items" slot-scope="row">
            <td>{{row.item.name}}</td>
            <td>{{row.item.score}}</td>
            <td>{{row.item.kind}}</td>
          </template>
        </v-data-table>
      </v-container>
    </v-app>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from '@vue/composition-api'
export default defineComponent({
  setup(_, context) {
    const router = context.root.$router
    // テーブルに関するデータ
    const header = [
      { text: 'タイトル', value: 'name' },
      { text: 'ページ数', value: 'score' },
      { text: 'ジャンル', value: 'kind' },
    ]
    const tableItems = [
      { id: 1, name: '柴山はるみ', score: 51, kind: '大阪府' },
      { id: 2, name: '岡田雅彦', score: 48, kind: '宮崎県' },
      { id: 3, name: '若槻建', score: 67, kind: '長野県' },
      { id: 4, name: '宮下詩織', score: 23, kind: '大阪府' },
      { id: 5, name: '車慎之介', score: 43, kind: '岡山県' },
    ]
    const search = ref('')
    const dialog = ref(false)
    const onClickEvent = () => {
      router.push('books/78')
    }

    return { header, tableItems, search, dialog, onClickEvent }
  },
})
</script>
<style></style>
