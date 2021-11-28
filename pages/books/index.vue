<template>
  <div>
    <Divider message="本データ一覧" />
    <div class="d-flex justify-content-end my-5">
      <v-row>
        <v-col cols="6">
          <div class="text-muted small mb-5 hidden-sm-and-down">
            読んだ本のページ一覧ページです
            <br />作成・編集・一覧の確認を行えます。読み解したい内容を一覧で確認しましょう。
          </div>
        </v-col>
        <v-col cols="6" class="d-flex justify-content-end">
          <RoundedButton
            text="読書データの作成"
            color="green lighten-2"
            @click="openCreateDialog"
          />
        </v-col>
      </v-row>
    </div>
    <mypage />

    <div>
      <v-icon>mdi-chevron-triple-right</v-icon>
      <span class="text-h6 mb-0">検索</span>
    </div>

    <div>
      <v-row>
        <v-col cols="4">
          <TextInput v-model="title" label="タイトル" />
        </v-col>

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
      class="elevation-10 table-item"
      loading-text="一覧を取得中"
      no-data-text="データがありません"
      outlined
      :search="title"
      items-per-page="50"
    >
      <!-- ここの場合は、左がヘッダーの値、右がテーブルからもらうitemそのものぽい。普通より特殊だと思う。-->
      <template v-slot:item.bookItem.title="{ item }">
        <span> {{ omittedText(item.bookItem.title) }}</span>
      </template>

      <template v-slot:item.bookItem.status="{ item }">
        <v-chip small dark :color="filterTagColor(item.bookItem.status)">{{
          item.bookItem.status
        }}</v-chip>
      </template>
      <template v-slot:item.bookItem.edit="{ item }">
        <v-btn @click="openUpdateDialog(item)">
          <v-icon class="mr-2">mdi-pencil</v-icon></v-btn
        >
      </template>
      <template v-slot:item.bookItem.detail="{ item }">
        <span @click="moveToDetail(item.id)">
          <v-icon class="mr-2">mdi-chevron-triple-right</v-icon></span
        >
      </template>
    </v-data-table>

    <!-- 作成ダイアログ -->
    <div>
      <v-dialog v-model="CreateToggleDialog">
        <CreateBookSumDialog @close="closeCreateDialog" />
      </v-dialog>
    </div>
    <!-- 編集ダイアログ -->
    <v-dialog v-model="UpdateToggleDialog">
      <UpdateBookSumDialog
        @close="closeUpdateDialog"
        :tableItems="tableItems"
      />
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  useStore,
  useRouter,
} from '@nuxtjs/composition-api'
import { db } from '@/plugins/firebase'
import mypage from '~/components/mypage.vue'

export default defineComponent({
  components: { mypage },
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
      { text: '詳細', value: 'bookItem.detail' },
    ]
    const tableItems = reactive({
      id: '',
      title: '',
      think: '',
      finishDay: '',
      author: '',
      price: '',
      status: '',
      published: '',
      userId: '',
      ratingVal: 0,
    })

    const filteredBookItems = computed(() => {
      const ID = store.getters.getUserUid
      return store.getters.getBookItems.filter(
        (v: any) => v.bookItem.userId === ID
      )
    })
    const searchKeys = reactive({
      title: '',
      tag: null,
    })
    // フィルター検索機能
    const filteredTag = computed(() => {
      if (searchKeys.tag === null) {
        return filteredBookItems.value
      } else {
        return filteredBookItems.value.filter(
          (v: any) => v.bookItem.status === searchKeys.tag
        )
      }
    })
    // 作成ダイアログ開閉機能
    const CreateToggleDialog = ref<boolean>(false)
    const openCreateDialog = () => {
      CreateToggleDialog.value = true
    }
    const closeCreateDialog = () => {
      CreateToggleDialog.value = false
    }

    // 編集ダイアログ
    const UpdateToggleDialog = ref<boolean>(false)
    const openUpdateDialog = (item: any) => {
      tableItems.pageId = item.id
      Object.assign(tableItems, item.bookItem)
      UpdateToggleDialog.value = true
      console.log(tableItems)
    }
    const closeUpdateDialog = () => {
      UpdateToggleDialog.value = false
    }
    //表示文字数制限
    const omittedText = (text: string | number) => {
      const toString = String(text)
      return toString.length > 10 ? toString.slice(0, 10) + '…' : toString
    }

    // 詳細遷移処理
    const moveToDetail = (id: number) => {
      router.push(`books/${id}`)
    }
    // 一覧取得機能
    onMounted(async () => {
      fetchData()
    })
    const fetchData = () => {
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
    }

    return {
      // データ
      header,
      CreateToggleDialog,
      ...toRefs(searchKeys),
      tableItems,
      // メソッド
      moveToDetail,
      filterTagColor,
      filteredTag,
      closeCreateDialog,
      openCreateDialog,
      filteredBookItems,
      omittedText,
      UpdateToggleDialog,
      openUpdateDialog,
      closeUpdateDialog,
    }
  },
})
</script>
<style scoped>
.table-item >>> tbody tr {
  cursor: pointer;
}
</style>
