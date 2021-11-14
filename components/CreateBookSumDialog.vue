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
                <TextInput label="著者" v-model="author" />
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col cols="4">
                <TextInput
                  label="価格"
                  v-model="price"
                  :rules="[limit_length]"
                />
              </v-col>
              <v-col cols="4">
                <SelectInput label="タグ" v-model="status" />
              </v-col>
              <v-col cols="4">
                <TextInput label="発行日" v-model="published" :counter="10" />
              </v-col>
              <v-col cols="4">
                <div class="rating-style">
                  <Rating v-model="ratingVal" />
                </div>
              </v-col>
            </v-row>
            <div class="my-9">
              <v-textarea v-model="description" outlined label="要約" />
            </div>
            <div class="my-9">
              <v-textarea v-model="think" outlined label="感想" />
            </div>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-content-center pb-5">
        <RoundedButton
          text="cancel"
          color="red lighten-2"
          @click="$emit('close')"
          class="mr-2"
        />
        <v-btn
          color="blue lighten-2"
          width="214"
          rounded
          :disabled="!isValid"
          @click="addBookData"
          class="mr-3"
          >OK</v-btn
        >
        <RoundedButton
          text="本のデータの検索"
          color="green lighten-2"
          @click="GBAToggleDialog = true"
        />
      </v-card-actions>
    </v-card>
    <v-dialog v-model="GBAToggleDialog">
      <v-card class="pa-5">
        <div>
          <p class="my-5">本を検索し、クリックしてください</p>
          <TextInput v-model="keyword" label="本を検索" />
          <v-card-actions class="d-flex justify-content-center">
            <RoundedButton
              class="mr-2"
              text="閉じる"
              @click="GBAToggleDialog = false"
            />
            <RoundedButton
              class="mr-2"
              text="検索"
              color="green"
              @click="getResult"
            />
          </v-card-actions>
        </div>
        <!-- 検索後に開く画面 -->
        <div class="mt-4">
          <div v-for="book of serchedBookDate" :key="book.isbn">
            <div
              class="clearfix"
              :class="{ linkable }"
              @click="getBookDate(book)"
            >
              <v-card outlined class="mb-3 pa-3">
                <v-row>
                  <v-col cols="3">
                    <div class="image">
                      <img :src="book.image" />
                    </div>
                  </v-col>
                  <v-col cols="9">
                    <div class="details">
                      <ul>
                        <li class="pb-3">
                          {{ book.title }}（{{ book.price }}円）
                        </li>
                        <li>詳細：{{ omittedText(book.description) }}</li>
                        <li>{{ book.author }} 著</li>
                        <li>{{ book.publisher }} /刊</li>
                        <li>{{ book.published }} /発売</li>
                      </ul>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
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
import dayjs from 'dayjs'
import { BookItem, SerchedBookItem } from '@/types/book'

type BookItemDefault = Omit<BookItem, 'userId' | 'createDay' | 'finishDay'>
type BookInput = Omit<BookItem, 'finishDay'>
type SelectedBook = Pick<
  BookItem,
  'id' | 'title' | 'description' | 'author' | 'price' | 'published'
>
export default defineComponent({
  props: {
    index: { type: Number },
    linkable: { type: [Boolean, Number], default: true },
    book: { type: Object },
  },
  setup(_, { emit }) {
    const store = useStore()
    // 作成日
    const createDay = dayjs(new Date()).format('YYYY-MM-DD')

    // バリデーション
    const required = (value: string | number) =>
      !!value || '必ず入力してください'
    const limit_length = (value: string | number) =>
      String(value).length <= 30 || '30文字以内で入力してください'
    const isValid = ref<boolean>(false)

    // データの入出力
    const bookInput = reactive<BookInput>({
      id: '',
      title: '',
      description: '',
      think: '',
      author: '',
      price: '',
      status: '未読',
      published: '',
      userId: store.getters.getUserUid,
      createDay: createDay,
      ratingVal: 0,
    })
    const defaultbookInput = reactive<BookItemDefault>({
      id: '',
      title: '',
      description: '',
      think: '',
      author: '',
      price: '',
      status: '未読',
      published: '',
      ratingVal: 0,
    })
    //ダイアログの初期化
    const initDialog = () => {
      Object.assign(bookInput, defaultbookInput)
    }
    // 本の作成データの保存・作成
    const addBookData = () => {
      const bookItem = bookInput
      store.dispatch('addBookData', { bookItem })
      initDialog()
      emit('close')
    }
    // 選択された本の内容
    let selectedBook = ref<SelectedBook>()
    const getBookDate = (book: SelectedBook) => {
      const selectedBook = reactive<SelectedBook>({
        id: book.id,
        title: book.title,
        description: book.description,
        author: book.author,
        price: book.price,
        published: book.published,
      })
      Object.assign(bookInput, selectedBook)
      GBAcloseDialog()
    }
    const omittedText = (text: string | number) => {
      const toString = String(text)
      return toString.length > 250 ? toString.slice(0, 250) + '…' : toString
    }
    const keyword = ref<string>('')
    let serchedBookDate = ref<SerchedBookItem[]>([])
    const getResult = () => {
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=search' + keyword.value
        )
        .then((data) => {
          serchedBookDate.value = []
          for (const b of data.data.items) {
            const authors = b.volumeInfo.authors
            const price = b.saleInfo.listPrice
            const img = b.volumeInfo.imageLinks
            const description = b.volumeInfo.description
            serchedBookDate.value.push({
              id: b.id,
              title: b.volumeInfo.title,
              description: description ? description : '',
              author: authors ? authors.join(',') : '',
              price: price ? price.amount : '-',
              publisher: b.volumeInfo.publisher,
              published: b.volumeInfo.publishedDate,
              image: img ? img.smallThumbnail : '',
            })
          }
        })
    }
    // ダイアログの開閉
    const GBAToggleDialog = ref<boolean>(false)
    const GBAcloseDialog = () => {
      GBAToggleDialog.value = false
    }
    return {
      // データ
      ...toRefs(bookInput),
      keyword,
      GBAToggleDialog,
      isValid,
      // メソッド
      createDay,
      addBookData,
      required,
      limit_length,
      getBookDate,
      selectedBook,
      getResult,
      serchedBookDate,
      GBAcloseDialog,
      omittedText,
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
.rating-style {
  outline: 0.5px solid black;
  opacity: 0.6;
}
</style>
