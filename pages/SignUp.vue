<template>
  <div class="pt-10">
    <v-form>
      <div class="d-flex justify-content-center mb-5">
        <h3>新しいアカウントを作成</h3>
      </div>

      <div class="d-flex justify-content-center">
        <v-col cols="10" class="mb-0">
          <TextInput v-model="mailaddress" label="メールアドレス" />
        </v-col>
      </div>
      <div class="d-flex justify-content-center">
        <v-col cols="10">
          <TextInput type="password" v-model="password" label="password" />
        </v-col>
      </div>
    </v-form>

    <div class="d-flex justify-content-center">
      <v-btn color="red lighten-2" dark rounded width="214" @click="signUp"
        >登録</v-btn
      >
    </div>
    <div class="d-flex justify-content-end mt-5">
      <router-link class="router" to="login">ログイン画面へ戻る</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  useStore,
  useRouter,
  toRefs,
} from '@nuxtjs/composition-api'
import { auth } from '@/plugins/firebase'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const datas = reactive({
      password: '',
      mailaddress: '',
    })
    const user = computed(() => {
      return store.getters.user
    })
    const userStatus = computed(() => {
      return store.getters.isSignedIn
    })
    const signUp = () => {
      auth
        .createUserWithEmailAndPassword(datas.mailaddress, datas.password)
        .then(() => {
          alert('ユーザーが作成されました！')
          router.push({
            name: 'login',
          })
        })
        .catch((err) => {
          alert('ユーザーが作成されませんでした')
          console.log(err.message)
        })
    }

    return {
      ...toRefs(datas),
      user,
      userStatus,
      signUp,
    }
  },
})
</script>
