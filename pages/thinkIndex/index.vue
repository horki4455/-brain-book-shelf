<template>
  <div>
    <div class="text-muted small my-6 ml-4">
      各種ランキングです。他の人のおすすめを確認してみましょう。
      <br />読み解したい本がなければ確認しましょう。
    </div>
    <div class="my-4">
      <Divider :message="'本の感想'" />

      <div v-for="book in $store.getters.getBookItems" :key="book.id">
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
                :value="book.bookItem.ratingVal"
              />
            </v-col>
            <v-col cols="6">
              <v-textarea
                @click="moveToDetail(book.id)"
                class="mt-5"
                :value="book.bookItem.think"
                outlined
                name="input-7-4"
                label="所感・まとめ"
                readonly
              />
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
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
      router.push(`books/${id}`)
    }

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
      // メソッド
      moveToDetail,
    }
  },
})
</script>
<style></style>
