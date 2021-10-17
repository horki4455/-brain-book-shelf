<template>
  <div>
    <div class="d-flex justify-content-end">
      <!-- 作成ボタン -->
      <v-btn
        color="red lighten-2"
        dark
        rounded
        width="214"
        @click="ToggleDialog = true"
        >読書データの作成</v-btn
      >
    </div>
    <div class="text-muted small my-6 ml-4">
      読んだ本のページ一覧ページです
      <br />作成・編集・一覧の確認を行えます。読み解したい内容を一覧で確認しましょう。
    </div>

    <div>
      <v-icon>mdi-chevron-triple-right</v-icon>
      <span class="text-h6 mb-0">検索</span>
    </div>
    <div>
      <v-row>
        <v-col cols="4">
          <TextInput v-model="title" label="タイトル" />
        </v-col>

        <!-- TODO:clearableが実行されていない -->
        <v-col cols="4">
          <SelectInput label="タグ" v-model="tag" clearable />
        </v-col>
      </v-row>
    </div>

    <div class="mb-4">
      <v-icon>mdi-chevron-triple-right</v-icon>
      <span class="text-h6">本一覧情報</span>
    </div>
    <!-- itemと、template内のitemは別変数（v-テーブル内の機能） -->
    <v-data-table
      :items="filteredTag"
      :headers="header"
      class="elevation-10"
      loading-text="一覧を取得中"
      no-data-text="データがありません"
      outlined
      :search="title"
      @click:row="moveToDetail($event.id)"
    >
      <!-- 上のやつの説明：any型のデータが渡って（emitされて）きているので、それを受け取る＄event -->
      <template v-slot:item.bookItem.status="{ item }">
        <v-chip small dark :color="filterTagColor(item.bookItem.status)">{{
          item.bookItem.status
        }}</v-chip>
      </template>

      <template v-slot:item.bookItem.edit>
        <div>
          <v-btn>
            <v-icon color="info">mdi-pencil</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <!-- ダイアログ -->
    <div>
      <v-dialog v-model="ToggleDialog">
        <CreateBookSumDialog @close="closeDialog" />
      </v-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  toRefs,
  computed,
  useFetch,
  useStore,
  useRouter,
} from '@nuxtjs/composition-api'
import { db } from '@/plugins/firebase'

export default defineComponent({
  setup(_) {
    const router = useRouter()
    const store = useStore()
    // TAGの色変更処理
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
      { text: 'タイトル', value: 'bookItem.title' },
      { text: '著者', value: 'bookItem.author' },
      { text: '発刊日', value: 'bookItem.published' },
      { text: 'タグ', value: 'bookItem.status' },
      { text: '編集', value: 'bookItem.edit' },
    ]
    const searchKeys = reactive({
      title: '',
      tag: '',
    })
    const filteredTag = computed(() => {
      if (searchKeys.tag === '') {
        return store.getters.getBookItems
      } else {
        return store.getters.getBookItems.filter(
          (v: any) => v.bookItem.status === searchKeys.tag
        )
      }
    })
    const ToggleDialog = ref(false)
    const closeDialog = () => {
      ToggleDialog.value = false
    }

    // 詳細遷移処理
    const moveToDetail = (id: number) => {
      console.log(id)
      router.push(`books/${id}`)
    }
    useFetch(async () => {
      try {
        db.collection('bookItemsArray').onSnapshot((snapshot) => {
          store.commit('clearBookData')
          snapshot.forEach((doc) => {
            let data = doc.data()
            let id = { id: doc.id }
            const content = { ...data, ...id }
            store.commit('addBookData', content)
          })
        })
      } catch (e) {
        console.error(e)
      }
    })

    return {
      // データ
      header,
      ToggleDialog,
      ...toRefs(searchKeys),
      // メソッド
      moveToDetail,
      filterTagColor,
      filteredTag,
      closeDialog,
    }
  },
})
</script>
<style></style>
