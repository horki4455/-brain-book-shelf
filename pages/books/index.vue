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
        <v-icon>
          mdi-chevron-triple-right
          Google @Google
        </v-icon>本一覧情報
      </div>
    </span>
    <!-- TODO：バリデーションかける -->
    <v-text-field
      placeholder="Search"
      single-line
      hide-details
      v-model="search"
      outlined
      class="ma-2"
    ></v-text-field>
    <v-app>
      <v-container>
        <v-data-table
          :items="tableItems"
          :headers="header"
          class="elevation-10"
          :filter="filter"
          :search="search"
        >
          <template slot="items" slot-scope="row">
            <td>{{row.item.name}}</td>
            <td>{{row.item.score}}</td>
            <td>{{row.item.birthplace}}</td>
          </template>
        </v-data-table>
      </v-container>
    </v-app>
  </div>
</template>
<script lang="ts">
import { ref } from '@vue/composition-api'
export default {
  setup() {
    // テーブルに関するデータ
    const header = [
      { text: '名前', value: 'name' },
      { text: '点数', value: 'score' },
      { text: '出身地', value: 'birthplace' },
    ]
    const tableItems = [
      { name: '柴山はるみ', score: 51, birthplace: '大阪府' },
      { name: '岡田雅彦', score: 48, birthplace: '宮崎県' },
      { name: '若槻建', score: 67, birthplace: '長野県' },
      { name: '宮下詩織', score: 23, birthplace: '大阪府' },
      { name: '車慎之介', score: 43, birthplace: '岡山県' },
      { name: '武藤里穂', score: 79, birthplace: '大阪府' },
      { name: '金子宏行', score: 82, birthplace: '神奈川県' },
      { name: '草野彩華', score: 12, birthplace: '静岡県' },
      { name: '海音寺薫', score: 45, birthplace: '群馬県' },
      { name: '堤咲', score: 100, birthplace: '兵庫県' },
    ]
    const search = ref('')
    const dialog = ref(false)

    return { header, tableItems, search, dialog }
  },
}
</script>
<style></style>
