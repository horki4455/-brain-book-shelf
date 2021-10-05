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
                <TextInput label="タイトル" v-model="title" :clearable="false" />
              </v-col>
              <!-- <v-text-field
              v-model="title"
              label="入力必須で文字数制限のあるテキストフィールド"
              :rules="[required, limit_length]"
              counter="10"
              />-->
              <v-col cols="4">
                <TextInput label="ID" v-model="id" :clearable="false" />
              </v-col>
              <v-col cols="4">
                <!-- TODO:これで保存エラー起こる -->
                <TextInput label="著者" v-model="auther" :clearable="false" />
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="4">
                <TextInput label="価格" v-model="price" :clearable="false" />
              </v-col>
              <v-col cols="4">
                <TextInput label="タグ" v-model="status" :clearable="false" />
              </v-col>
              <v-col cols="4">
                <TextInput label="発行日" v-model="published" :clearable="false" />
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
        <v-btn color="red" width="214" dark rounded @click="$emit('close')">cancel</v-btn>
        <v-btn color="blue" width="214" dark rounded :disabled="!isValid" @click="addTodo">OK</v-btn>
        <v-btn
          color="green lighten-2"
          dark
          rounded
          width="214"
          @click="GBAToggleDialog = true"
        >本のデータの検索</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="GBAToggleDialog">
      <v-card class="pa-5">
        <div>
          <p class="my-5">検索した本をクリックしてください</p>
          <TextInput v-model="keyword" label="本を検索" />
          <div class="d-flex justify-content-end">
            <v-btn @click="getResult">検索</v-btn>
            <v-btn @click="GBAToggleDialog = false">閉じる</v-btn>
          </div>
        </div>
        <div>
          <div v-for="(book, i) of serchedBookDate" :index="i + 1" :key="book.isbn">
            <div class="clearfix" :class="{ linkable }" @click="getBookDate(book)">
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
  useFetch,
  useStore,
  onMounted,
} from '@nuxtjs/composition-api'
import axios from 'axios'
export default defineComponent({
  props: {
    index: { type: Number },
    linkable: { type: Boolean, default: true },
    book: { type: Object },
  },
  setup(props, { emit }) {
    const required = (value: string) => !!value || '必ず入力してください'
    const limit_length = (value: string) =>
      value.length <= 10 || '10文字以内で入力してください'

    const bookInput = reactive({
      id: '',
      title: '',
      think: '',
      auther: '',
      price: '',
      status: '未読',
      published: '',
    })
    const isValid = ref(false)
    const store = useStore()
    const addTodo = () => {
      const bookItem = bookInput
      store.dispatch('addTodo', { bookItem })
      emit('close')
    }
    let selectedBook = ref('')
    const getBookDate = (book: any) => {
      const selectedBook = reactive({
        id: book.id,
        title: book.title,
        auther: book.auther,
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
        .get('https://www.googleapis.com/books/v1/volumes?q=search' + keyword)
        .then((response: any) => {
          serchedBookDate.value = []
          for (let b of response.data.items) {
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
      addTodo,
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
