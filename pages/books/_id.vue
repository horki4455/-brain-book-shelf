<template>
  <div>
    <div class="d-flex justify-content-end">
      <v-btn
        color="red lighten-2"
        dark
        rounded
        width="214"
        @click="ToggleDialog = true"
        >編集</v-btn
      >
    </div>

    <!-- 編集ダイアログ -->
    <v-dialog v-model="ToggleDialog">
      <UpdateBookSumDialog
        :pageId="$route.params.id"
        @close="closeDialog"
        :tableItems="tableItems"
      />
    </v-dialog>

    <!-- TODO: i18n化してコンポーネントに切り分け-->
    <div class="text-muted small my-6 ml-4">
      読んだ本のページ詳細ページです
      <br />編集・削除を行えます。要約を読み返し、自分の知識を深めましょう。
    </div>
    <h3 class="border-bottom border-secondary" style="padding: 10px">
      <v-icon class="pr-3">mdi-chevron-triple-right</v-icon>情報詳細
    </h3>

    <div>
      <v-row class="mt-2">
        <v-col cols="12"> </v-col>
        <v-col cols="4">
          <TextInput
            label="タイトル"
            v-model="title"
            readonly
            :clearable="false"
          />
        </v-col>
        <v-col cols="4">
          <TextInput label="ID" v-model="id" readonly :clearable="false" />
        </v-col>
        <v-col cols="4">
          <TextInput
            label="著者"
            v-model="author"
            readonly
            :clearable="false"
          />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="4">
          <TextInput label="価格" v-model="price" readonly :clearable="false" />
        </v-col>
        <v-col cols="4">
          <TextInput
            label="ステータス"
            v-model="status"
            readonly
            :clearable="false"
          />
        </v-col>
        <v-col cols="4">
          <TextInput
            label="発刊日"
            v-model="published"
            readonly
            :clearable="false"
          />
        </v-col>
        <v-col cols="4">
          <TextInput
            label="読了日"
            v-model="finishDay"
            readonly
            :clearable="false"
          />
        </v-col>
      </v-row>
      <!-- TODO: 複数個登録可能にする -->
      <div class="my-9">
        <v-textarea v-model="think" outlined readonly label="要約/感想" />
      </div>
      <div class="float-right mb-5">
        <nuxt-link to="/books">一覧へ戻る</nuxt-link>
      </div>
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
  useFetch,
} from '@nuxtjs/composition-api'
import { db } from '@/plugins/firebase'
export default {
  setup() {
    const tableItems = reactive({
      id: '',
      title: '',
      author: '',
      finishDay: '',
      price: '',
      published: '',
      status: '',
      think: '',
    })
    const route = useRoute()
    const pageId = route.value.params.id
    let FetchedbookItem = ref(null)

    const fetchBook = async () => {
      const docRef = db.collection('bookItemsArray').doc(pageId)
      FetchedbookItem.value = await docRef.get().then((doc) => doc.data())
      tableItems.id = FetchedbookItem.value.bookItem.id
      tableItems.title = FetchedbookItem.value.bookItem.title
      tableItems.author = FetchedbookItem.value.bookItem.author
      tableItems.finishDay = FetchedbookItem.value.bookItem.finishDay
      tableItems.price = FetchedbookItem.value.bookItem.price
      tableItems.published = FetchedbookItem.value.bookItem.published
      tableItems.status = FetchedbookItem.value.bookItem.status
      tableItems.think = FetchedbookItem.value.bookItem.think
    }
    fetchBook() //結局createdと同じタイミング

    const ToggleDialog = ref(false)
    const closeDialog = () => {
      ToggleDialog.value = false
    }
    return {
      ...toRefs(tableItems),
      tableItems,
      ToggleDialog,
      closeDialog,
    }
  },
}
</script>
<style></style>
