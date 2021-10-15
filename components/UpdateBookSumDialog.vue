<template>
  <div>
    <v-card>
      <v-card-title class="d-flex justify-content-center">
        <span>読書データの編集</span>
        <!-- TODO:ロード中の処理は何かすべき -->
        <spacer />
      </v-card-title>
      <v-card-text>
        <div>
          <!-- TODO: dateInputとうまくかみ合っていない -->
          <v-row class="mt-2">
            <v-col cols="4">
              <TextInput label="タイトル" v-model="title" />
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
              <TextInput label="発行日" v-model="published" />
            </v-col>
            <v-col cols="4">
              <DateInput label="価格" v-model="price" />
            </v-col>
            <v-col cols="4">
              <SelectInput label="タグ" v-model="status" />
            </v-col>
            <v-col cols="4">
              <DateInput label="読了日" v-model="finishDay" />
            </v-col>
          </v-row>
          <!-- TODO: 複数個登録可能にする -->
          <div class="my-9">
            <v-textarea v-model="think" outlined label="要約/感想" />
          </div>
        </div>
      </v-card-text>
      <!-- TODO: ボタンの固定 -->
      <div class="d-flex justify-content-center">
        <v-btn
          class="mr-5"
          color="blue"
          width="214"
          dark
          rounded
          @click="$emit('close')"
          >cancel</v-btn
        >
        <v-btn
          class="mr-5"
          color="green"
          width="214"
          dark
          rounded
          @click="editBookData()"
          >OK</v-btn
        >
        <v-btn color="red" width="214" dark rounded @click="deleteBookData()"
          >delete</v-btn
        >
      </div>
    </v-card>
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
  computed,
  useRouter,
} from '@nuxtjs/composition-api'
import { db } from '@/plugins/firebase'
import dayjs from 'dayjs'

export default defineComponent({
  props: {
    pageId: {
      type: String,
      default: '',
    },
    tableItems: {
      type: Object,
      default: '',
    },
  },
  setup(props, { emit }) {
    const router = useRouter()
    const now = dayjs().format('YYYY-MM-DD')

    const getTableItems = reactive({
      id: props.tableItems.id ? props.tableItems.id : ' -',
      author: props.tableItems.author ? props.tableItems.author : '-',
      title: props.tableItems.title,
      think: props.tableItems.think,
      finishDay: props.tableItems.finishDay ? props.tableItems.finishDay : now,
      price: props.tableItems.price ? props.tableItems.price : '-',
      status: props.tableItems.status,
      published: props.tableItems.published ? props.tableItems.published : '-',
    })
    const defaultTableItems = reactive({
      id: '',
      author: '',
      title: '',
      think: '',
      finishDay: '',
      price: '',
      status: '',
      published: '',
    })

    const store = useStore()
    const deleteBookData = () => {
      db.collection('bookItemsArray').doc(props.pageId).delete()
      // TODO: 一回削除確認ダイアログ挟む
      router.push('/books')
    }
    const editBookData = () => {
      console.log('props.pageId')
      db.collection('bookItemsArray')
        .doc(props.pageId)
        .update({ bookItem: defaultTableItems })
      console.log(defaultTableItems)
      emit('close')
    }
    // useFecthのメリット行かせていない。moutedで良いかも。
    useFetch(async () => {
      try {
        db.collection('bookItemsArray').onSnapshot((snapshot) => {
          store.commit('clearBookData')
          snapshot.forEach((doc) => {
            let data = doc.data()
            let id = { id: doc.id }
            const content = { ...data, ...id }
            store.commit('addBookData', content)
            Object.assign(defaultTableItems, getTableItems)
          })
        })
      } catch (e) {
        console.error(e)
      }
    })

    return {
      // データ
      getTableItems,
      now,
      ...toRefs(defaultTableItems),
      // メソッド
      deleteBookData,
      editBookData,
    }
  },
})
</script>
