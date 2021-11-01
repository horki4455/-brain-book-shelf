<template>
  <div>
    <h3 class="text-center my-5">マイ読書データ</h3>
    <v-card outlined>
      <div class="text-center my-5">
        {{
          $store.getters.getUserName
            ? $store.getters.getUserName
            : currentUserEmail
        }}さんこんにちは！
      </div>
      <v-row class="d-flex justify-content-center py-5 my-3 ml-3">
        <v-col cols="4">
          <div class="mb-3">
            これまであなたがまとめた本は {{ totalBookData }}冊 です！
            {{ nowDate }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useFetch,
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
      nowDate,
      currentUserEmail,
      totalBookData,
    }
  },
})
</script>
