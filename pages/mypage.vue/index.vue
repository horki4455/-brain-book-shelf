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
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-row class="d-flex justify-content-center my-3">
      <v-col cols="5" class="mr-7">
        <lineChart />
      </v-col>
      <v-col cols="5">
        <div>読んだ本の種類</div>
        <circleChart />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  useFetch,
  useStore,
  computed,
} from '@nuxtjs/composition-api'
import { db, auth } from '@/plugins/firebase'

export default defineComponent({
  setup() {
    const store = useStore()
    const totalBookData = computed(() => {
      return store.getters.getBookItems.filter(
        (v: any) => v.bookItem.userId === store.getters.getUserUid
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
      currentUserEmail,
      totalBookData,
    }
  },
})
</script>
