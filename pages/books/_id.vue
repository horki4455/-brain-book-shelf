<template>
  <div>
    <div class="d-flex justify-content-end">
      <RoundedButton
        text="編集"
        color="red"
        @click="openDialog"
        :disabled="!isValid"
      />
    </div>

    <!-- 編集ダイアログ -->
    <v-dialog v-model="ToggleDialog">
      <UpdateBookSumDialog
        :pageId="$route.params.id"
        @close="closeDialog"
        :tableItems="tableItems"
        @fetch="fetchBook"
      />
    </v-dialog>
    <!-- TODO: i18n化してコンポーネントに切り分け-->
    <div class="text-muted small my-6 ml-4">
      読んだ本のページ詳細ページです
      <br />自分の投稿の場合、編集・削除を行えます。要約を読み返し、自分の知識を深めましょう。
    </div>
    <h3 class="border-bottom border-secondary" style="padding: 10px">
      <v-icon class="pr-3">mdi-chevron-triple-right</v-icon>

      <span class="text-center title-wrapper">{{ title }}</span>
    </h3>
    <div class="d-flex justify-content-center">
      <v-col cols="8">
        <div>
          <v-row class="mt-2">
            <v-col cols="8">
              <img
                class="img mb-4 ml-3"
                src="@/assets/bookImage.jpeg"
                height="300"
              />
            </v-col>
            <v-col cols="4">
              <h5 class="py-3 text-wrapper">著者:{{ author }}</h5>
              <h5 class="pb-5">発刊日: {{ published }}</h5>
              <h5 class="pb-5">価格: {{ price }}円</h5>
              <h5 class="pb-5">ステータス: {{ status }}</h5>

              <Rating v-model="ratingVal" readonly />
            </v-col>
          </v-row>
          <hr />
          <div class="my-9 textarea-wrapper">
            <v-textarea
              v-model="description"
              outlined
              readonly
              label="要約"
              auto-grow
            />
          </div>
          <hr />
          <div class="my-9">
            <v-textarea v-model="think" outlined readonly label="感想" />
          </div>
          <hr />
          <v-row class="mt-0">
            <v-col cols="4">
              <TextInput
                label="読了日"
                v-model="finishDay"
                readonly
                :clearable="false"
              />
            </v-col>
          </v-row>
          <div class="float-right mb-5">
            <nuxt-link to="/books">一覧へ戻る</nuxt-link>
          </div>
        </div>
      </v-col>
    </div>
  </div>
</template>
<script lang="ts">
import {
  ref,
  useRoute,
  computed,
  toRefs,
  reactive,
  useStore,
  onMounted,
} from '@nuxtjs/composition-api'
import { db } from '@/plugins/firebase'
import { BookItem } from '@/types/book'
type TableItems = Omit<BookItem, 'createDay'>

export default {
  setup() {
    const tableItems = reactive<TableItems>({
      id: '',
      title: '',
      description: '',
      think: '',
      finishDay: '',
      author: '',
      price: '',
      status: '',
      published: '',
      userId: '',
      ratingVal: 0,
    })
    const route = useRoute()
    const store = useStore()
    const pageId = route.value.params.id
    // 表示データの処理
    let FetchedbookItem = ref()
    const fetchBook = async () => {
      const docRef = db.collection('bookItemsArray').doc(pageId)
      FetchedbookItem.value = await docRef.get().then((doc) => doc.data())
      tableItems.id = FetchedbookItem.value.bookItem.id
      tableItems.title = FetchedbookItem.value.bookItem.title
      tableItems.description = FetchedbookItem.value.bookItem.description
      tableItems.think = FetchedbookItem.value.bookItem.think
      tableItems.finishDay = FetchedbookItem.value.bookItem.finishDay
      tableItems.author = FetchedbookItem.value.bookItem.author
      tableItems.price = FetchedbookItem.value.bookItem.price
      tableItems.status = FetchedbookItem.value.bookItem.status
      tableItems.published = FetchedbookItem.value.bookItem.published
      tableItems.userId = FetchedbookItem.value.bookItem.userId
      tableItems.ratingVal = FetchedbookItem.value.bookItem.ratingVal
    }
    onMounted(() => {
      fetchBook()
    })
    const isValid = computed(() => {
      if (store.getters.getUserUid === tableItems.userId) {
        return true
      } else {
        return false
      }
    })

    const ToggleDialog = ref<boolean>(false)
    const openDialog = () => {
      ToggleDialog.value = true
    }
    const closeDialog = () => {
      ToggleDialog.value = false
    }
    return {
      ...toRefs(tableItems),
      tableItems,
      ToggleDialog,
      // メソッド
      closeDialog,
      isValid,
      fetchBook,
      openDialog,
    }
  },
}
</script>
<style scoped>
.text-wrapper {
  background: #cde4ff;
  border-top: solid 5px #5989cf;
  border-bottom: solid 5px #5989cf;
}
</style>

<style scoped>
.title-wrapper {
  font-weight: bold;
  font-size: 30px;
}
.v-input {
  cursor: pointer;
}
</style>
