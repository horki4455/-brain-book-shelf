<template>
  <div>
    <Divider message="本の感想" />
    <div class="my-4">
      <div class="text-muted small my-10 ml-4">
        各種ランキングです。他の人のおすすめを確認してみましょう。
        <br />読み解したい本がなければ確認しましょう。
      </div>
      <div v-for="book in $store.getters.getBookItems" :key="book.id">
        <v-card class="ma-3" v-if="!$vuetify.breakpoint.smAndDown">
          <v-row class="pa-3 my-3" v-if="book.bookItem.description">
            <v-col cols="6">
              <v-row>
                <v-col cols="6">
                  <div>
                    <v-img
                      src="image/sample.jpg"
                      max-width="500"
                      max-height="300"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </div>
                </v-col>
                <v-col cols="6">
                  <h4 class="pb-5 card-title" @click="moveToDetail(book.id)">
                    <u class="pointer">{{ book.bookItem.title }}</u>
                  </h4>
                  <div class="pb-5">著者：{{ book.bookItem.author }}</div>
                </v-col>

                <v-rating
                  class="ml-3"
                  empty-icon="mdi-star-outline"
                  full-icon="mdi-star"
                  half-icon="mdi-star-half-full"
                  hover
                  readonly
                  length="5"
                  size="24"
                  :value="book.bookItem.ratingVal"
                />
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-textarea
                class="mt-5"
                :value="omittedText(book.bookItem.description)"
                outlined
                name="input-7-4"
                label="詳細"
                readonly
              />
            </v-col>
          </v-row>
        </v-card>
        <v-card class="ma-3" v-else>
          <div class="pa-3 my-3" v-if="book.bookItem.description">
            <div class="pb-5">
              <v-img src="image/sample.jpg" max-width="500" max-height="300">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </div>
            <h4 class="pb-5 card-title" @click="moveToDetail(book.id)">
              <u class="pointer">{{ book.bookItem.title }}</u>
            </h4>
            <div class="pb-5">著者：{{ book.bookItem.author }}</div>

            <v-rating
              class="ml-3"
              empty-icon="mdi-star-outline"
              full-icon="mdi-star"
              half-icon="mdi-star-half-full"
              hover
              readonly
              length="5"
              size="24"
              :value="book.bookItem.ratingVal"
            />
            <v-textarea
              class="mt-5"
              :value="omittedText(book.bookItem.description)"
              outlined
              name="input-7-4"
              label="詳細"
              readonly
            />
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
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
    const omittedText = (text: string | number) => {
      const toStringedText = String(text)
      return toStringedText.length > 50
        ? toStringedText.slice(0, 50) + '…'
        : toStringedText
    }
    const omittedTitle = (text: string | number) => {
      const toStringedText = String(text)
      return toStringedText.length > 20
        ? toStringedText.slice(0, 20) + '…'
        : toStringedText
    }

    onMounted(async () => {
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
      omittedText,
      omittedTitle,
    }
  },
})
</script>
<style scoped>
.title-wrapper {
  font-weight: bold;
  font-size: 5rem;
}
.card-title {
  font-weight: bold;
}
.pointer {
  cursor: pointer;
}
</style>
