<template>
  <div>
    <hr />
    <div class="text-center mypage-wrapper">
      <u class="mypage-text-wrapper">
        <!-- {{
          $store.getters.getUserName
            ? $store.getters.getUserName
            : currentUserEmail
        }} -->
        ユーザーネーム
        <!-- TODO:マイページへのリンクの作成-->
      </u>
      さんこんにちは！
    </div>
    <v-row class="d-flex justify-content-center mypage-wrapper">
      <v-col cols="6">
        <div v-if="!$vuetify.breakpoint.smAndDown" class="mb-3">
          これまであなたがまとめた本は
          <span class="mypage-text-wrapper"> {{ totalBookData }}冊 </span>
          です！
        </div>
        <div v-else class="mb-3">
          これまであなたがまとめた本は
          <span class="under-sm-text-wrapper"> {{ totalBookData }}冊 </span>
          です！
        </div>
      </v-col>
    </v-row>
    <hr />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  useStore,
  computed,
} from '@nuxtjs/composition-api'
import { db } from '@/plugins/firebase'
import dayjs from 'dayjs'

export default defineComponent({
  setup() {
    const store = useStore()
    const nowDate = dayjs(new Date()).format()
    const totalBookData = computed(() => {
      return store.getters.getBookItems.filter(
        (v) => v.bookItem.userId === store.getters.getUserUid
      ).length
    })
    const currentUserEmail = store.getters.getCurrentUserEmail

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
      nowDate,
      currentUserEmail,
      totalBookData,
    }
  },
})
</script>
<style scoped>
.mypage-wrapper {
  font-weight: bold;
}
.mypage-text-wrapper {
  font-size: 3rem;
}
.under-sm-text-wrapper {
  font-size: 2rem;
}
</style>
