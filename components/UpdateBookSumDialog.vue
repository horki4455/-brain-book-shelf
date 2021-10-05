<template>
  <v-card>
    <v-card-title class="d-flex justify-content-center">
      <span>読書データの編集</span>
      <div v-if="FetchedbookItem">{{FetchedbookItem.bookItem.finishDay}}</div>
      <!-- ロード中の処理は何かすべき
    v-ifは存在している場合のみ出すので、この形で書いてるAPIとの通信する際はこの描き方する。
      null.bookItem.finishDayみたいな描き方になってしまっていた。-->

      <spacer />
    </v-card-title>
    <v-card-text>
      <div>
        <v-row class="mt-2">
          <v-col cols="4">
            <TextInput label="タイトル" v-model="title" :clearable="false" />
          </v-col>
          <v-col cols="4">
            <TextInput label="ID" v-model="id" :clearable="false" />
          </v-col>
          <v-col cols="4">
            <TextInput label="著者" v-model="auther" :clearable="false" />
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="4">
            <TextInput label="価格" v-model="finishDay" :clearable="false" />
          </v-col>
          <v-col cols="4">
            <TextInput label="ステータス" v-model="status" :clearable="false" />
          </v-col>
          <v-col cols="4">
            <TextInput label="ジャンル" v-model="kind" :clearable="false" />
          </v-col>
        </v-row>
        <!-- TODO: 複数個登録可能にする -->
        <div class="my-9">
          <v-textarea v-model="think" outlined label="要約/感想" />
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="success">OK</v-btn>
      <v-btn color="danger" @click="deleteTodo()">削除</v-btn>
    </v-card-actions>
  </v-card>
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

export default defineComponent({
  props: {
    pageId: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const router = useRouter()
    const createDefaultInput = () =>
      reactive({
        title: '',
        think: '',
        finishDay: '',
        status: '',
        kind: '',
      })
    const store = useStore()

    const deleteTodo = () => {
      db.collection('bookItemsArray').doc(props.pageId).delete()
      // TODO: 一回削除確認ダイアログ挟む
      router.push('/books')
    }
    const editTodo = () => {
      db.collection('bookItemsArray').doc(props.pageId).update({
        bookItem: bookInput,
      })
      // this.selectedId = ''
    }
    // useFecthのメリット行かせてなくね。moutedでよくね。
    useFetch(async () => {
      try {
        db.collection('bookItemsArray').onSnapshot((snapshot) => {
          store.commit('clearTodo')
          snapshot.forEach((doc) => {
            let data = doc.data()
            let id = { id: doc.id }
            const content = { ...data, ...id }
            store.commit('addTodo', content)
          })
        })
      } catch (e) {
        console.error(e)
      }
    })
    let FetchedbookItem = ref(null)
    const fetchBook = async () => {
      const docRef = db.collection('bookItemsArray').doc(props.pageId)
      FetchedbookItem.value = await docRef.get().then((doc) => doc.data())
    }
    fetchBook() //結局createdと同じタイミング
    const bookInput = reactive({
      id: '',
      title: '',
      think: '',
      auther: '',
      finishDay: '',
      status: '',
      kind: '',
    })
    return {
      // データ
      ...toRefs(bookInput),
      FetchedbookItem,
      // メソッド
      deleteTodo,
      editTodo,
    }
  },
})
</script>
