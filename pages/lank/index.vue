<template>
  <div>
    <div class="text-muted small my-6 ml-4">
      各種ランキングです。他の人のおすすめを確認してみましょう。
      <br />読み解したい本がなければ確認しましょう。
    </div>

    <div class="my-4">
      <Divider :message="'本の感想'" />

      <div v-for="book in unrefedBookItems" :key="book.id">
        <v-card class="ma-3">
          <v-row class="pa-3 my-3" v-if="book.bookItem.think">
            <v-col cols="6">
              <div class="mb-1">{{ book.bookItem.title }}</div>
              <img
                class="img mb-4 ml-3"
                src="@/assets/bookImage.jpeg"
                width="200"
              />
              <v-rating
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                half-icon="mdi-star-half-full"
                hover
                readonly
                length="5"
                size="24"
                value="3"
              />
            </v-col>
            <v-col cols="6">
              <h4 class="mb-5">本の感想</h4>
              {{ book.bookItem.think }}
            </v-col>
          </v-row>
        </v-card>
      </div>
      <v-pagination v-model="page" :length="6" />
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

    // 詳細遷移処理
    const moveToDetail = (id: number) => {
      console.log(id)
      router.push(`lank/${id}`)
    }
    const unrefedBookItems = computed(() => {
      return store.getters.getBookItems.filter((v: any) => v.bookItem)
    })

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
      unrefedBookItems,
      // メソッド
      moveToDetail,
    }
  },
})
</script>
<style></style>
