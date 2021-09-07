<template>
  <div>
    <div
      class="text-muted small"
    >説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文説明文</div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <div class="col-12 clearfix">
          <v-btn class="float-right" color="red lighten-2" dark v-bind="attrs" v-on="on">編集</v-btn>
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
    <h3 class="border-bottom border-secondary" style="padding:10px">
      <v-icon class="pr-3">mdi-chevron-triple-right</v-icon>情報一覧
    </h3>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="6" sm="6" md="3" class="ma-5">
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
          <v-col cols="6" sm="6" md="3" solo>
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
          <v-col cols="6" sm="6" md="3" solo>
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6" md="3" class="ma-5">
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
          <v-col cols="6" sm="6" md="3" solo>
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
          <v-col cols="6" sm="6" md="3" solo>
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6" md="3" class="ma-5">
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
          <v-col cols="6" sm="6" md="3" solo>
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
          <v-col cols="6" sm="6" md="3" solo>
            <v-text-field label="ID" readonly v-model="tableItems.id" solo />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script lang="ts">
import { ref } from '@vue/composition-api'
export default {
  setup() {
    const tableItems = { id: 1, name: '柴山はるみ', score: 51, kind: '大阪府' }
    return { tableItems }
  },
}
</script>
<style></style>
