<template>
  <div>
    <v-card>
      <v-card-title class="d-flex justify-content-center">
        <span>読書データの編集</span>
        {{ pageUrlId }}
        <!-- TODO:ロード中の処理追加 -->
        <spacer />
      </v-card-title>
      <v-card-text>
        <div>
          <v-row class="mt-2">
            <v-col cols="4">
              <TextInput
                label="タイトル(必須)"
                :rules="[required]"
                v-model="title"
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
              <TextInput label="発行日" v-model="published" />
            </v-col>
            <v-col cols="4">
              <TextInput label="価格" v-model="price" />
            </v-col>
            <v-col cols="4">
              <SelectInput label="タグ" v-model="status" />
            </v-col>
            <v-col cols="4">
              <TextInput label="ユーザー" v-model="userId" readonly />
            </v-col>
            <v-col cols="4">
              <DateInput label="読了日" v-model="finishDay" />
            </v-col>
            <v-col cols="4">
              <Rating v-model="ratingVal" />
            </v-col>
          </v-row>
          <div class="my-9">
            <v-textarea v-model="think" outlined label="要約" />
          </div>
          <div class="my-9">
            <v-textarea v-model="think" outlined label="感想" />
          </div>
        </div>
      </v-card-text>
      <!-- TODO: ボタンの固定 -->
      <div class="d-flex justify-content-center pb-5">
        <RoundedButton
          class="mr-5"
          text="cancel"
          color="blue"
          @click="$emit('close')"
        />
        <RoundedButton
          class="mr-5"
          text="OK"
          color="green"
          @click="editBookData"
        />
        <RoundedButton class="mr-5" text="delete" @click="deleteBookData" />
      </div>
    </v-card>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  onMounted,
  useStore,
  useRouter,
  useRoute,
} from '@nuxtjs/composition-api'
import { db } from '@/plugins/firebase'
import dayjs from 'dayjs'
import { BookItem } from '@/types/book'
type GetTableItems = Omit<BookItem, 'createDay'>

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
    const route = useRoute()

    const pageUrlId = route.value.params.id
    const store = useStore()
    const now = dayjs().format('YYYY-MM-DD')
    const required = (value: string | number) =>
      !!value || '必ず入力してください'

    const getTableItems = reactive<GetTableItems>({
      id: props.tableItems.id ? props.tableItems.id : ' -',
      title: props.tableItems.title,
      description: props.tableItems.description,
      think: props.tableItems.think,
      finishDay: props.tableItems.finishDay ? props.tableItems.finishDay : now,
      author: props.tableItems.author ? props.tableItems.author : '-',
      price: props.tableItems.price ? props.tableItems.price : '-',
      status: props.tableItems.status,
      published: props.tableItems.published ? props.tableItems.published : '-',
      userId: props.tableItems.userId ? props.tableItems.userId : '-',
      ratingVal: props.tableItems.ratingVal ? props.tableItems.ratingVal : 0,
    })
    const defaultTableItems = reactive<GetTableItems>({
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
    const updatePageId = props.pageId ? props.pageId : props.tableItems.pageId

    const deleteBookData = () => {
      db.collection('bookItemsArray').doc(updatePageId).delete()
      // TODO: 一回削除確認ダイアログ挟む
      if (pageUrlId === 'books') {
        emit('close')
      } else {
        router.push('/books')
      }
    }
    // TODO: 例外処理敷く
    const editBookData = () => {
      db.collection('bookItemsArray')
        .doc(updatePageId)
        .update({ bookItem: defaultTableItems })
      emit('fetch')
      emit('close')
    }
    // TODO: useFecthのメリット行かせていない。moutedで良いかも。
    onMounted(async () => {
      try {
        db.collection('bookItemsArray').onSnapshot((snapshot) => {
          store.commit('clearBookData')
          snapshot.forEach((doc) => {
            const data = doc.data()
            const id = { id: doc.id }
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
      pageUrlId,
      ...toRefs(defaultTableItems),
      // メソッド
      deleteBookData,
      editBookData,
      required,
    }
  },
})
</script>
