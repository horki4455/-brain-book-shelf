<template>
  <div>
    <v-card>
      <v-card-title class="d-flex justify-content-center">
        <span>読書データの作成</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="isValid">
          <div>
            <v-row class="mt-2">
              <v-col cols="4">
                <TextInput
                  label="タイトル(必須)"
                  v-model="title"
                  :rules="[required]"
                />
              </v-col>

              <v-col cols="4">
                <TextInput label="ID" v-model="id" />
              </v-col>
              <v-col cols="4">
                <!-- TODO：再検索機能 -->
                <TextInput label="著者" v-model="author" />
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="4">
                <TextInput label="価格" v-model="price" />
              </v-col>
              <v-col cols="4">
                <SelectInput label="タグ" v-model="status" />
              </v-col>
              <v-col cols="4">
                <TextInput
                  label="発行日"
                  v-model="published"
                  :rules="[limit_length]"
                  :counter="10"
                />
              </v-col>
            </v-row>
            <!-- TODO: 複数個登録可能にする -->
            <div class="my-9">
              <v-textarea v-model="think" outlined label="要約/感想" />
            </div>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-content-center">
        <v-btn color="red" width="214" dark rounded @click="$emit('close')"
          >cancel</v-btn
        >
        <v-btn
          color="blue"
          width="214"
          rounded
          :disabled="!isValid"
          @click="addBookData"
          >OK</v-btn
        >
        <v-btn
          color="green lighten-2"
          dark
          rounded
          width="214"
          @click="GBAToggleDialog = true"
          >本のデータの検索</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog v-model="GBAToggleDialog">
      <v-card class="pa-5">
        <div>
          <p class="my-5">本を検索し、クリックしてください</p>
          <TextInput v-model="keyword" label="本を検索" />
          <v-card-actions class="d-flex justify-content-center">
            <v-btn
              color="red"
              width="214"
              rounded
              @click="GBAToggleDialog = false"
              >閉じる</v-btn
            >
            <!-- TODO: ボタンコンポーネントも作らないとな -->
            <v-btn color="green" width="214" rounded @click="getResult"
              >検索</v-btn
            >
          </v-card-actions>
        </div>
        <div>
          <div
            v-for="(book, i) of serchedBookDate"
            :index="i + 1"
            :key="book.isbn"
          >
            <div
              class="clearfix"
              :class="{ linkable }"
              @click="getBookDate(book)"
            >
              <div class="image">
                <img :src="book.image" />
              </div>
              <div class="details">
                <ul>
                  <li v-if="index">{{ index }}.</li>
                  <li>{{ book.title }}（{{ book.price }}円）</li>
                  <li>{{ book.author }} 著</li>
                  <li>{{ book.publisher }} /刊</li>
                  <li>{{ book.published }} /発売</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import {
  ref,
  defineComponent,
  toRefs,
  reactive,
  useStore,
} from '@nuxtjs/composition-api'
import axios from 'axios'
import { SelectedBook } from '@/types/books'
export default defineComponent({
  props: {
    index: { type: Number },
    linkable: { type: Boolean, default: true },
    book: { type: Object },
  },
  setup(props, { emit }) {
    const store = useStore()
    const required = (value: string) => !!value || '必ず入力してください'
    const limit_length = (value: string) =>
      value.length <= 30 || '30文字以内で入力してください'

    const bookInput = reactive({
      id: '',
      title: '',
      think: '',
      author: '',
      price: '',
      status: '未読',
      published: '',
      userId: store.getters.getUserUid,
    })
    const defaultbookInput = reactive({
      id: '',
      title: '',
      think: '',
      author: '',
      price: '',
      status: '未読',
      published: '',
    })
    // TODO:実装されてない
    const initDialog = () => {
      Object.assign(bookInput, defaultbookInput)
    }
    const isValid = ref(false)
    const addBookData = () => {
      const bookItem = bookInput
      store.dispatch('addBookData', { bookItem })
      initDialog()
      emit('close')
    }
    let selectedBook = ref('')
    const getBookDate = (book: any) => {
      const selectedBook = reactive({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        published: book.published,
      })
      Object.assign(bookInput, selectedBook)
      GBAcloseDialog()
    }
    const keyword = ref('')
    let serchedBookDate = ref([])
    const getResult = () => {
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=search' + keyword.value
        )
        .then((data) => {
          serchedBookDate.value = []
          for (let b of data.data.items) {
            let authors = b.volumeInfo.authors
            let price = b.saleInfo.listPrice
            let img = b.volumeInfo.imageLinks
            serchedBookDate.value.push({
              id: b.id,
              title: b.volumeInfo.title,
              author: authors ? authors.join(',') : '',
              price: price ? price.amount : '-',
              publisher: b.volumeInfo.publisher,
              published: b.volumeInfo.publishedDate,
              image: img ? img.smallThumbnail : '',
            })
          }
        })
    }
    const GBAToggleDialog = ref(false)
    const GBAcloseDialog = () => {
      GBAToggleDialog.value = false
    }
    return {
      // データ
      ...toRefs(bookInput),
      keyword,
      // メソッド
      addBookData,
      required,
      limit_length,
      isValid,
      getBookDate,
      selectedBook,
      getResult,
      serchedBookDate,
      GBAcloseDialog,
      GBAToggleDialog,
    }
  },
})
</script>
<style scoped>
.theme--light.v-btn {
  color: #f8f9fa;
}
.linkable:hover {
  cursor: pointer;
  background-color: #ff9;
}

.image {
  float: left;
}

.image img {
  height: 180px;
}

.details {
  float: left;
}

.details li {
  list-style-type: none;
  text-align: left;
}

.clearfix {
  width: 100%;
  margin-bottom: 10px;
}

.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
</style>
